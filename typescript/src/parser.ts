/**
 * Core ISBT 128 barcode scanner/parser (ST-001 §2.1-2.3, §2.4.23 Compound Message, §10
 * concatenation rules) plus `check()`/`parse()` — the two public entry points.
 */
import { Isbt128ParseError } from './errors.js';
import { FIXED_STRUCTURES_BY_DI } from './structures.js';
import { decodeSecContent, isSecText, parseSecText } from './sec.js';
import {
  describeDimensionSymbol, describeDimensionUnit, applyDimensionDecimalPoint,
  describeRbcSerologicalResult, describeNumberOfTests, describeDinFlag, isDinChecksumFlag,
} from './referenceTables.js';
import { isoMod37_2 } from './checksum.js';
import type { CompoundMessageInfo, ParsedBarcode, ParsedSegment } from './types.js';

const DIN_ALPHANUMERIC = /[A-NP-Z1-9]/;
const NON_ICCBBA_LOWERCASE = /[a-z]/;

function decodeDin(content15: string): Record<string, unknown> {
  const alpha = content15[0];
  const fin = alpha + content15.slice(1, 5);
  const din13 = content15.slice(0, 13);
  const ff = content15.slice(13, 15);
  const isChecksum = isDinChecksumFlag(ff);
  return {
    facilityIdentificationNumber: fin,
    year: content15.slice(5, 7),
    sequenceNumber: content15.slice(7, 13),
    donationIdentificationNumber: din13,
    flagCharacters: ff,
    flagMeaning: describeDinFlag(ff),
    isChecksumFlag: isChecksum,
    checksumValid: isChecksum ? String(isoMod37_2(din13) + 60).padStart(2, '0') === ff : undefined,
  };
}

function decodeDimensions(content: string): Record<string, unknown>[] {
  const segments: Record<string, unknown>[] = [];
  const count = Number(content.slice(0, 2));
  for (let i = 0; i < count; i += 1) {
    const seg = content.slice(2 + i * 14, 2 + (i + 1) * 14);
    const aa = seg.slice(0, 2), bbbb = seg.slice(2, 6), ccccc = seg.slice(6, 11), d = seg[11], ee = seg.slice(12, 14);
    const unit = describeDimensionUnit(bbbb);
    segments.push({
      symbolCode: aa, symbol: describeDimensionSymbol(aa),
      dimensionCode: bbbb, unit: unit.unit, dimensionDescription: unit.description,
      rawValue: ccccc, decimalPlacesCode: d, formattedValue: applyDimensionDecimalPoint(ccccc, d),
      reservedForFutureUse: ee,
    });
  }
  return segments;
}

function decodeRbcAntigensWithHistory(content: string): Record<string, unknown>[] {
  const segments: Record<string, unknown>[] = [];
  const count = Number(content.slice(0, 3));
  for (let i = 0; i < count; i += 1) {
    const seg = content.slice(3 + i * 10, 3 + (i + 1) * 10);
    const antigenCode = seg.slice(0, 6), rr = seg.slice(6, 8), ss = seg.slice(8, 10);
    segments.push({
      antigenCode, resultCode: rr, result: describeRbcSerologicalResult(rr),
      numberOfTestsCode: ss, numberOfTests: describeNumberOfTests(ss),
    });
  }
  return segments;
}

interface ScanState {
  pos: number;
  segments: ParsedSegment[];
  compoundInfo?: CompoundMessageInfo;
  compoundOpen: boolean;
  compoundSeen: number;
}

function fail(reason: string, position: number, message: string): never {
  throw new Isbt128ParseError(message, position, reason);
}

function scanOne(input: string, state: ScanState): void {
  const { pos } = state;
  const marker = input[pos];
  if (marker !== '=' && marker !== '&') {
    fail('UNEXPECTED_CHARACTER', pos, `Expected '=' or '&' but found '${marker}'`);
  }
  const next = input[pos + 1];
  if (next === undefined) {
    fail('TRUNCATED_DATA_IDENTIFIER', pos, 'Data identifier is truncated at end of input');
  }

  // Special case: Donation Identification Number [001] — 2nd DI char doubles as content char 1.
  if (marker === '=' && DIN_ALPHANUMERIC.test(next)) {
    const contentStart = pos + 1;
    const contentEnd = contentStart + 15;
    if (contentEnd > input.length) fail('TRUNCATED_CONTENT', pos, 'DIN [001] content is truncated');
    const content = input.slice(contentStart, contentEnd);
    state.segments.push({
      dataStructureNumber: '001', name: 'Donation Identification Number',
      dataIdentifier: input.slice(pos, contentStart), rawContent: content,
      fields: decodeDin(content), isRetired: false, isOpaque: false, standardReference: 'ST-001 §2.4.1',
    });
    state.pos = contentEnd;
    registerCompoundProgress(state);
    return;
  }

  // Non-ICCBBA defined data structures (§2.5.1): opaque, unbounded length.
  if (marker === '&' && NON_ICCBBA_LOWERCASE.test(next)) {
    state.segments.push({
      dataStructureNumber: null, name: 'Non-ICCBBA Defined Data Structure',
      dataIdentifier: input.slice(pos, pos + 2), rawContent: input.slice(pos + 2),
      fields: {}, isRetired: false, isOpaque: true, standardReference: 'ST-001 §2.5.1',
    });
    state.pos = input.length;
    return;
  }

  // Reserved hybrid national structures (§2.5.2 / §2.5.3): opaque, unbounded length.
  if (marker === '&' && (next === ';' || next === '!')) {
    const isDonorId = next === ';';
    state.segments.push({
      dataStructureNumber: null,
      name: isDonorId ? 'Reserved: Nationally Specified Donor Identification Number' : 'Confidential Unit Exclusion Status Data Structure',
      dataIdentifier: input.slice(pos, pos + 2), rawContent: input.slice(pos + 2),
      fields: {}, isRetired: false, isOpaque: true,
      standardReference: isDonorId ? 'ST-001 §2.5.2' : 'ST-001 §2.5.3',
    });
    state.pos = input.length;
    return;
  }

  // 3-character DI family: &,1 / &,2 / &,3 / &,4 (035/036/037/038).
  if (marker === '&' && next === ',') {
    const third = input[pos + 2];
    if (third === undefined) fail('TRUNCATED_DATA_IDENTIFIER', pos, "Data identifier '&,' requires a 3rd character");
    const di = input.slice(pos, pos + 3);
    if (di === '&,4') {
      const contentStart = pos + 3, contentEnd = contentStart + 40;
      if (contentEnd > input.length) fail('TRUNCATED_CONTENT', pos, 'SEC [038] content is truncated');
      const content = input.slice(contentStart, contentEnd);
      state.segments.push({
        dataStructureNumber: '038', name: 'Single European Code (SEC)', dataIdentifier: di, rawContent: content,
        fields: { ...decodeSecContent(content) }, isRetired: false, isOpaque: false, standardReference: 'ST-001 §2.4.38 / ST-012',
      });
      state.pos = contentEnd;
      registerCompoundProgress(state);
      return;
    }
    const spec = FIXED_STRUCTURES_BY_DI.get(di);
    if (!spec) fail('UNKNOWN_DATA_IDENTIFIER', pos, `Unrecognized data identifier '${di}'`);
    const contentStart = pos + 3, contentEnd = contentStart + spec.contentLength;
    if (contentEnd > input.length) fail('TRUNCATED_CONTENT', pos, `${spec.name} [${spec.number}] content is truncated`);
    const content = input.slice(contentStart, contentEnd);
    state.segments.push({
      dataStructureNumber: spec.number, name: spec.name, dataIdentifier: di, rawContent: content,
      fields: spec.retired ? {} : spec.decode(content), isRetired: spec.retired, isOpaque: false, standardReference: spec.reference,
    });
    state.pos = contentEnd;
    registerCompoundProgress(state);
    return;
  }

  const di = input.slice(pos, pos + 2);

  // Patient Identification Number [025]: length-prefixed variable content.
  if (di === '&#') {
    const headerStart = pos + 2, headerEnd = headerStart + 4;
    if (headerEnd > input.length) fail('TRUNCATED_CONTENT', pos, 'Patient Identification Number [025] header is truncated');
    const aa = input.slice(headerStart, headerStart + 2), ll = input.slice(headerStart + 2, headerEnd);
    const llNum = Number(ll);
    if (!Number.isInteger(llNum) || llNum < 0) fail('INVALID_LENGTH_PREFIX', pos, `Invalid patient id length '${ll}'`);
    const contentEnd = headerEnd + llNum;
    if (contentEnd > input.length) fail('TRUNCATED_CONTENT', pos, 'Patient Identification Number [025] content is truncated');
    const content = input.slice(headerStart, contentEnd);
    state.segments.push({
      dataStructureNumber: '025', name: 'Patient Identification Number', dataIdentifier: di, rawContent: content,
      fields: { locationCode: aa, patientIdLength: ll, patientId: input.slice(headerEnd, contentEnd) },
      isRetired: false, isOpaque: false, standardReference: 'ST-001 §2.4.25',
    });
    state.pos = contentEnd;
    registerCompoundProgress(state);
    return;
  }

  // Dimensions [029]: repeat-count-prefixed variable content.
  if (di === '&$') {
    const headerStart = pos + 2, headerEnd = headerStart + 2;
    if (headerEnd > input.length) fail('TRUNCATED_CONTENT', pos, 'Dimensions [029] header is truncated');
    const nn = Number(input.slice(headerStart, headerEnd));
    const contentEnd = headerEnd + 14 * nn;
    if (contentEnd > input.length) fail('TRUNCATED_CONTENT', pos, 'Dimensions [029] content is truncated');
    const content = input.slice(headerStart, contentEnd);
    state.segments.push({
      dataStructureNumber: '029', name: 'Dimensions', dataIdentifier: di, rawContent: content,
      fields: { count: nn, dimensions: decodeDimensions(content) },
      isRetired: false, isOpaque: false, standardReference: 'ST-001 §2.4.29',
    });
    state.pos = contentEnd;
    registerCompoundProgress(state);
    return;
  }

  // Red Cell Antigens with Test History [030]: repeat-count-prefixed variable content.
  if (di === '&%') {
    const headerStart = pos + 2, headerEnd = headerStart + 3;
    if (headerEnd > input.length) fail('TRUNCATED_CONTENT', pos, 'Red Cell Antigens with Test History [030] header is truncated');
    const nnn = Number(input.slice(headerStart, headerEnd));
    const contentEnd = headerEnd + 10 * nnn;
    if (contentEnd > input.length) fail('TRUNCATED_CONTENT', pos, 'Red Cell Antigens with Test History [030] content is truncated');
    const content = input.slice(headerStart, contentEnd);
    state.segments.push({
      dataStructureNumber: '030', name: 'Red Cell Antigens with Test History', dataIdentifier: di, rawContent: content,
      fields: { count: nnn, antigens: decodeRbcAntigensWithHistory(content) },
      isRetired: false, isOpaque: false, standardReference: 'ST-001 §2.4.30',
    });
    state.pos = contentEnd;
    registerCompoundProgress(state);
    return;
  }

  // Transfusion Transmitted Infection Marker [027]: fixed length, structural decode only
  // (see referenceTables.ts for why the position→marker table is not semantically decoded).
  if (di === '&"') {
    const contentStart = pos + 2, contentEnd = contentStart + 18;
    if (contentEnd > input.length) fail('TRUNCATED_CONTENT', pos, 'TTI Marker [027] content is truncated');
    const content = input.slice(contentStart, contentEnd);
    state.segments.push({
      dataStructureNumber: '027', name: 'Transfusion Transmitted Infection Marker', dataIdentifier: di, rawContent: content,
      fields: { positions: content.split('') },
      isRetired: false, isOpaque: false, standardReference: 'ST-001 §2.4.27',
    });
    state.pos = contentEnd;
    registerCompoundProgress(state);
    return;
  }

  const spec = FIXED_STRUCTURES_BY_DI.get(di);
  if (!spec) fail('UNKNOWN_DATA_IDENTIFIER', pos, `Unrecognized data identifier '${di}'`);
  const contentStart = pos + 2, contentEnd = contentStart + spec.contentLength;
  if (contentEnd > input.length) fail('TRUNCATED_CONTENT', pos, `${spec.name} [${spec.number}] content is truncated`);
  const content = input.slice(contentStart, contentEnd);
  const fields = spec.retired ? {} : spec.decode(content);
  state.segments.push({
    dataStructureNumber: spec.number, name: spec.name, dataIdentifier: di, rawContent: content,
    fields, isRetired: spec.retired, isOpaque: false, standardReference: spec.reference,
  });
  state.pos = contentEnd;

  if (spec.number === '023') {
    const aa = Number(content.slice(0, 2)), bbb = content.slice(2, 5);
    state.compoundInfo = { declaredCount: aa, sequenceCode: bbb, isSpecifiedSequence: bbb !== '000' };
    state.compoundOpen = true;
    state.compoundSeen = 0;
    return;
  }
  registerCompoundProgress(state);
}

function registerCompoundProgress(state: ScanState): void {
  if (state.compoundOpen && state.compoundInfo) {
    state.compoundSeen += 1;
    if (state.compoundSeen >= state.compoundInfo.declaredCount) {
      state.compoundOpen = false;
    }
  }
}

function buildConvenienceAccessors(result: ParsedBarcode): void {
  const byNumber = (n: string): Record<string, unknown> | undefined =>
    result.segments.find((s) => s.dataStructureNumber === n)?.fields;
  result.donationIdentificationNumber = byNumber('001');
  result.productCode = byNumber('003');
  result.expirationDate = byNumber('004') ?? byNumber('005');
  result.productDivisions = byNumber('032');
  result.sec = byNumber('038');
  const ppic = byNumber('034');
  if (ppic) {
    result.udi = {
      deviceIdentifier: ppic,
      donationIdentificationNumber: byNumber('001'),
      productDivisions: byNumber('032'),
      expirationDate: byNumber('004'),
      productionDate: byNumber('008'),
      lotNumber: byNumber('035'),
    };
  }
}

/**
 * Parses an ISBT 128 (or ISBT 128-derived: SEC, MPHO/UDI) barcode data string into its
 * constituent data structures. Throws `Isbt128ParseError` for structurally invalid input.
 */
export function parse(barcode: string): ParsedBarcode {
  if (typeof barcode !== 'string' || barcode.length === 0) {
    fail('EMPTY_INPUT', 0, 'Input must be a non-empty string');
  }

  if (isSecText(barcode)) {
    const fields = { ...parseSecText(barcode) };
    const result: ParsedBarcode = {
      raw: barcode, isCompoundMessage: false, isSecText: true,
      segments: [{
        dataStructureNumber: '038', name: 'Single European Code (SEC)', dataIdentifier: 'SEC:',
        rawContent: barcode, fields, isRetired: false, isOpaque: false, standardReference: 'ST-012 §2.3',
      }],
    };
    buildConvenienceAccessors(result);
    return result;
  }

  const state: ScanState = { pos: 0, segments: [], compoundOpen: false, compoundSeen: 0 };
  while (state.pos < barcode.length) {
    scanOne(barcode, state);
  }
  if (state.compoundInfo && state.compoundSeen !== state.compoundInfo.declaredCount) {
    fail(
      'COMPOUND_MESSAGE_COUNT_MISMATCH',
      barcode.length,
      `Compound Message declared ${state.compoundInfo.declaredCount} data structures but only ${state.compoundSeen} were found`,
    );
  }

  const result: ParsedBarcode = {
    raw: barcode,
    isCompoundMessage: state.compoundInfo !== undefined,
    compoundMessage: state.compoundInfo,
    isSecText: false,
    segments: state.segments,
  };
  buildConvenienceAccessors(result);
  return result;
}

/** Returns whether `barcode` is a structurally/semantically valid ISBT 128 barcode data string. */
export function check(barcode: string): boolean {
  try {
    parse(barcode);
    return true;
  } catch (error) {
    if (error instanceof Isbt128ParseError) return false;
    throw error;
  }
}

export { calculateDinCheckCharacter } from './checksum.js';
