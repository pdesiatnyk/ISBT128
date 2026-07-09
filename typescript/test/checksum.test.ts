import { describe, expect, it } from 'vitest';
import { calculateDinCheckCharacter, calculateBasicUdiDiChecksum, verifyBasicUdiDiChecksum, calculateDinType3Flag } from '../src/checksum.js';

describe('checksum', () => {
  // ST-001 Appendix A.1 worked example: DIN "G1234 17 654321" -> K = "A".
  it('calculates the DIN check character from the worked Appendix A.1 example', () => {
    expect(calculateDinCheckCharacter('G123417654321')).toBe('A');
  });

  // ST-001 Appendix A.2: checksum 10 -> Type 3 flag "70" for the same DIN.
  it('calculates the Type 3 flag characters from the worked Appendix A.2 example', () => {
    expect(calculateDinType3Flag('G123417654321')).toBe('70');
  });

  // ST-017 Appendix 1 worked example: A9990ABC123T0480 -> checksum 08.
  it('calculates the Basic UDI-DI checksum from the worked Appendix 1 example', () => {
    expect(calculateBasicUdiDiChecksum('A9990ABC123T0480')).toBe('08');
  });

  it('verifies a correct full Basic UDI-DI', () => {
    expect(verifyBasicUdiDiChecksum('A9990ABC123T048008')).toBe(true);
  });

  it('rejects a Basic UDI-DI with a corrupted checksum', () => {
    expect(verifyBasicUdiDiChecksum('A9990ABC123T048099')).toBe(false);
  });
});
