/**
 * Reference tables reproduced from ST-001 §3.1 (embedded in the standard document, not requiring
 * ICCBBA's externally-hosted licensed databases). See README.md for the fully-decoded vs.
 * raw-code-only policy.
 */

/** Table 3 — DIN flag characters `ff` [RT004] (ST-001 §3.1). */
export function describeDinFlag(ff: string): string {
  const value = Number(ff);
  if (ff === '00') return 'Flag not used; null value';
  if (!Number.isNaN(value)) {
    if (value >= 1 && value <= 4) return `Container ${value} of a set`;
    if (value === 5) return 'Second (or repeated) "demand-printed" label';
    if (value === 6) return 'Pilot tube label';
    if (value === 7) return 'Test tube label';
    if (value === 8) return 'Donor record label';
    if (value === 9) return 'Sample tube for NAT testing';
    if (value === 10) return 'Samples for bacterial testing';
    if (value === 11) return 'Match with Unit label';
    if (value === 12) return 'Affixed partial label';
    if (value === 13) return 'Attached label (intended to be used with affixed partial label)';
    if (value === 14) return 'Reserved for future assignment';
    if (value >= 15 && value <= 19) return `Container ${value - 14 + 4} of a set`;
    if (value >= 20 && value <= 59) return 'Reserved for assignment/use by the local facility (FIN-specific meaning)';
    if (value >= 60 && value <= 96) return 'ISO/IEC 7064 modulus 37-2 check character on the preceding 13 DIN characters';
    if (value >= 97 && value <= 99) return 'Reserved for future assignment';
  }
  return 'Reserved for future assignment';
}

export function isDinChecksumFlag(ff: string): boolean {
  const value = Number(ff);
  return !Number.isNaN(value) && value >= 60 && value <= 96;
}

/** Table 4 — Blood Groups [ABO and RhD], including type-of-collection column [RT005] (ST-001 §3.1). */
const BLOOD_GROUP_GG: Record<string, string> = {
  '95': 'O RhD negative', '51': 'O RhD positive',
  '06': 'A RhD negative', '62': 'A RhD positive',
  '17': 'B RhD negative', '73': 'B RhD positive',
  '28': 'AB RhD negative', '84': 'AB RhD positive',
  '55': 'O (collection use unspecified)', '66': 'A (collection use unspecified)',
  '77': 'B (collection use unspecified)', '88': 'AB (collection use unspecified)',
  D6: 'para-Bombay, RhD negative', E6: 'para-Bombay, RhD positive',
  G6: 'Bombay, RhD negative', H6: 'Bombay, RhD positive',
  I6: 'O para-Bombay, RhD negative', J6: 'O para-Bombay, RhD positive',
  K6: 'A para-Bombay, RhD negative', L6: 'B para-Bombay, RhD negative',
  M6: 'AB para-Bombay, RhD negative', N6: 'A para-Bombay, RhD positive',
  O6: 'B para-Bombay, RhD positive', Q6: 'AB para-Bombay, RhD positive',
  A0: 'Group A, Pooled RhD', B0: 'Group B, Pooled RhD', C0: 'Group AB, Pooled RhD [Pooled Products]',
  D0: 'Group O, Pooled RhD', E0: 'Pooled ABO, RhD Positive', F0: 'Pooled ABO, RhD Negative',
  G0: 'Pooled ABO, Pooled RhD', H0: 'Pooled ABO (RhD not specified)',
  I0: 'A1', J0: 'A2', K0: 'A1B', L0: 'A2B',
};

/** Table 5 — Data Structure 002 Special Messages [RT006] (ST-001 §3.1). */
const SPECIAL_MESSAGES_GG: Record<string, string> = {
  '00': 'No ABO or Rh information is available',
  Ma: 'Autologous collection', Mb: 'Biohazardous', Md: 'Discard (to be destroyed)',
  Mf: 'For fractionation use only', Mq: 'Quarantine/hold for further testing or processing',
  Mr: 'For research use only', Mx: 'Not for transfusion based on test results',
  T1: 'ABO not specified, RhD positive (tissue only)', T2: 'ABO not specified, RhD negative (tissue only)',
  T3: 'ABO not specified, RhD not specified (tissue only)', T4: 'Autologous collection/in quarantine (tissue only)',
  T5: 'See outer packaging for product status (tissue only)', T6: 'Must be sterilized before release (tissue only)',
};

/** Blood Groups [002] `gg` field: resolves to an ABO/RhD blood group or a special message (Tables 4 & 5). */
export function describeBloodGroupGg(gg: string): { kind: 'blood-group' | 'special-message' | 'unknown'; description: string } {
  if (gg in BLOOD_GROUP_GG) return { kind: 'blood-group', description: BLOOD_GROUP_GG[gg] };
  if (gg in SPECIAL_MESSAGES_GG) return { kind: 'special-message', description: SPECIAL_MESSAGES_GG[gg] };
  return { kind: 'unknown', description: `Unrecognized code '${gg}'` };
}

/**
 * Table 6 — Rh, Kell, and Mia/Mur Phenotypes [RT007] (ST-001 §3.1). Maps the Blood Groups [002]
 * `r` field to Kell antibody test result plus C/c/E/e phenotype (or Mia/Mur result for U/V).
 */
const RH_KELL_MIA_R: Record<string, { kell: string; c: string; cLower: string; e: string; eLower: string } | { mia: string } | { special: string }> = {
  '0': { kell: 'No Information', c: 'No Information', cLower: 'No Information', e: 'No Information', eLower: 'No Information' },
  '1': { kell: 'Negative', c: 'negative', cLower: 'positive', e: 'negative', eLower: 'positive' },
  '2': { kell: 'Positive', c: 'positive', cLower: 'positive', e: 'negative', eLower: 'positive' },
  '3': { kell: 'Negative', c: 'positive', cLower: 'positive', e: 'positive', eLower: 'positive' },
  '4': { kell: 'Positive', c: 'positive', cLower: 'positive', e: 'positive', eLower: 'negative' },
  '5': { kell: 'Negative', c: 'negative', cLower: 'positive', e: 'positive', eLower: 'positive' },
  '6': { kell: 'Positive', c: 'negative', cLower: 'positive', e: 'positive', eLower: 'negative' },
  '7': { kell: 'Negative', c: 'positive', cLower: 'negative', e: 'negative', eLower: 'positive' },
  '8': { kell: 'Positive', c: 'positive', cLower: 'negative', e: 'positive', eLower: 'positive' },
  '9': { kell: 'Negative', c: 'positive', cLower: 'negative', e: 'positive', eLower: 'negative' },
  X: { kell: 'Positive', c: 'negative', cLower: 'No Information', e: 'negative', eLower: 'No Information' },
  U: { mia: 'negative' },
  V: { mia: 'positive' },
  W: { special: 'Special Testing bar code present and must be scanned and interpreted' },
};
export function describeRhKellMia(r: string): unknown {
  return RH_KELL_MIA_R[r] ?? { unknown: `Unrecognized code '${r}'` };
}

/** Table 7 — Type of Collection, Product Code [003] position 6 `t` [RT008] (ST-001 §3.1). */
const COLLECTION_TYPE: Record<string, string> = {
  '0': 'Not specified (null value)',
  V: 'Volunteer homologous (allogeneic) (default)',
  R: 'Volunteer research (product not intended for human application)',
};
export function describeCollectionType(t: string): string {
  return COLLECTION_TYPE[t] ?? `Unrecognized/product-family-specific code '${t}'`;
}

/** Table 19 — Dimensions Symbols [RT037] (ST-001 §3.1, Data Structure 029). */
const DIMENSION_SYMBOLS: Record<string, string> = {
  '01': 'Dimension is equal to the expressed value within a tolerance defined by the facility',
  '02': 'Dimension is greater than the expressed value',
  '03': 'Dimension is greater than or equal to the expressed value',
  '04': 'Dimension is less than the expressed value',
  '05': 'Dimension is less than or equal to the expressed value',
  '06': 'Dimension is the nominal value as defined within a circular of information/package insert',
};
export function describeDimensionSymbol(aa: string): string {
  return DIMENSION_SYMBOLS[aa] ?? `Unrecognized symbol code '${aa}'`;
}

/** Table 20 — Dimensions [RT038] (ST-001 §3.1, Data Structure 029). */
const DIMENSION_UNITS: Record<string, { unit: string; description: string }> = {
  '0001': { unit: 'mL', description: 'Volume of the associated product including anticoagulant/additive' },
  '0002': { unit: 'mm', description: 'Length of the associated product' },
  '0003': { unit: 'mm', description: 'Width of the associated product' },
  '0004': { unit: 'mm', description: 'Height of the associated product' },
  '0005': { unit: 'mm', description: 'Particle size of the associated product' },
  '0006': { unit: 'cm²', description: 'Area of the associated product' },
  '0007': { unit: '1E9', description: 'Total number of platelets in the container' },
  '0008': { unit: 'g', description: 'Weight of associated product excluding container, including anticoagulant/additive' },
  '0009': { unit: 'g', description: 'Tare weight of container' },
  '0010': { unit: 'g', description: 'Tare weight of container and attached tubing' },
  '0011': { unit: 'rings', description: 'Length of trachea expressed in number of rings' },
};
export function describeDimensionUnit(bbbb: string): { unit: string; description: string } {
  return DIMENSION_UNITS[bbbb] ?? { unit: 'unknown', description: `Unrecognized dimension code '${bbbb}'` };
}

/** Table 21 — Dimensions Decimal Point [RT039] (ST-001 §3.1, Data Structure 029). */
export function applyDimensionDecimalPoint(ccccc: string, d: string): string {
  const digits = ccccc;
  switch (d) {
    case '0': return digits;
    case '1': return `${digits.slice(0, 4)}.${digits.slice(4)}`;
    case '2': return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    case '3': return `${digits.slice(0, 2)}.${digits.slice(2)}`;
    case '4': return `${digits.slice(0, 1)}.${digits.slice(1)}`;
    case '5': return `.${digits}`;
    default: return digits;
  }
}

/** Table 22 — RBC Serological Results [RT040] (ST-001 §3.1, Data Structure 030). */
const RBC_SEROLOGICAL_RESULT: Record<string, string> = {
  '01': 'Negative – Test methodology not specified',
  '02': 'Positive – Test methodology not specified',
  '03': 'Negative – Serological testing',
  '04': 'Positive – Serological testing',
  '05': 'Negative – Predicted phenotype based on genotyping',
  '06': 'Positive – Predicted phenotype based on genotyping',
};
export function describeRbcSerologicalResult(rr: string): string {
  return RBC_SEROLOGICAL_RESULT[rr] ?? `Unrecognized result code '${rr}'`;
}

/** Table 23 — Number of Tests [RT041] (ST-001 §3.1, Data Structure 030). */
const NUMBER_OF_TESTS: Record<string, string> = {
  '01': 'Tested once on this collection',
  '02': 'Tested once on prior collection',
  '03': 'Tested ≥ twice on different collections (current and historic) with concordant results',
  '04': 'Tested ≥ twice on different collections (historic only) with concordant results',
  '05': 'Tested ≥ twice on this collection only, different samples, with concordant results',
  '06': 'Test history not specified',
};
export function describeNumberOfTests(ss: string): string {
  return NUMBER_OF_TESTS[ss] ?? `Unrecognized code '${ss}'`;
}

/** Table 24 — Time Zone [RT045] (ST-001 §3.1, Data Structure 031). */
const TIME_ZONE: Record<string, string> = {
  '1': 'Local time zone of facility assigning the date',
  '2': 'Coordinated Universal Time (UTC)',
};
export function describeTimeZone(z: string): string {
  return TIME_ZONE[z] ?? `Unrecognized code '${z}'`;
}

/** Table 25 — Type of Time [RT046] (ST-001 §3.1, Data Structure 031). */
const TYPE_OF_TIME: Record<string, string> = {
  '01': 'Expiration date and time',
  '02': 'Collection date and time',
  '03': 'Production date and time',
  '04': 'Cross Clamp date and time',
  '05': 'Time of preservation',
  '06': 'Time of death of donor',
};
export function describeTypeOfTime(tt: string): string {
  return TYPE_OF_TIME[tt] ?? `Unrecognized code '${tt}'`;
}

/** ST-012 §2.2.2 — SEC Coding System Identifier (3-row table, safe to embed verbatim). */
const SEC_CODING_SYSTEM: Record<string, string> = { A: 'ISBT 128', B: 'Eurocode', E: 'EUTC (European Union Tissue Code)' };
export function describeSecCodingSystem(id: string): string {
  return SEC_CODING_SYSTEM[id] ?? `Unrecognized coding system identifier '${id}'`;
}

/**
 * Generic decoder for the paired-antigen result tables RT009 (Table 9) and RT010 (Table 10):
 * every antigen position pair (positions 2-9, and the continuation positions 10-15/16) shares
 * this same digit 0-9 legend, verified identical across every pair column in both tables.
 * Position 1 (Rh) is a distinct 10-value phenotype enumeration, not a pair (see
 * `describeRhPhenotype`).
 */
export const PAIRED_RESULT_LEGEND: Record<string, [string, string]> = {
  '0': ['nt', 'nt'], '1': ['nt', 'neg'], '2': ['nt', 'pos'],
  '3': ['neg', 'nt'], '4': ['neg', 'neg'], '5': ['neg', 'pos'],
  '6': ['pos', 'nt'], '7': ['pos', 'neg'], '8': ['pos', 'pos'],
  '9': ['ni', 'ni'],
};

/** Table 9 [RT009] position 1 — Rh phenotype enumeration (ST-001 §3.1, Data Structure 012). */
const RH_PHENOTYPE: Record<string, string> = {
  '0': 'C+c-E+e-', '1': 'C+c+E+e-', '2': 'C-c+E+e-', '3': 'C+c-E+e+', '4': 'C+c+E+e+',
  '5': 'C-c+E+e+', '6': 'C+c-E-e+', '7': 'C+c+E-e+', '8': 'C-c+E-e+', '9': 'ni',
};
export function describeRhPhenotype(value: string): string {
  return RH_PHENOTYPE[value] ?? `Unrecognized code '${value}'`;
}

/** Table 9 [RT009] positions 2-9 antigen names (ST-001 §3.1, Data Structure 012 — General). */
export const RT009_ANTIGEN_NAMES = ['K', 'k', 'Cw', 'Mia', 'M', 'N', 'S', 's', 'U', 'P1', 'Lua', 'Kpa', 'Lea', 'Leb', 'Fya', 'Fyb'];

/** Table 10 [RT010] positions 2-9 antigen names (ST-001 §3.1, Data Structure 013 — Finnish). */
export const RT010_ANTIGEN_NAMES = RT009_ANTIGEN_NAMES;

/**
 * Table 18 [RT019] (ST-001 §3.1, Data Structure 027 — TTI Marker) is **not** decoded to named
 * markers/results here. Its 18-column HTML table (in both `iccbba.md` and the source PDF) mixes
 * `colspan` header groupings with per-row value counts in a way that is internally inconsistent
 * with DS027's own prose ("only the first ten positions have been defined; positions 11-18 shall
 * be set to 0") — the same kind of merged-cell ambiguity flagged elsewhere in this project's
 * analysis of the source document. Rather than guess at a marker-to-position mapping that cannot
 * be verified against the document, `parse()` exposes DS027 structurally (18 raw digit
 * positions) without semantic decoding. See README.md for this scoping decision.
 */
