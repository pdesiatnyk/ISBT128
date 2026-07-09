/**
 * Curated barcodes known to be identical cross-language test fixtures in both
 * csharp/Iccbba.Isbt128.Tests/ParserTests.cs and typescript/test/parser.test.ts.
 */
export interface SampleSerial {
  category: string
  label: string
  barcode: string
}

// Built the same way as ParserTests.cs / parser.test.ts build them, instead of hand-typed
// literals, so the fixed-width field arithmetic can't silently drift out of sync.
const dimensionsSeg1 = '01' + '0001' + '00001' + '0' + '00'
const dimensionsSeg2 = '02' + '0002' + '00002' + '0' + '00'
const retiredContent = 'a'.repeat(16) + '00'

export const sampleSerials: SampleSerial[] = [
  { category: 'Standalone structures', label: 'DIN [001] (ST-017 §3.1)', barcode: '=A99991712345600' },
  { category: 'Standalone structures', label: 'PPIC / Device Identifier [034] (ST-017 §2.1)', barcode: '=/A9997AB3456T0123' },
  { category: 'Standalone structures', label: 'DIN [001] with valid Type 3 checksum flag (70)', barcode: '=G12341765432170' },
  { category: 'Standalone structures', label: 'DIN [001] with invalid Type 3 checksum flag (71)', barcode: '=G12341765432171' },

  { category: 'Concatenation & compound messages', label: 'DIN + Product Divisions, concatenated pair (§10)', barcode: '=A99991712345600=,000012' },
  { category: 'Concatenation & compound messages', label: 'Compound Message, unspecified sequence (ST-017 §4.3.1)', barcode: '=+04000=/A9997XYZ100T0479=A99991712345600=,000012=>019031' },
  { category: 'Concatenation & compound messages', label: 'Compound Message, specified sequence 035 (ST-017 §4.3.2)', barcode: '=+04035=/A9997XYZ100T0479=,000012=A99991712345600=>019031' },
  { category: 'Concatenation & compound messages', label: 'Full UDI compound message (ST-017 §5)', barcode: '=+06000=/A9999XYZ100T0476=,000025=A99971712345600=>019032=}017032&,1000000000000XYZ123' },
  { category: 'Concatenation & compound messages', label: 'Data Matrix symbol 1: DIN+BloodGroups+ProductCode+Expiry+SEC (ST-012 §6.2)', barcode: '=+05000=Z54991712345600=%T300=<T0416003&>0183652359&,4PL001499Z549917123456A00T041600320181231' },

  { category: 'SEC (ST-012)', label: 'SEC eye-readable text form (ST-012 §2.3)', barcode: 'SEC: PL001499Z549917123456 A00T041600320171231' },
  { category: 'SEC (ST-012)', label: 'SEC electronic / DS038 form, standalone', barcode: '&,4PL001499Z549917123456A00T041600320181231' },

  { category: 'Structural edge cases', label: 'Retired data structure [015] (recognized, not decoded)', barcode: `=[${retiredContent}` },
  { category: 'Structural edge cases', label: 'Non-ICCBBA opaque trailing segment', barcode: '=A99991712345600&xSOME-LOCAL-DATA' },
  { category: 'Structural edge cases', label: 'Patient Identification Number [025], length-prefixed', barcode: '&#0105ABC12' },
  { category: 'Structural edge cases', label: 'Dimensions [029], repeat-count-prefixed', barcode: `&$02${dimensionsSeg1}${dimensionsSeg2}` },

  { category: 'Invalid (error path demo)', label: 'Unrecognized data identifier', barcode: '=zINVALID_DI_TEST' },
  { category: 'Invalid (error path demo)', label: 'Truncated content', barcode: '=A999917123456' },
  { category: 'Invalid (error path demo)', label: 'Compound message: declared count does not match reality', barcode: '=+05000=/A9997XYZ100T0479=A99991712345600=,000012=>019031' },
]
