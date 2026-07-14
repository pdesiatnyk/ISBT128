/** Thrown by `parse()` when a barcode string is not a structurally/semantically valid ISBT 128 message. */
export class Isbt128ParseError extends Error {
  /** Character offset within the original input where the problem was detected. */
  public readonly position: number;
  /** Short machine-readable reason code (e.g. "UNKNOWN_DATA_IDENTIFIER", "LENGTH_MISMATCH"). */
  public readonly reason: string;

  constructor(message: string, position: number, reason: string) {
    super(`${message} (at position ${position})`);
    this.name = 'Isbt128ParseError';
    this.position = position;
    this.reason = reason;
  }
}

/** Thrown by `buildUdi()` when the supplied input cannot be encoded into a structurally valid
 * ISBT 128 UDI barcode. */
export class Isbt128BuildError extends Error {
  /** Dotted path of the offending input field, e.g. "PI.DonationIdentificationNumber.Year". */
  public readonly field: string;
  /** Short machine-readable reason code (e.g. "INVALID_LENGTH"). */
  public readonly reason: string;

  constructor(message: string, field: string, reason: string) {
    super(`${message} (field ${field})`);
    this.name = 'Isbt128BuildError';
    this.field = field;
    this.reason = reason;
  }
}
