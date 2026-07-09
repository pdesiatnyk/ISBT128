/**
 * Human-readable explanations for parsed-barcode field keys, shown in the comparison table's
 * "Explanation" column. Sourced from the field-construction logic in
 * `typescript/src/structures.ts`, `parser.ts`, `sec.ts`, `dateUtils.ts` and `referenceTables.ts`
 * (mirrored by the C# implementation) — kept alongside the parsers rather than derived at
 * runtime, since the standard doesn't expose this as data.
 */

/** Descriptions that hold regardless of which data structure the field appears in. */
const GLOBAL_FIELD_DESCRIPTIONS: Record<string, string> = {
  // Segment envelope (ParsedSegment / ParsedBarcode shape, not structure-specific decoded content).
  dataStructureNumber: 'ISBT 128 data structure number (DSxxx) this segment represents; null for non-ICCBBA segments.',
  name: 'Human-readable name of this data structure.',
  dataIdentifier: 'The data identifier (DI) characters exactly as scanned: a marker (= or &) plus one or more type characters.',
  rawContent: 'The raw, undecoded data content characters that followed the data identifier.',
  fields: 'Structure-specific decoded fields for this segment.',
  isRetired: 'True if this data structure has been retired by ICCBBA; recognized for backward compatibility but not decoded field-by-field.',
  isOpaque: 'True if this is a non-ICCBBA / nationally-defined segment whose content is not decoded, only captured raw.',
  standardReference: 'Citation into the standard (or related standard) that defines this data structure.',
  raw: 'The original, unmodified barcode data string that was parsed.',
  isCompoundMessage: 'True if the barcode is a Compound Message [DS023] wrapping multiple data structures.',
  isSecText: 'True if the input was recognized as the SEC eye-readable text form (ST-012 §2.3), rather than the electronic DS038 form.',
  segments: 'All data structures decoded from the barcode, in scan order.',
  compoundMessage: 'Compound Message [DS023] header details, present only when the barcode is a Compound Message.',
  declaredCount: 'Number of data structures the Compound Message header [DS023] declares will follow.',
  sequenceCode: 'Raw 3-digit sequence code from the Compound Message header ("000" means unspecified sequence).',
  isSpecifiedSequence: 'True if the Compound Message specifies an explicit sequence code (not "000").',

  // Reused across many structures with the same meaning each time.
  facilityIdentificationNumber: "ICCBBA-assigned Facility Identification Number (FIN) of the facility that assigned this identifier.",
  facilityIdentificationNumberOfProcessor: "ICCBBA-assigned Facility Identification Number (FIN) of the processing facility.",
  sequenceNumber: 'Facility-assigned sequence number, unique within the facility (and year, where applicable).',
  lotNumber: 'Manufacturer- or facility-assigned lot number.',
  manufacturerCode: 'ICCBBA-assigned code identifying the manufacturer.',
  catalogNumber: "Manufacturer's catalog number for the item.",
  checksum: 'Encoded check digits used to validate the preceding data.',
  checksumValid: 'Whether the encoded checksum matches a value recalculated from the preceding data.',
  reservedForFutureUse: 'Reserved by the standard for future use; not currently assigned a meaning.',
  date: 'Decoded calendar date, in ISO YYYY-MM-DD format.',
  time: 'Decoded time of day, in HH:MM format (24-hour).',
  century: 'Century digit `c`: counts whole centuries from 2000 (0 = 2000s, 1 = 2100s, ...).',
  yearInCentury: 'Two-digit year within the century (`yy`).',
  dayOfYear: 'Ordinal ("Julian") day of the year (001-366).',
  hour: 'Two-digit hour of the encoded time (00-23).',
  minute: 'Two-digit minute of the encoded time (00-59).',
  code: 'Raw reference-table code; not resolved to a description (see the structure note for why).',
  note: 'Explanatory note about why a value is left as a raw/unresolved code.',
  count: 'Number of repeated entries that follow in this variable-length structure.',
  locationCode: 'ICCBBA Location Code [RT018] identifying where this value was assigned.',
  description: "Human-readable meaning resolved from this segment's raw code.",
  productDescriptionCode: 'Family selector + 4-digit product description code; the code itself is not resolved to a description (requires ICCBBA\'s licensed database).',

  // DS002 Blood Groups [ABO and RhD]
  gg: 'Raw 2-character Blood Group / Special Message code (Table 4/5 [RT005/RT006]).',
  kind: 'Whether the `gg` code resolved to an ABO/RhD blood group or a special message code.',
  r: 'Raw Rh/Kell/Mia-Mur phenotype code (Table 6 [RT007]).',
  phenotype: 'Decoded Rh, Kell, and Mia/Mur phenotype information for the `r` code.',
  kell: 'Kell antigen result (Positive/Negative/No Information), resolved from the `r` code (Table 6 [RT007]).',
  c: 'C antigen result (positive/negative/No Information), resolved from the `r` code (Table 6 [RT007]).',
  cLower: 'c antigen result (positive/negative/No Information), resolved from the `r` code (Table 6 [RT007]).',
  e: 'E antigen result (positive/negative/No Information), resolved from the `r` code (Table 6 [RT007]).',
  eLower: 'e antigen result (positive/negative/No Information), resolved from the `r` code (Table 6 [RT007]).',
  mia: 'Mia/Mur antigen result (positive/negative), resolved from the `r` code (Table 6 [RT007]) in place of Rh/Kell for r codes U/V.',
  special: 'Special-case note for the `r` code (e.g. a Special Testing bar code is present and must be scanned separately) (Table 6 [RT007]).',
  unknown: 'Unrecognized code — no matching entry in the relevant reference table.',

  // DS003 Product Code
  productDescriptionCodeFamily: 'Product family selector character `α` (Table 2 [RT003]).',
  productFamilyDescription: 'Human-readable product family resolved from the family selector character.',
  collectionTypeOrDivisionRaw: 'Raw 3-character block combining the collection-type/division-related positions (t, d, s) of the Product Code.',
  usesProductDivisions: 'True if positions d+s equal "99", indicating this product is further identified by a Product Divisions [032] structure.',

  // DS012/013 RBC Antigens — General/Finnish
  rhPhenotypeCode: 'Raw Rh phenotype code, position 1 (Table 9 [RT009]).',
  rhPhenotype: 'Decoded Rh phenotype (C/c/E/e combination) resolved from the phenotype code.',
  K: 'Result for the Kell (K) antigen: nt = not tested, neg = negative, pos = positive, ni = no information.',
  k: 'Result for the Cellano (k) antigen: nt = not tested, neg = negative, pos = positive, ni = no information.',
  Cw: 'Result for the Cw antigen: nt = not tested, neg = negative, pos = positive, ni = no information.',
  Mia: 'Result for the Mia antigen: nt = not tested, neg = negative, pos = positive, ni = no information.',
  M: 'Result for the M antigen: nt = not tested, neg = negative, pos = positive, ni = no information.',
  N: 'Result for the N antigen: nt = not tested, neg = negative, pos = positive, ni = no information.',
  S: 'Result for the S antigen: nt = not tested, neg = negative, pos = positive, ni = no information.',
  s: 'Result for the s antigen: nt = not tested, neg = negative, pos = positive, ni = no information.',
  additionalAntigenPositions: 'Antigen pair results for positions 10-16; antigen names for this range are ambiguous in the source table, so positions are labeled generically rather than named (see project README).',
  resultA: 'First antigen result in this pair position (nt/neg/pos/ni).',
  resultB: 'Second antigen result in this pair position (nt/neg/pos/ni).',
  positions17And18: 'Raw, undecoded characters at positions 17-18 of this structure.',

  // DS014 Platelet HLA / Platelet Specific Antigens
  hlaA: 'Two HLA-A allele codes [RT013] (raw — not resolved to allele names; see project README).',
  hlaB: 'Two HLA-B allele codes [RT014] (raw — not resolved to allele names; see project README).',
  plateletSpecificAntigensRaw: 'Raw platelet-specific antigen codes [RT044] (not resolved to antigen names; see project README).',
  highTiteredAntiABInfoRaw: 'Raw high-titered anti-A/B information code.',

  // DS017 Container Manufacturer and Catalog Number
  containerIdentificationCharacter: 'Raw container identification character `b` (ST-001 §2.4.17).',
  containerIdentificationDescription: 'Human-readable meaning of the container identification character.',

  // DS019/020
  staffMemberId: 'Facility-assigned staff member identifier.',

  // DS024 Patient Date of Birth / DS025 Patient Identification Number
  dateOfBirth: "Patient's date of birth, in ISO YYYY-MM-DD format.",
  patientIdLength: 'Declared length (in characters) of the variable-length patient ID that follows.',
  patientId: 'The patient identification value itself, of the declared length.',

  // DS026 Expiration Month and Year
  expirationYear: '4-digit expiration year.',
  expirationMonth: '2-digit expiration month.',
  expirationYearMonth: 'Expiration year and month combined, in YYYY-MM format.',

  // DS028 Product Consignment
  serialNumber: 'Facility-assigned serial number for this consignment.',
  containerNumber: "This container's position number within the consignment.",
  totalContainersInConsignment: 'Total number of containers in this consignment.',

  // DS029 Dimensions
  dimensions: 'Decoded list of dimension entries.',
  symbolCode: 'Raw dimension qualifier symbol code (Table 19 [RT037]).',
  symbol: 'Human-readable meaning of the dimension qualifier symbol — e.g. equal to, greater than, less than the expressed value.',
  dimensionCode: 'Raw 4-digit code identifying which physical dimension is being expressed (Table 20 [RT038]).',
  unit: 'Unit of measure for this dimension, resolved from the dimension code.',
  dimensionDescription: 'Human-readable description of what this dimension represents, resolved from the dimension code.',
  rawValue: 'Raw, undecoded digits of the dimension value before the decimal point is applied.',
  decimalPlacesCode: 'Code indicating where to place the decimal point within the raw value (Table 21 [RT039]).',
  formattedValue: 'Dimension value with the decimal point applied, in its declared unit.',

  // DS030 RBC Antigens with Test History
  antigens: 'Decoded list of antigen test-history entries.',
  antigenCode: 'Raw antigen code for this test-history entry.',
  resultCode: 'Raw serological test result code (Table 22 [RT040]).',
  result: 'Human-readable meaning of the serological test result code.',
  numberOfTestsCode: 'Raw number-of-tests code (Table 23 [RT041]).',
  numberOfTests: 'Human-readable meaning of the number-of-tests code.',

  // DS031 Flexible Date and Time
  timeZoneCode: 'Raw time zone code (Table 24 [RT045]).',
  timeZone: 'Human-readable meaning of the time zone code.',
  typeOfTimeCode: 'Raw type-of-time code (Table 25 [RT046]) — what event this date/time represents.',
  typeOfTime: 'Human-readable meaning of the type-of-time code.',

  // DS032 Product Divisions
  divisionCode: 'Raw 6-digit division code identifying this product division.',

  // DS033/034
  facilityDefinedProductCode: 'Facility- or processor-defined product code.',

  // DS035/036 MPHO Lot / Supplemental ID
  supplementalId: 'MPHO supplemental identification value.',

  // DS039 Global Registration Identifier for Donors (GRID)
  issuingOrganizationNumber: '4-digit code identifying the organization that issued this Global Registration Identifier for Donors (GRID).',
  registrationDonorIdentifier: 'Donor-specific portion of the GRID, unique within the issuing organization.',

  // DS040 Chain of Identity Identifier
  literal: 'Fixed 2-character literal identifying this as a Chain of Identity Identifier.',

  // DS027 TTI Marker
  positions: '18 raw digit positions — not decoded to named markers/results because the source table\'s position-to-marker mapping is internally inconsistent (see project README).',

  // SEC / DS038
  countryIdentifier: 'ISO 2-character country code of the collecting/processing facility.',
  tissueEstablishmentCode: '6-character Tissue Establishment (TE) code.',
  uniqueDonationNumber: '13-character unique donation number, unique within the tissue establishment.',
  codingSystemIdentifier: 'Raw 1-character coding system identifier (ST-012 §2.2.2).',
  codingSystem: 'Human-readable coding system name resolved from the identifier (e.g. ISBT 128, Eurocode, EUTC).',
  splitNumber: 'Raw 3-character split number distinguishing this unit if the donation was split into multiple products.',
  expiryDate: 'Product expiry date, in ISO YYYY-MM-DD format (empty if encoded as all zeros).',

  // Parse error shape ({ message, position, reason }), returned instead of a parsed result.
  message: 'Human-readable description of why the barcode failed to parse, including the character offset.',
  position: 'Character offset (0-based) into the barcode string where parsing failed.',
  reason: 'Machine-readable error code (e.g. UNKNOWN_DATA_IDENTIFIER, TRUNCATED_CONTENT) identifying why parsing failed.',
};

/**
 * Overrides for field keys whose meaning depends on which data structure they appear in.
 * Keyed by `${dataStructureNumber}:${fieldKey}`.
 */
const STRUCTURE_FIELD_OVERRIDES: Record<string, string> = {
  '001:year': 'Two-digit year the donation identification number was assigned.',
  '001:donationIdentificationNumber': 'The 13-character donation identification number (facility ID + year + sequence number).',
  '001:flagCharacters': 'Raw 2-digit flag characters `ff` (Table 3 [RT004]): identifies container number, label type, or DIN check character.',
  '001:flagMeaning': 'Human-readable meaning of the flag characters, resolved from Table 3 [RT004].',
  '001:isChecksumFlag': 'True if the flag characters encode a DIN check character (ISO/IEC 7064 mod 37-2) rather than a container/label-type flag.',
  '001:checksumValid': 'Whether the encoded check character matches a value recalculated from the preceding 13 DIN characters (only meaningful when isChecksumFlag is true).',

  '010:code': "Raw 5-character Special Testing code — resolved via ICCBBA's password-protected Special Testing database (RT029), not embedded in the standard document.",

  '012:position': 'Generic position number (10-16) within the additional antigen pair results.',
  '013:position': 'Generic position number (10-16) within the additional antigen pair results.',

  '028:year': 'Two-digit year the consignment was assigned.',

  '034:productDescriptionCode': 'Product description code, part of the Processor Product Identification Code (PPIC).',

  '038:productCode': '7-character product code, meaning defined by the coding system.',

  '039:checksum': '2-character GRID checksum (mod 37,2) over the preceding 17 characters.',
  '039:checksumValid': 'Whether the encoded GRID checksum matches a value recalculated from the preceding 17 characters.',

  '040:year': 'Two-digit year this Chain of Identity identifier was assigned.',
};

function humanizeKey(key: string): string {
  const spaced = key.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
  return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase();
}

/** Looks up a human-readable explanation for a field key, using the owning data structure for disambiguation. */
export function describeField(fieldKey: string, dataStructureNumber: string | null | undefined): string {
  if (dataStructureNumber) {
    const override = STRUCTURE_FIELD_OVERRIDES[`${dataStructureNumber}:${fieldKey}`];
    if (override) return override;
  }
  return GLOBAL_FIELD_DESCRIPTIONS[fieldKey] ?? `${humanizeKey(fieldKey)}.`;
}
