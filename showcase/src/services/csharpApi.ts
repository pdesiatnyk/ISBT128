import type { BuildUdiInput } from '@iccbba/isbt128-parser'
import type { BuildOutcome, ParseOutcome } from '../types'

/** Calls the C# parser over HTTP (proxied by Vite to csharp/Iccbba.Isbt128.Api — see vite.config.ts). */
export async function parseWithCSharp(barcode: string): Promise<ParseOutcome> {
  const response = await fetch('/api/parse', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ barcode }),
  })
  if (!response.ok) {
    throw new Error(`C# API request failed: ${response.status} ${response.statusText}`)
  }
  return (await response.json()) as ParseOutcome
}

// C#'s DateOnly only accepts "yyyy-MM-dd", but JSON.stringify(Date) produces a full ISO
// datetime — reformat before sending so the API's DateOnly? binding doesn't reject it.
function serializeBuildInput(input: BuildUdiInput): unknown {
  return {
    ...input,
    PI: {
      ...input.PI,
      expirationDate: input.PI.expirationDate?.toISOString().slice(0, 10),
      productionDate: input.PI.productionDate?.toISOString().slice(0, 10),
    },
  }
}

/** Calls the C# builder over HTTP (proxied by Vite to csharp/Iccbba.Isbt128.Api — see vite.config.ts). */
export async function buildWithCSharp(input: BuildUdiInput): Promise<BuildOutcome> {
  const response = await fetch('/api/build', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(serializeBuildInput(input)),
  })
  if (!response.ok) {
    throw new Error(`C# API request failed: ${response.status} ${response.statusText}`)
  }
  return (await response.json()) as BuildOutcome
}
