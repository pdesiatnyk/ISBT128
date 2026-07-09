import { describe, expect, it } from 'vitest';
import { check, parse } from '../src/parser.js';
import { Isbt128ParseError } from '../src/errors.js';

describe('parse() / check() — single data structures', () => {
  // ST-017 §3.1 Figure 2: DIN form example.
  it('parses a standalone DIN [001]', () => {
    const result = parse('=A99991712345600');
    expect(result.segments).toHaveLength(1);
    const seg = result.segments[0];
    expect(seg.dataStructureNumber).toBe('001');
    expect(seg.fields.facilityIdentificationNumber).toBe('A9999');
    expect(seg.fields.year).toBe('17');
    expect(seg.fields.sequenceNumber).toBe('123456');
    expect(seg.fields.flagCharacters).toBe('00');
    expect(result.donationIdentificationNumber).toBe(seg.fields);
    expect(check('=A99991712345600')).toBe(true);
  });

  // ST-017 §2.1 Figure 1: PPIC [034] example.
  it('parses a standalone Processor Product Identification Code [034]', () => {
    const result = parse('=/A9997AB3456T0123');
    const seg = result.segments[0];
    expect(seg.dataStructureNumber).toBe('034');
    expect(seg.fields.facilityIdentificationNumberOfProcessor).toBe('A9997');
    expect(seg.fields.facilityDefinedProductCode).toBe('AB3456');
    expect(seg.fields.productDescriptionCode).toBe('T0123');
  });

  it('validates a DIN Type 3 checksum flag', () => {
    // 13-char DIN "G123417654321" has ISO 7064 mod 37-2 checksum 10 -> flag 70 (Appendix A.2).
    const result = parse('=G12341765432170');
    const seg = result.segments[0];
    expect(seg.fields.isChecksumFlag).toBe(true);
    expect(seg.fields.checksumValid).toBe(true);
  });

  it('flags an incorrect DIN checksum as invalid without throwing', () => {
    const result = parse('=G12341765432171');
    expect(result.segments[0].fields.checksumValid).toBe(false);
  });
});

describe('parse() — physically-concatenated pairs (§10)', () => {
  it('parses two data structures concatenated with no separator', () => {
    const result = parse('=A99991712345600=,000012');
    expect(result.segments).toHaveLength(2);
    expect(result.segments[0].dataStructureNumber).toBe('001');
    expect(result.segments[1].dataStructureNumber).toBe('032');
    expect(result.segments[1].fields.divisionCode).toBe('000012');
    expect(result.isCompoundMessage).toBe(false);
  });
});

describe('parse() — Compound Message [023]', () => {
  // ST-017 §4.3.1: unspecified-sequence compound message.
  it('parses an unspecified-sequence compound message', () => {
    const barcode = '=+04000=/A9997XYZ100T0479=A99991712345600=,000012=>019031';
    const result = parse(barcode);
    expect(result.isCompoundMessage).toBe(true);
    expect(result.compoundMessage?.declaredCount).toBe(4);
    expect(result.compoundMessage?.isSpecifiedSequence).toBe(false);
    // header + 4 structures
    expect(result.segments).toHaveLength(5);
    expect(result.segments.map((s) => s.dataStructureNumber)).toEqual(['023', '034', '001', '032', '004']);
    expect(check(barcode)).toBe(true);
  });

  // ST-017 §4.3.2: specified-sequence compound message (RT017 message 035).
  it('parses a specified-sequence compound message', () => {
    const barcode = '=+04035=/A9997XYZ100T0479=,000012=A99991712345600=>019031';
    const result = parse(barcode);
    expect(result.compoundMessage?.isSpecifiedSequence).toBe(true);
    expect(result.compoundMessage?.sequenceCode).toBe('035');
  });

  // ST-017 §5: full UDI compound message (DI + DIN + serial + expiry + mfg date + lot number).
  it('parses the full ST-017 §5 UDI compound message example', () => {
    const barcode = '=+06000=/A9999XYZ100T0476=,000025=A99971712345600=>019032=}017032&,1000000000000XYZ123';
    const result = parse(barcode);
    expect(result.compoundMessage?.declaredCount).toBe(6);
    expect(result.segments).toHaveLength(7);
    expect(result.udi).toBeDefined();
    expect(result.udi?.lotNumber).toEqual({ lotNumber: '000000000000XYZ123' });
  });

  // ST-012 §6.2 "Data Matrix symbol 1": DIN + Blood Groups + Product Code + Expiry(+Time) + SEC.
  it('parses the ST-012 §6.2 Data Matrix symbol 1 compound message (DIN/BloodGroups/ProductCode/Expiry/SEC)', () => {
    const barcode = '=+05000=Z54991712345600=%T300=<T0416003&>0183652359&,4PL001499Z549917123456A00T041600320181231';
    const result = parse(barcode);
    expect(result.compoundMessage?.declaredCount).toBe(5);
    expect(result.segments.map((s) => s.dataStructureNumber)).toEqual(['023', '001', '002', '003', '005', '038']);
    expect(result.sec?.expiryDate).toBe('2018-12-31');
    expect(result.expirationDate).toMatchObject({ date: '2018-12-31' });
  });

  it('throws when the declared compound-message count does not match reality', () => {
    const barcode = '=+05000=/A9997XYZ100T0479=A99991712345600=,000012=>019031'; // declares 5, only 4 present
    expect(() => parse(barcode)).toThrow(Isbt128ParseError);
    expect(check(barcode)).toBe(false);
  });
});

describe('parse() — Single European Code (SEC)', () => {
  it('parses the SEC eye-readable text form directly', () => {
    const result = parse('SEC: PL001499Z549917123456 A00T041600320171231');
    expect(result.isSecText).toBe(true);
    expect(result.sec?.uniqueDonationNumber).toBe('Z549917123456');
    expect(check('SEC: PL001499Z549917123456 A00T041600320171231')).toBe(true);
  });

  it('parses the SEC electronic DS038 form standalone', () => {
    const result = parse('&,4PL001499Z549917123456A00T041600320181231');
    expect(result.segments[0].dataStructureNumber).toBe('038');
    expect(result.sec?.expiryDate).toBe('2018-12-31');
  });
});

describe('parse() — retired data structures', () => {
  it('recognizes a retired data structure without decoding its fields', () => {
    const content = 'a'.repeat(16) + '00';
    const result = parse(`=[${content}`);
    expect(result.segments[0].isRetired).toBe(true);
    expect(result.segments[0].dataStructureNumber).toBe('015');
    expect(result.segments[0].fields).toEqual({});
  });
});

describe('parse() — non-ICCBBA / hybrid data structures', () => {
  it('surfaces a non-ICCBBA defined data structure as an opaque trailing segment', () => {
    const result = parse('=A99991712345600&xSOME-LOCAL-DATA');
    expect(result.segments).toHaveLength(2);
    const opaque = result.segments[1];
    expect(opaque.isOpaque).toBe(true);
    expect(opaque.dataStructureNumber).toBeNull();
    expect(opaque.rawContent).toBe('SOME-LOCAL-DATA');
  });
});

describe('parse() — variable-length data structures', () => {
  it('parses Patient Identification Number [025] using its length prefix', () => {
    const result = parse('&#0105ABC12'); // aa=01 (location), ll=05, patient id "ABC12"
    const seg = result.segments[0];
    expect(seg.dataStructureNumber).toBe('025');
    expect(seg.fields.patientId).toBe('ABC12');
  });

  it('parses Dimensions [029] with a repeat count', () => {
    // aa(2) + bbbb(4) + ccccc(5) + d(1) + ee(2) = 14 chars per repeating segment (§2.4.29).
    const seg1 = '01' + '0001' + '00001' + '0' + '00'; // symbol 01, volume (mL) = 1
    const seg2 = '02' + '0002' + '00002' + '0' + '00'; // symbol 02, length (mm) = 2
    const barcode = `&$02${seg1}${seg2}`;
    const result = parse(barcode);
    const seg = result.segments[0];
    expect(seg.dataStructureNumber).toBe('029');
    expect((seg.fields.dimensions as unknown[])).toHaveLength(2);
    expect((seg.fields.dimensions as Record<string, unknown>[])[0]).toMatchObject({ unit: 'mL', formattedValue: '00001' });
  });
});

describe('check() — negative cases', () => {
  it('rejects truncated input', () => {
    expect(check('=A999917123456')).toBe(false);
  });

  it('rejects an unrecognized data identifier', () => {
    expect(check('=zINVALID_DI_TEST')).toBe(false);
  });

  it('rejects input not starting with = or &', () => {
    expect(check('GARBAGE')).toBe(false);
  });

  it('rejects empty input', () => {
    expect(check('')).toBe(false);
  });
});
