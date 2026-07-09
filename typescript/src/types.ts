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
