import { parse, Isbt128ParseError } from '@iccbba/isbt128-parser'
import type { ParseOutcome } from '../types'

/** Parses a barcode with the in-browser TypeScript parser, normalized to `ParseOutcome`. */
export function parseWithTs(barcode: string): ParseOutcome {
  try {
    const result = parse(barcode)
    return { success: true, result: result as unknown as Record<string, unknown> }
  } catch (error) {
    if (error instanceof Isbt128ParseError) {
      return { success: false, error: { message: error.message, position: error.position, reason: error.reason } }
    }
    throw error
  }
}
