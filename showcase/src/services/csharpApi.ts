import type { ParseOutcome } from '../types'

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
