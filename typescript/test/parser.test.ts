import { describe, expect, it } from 'vitest';
import { check, parse, parseUdi, buildUdi } from '../src/parser.js';
import { Isbt128ParseError, Isbt128BuildError } from '../src/errors.js';

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

describe('parseUdi() — ST-017 DI/PI grouping', () => {
  // ST-017 §4.3.1: parseUdi groups the same compound message into DI + PI.
  it('groups the device identifier and production identifiers', () => {
    const barcode = '=+04000=/A9997XYZ100T0479=A99991712345600=,000012=>019031';
    const udi = parseUdi(barcode);
    expect(udi.raw).toBe(barcode);
    expect(udi.DI).toMatchObject({
      facilityIdentificationNumberOfProcessor: 'A9997',
      facilityDefinedProductCode: 'XYZ100',
      productDescriptionCode: 'T0479',
    });
    expect(udi.DI?.raw).toBe('=/A9997XYZ100T0479');
    expect(udi.PI.donationIdentificationNumber).toMatchObject({ facilityIdentificationNumber: 'A9999' });
    expect(udi.PI.productDivisions).toBe('000012');
    expect(udi.PI.expirationDate).toEqual(new Date('2019-01-31'));
    expect(udi.PI.productionDate).toBeUndefined();
    expect(udi.PI.lotNumber).toBeUndefined();
    expect(udi.PI.raw).toBe('=A99991712345600=,000012=>019031');
  });

  it('returns a null device identifier for a non-UDI barcode', () => {
    const udi = parseUdi('=A99991712345600');
    expect(udi.DI).toBeNull();
    expect(udi.PI.donationIdentificationNumber).toBeDefined();
    expect(udi.PI.productDivisions).toBeUndefined();
    expect(udi.PI.expirationDate).toBeUndefined();
    expect(udi.PI.productionDate).toBeUndefined();
    expect(udi.PI.lotNumber).toBeUndefined();
    expect(udi.PI.raw).toBe('=A99991712345600');
  });

  it('concatenates all five PI segments in barcode order', () => {
    const barcode = '=+06000=/A9999XYZ100T0476=,000025=A99971712345600=>019032=}017032&,1000000000000XYZ123';
    const udi = parseUdi(barcode);
    expect(udi.DI?.raw).toBe('=/A9999XYZ100T0476');
    expect(udi.PI.raw).toBe('=,000025=A99971712345600=>019032=}017032&,1000000000000XYZ123');
    expect(udi.PI.raw).not.toBe(udi.raw);
    expect(udi.raw).toBe('=+06000' + udi.DI?.raw + udi.PI.raw);
  });

  it('leaves PI.raw undefined when no production identifier segments are present', () => {
    const udi = parseUdi('=/A9997XYZ100T0479');
    expect(udi.DI?.raw).toBe('=/A9997XYZ100T0479');
    expect(udi.PI.raw).toBeUndefined();
  });
});

describe('buildUdi() — ST-017 DI/PI encoding', () => {
  // ST-017 §4.3.1: buildUdi is the inverse of parseUdi — round-trips through both.
  it('round-trips through parseUdi()', () => {
    const input = {
      DI: {
        facilityIdentificationNumberOfProcessor: 'A9997',
        facilityDefinedProductCode: 'XYZ100',
        productDescriptionCode: 'T0479',
      },
      PI: {
        donationIdentificationNumber: {
          facilityIdentificationNumber: 'A9999',
          year: '17',
          sequenceNumber: '123456',
          flagCharacters: '00',
        },
        productDivisions: '000012',
        expirationDate: new Date('2019-01-31'),
      },
    };

    const expected = '=+04000=/A9997XYZ100T0479=A99991712345600=,000012=>019031';
    const barcode = buildUdi(input);
    expect(barcode).toBe(expected);

    const udi = parseUdi(barcode);
    expect(udi.DI?.facilityIdentificationNumberOfProcessor).toBe('A9997');
    expect(udi.PI.donationIdentificationNumber?.facilityIdentificationNumber).toBe('A9999');
    expect(udi.PI.productDivisions).toBe('000012');
    expect(udi.PI.expirationDate).toEqual(new Date('2019-01-31'));
  });

  // ST-001 Appendix A.2 worked example: DIN "G123417654321" -> Type 3 flag "70".
  it('auto-computes the DIN Type 3 flag when omitted', () => {
    const input = {
      DI: {
        facilityIdentificationNumberOfProcessor: 'A9997',
        facilityDefinedProductCode: 'XYZ100',
        productDescriptionCode: 'T0479',
      },
      PI: {
        donationIdentificationNumber: {
          facilityIdentificationNumber: 'G1234',
          year: '17',
          sequenceNumber: '654321',
        },
        productDivisions: '000000',
      },
    };

    expect(buildUdi(input)).toContain('=G12341765432170');
  });

  it('throws on a wrong-length field', () => {
    const input = {
      DI: {
        facilityIdentificationNumberOfProcessor: 'A999', // 4 chars, should be 5
        facilityDefinedProductCode: 'XYZ100',
        productDescriptionCode: 'T0479',
      },
      PI: {
        donationIdentificationNumber: {
          facilityIdentificationNumber: 'A9999',
          year: '17',
          sequenceNumber: '123456',
        },
        productDivisions: '000012',
      },
    };

    expect(() => buildUdi(input)).toThrow(Isbt128BuildError);
    let caught: unknown;
    try {
      buildUdi(input);
    } catch (error) {
      caught = error;
    }
    expect(caught).toBeInstanceOf(Isbt128BuildError);
    expect((caught as Isbt128BuildError).field).toBe('DI.facilityIdentificationNumberOfProcessor');
  });
});

describe('parse() — character-set validation (UDI fields)', () => {
  // ST-017 §2.1: FIN(P) excludes 'O' — {A-N, P-Z, 0-9}.
  it('rejects a PPIC [034] FIN(P) containing "O"', () => {
    const barcode = '=/A999OAB3456T0123';
    expect(() => parse(barcode)).toThrow(Isbt128ParseError);
    expect(check(barcode)).toBe(false);
  });

  it('rejects a PPIC [034] FPC containing a lowercase letter', () => {
    expect(() => parse('=/A9997ab3456T0123')).toThrow(Isbt128ParseError);
  });

  it('rejects a PPIC [034] PDC containing a lowercase letter', () => {
    expect(() => parse('=/A9997AB3456t0123')).toThrow(Isbt128ParseError);
  });

  // ST-017 §3.1: DIN FIN(D) chars 2-3 also exclude 'O'.
  it('rejects a DIN [001] FIN(D) alphanumeric portion containing "O"', () => {
    expect(() => parse('=A9O991712345600')).toThrow(Isbt128ParseError);
  });

  it('rejects a DIN [001] numeric portion (year) containing a letter', () => {
    expect(() => parse('=A99991x12345600')).toThrow(Isbt128ParseError);
  });

  it('rejects Product Divisions [032] containing a lowercase letter', () => {
    expect(() => parse('=,00001a')).toThrow(Isbt128ParseError);
  });

  it('rejects MPHO Lot Number [035] containing a lowercase letter', () => {
    expect(() => parse('&,1000000000000xYZ123')).toThrow(Isbt128ParseError);
  });
});

describe('buildUdi() — character-set validation', () => {
  const baseInput = () => ({
    DI: {
      facilityIdentificationNumberOfProcessor: 'A9997',
      facilityDefinedProductCode: 'XYZ100',
      productDescriptionCode: 'T0479',
    },
    PI: {
      donationIdentificationNumber: {
        facilityIdentificationNumber: 'A9999',
        year: '17',
        sequenceNumber: '123456',
      },
      productDivisions: '000012',
    },
  });

  function expectBuildCharsetError(input: ReturnType<typeof baseInput>, field: string): void {
    let caught: unknown;
    try {
      buildUdi(input);
    } catch (error) {
      caught = error;
    }
    expect(caught).toBeInstanceOf(Isbt128BuildError);
    expect((caught as Isbt128BuildError).reason).toBe('INVALID_CHARACTER_SET');
    expect((caught as Isbt128BuildError).field).toBe(field);
  }

  it('rejects a FIN(P) containing "O"', () => {
    const input = baseInput();
    input.DI.facilityIdentificationNumberOfProcessor = 'A999O';
    expectBuildCharsetError(input, 'DI.facilityIdentificationNumberOfProcessor');
  });

  it('rejects an FPC containing a lowercase letter', () => {
    const input = baseInput();
    input.DI.facilityDefinedProductCode = 'xyz100';
    expectBuildCharsetError(input, 'DI.facilityDefinedProductCode');
  });

  it('rejects a PDC containing a lowercase letter', () => {
    const input = baseInput();
    input.DI.productDescriptionCode = 't0479';
    expectBuildCharsetError(input, 'DI.productDescriptionCode');
  });

  it('rejects a DIN facilityIdentificationNumber containing "O"', () => {
    const input = baseInput();
    input.PI.donationIdentificationNumber.facilityIdentificationNumber = 'A9O99';
    expectBuildCharsetError(input, 'PI.donationIdentificationNumber.facilityIdentificationNumber');
  });

  it('rejects a DIN year containing a letter', () => {
    const input = baseInput();
    input.PI.donationIdentificationNumber.year = '1x';
    expectBuildCharsetError(input, 'PI.donationIdentificationNumber.year');
  });

  it('rejects a DIN sequenceNumber containing a letter', () => {
    const input = baseInput();
    input.PI.donationIdentificationNumber.sequenceNumber = '12345x';
    expectBuildCharsetError(input, 'PI.donationIdentificationNumber.sequenceNumber');
  });

  it('rejects Product Divisions containing a lowercase letter', () => {
    const input = baseInput();
    input.PI.productDivisions = '00001a';
    expectBuildCharsetError(input, 'PI.productDivisions');
  });

  it('rejects a Lot Number containing a lowercase letter', () => {
    const input = { ...baseInput(), PI: { ...baseInput().PI, lotNumber: '00000000000000xyz1' } };
    expectBuildCharsetError(input, 'PI.lotNumber');
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
