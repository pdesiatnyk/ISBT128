/**
 * Single European Code (SEC) parsing — ST-012 §2.1-2.3 (eye-readable text) and §6.1 (DS038
 * electronic 40-character content, shared with ST-001 §2.4.38).
 *
 * Both representations decode to the same 40-character logical layout:
 *   Donation Identification Sequence (21 chars): ISO country code (2) + TE code (6) + unique
 *     donation number (13).
 *   Product Identification Sequence (19 chars): coding system identifier (1) + product code (7)
 *     + split number (3) + expiry date YYYYMMDD (8).
 */
import { describeSecCodingSystem } from './referenceTables.js';

export interface SecFields {
  countryIdentifier: string;
  tissueEstablishmentCode: string;
  uniqueDonationNumber: string;
  codingSystemIdentifier: string;
  codingSystem: string;
  productCode: string;
  splitNumber: string;
  expiryDate: string;
}

/** Decodes the 40-character SEC content string shared by both the eye-readable and DS038 forms. */
export function decodeSecContent(content: string): SecFields {
  if (content.length !== 40) {
    throw new RangeError(`SEC content must be exactly 40 characters, got ${content.length}`);
  }
  const countryIdentifier = content.slice(0, 2);
  const tissueEstablishmentCode = content.slice(2, 8);
  const uniqueDonationNumber = content.slice(8, 21);
  const codingSystemIdentifier = content[21];
  const productCode = content.slice(22, 29);
  const splitNumber = content.slice(29, 32);
  const rawExpiry = content.slice(32, 40);
  const expiryDate = rawExpiry === '00000000'
    ? ''
    : `${rawExpiry.slice(0, 4)}-${rawExpiry.slice(4, 6)}-${rawExpiry.slice(6, 8)}`;
  return {
    countryIdentifier, tissueEstablishmentCode, uniqueDonationNumber,
    codingSystemIdentifier, codingSystem: describeSecCodingSystem(codingSystemIdentifier),
    productCode, splitNumber, expiryDate,
  };
}

/**
 * Parses the SEC eye-readable text form (ST-012 §2.3): `SEC:` followed by the 21-character
 * donation sequence and 19-character product sequence, separated by whitespace (a single space,
 * or a line break when printed on two lines).
 */
export function parseSecText(input: string): SecFields {
  const match = /^SEC:\s*([A-Za-z0-9]{21})\s+([A-Za-z0-9]{19})\s*$/.exec(input.trim());
  if (!match) {
    throw new RangeError('Input is not a well-formed SEC eye-readable text string');
  }
  return decodeSecContent(match[1] + match[2]);
}

export function isSecText(input: string): boolean {
  return /^SEC:/i.test(input.trim());
}
