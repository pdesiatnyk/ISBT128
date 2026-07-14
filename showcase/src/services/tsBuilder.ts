import { buildUdi, Isbt128BuildError } from '@iccbba/isbt128-parser'
import type { BuildUdiInput } from '@iccbba/isbt128-parser'
import type { BuildOutcome } from '../types'

/** Builds a UDI barcode with the in-browser TypeScript builder, normalized to `BuildOutcome`. */
export function buildWithTs(input: BuildUdiInput): BuildOutcome {
  try {
    const barcode = buildUdi(input)
    return { success: true, barcode }
  } catch (error) {
    if (error instanceof Isbt128BuildError) {
      return { success: false, error: { message: error.message, field: error.field, reason: error.reason } }
    }
    throw error
  }
}
