/**
 * Registry of ISBT 128 data structures with fixed-length data content (ST-001 §2.4.*).
 *
 * Data structures with variable-length content — DIN [001] (special DI rule), Compound Message
 * [023] (drives the outer scan loop), Patient Identification Number [025] (length-prefixed),
 * Dimensions [029] and Red Cell Antigens with Test History [030] (repeat-count-prefixed) — are
 * handled directly by `parser.ts` and are not present in this table.
 */
import { calculateGridChecksum } from './checksum.js';
import { decodeCyyjjj, decodeCyyjjjhhmm } from './dateUtils.js';
import {
  describeBloodGroupGg, describeRhKellMia,
  describeTimeZone, describeTypeOfTime, PAIRED_RESULT_LEGEND, RT009_ANTIGEN_NAMES,
  describeRhPhenotype,
} from './referenceTables.js';

export interface StructureSpec {
  number: string;
  name: string;
  /** Exact data identifier as it appears on the wire, e.g. "=%", "&,1". */
  di: string;
  /** Length of the data content that follows the data identifier. */
  contentLength: number;
  retired: boolean;
  reference: string;
  decode: (content: string) => Record<string, unknown>;
  /** Optional character-set check over the raw content, run before `decode`. */
  validate?: (content: string) => boolean;
}

/**
 * ST-017 §2.1/§3.2/§3.5 character-set constraints for the UDI-relevant fixed structures.
 * `O` is excluded from FIN(P) (§2.1) to avoid confusion with digit `0`.
 */
export const FIN_P_CHARSET = /^[A-NP-Z0-9]{5}$/;
export const FPC_CHARSET = /^[A-Z0-9]{6}$/;
export const PDC_CHARSET = /^[A-Z0-9]{5}$/;
export const PRODUCT_DIVISIONS_CHARSET = /^[A-Z0-9]{6}$/;
export const LOT_NUMBER_CHARSET = /^[A-Z0-9]{18}$/;

/** ST-001 §3.1 Table 2 — Product Description Code family selector `α` (Data Structure 003). */
const PRODUCT_FAMILY: Record<string, string> = {
  E: 'Blood Components', F: 'Blood Components',
  H: 'MPHO with INN and/or USAN names',
  M: 'Other Therapies (Human Milk / Topical Products of Human Origin)',
  N: 'Organs', P: 'Regenerated Tissue', R: 'Reproductive Tissue and Cell products',
  S: 'Cellular Therapy products', T: 'Tissue products', V: 'Ocular Tissue products',
  W: 'Fecal Microbiota', X: 'Other Blood products (Plasma Derivatives / In Vivo Diagnostic MPHO)',
  Y: 'Clinical Trials products',
};
function productFamily(alpha: string): string {
  if (alpha in PRODUCT_FAMILY) return PRODUCT_FAMILY[alpha];
  if (alpha >= 'A' && alpha <= 'D') return 'National or Local/Facility codes';
  return 'Unrecognized';
}

/** ST-001 §2.4.17 — container identification character `b` (Data Structure 017). */
function describeContainerIdChar(b: string): string {
  if (b === '1') return 'Primary collection container';
  if (b === 'y') return 'Entire set of integrally attached containers';
  if (b === 'z') return 'Carton containing blood collection containers';
  if (/[0-9A-Z]/.test(b)) return 'Facility/manufacturer-defined container identifier';
  return 'Reserved for future use';
}

/**
 * Decodes one antigen-pair position (RT009/RT010, positions 2-9) into named results using the
 * shared pair legend (see `PAIRED_RESULT_LEGEND`).
 */
function decodeAntigenPair(value: string, nameA: string, nameB: string): Record<string, string> {
  const [a, b] = PAIRED_RESULT_LEGEND[value] ?? ['unknown', 'unknown'];
  return { [nameA]: a, [nameB]: b };
}

/** Shared decoder for Data Structures 012/013 (RBC Antigens — General/Finnish, §2.4.12/§2.4.13). */
function decodeRbcAntigens(content: string): Record<string, unknown> {
  const rhValue = content[0];
  const fields: Record<string, unknown> = {
    rhPhenotypeCode: rhValue,
    rhPhenotype: describeRhPhenotype(rhValue),
  };
  // Positions 2-9: four antithetical antigen pairs, digit-legend decoded (ST-001 §3.1 Table 9/10).
  for (let i = 0; i < 8; i += 2) {
    const posValue = content[1 + i / 2];
    Object.assign(fields, decodeAntigenPair(posValue, RT009_ANTIGEN_NAMES[i], RT009_ANTIGEN_NAMES[i + 1]));
  }
  // Positions 10-16: further antigen pairs whose exact names are ambiguous in the source table's
  // merged-cell continuation (see README.md); the pos/neg/nt/ni legend itself is unambiguous.
  const continuationPairs: Array<[string, string]> = [];
  for (let i = 9; i < 16; i += 1) {
    const posValue = content[i];
    const [a, b] = PAIRED_RESULT_LEGEND[posValue] ?? ['unknown', 'unknown'];
    continuationPairs.push([a, b]);
  }
  fields.additionalAntigenPositions = continuationPairs.map(([a, b], idx) => ({ position: idx + 10, resultA: a, resultB: b }));
  fields.positions17And18 = content.slice(16, 18);
  return fields;
}

export const FIXED_STRUCTURES: StructureSpec[] = [
  {
    number: '002', name: 'Blood Groups [ABO and RhD]', di: '=%', contentLength: 4, retired: false, reference: 'ST-001 §2.4.2',
    decode: (c) => {
      const gg = c.slice(0, 2), r = c[2], e = c[3];
      return { gg, ...describeBloodGroupGg(gg), r, phenotype: describeRhKellMia(r), reservedForFutureUse: e };
    },
  },
  {
    number: '003', name: 'Product Code', di: '=<', contentLength: 8, retired: false, reference: 'ST-001 §2.4.3',
    decode: (c) => {
      const alpha = c[0], oooo = c.slice(1, 5), t = c[5], d = c[6], s = c[7];
      return {
        productDescriptionCodeFamily: alpha, productFamilyDescription: productFamily(alpha),
        productDescriptionCode: alpha + oooo, collectionTypeOrDivisionRaw: `${t}${d}${s}`,
        usesProductDivisions: d + s === '99',
      };
    },
  },
  { number: '004', name: 'Expiration Date', di: '=>', contentLength: 6, retired: false, reference: 'ST-001 §2.4.4', decode: decodeCyyjjj },
  { number: '005', name: 'Expiration Date and Time', di: '&>', contentLength: 10, retired: false, reference: 'ST-001 §2.4.5', decode: decodeCyyjjjhhmm },
  { number: '006', name: 'Collection Date', di: '=*', contentLength: 6, retired: false, reference: 'ST-001 §2.4.6', decode: decodeCyyjjj },
  { number: '007', name: 'Collection Date and Time', di: '&*', contentLength: 10, retired: false, reference: 'ST-001 §2.4.7', decode: decodeCyyjjjhhmm },
  { number: '008', name: 'Production Date', di: '=}', contentLength: 6, retired: false, reference: 'ST-001 §2.4.8', decode: decodeCyyjjj },
  { number: '009', name: 'Production Date and Time', di: '&}', contentLength: 10, retired: false, reference: 'ST-001 §2.4.9', decode: decodeCyyjjjhhmm },
  {
    number: '010', name: 'Special Testing: General', di: '&(', contentLength: 5, retired: false, reference: 'ST-001 §2.4.10',
    decode: (c) => ({ code: c, note: 'Raw code only — resolved via the ICCBBA password-protected Special Testing database (RT029), not embedded in the standard document.' }),
  },
  {
    number: '011', name: 'Special Testing: Red Blood Cell Antigens', di: '={', contentLength: 18, retired: true, reference: 'ST-001 §2.4.11',
    decode: () => ({}),
  },
  { number: '012', name: 'Special Testing: Red Blood Cell Antigens — General', di: '=\\', contentLength: 18, retired: false, reference: 'ST-001 §2.4.12', decode: decodeRbcAntigens },
  { number: '013', name: 'Special Testing: Red Blood Cell Antigens — Finnish', di: '&\\', contentLength: 18, retired: false, reference: 'ST-001 §2.4.13', decode: decodeRbcAntigens },
  {
    number: '014', name: 'Special Testing: Platelet HLA and Platelet Specific Antigens', di: '&{', contentLength: 18, retired: false, reference: 'ST-001 §2.4.14',
    decode: (c) => ({
      hlaA: [c.slice(0, 2), c.slice(2, 4)],
      hlaB: [c.slice(4, 6), c.slice(6, 8)],
      plateletSpecificAntigensRaw: c.slice(8, 16),
      reservedForFutureUse: c[16],
      highTiteredAntiABInfoRaw: c[17],
      note: 'HLA-A/-B and platelet-specific antigen codes are raw — resolved via Table 14/15/44 [RT013/RT014/RT044], reproduced here only structurally due to source-table ambiguity (see README.md).',
    }),
  },
  { number: '015', name: 'Special Testing: HLA-A and -B Alleles', di: '=[', contentLength: 18, retired: true, reference: 'ST-001 §2.4.15', decode: () => ({}) },
  { number: '016', name: 'Special Testing: HLA-DRB1 Alleles', di: '="', contentLength: 18, retired: true, reference: 'ST-001 §2.4.16', decode: () => ({}) },
  {
    number: '017', name: 'Container Manufacturer and Catalog Number', di: '=)', contentLength: 10, retired: false, reference: 'ST-001 §2.4.17',
    decode: (c) => ({
      containerIdentificationCharacter: c[0], containerIdentificationDescription: describeContainerIdChar(c[0]),
      manufacturerCode: c.slice(1, 3), catalogNumber: c.slice(3, 10),
    }),
  },
  { number: '018', name: 'Container Lot Number', di: '&)', contentLength: 10, retired: false, reference: 'ST-001 §2.4.18', decode: (c) => ({ lotNumber: c }) },
  {
    number: '019', name: 'Donor Identification Number', di: '=;', contentLength: 21, retired: false, reference: 'ST-001 §2.4.19',
    decode: (c) => ({ facilityIdentificationNumber: c.slice(0, 5), sequenceNumber: c.slice(5, 21) }),
  },
  {
    number: '020', name: 'Staff Member Identification Number', di: "='", contentLength: 11, retired: false, reference: 'ST-001 §2.4.20',
    decode: (c) => ({ facilityIdentificationNumber: c.slice(0, 5), staffMemberId: c.slice(5, 11) }),
  },
  {
    number: '021', name: 'Manufacturer and Catalog Number: Items Other Than Containers', di: '=-', contentLength: 10, retired: false, reference: 'ST-001 §2.4.21',
    decode: (c) => ({ manufacturerCode: c.slice(0, 2), catalogNumber: c.slice(2, 10) }),
  },
  { number: '022', name: 'Lot Number: Items Other Than Containers', di: '&-', contentLength: 10, retired: false, reference: 'ST-001 §2.4.22', decode: (c) => ({ lotNumber: c }) },
  {
    number: '023', name: 'Compound Message', di: '=+', contentLength: 5, retired: false, reference: 'ST-001 §2.4.23',
    decode: (c) => ({ declaredCount: Number(c.slice(0, 2)), sequenceCode: c.slice(2, 5), isSpecifiedSequence: c.slice(2, 5) !== '000' }),
  },
  {
    number: '024', name: 'Patient Date of Birth', di: '=#', contentLength: 10, retired: false, reference: 'ST-001 §2.4.24',
    decode: (c) => ({
      locationCode: c.slice(0, 2),
      dateOfBirth: `${c.slice(2, 6)}-${c.slice(6, 8)}-${c.slice(8, 10)}`,
    }),
  },
  {
    number: '026', name: 'Expiration Month and Year', di: '=]', contentLength: 6, retired: false, reference: 'ST-001 §2.4.26',
    decode: (c) => ({ expirationYear: c.slice(0, 4), expirationMonth: c.slice(4, 6), expirationYearMonth: `${c.slice(0, 4)}-${c.slice(4, 6)}` }),
  },
  {
    number: '028', name: 'Product Consignment', di: '=$', contentLength: 16, retired: false, reference: 'ST-001 §2.4.28',
    decode: (c) => ({
      facilityIdentificationNumber: c.slice(0, 5), year: c.slice(5, 7), serialNumber: c.slice(7, 12),
      containerNumber: c.slice(12, 14), totalContainersInConsignment: c.slice(14, 16),
    }),
  },
  {
    number: '031', name: 'Flexible Date and Time', di: '=(', contentLength: 16, retired: false, reference: 'ST-001 §2.4.31',
    decode: (c) => ({
      timeZoneCode: c[0], timeZone: describeTimeZone(c[0]),
      reservedForFutureUse: c[1],
      typeOfTimeCode: c.slice(2, 4), typeOfTime: describeTypeOfTime(c.slice(2, 4)),
      date: `${c.slice(4, 8)}-${c.slice(8, 10)}-${c.slice(10, 12)}`,
      time: `${c.slice(12, 14)}:${c.slice(14, 16)}`,
    }),
  },
  {
    number: '032', name: 'Product Divisions', di: '=,', contentLength: 6, retired: false, reference: 'ST-001 §2.4.32',
    decode: (c) => ({ divisionCode: c }),
    validate: (c) => PRODUCT_DIVISIONS_CHARSET.test(c),
  },
  {
    number: '033', name: 'Processing Facility Information Code', di: '&+', contentLength: 11, retired: false, reference: 'ST-001 §2.4.33',
    decode: (c) => ({ facilityIdentificationNumberOfProcessor: c.slice(0, 5), facilityDefinedProductCode: c.slice(5, 11) }),
  },
  {
    number: '034', name: 'Processor Product Identification Code', di: '=/', contentLength: 16, retired: false, reference: 'ST-001 §2.4.34',
    decode: (c) => ({
      facilityIdentificationNumberOfProcessor: c.slice(0, 5), facilityDefinedProductCode: c.slice(5, 11),
      productDescriptionCode: c.slice(11, 16),
    }),
    validate: (c) => FIN_P_CHARSET.test(c.slice(0, 5)) && FPC_CHARSET.test(c.slice(5, 11)) && PDC_CHARSET.test(c.slice(11, 16)),
  },
  {
    number: '035', name: 'MPHO Lot Number', di: '&,1', contentLength: 18, retired: false, reference: 'ST-001 §2.4.35',
    decode: (c) => ({ lotNumber: c }),
    validate: (c) => LOT_NUMBER_CHARSET.test(c),
  },
  { number: '036', name: 'MPHO Supplemental Identification Number', di: '&,2', contentLength: 18, retired: false, reference: 'ST-001 §2.4.36', decode: (c) => ({ supplementalId: c }) },
  { number: '037', name: 'Global Registration Identifier for Donors', di: '&,3', contentLength: 19, retired: true, reference: 'ST-001 §2.4.37', decode: () => ({}) },
  {
    number: '039', name: 'Global Registration Identifier for Donors', di: '&:', contentLength: 19, retired: false, reference: 'ST-001 §2.4.39',
    decode: (c) => {
      const prefix = c.slice(0, 17), bb = c.slice(17, 19);
      return {
        issuingOrganizationNumber: c.slice(0, 4), registrationDonorIdentifier: c.slice(4, 17),
        checksum: bb, checksumValid: calculateGridChecksum(prefix) === bb,
      };
    },
  },
  {
    number: '040', name: 'Chain of Identity Identifier', di: '&/', contentLength: 15, retired: false, reference: 'ST-001 §2.4.40',
    decode: (c) => ({
      literal: c.slice(0, 2), facilityIdentificationNumber: c.slice(2, 7), year: c.slice(7, 9), sequenceNumber: c.slice(9, 15),
    }),
  },
];

export const FIXED_STRUCTURES_BY_DI: Map<string, StructureSpec> = new Map(FIXED_STRUCTURES.map((s) => [s.di, s]));
