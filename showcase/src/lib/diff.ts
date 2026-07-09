export type FlatValue = string | number | boolean | null

export interface DiffRow {
  path: string
  left: FlatValue
  right: FlatValue
  match: boolean
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
    rows.push({ path, left: l, right: r, match: l === r })
  }
  return rows.sort((a, b) => a.path.localeCompare(b.path))
}
