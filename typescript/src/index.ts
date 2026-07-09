/**
 * @iccbba/isbt128-parser — ICCBBA/ISBT 128 barcode parser.
 *
 * Primary entry points: `check()` and `parse()`. See README.md for scope and the standard
 * documents this implementation is derived from.
 */
export { check, parse, parseUdi } from './parser.js';
export { Isbt128ParseError } from './errors.js';
export type {
  ParsedBarcode, ParsedSegment, CompoundMessageInfo, UdiResult, UdiProductionIdentifiers,
  UdiDeviceIdentifier, UdiDonationIdentificationNumber,
} from './types.js';

export {
  calculateDinCheckCharacter,
  calculateDinType3Flag,
  calculateGridChecksum,
  calculateBasicUdiDiChecksum,
  verifyBasicUdiDiChecksum,
  isoMod37_2,
} from './checksum.js';

export { decodeSecContent, parseSecText, isSecText } from './sec.js';
export type { SecFields } from './sec.js';
