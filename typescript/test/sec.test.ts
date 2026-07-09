import { describe, expect, it } from 'vitest';
import { decodeSecContent, isSecText, parseSecText } from '../src/sec.js';

describe('SEC', () => {
  // ST-012 Figure 2 eye-readable example.
  it('parses the Figure 2 eye-readable SEC example', () => {
    const fields = parseSecText('SEC: PL001499Z549917123456 A00T041600320171231');
    expect(fields.countryIdentifier).toBe('PL');
    expect(fields.tissueEstablishmentCode).toBe('001499');
    expect(fields.uniqueDonationNumber).toBe('Z549917123456');
    expect(fields.codingSystemIdentifier).toBe('A');
    expect(fields.codingSystem).toBe('ISBT 128');
    expect(fields.productCode).toBe('00T0416');
    expect(fields.splitNumber).toBe('003');
    expect(fields.expiryDate).toBe('2017-12-31');
  });

  it('recognizes SEC eye-readable text case-insensitively', () => {
    expect(isSecText('SEC: PL001499Z549917123456 A00T041600320171231')).toBe(true);
    expect(isSecText('sec: PL001499Z549917123456 A00T041600320171231')).toBe(true);
    expect(isSecText('=A99991712345600')).toBe(false);
  });

  // ST-012 §6.2 Data Matrix symbol 2 example: SEC alone, electronic DS038 content (no `&,4` prefix here).
  it('decodes the §6.2 Data Matrix symbol 2 electronic content example', () => {
    const fields = decodeSecContent('PL001499Z549917123456A00T041600320181231');
    expect(fields.countryIdentifier).toBe('PL');
    expect(fields.uniqueDonationNumber).toBe('Z549917123456');
    expect(fields.productCode).toBe('00T0416');
    expect(fields.splitNumber).toBe('003');
    expect(fields.expiryDate).toBe('2018-12-31');
  });

  it('rejects malformed SEC text', () => {
    expect(() => parseSecText('SEC: too short')).toThrow();
  });

  it('treats an all-zero expiry as unspecified', () => {
    const content = 'PL' + '001499' + '0'.repeat(13) + 'A' + '0'.repeat(7) + '0'.repeat(3) + '0'.repeat(8);
    expect(content).toHaveLength(40);
    const fields = decodeSecContent(content);
    expect(fields.expiryDate).toBe('');
  });
});
