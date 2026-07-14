/** One decoded ISBT 128 (or ISBT 128-derived) data structure found within a barcode. */
export interface ParsedSegment {
  /** e.g. "001"; `null` for non-ICCBBA/unrecognized segments. */
  dataStructureNumber: string | null;
  /** Human-readable structure name, e.g. "Donation Identification Number". */
  name: string;
  /** The raw data identifier characters as scanned, e.g. "=A", "&,4". */
  dataIdentifier: string;
  /** The raw data content characters (excludes the data identifier, except DIN's shared 2nd char). */
  rawContent: string;
  /** Structure-specific decoded fields. Empty for opaque/unrecognized/retired segments. */
  fields: Record<string, unknown>;
  /** True for data structures retired by ICCBBA (recognized for compatibility, not fully decoded). */
  isRetired: boolean;
  /** True for non-ICCBBA / nationally-defined segments whose content could not be decoded. */
  isOpaque: boolean;
  /** Citation into the standard, e.g. "ST-001 §2.4.1". */
  standardReference: string;
}

export interface CompoundMessageInfo {
  /** Declared number of data structures following the Compound Message header. */
  declaredCount: number;
  /** Raw 3-digit `bbb` sequence code ("000" = unspecified sequence). */
  sequenceCode: string;
  isSpecifiedSequence: boolean;
}

/** The result of parsing a barcode data string. */
export interface ParsedBarcode {
  raw: string;
  isCompoundMessage: boolean;
  compoundMessage?: CompoundMessageInfo;
  /** True when the input was recognized as an SEC eye-readable text string (ST-012 §2.3). */
  isSecText: boolean;
  segments: ParsedSegment[];

  // --- Convenience accessors (present only when the corresponding structure occurs) ---
  donationIdentificationNumber?: Record<string, unknown>;
  productCode?: Record<string, unknown>;
  expirationDate?: Record<string, unknown>;
  productDivisions?: Record<string, unknown>;
  sec?: Record<string, unknown>;
  udi?: Record<string, unknown>;
}

/** ST-017 UDI Device Identifier: the decoded Processor Product Identification Code [034]. */
export interface UdiDeviceIdentifier {
  facilityIdentificationNumberOfProcessor: string;
  facilityDefinedProductCode: string;
  productDescriptionCode: string;
}

/** The decoded Donation Identification Number [001], as carried by a UDI Production Identifier. */
export interface UdiDonationIdentificationNumber {
  facilityIdentificationNumber: string;
  year: string;
  sequenceNumber: string;
  donationIdentificationNumber: string;
  flagCharacters: string;
  flagMeaning: string;
  isChecksumFlag: boolean;
  checksumValid: boolean | null;
}

/** ST-017 UDI Production Identifiers grouped by type. Present only when the corresponding data
 * structure occurs in the barcode. */
export interface UdiProductionIdentifiers {
  donationIdentificationNumber?: UdiDonationIdentificationNumber;
  productDivisions?: string;
  expirationDate?: Date;
  productionDate?: Date;
  lotNumber?: string;
}

/** The result of `parseUdi()`: a barcode reshaped into ST-017's UDI grouping of a single Device
 * Identifier (DS034) plus its Production Identifiers. */
export interface UdiResult {
  raw: string;
  /** `null` when the barcode has no Processor Product Identification Code [034]. */
  DI: UdiDeviceIdentifier | null;
  PI: UdiProductionIdentifiers;
}

/** Input for `buildUdi()`: the fields needed to encode a Device Identifier (DS034). All fields
 * are fixed-length per ST-001 Table 2. */
export interface BuildUdiDeviceIdentifierInput {
  facilityIdentificationNumberOfProcessor: string;
  facilityDefinedProductCode: string;
  productDescriptionCode: string;
}

/** Input for `buildUdi()`: the fields needed to encode a Donation Identification Number (DS001). */
export interface BuildUdiDonationIdentificationNumberInput {
  facilityIdentificationNumber: string;
  year: string;
  sequenceNumber: string;
  /** When omitted, auto-computed as the Type 3 mod-37,2 checksum flag (ST-001 Appendix A.2). */
  flagCharacters?: string;
}

/** Input for `buildUdi()`: ST-017 UDI Production Identifiers. `donationIdentificationNumber` and
 * `productDivisions` are mandatory (ST-017 §4.1); the rest are conditional. */
export interface BuildUdiProductionIdentifiersInput {
  donationIdentificationNumber: BuildUdiDonationIdentificationNumberInput;
  productDivisions: string;
  expirationDate?: Date;
  productionDate?: Date;
  lotNumber?: string;
}

/** Input for `buildUdi()`. */
export interface BuildUdiInput {
  DI: BuildUdiDeviceIdentifierInput;
  PI: BuildUdiProductionIdentifiersInput;
}
