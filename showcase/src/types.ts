/** Normalized outcome shape used for both the in-browser TS parser and the C# API response. */
export interface ParseErrorInfo {
  message: string
  position: number
  reason: string
}

export type ParseOutcome =
  | { success: true; result: Record<string, unknown> }
  | { success: false; error: ParseErrorInfo }
