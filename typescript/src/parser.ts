/**
 * Core ISBT 128 barcode scanner/parser (ST-001 §2.1-2.3, §2.4.23 Compound Message, §10
 * concatenation rules) plus `check()`/`parse()` — the two public entry points.
 */
import { Isbt128BuildError, Isbt128ParseError } from './errors.js';
import {
  FIXED_STRUCTURES_BY_DI, FIN_P_CHARSET, FPC_CHARSET, PDC_CHARSET,
  PRODUCT_DIVISIONS_CHARSET, LOT_NUMBER_CHARSET,
} from './structures.js';
import { decodeSecContent, isSecText, parseSecText } from './sec.js';
import {
  describeDimensionSymbol, describeDimensionUnit, applyDimensionDecimalPoint,
  describeRbcSerologicalResult, describeNumberOfTests, describeDinFlag, isDinChecksumFlag,
} from './referenceTables.js';
import { calculateDinType3Flag, isoMod37_2 } from './checksum.js';
import { encodeCyyjjj } from './dateUtils.js';
import type {
  BuildUdiDeviceIdentifierInput, BuildUdiDonationIdentificationNumberInput, BuildUdiInput,
  CompoundMessageInfo, ParsedBarcode, ParsedSegment, UdiDeviceIdentifier,
  UdiDonationIdentificationNumber, UdiResult,
} from './types.js';

const DIN_ALPHANUMERIC = /[A-NP-Z1-9]/;
const NON_ICCBBA_LOWERCASE = /[a-z]/;
// DIN [001] FIN(D) chars 2-3 (ST-017 §3.1 `pppp`, first 2 chars) — excludes `O`.
const DIN_FIN_REST_ALPHA = /^[A-NP-Z0-9]{2}$/;
// DIN [001] FIN(D) chars 4-5 / year / sequence (ST-017 §3.1) — numeric only.
const DIN_NUMERIC = /^[0-9]+$/;

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
    if (!DIN_FIN_REST_ALPHA.test(content.slice(1, 3)) || !DIN_NUMERIC.test(content.slice(3, 13))) {
      fail('INVALID_CHARACTER_SET', contentStart, 'DIN [001] content contains characters outside its declared character set');
    }
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
    if (!spec.retired && spec.validate && !spec.validate(content)) {
      fail('INVALID_CHARACTER_SET', contentStart, `${spec.name} [${spec.number}] content contains characters outside its declared character set`);
    }
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
  if (!spec.retired && spec.validate && !spec.validate(content)) {
    fail('INVALID_CHARACTER_SET', contentStart, `${spec.name} [${spec.number}] content contains characters outside its declared character set`);
  }
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

function getSegmentFields(segments: ParsedSegment[], number: string): Record<string, unknown> | undefined {
  return segments.find((s) => s.dataStructureNumber === number)?.fields;
}

function buildConvenienceAccessors(result: ParsedBarcode): void {
  const byNumber = (n: string): Record<string, unknown> | undefined => getSegmentFields(result.segments, n);
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

function decodeDeviceIdentifier(segments: ParsedSegment[]): UdiDeviceIdentifier | null {
  const segment = segments.find((s) => s.dataStructureNumber === '034');
  if (!segment) return null;
  const fields = segment.fields;
  return {
    facilityIdentificationNumberOfProcessor: fields.facilityIdentificationNumberOfProcessor as string,
    facilityDefinedProductCode: fields.facilityDefinedProductCode as string,
    productDescriptionCode: fields.productDescriptionCode as string,
    raw: segment.dataIdentifier + segment.rawContent,
  };
}

const PI_SEGMENT_NUMBERS = ['001', '032', '004', '008', '035'];

function buildProductionIdentifiersRaw(segments: ParsedSegment[]): string | undefined {
  const raw = segments
    .filter((s) => s.dataStructureNumber !== null && PI_SEGMENT_NUMBERS.includes(s.dataStructureNumber))
    .map((s) => s.dataIdentifier + s.rawContent)
    .join('');
  return raw.length === 0 ? undefined : raw;
}

function decodeDonationIdentificationNumber(segments: ParsedSegment[]): UdiDonationIdentificationNumber | undefined {
  const fields = getSegmentFields(segments, '001');
  if (!fields) return undefined;
  return {
    facilityIdentificationNumber: fields.facilityIdentificationNumber as string,
    year: fields.year as string,
    sequenceNumber: fields.sequenceNumber as string,
    donationIdentificationNumber: fields.donationIdentificationNumber as string,
    flagCharacters: fields.flagCharacters as string,
    flagMeaning: fields.flagMeaning as string,
    isChecksumFlag: fields.isChecksumFlag as boolean,
    checksumValid: fields.checksumValid as boolean | null,
  };
}

function decodeSegmentString(segments: ParsedSegment[], number: string, key: string): string | undefined {
  const fields = getSegmentFields(segments, number);
  return fields ? (fields[key] as string) : undefined;
}

function decodeSegmentDate(segments: ParsedSegment[], number: string): Date | undefined {
  const fields = getSegmentFields(segments, number);
  return fields ? new Date(fields.date as string) : undefined;
}

/**
 * Parses a barcode and reshapes the result into ST-017's UDI grouping: a single Device Identifier
 * (DS034) plus its Production Identifiers (DS001/032/004/008/035). Throws the same way `parse()`
 * does for structurally invalid input. `DI` is `null` when the barcode has no Processor Product
 * Identification Code [034] segment.
 */
export function parseUdi(barcode: string): UdiResult {
  const result = parse(barcode);
  return {
    raw: barcode,
    DI: decodeDeviceIdentifier(result.segments),
    PI: {
      donationIdentificationNumber: decodeDonationIdentificationNumber(result.segments),
      productDivisions: decodeSegmentString(result.segments, '032', 'divisionCode'),
      expirationDate: decodeSegmentDate(result.segments, '004'),
      productionDate: decodeSegmentDate(result.segments, '008'),
      lotNumber: decodeSegmentString(result.segments, '035', 'lotNumber'),
      raw: buildProductionIdentifiersRaw(result.segments),
    },
  };
}

function failBuild(reason: string, field: string, message: string): never {
  throw new Isbt128BuildError(message, field, reason);
}

function requireLength(value: string, length: number, field: string): void {
  if (value.length !== length) {
    failBuild('INVALID_LENGTH', field, `Must be exactly ${length} characters, got ${value.length}`);
  }
}

function requireAlphabet(value: string, pattern: RegExp, field: string): void {
  if (!pattern.test(value)) {
    failBuild('INVALID_CHARACTER_SET', field, `'${value}' contains characters outside its declared character set`);
  }
}

function encodeDeviceIdentifier(di: BuildUdiDeviceIdentifierInput): string {
  requireLength(di.facilityIdentificationNumberOfProcessor, 5, 'DI.facilityIdentificationNumberOfProcessor');
  requireLength(di.facilityDefinedProductCode, 6, 'DI.facilityDefinedProductCode');
  requireLength(di.productDescriptionCode, 5, 'DI.productDescriptionCode');
  requireAlphabet(di.facilityIdentificationNumberOfProcessor, FIN_P_CHARSET, 'DI.facilityIdentificationNumberOfProcessor');
  requireAlphabet(di.facilityDefinedProductCode, FPC_CHARSET, 'DI.facilityDefinedProductCode');
  requireAlphabet(di.productDescriptionCode, PDC_CHARSET, 'DI.productDescriptionCode');
  return `=/${di.facilityIdentificationNumberOfProcessor}${di.facilityDefinedProductCode}${di.productDescriptionCode}`;
}

function encodeDonationIdentificationNumber(din: BuildUdiDonationIdentificationNumberInput): string {
  requireLength(din.facilityIdentificationNumber, 5, 'PI.donationIdentificationNumber.facilityIdentificationNumber');
  requireLength(din.year, 2, 'PI.donationIdentificationNumber.year');
  requireLength(din.sequenceNumber, 6, 'PI.donationIdentificationNumber.sequenceNumber');
  requireAlphabet(din.facilityIdentificationNumber.slice(0, 1), DIN_ALPHANUMERIC, 'PI.donationIdentificationNumber.facilityIdentificationNumber');
  requireAlphabet(din.facilityIdentificationNumber.slice(1, 3), DIN_FIN_REST_ALPHA, 'PI.donationIdentificationNumber.facilityIdentificationNumber');
  requireAlphabet(din.facilityIdentificationNumber.slice(3, 5), DIN_NUMERIC, 'PI.donationIdentificationNumber.facilityIdentificationNumber');
  requireAlphabet(din.year, DIN_NUMERIC, 'PI.donationIdentificationNumber.year');
  requireAlphabet(din.sequenceNumber, DIN_NUMERIC, 'PI.donationIdentificationNumber.sequenceNumber');
  const din13 = `${din.facilityIdentificationNumber}${din.year}${din.sequenceNumber}`;
  const flag = din.flagCharacters ?? calculateDinType3Flag(din13);
  requireLength(flag, 2, 'PI.donationIdentificationNumber.flagCharacters');
  return `=${din13}${flag}`;
}

function encodeProductDivisions(divisionCode: string): string {
  requireLength(divisionCode, 6, 'PI.productDivisions');
  requireAlphabet(divisionCode, PRODUCT_DIVISIONS_CHARSET, 'PI.productDivisions');
  return `=,${divisionCode}`;
}

function encodeLotNumber(lotNumber: string): string {
  requireLength(lotNumber, 18, 'PI.lotNumber');
  requireAlphabet(lotNumber, LOT_NUMBER_CHARSET, 'PI.lotNumber');
  return `&,1${lotNumber}`;
}

/**
 * Encodes a UDI (Device Identifier + Production Identifiers) into an ISBT 128 Compound Message
 * barcode string — the inverse of `parseUdi()`. Throws `Isbt128BuildError` if any field is
 * missing or the wrong fixed length.
 */
export function buildUdi(input: BuildUdiInput): string {
  const segments = [
    encodeDeviceIdentifier(input.DI),
    encodeDonationIdentificationNumber(input.PI.donationIdentificationNumber),
    encodeProductDivisions(input.PI.productDivisions),
  ];
  if (input.PI.expirationDate) segments.push(`=>${encodeCyyjjj(input.PI.expirationDate)}`);
  if (input.PI.productionDate) segments.push(`=}${encodeCyyjjj(input.PI.productionDate)}`);
  if (input.PI.lotNumber) segments.push(encodeLotNumber(input.PI.lotNumber));

  return `=+${String(segments.length).padStart(2, '0')}000${segments.join('')}`;
}

export { calculateDinCheckCharacter } from './checksum.js';
