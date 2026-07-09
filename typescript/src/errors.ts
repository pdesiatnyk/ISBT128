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
