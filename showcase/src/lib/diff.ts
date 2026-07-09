import { describeField } from '../data/fieldMeta'

export type FlatValue = string | number | boolean | null

export interface DiffRow {
  path: string
  left: FlatValue
  right: FlatValue
  match: boolean
  section: string
  explanation: string
}

interface SegmentLike {
  dataStructureNumber?: string | null
  name?: string
  standardReference?: string
}

const CONVENIENCE_ROOTS = new Set([
  'donationIdentificationNumber',
  'productCode',
  'expirationDate',
  'productDivisions',
  'sec',
  'udi',
])

function segmentAt(value: unknown, index: number): SegmentLike | undefined {
  if (value && typeof value === 'object' && Array.isArray((value as { segments?: unknown }).segments)) {
    return ((value as { segments: SegmentLike[] }).segments)[index]
  }
  return undefined
}

/** Strips a trailing array index (e.g. "positions[3]" -> "positions") to get the plain field key. */
function fieldKeyOf(path: string): string {
  const lastToken = path.split('.').pop() ?? path
  return lastToken.replace(/\[\d+\]$/, '')
}

/** Describes which part of the parsed result a flattened path belongs to, using whichever side has it. */
function describeSection(path: string, left: unknown, right: unknown): string {
  const segMatch = /^segments\[(\d+)\]/.exec(path)
  if (segMatch) {
    const index = Number(segMatch[1])
    const segment = segmentAt(left, index) ?? segmentAt(right, index)
    if (segment) {
      const dsLabel = segment.dataStructureNumber ? `DS${segment.dataStructureNumber}` : 'non-ICCBBA'
      return [segment.name ?? 'Segment', `[${dsLabel}]`, segment.standardReference && `— ${segment.standardReference}`]
        .filter(Boolean)
        .join(' ')
    }
    return 'Segment'
  }
  if (path === 'compoundMessage' || path.startsWith('compoundMessage.')) {
    return 'Compound Message header [DS023] — ST-001 §2.4.23'
  }
  if (['message', 'position', 'reason'].includes(path)) {
    return 'Parse error (thrown by the parser)'
  }
  const root = fieldKeyOf(path.split('.')[0] ?? path)
  if (CONVENIENCE_ROOTS.has(root)) {
    return 'Convenience accessor (mirrors a decoded segment for easy access)'
  }
  return 'Barcode-level metadata'
}

function describeExplanation(path: string, left: unknown, right: unknown): string {
  const segMatch = /^segments\[(\d+)\]/.exec(path)
  let dataStructureNumber: string | null | undefined
  if (segMatch) {
    const index = Number(segMatch[1])
    const segment = segmentAt(left, index) ?? segmentAt(right, index)
    dataStructureNumber = segment?.dataStructureNumber
  }
  return describeField(fieldKeyOf(path), dataStructureNumber)
}

/** Recursively flattens a parsed-barcode-shaped value into `path -> leaf value` entries. */
function flatten(value: unknown, path: string, out: Map<string, FlatValue>): void {
  if (value !== null && typeof value === 'object') {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        out.set(path || '(root)', null)
        return
      }
      value.forEach((item, i) => flatten(item, path ? `${path}[${i}]` : `[${i}]`, out))
      return
    }
    const entries = Object.entries(value as Record<string, unknown>)
    if (entries.length === 0) {
      out.set(path || '(root)', null)
      return
    }
    for (const [key, v] of entries) {
      flatten(v, path ? `${path}.${key}` : key, out)
    }
    return
  }
  out.set(path || '(root)', (value ?? null) as FlatValue)
}

/**
 * Compares two parsed-barcode-shaped values field-by-field. A key missing on one side is
 * treated the same as an explicit `null` on that side, since both parsers use different
 * conventions for "absent" (TS: `undefined`/omitted key, C#: `null`) — the diff should surface
 * an actual value difference, not that convention gap.
 */
export function diffRows(left: unknown, right: unknown): DiffRow[] {
  const leftFlat = new Map<string, FlatValue>()
  const rightFlat = new Map<string, FlatValue>()
  flatten(left, '', leftFlat)
  flatten(right, '', rightFlat)

  const paths = new Set<string>([...leftFlat.keys(), ...rightFlat.keys()])
  const rows: DiffRow[] = []
  for (const path of paths) {
    const l = leftFlat.get(path) ?? null
    const r = rightFlat.get(path) ?? null
    rows.push({
      path,
      left: l,
      right: r,
      match: l === r,
      section: describeSection(path, left, right),
      explanation: describeExplanation(path, left, right),
    })
  }
  return rows.sort((a, b) => a.path.localeCompare(b.path))
}
