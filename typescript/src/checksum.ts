/**
 * ISO/IEC 7064 modulus 37-2 "pure system" check character algorithm.
 *
 * Standard reference: ST-001 Appendix A.1-A.3 (Table 35 [RT035]); reused verbatim by:
 *  - the Donation Identification Number check character K and Type 3 flag characters (§A.1-A.2),
 *  - the Global Registration Identifier for Donors [039] embedded checksum (§2.4.39),
 *  - the Basic UDI-DI checksum (ST-017 Appendix 1).
 *
 * The recursive ("pure system recursive method") implementation below is the one given
 * informatively in ST-001 Appendix A.3, and produces identical results to the
 * position-weighted method shown in the Appendix A.1 worked example.
 */

const ISO_7064_ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ*';

/** Returns the ISO 7064 check value (0-36) for a single character, per Table 35 [RT035]. */
export function isoCharValue(char: string): number {
  const value = ISO_7064_ALPHABET.indexOf(char);
  if (value === -1) {
    throw new RangeError(`Character '${char}' is not valid in the ISO/IEC 7064 mod 37-2 alphabet`);
  }
  return value;
}

/** Returns the character corresponding to an ISO 7064 check value (0-36), per Table 35 [RT035]. */
export function isoValueChar(value: number): string {
  if (value < 0 || value > 36) {
    throw new RangeError(`ISO/IEC 7064 check value ${value} out of range 0-36`);
  }
  return ISO_7064_ALPHABET[value];
}

/**
 * Computes the ISO/IEC 7064 modulus 37-2 checksum value (0-36) over `input`.
 * `input` must contain only characters from the ISO 7064 alphabet (0-9, A-Z, *).
 */
export function isoMod37_2(input: string): number {
  let sum = 0;
  for (const char of input) {
    sum = (sum + isoCharValue(char)) * 2 % 37;
  }
  return (38 - sum) % 37;
}

/**
 * Calculates the DIN keyboard-entry check character K (ST-001 §A.1) from the 13-character
 * DIN proper (`αppppyynnnnnn` — excludes the leading `=` and the 2-character flag).
 */
export function calculateDinCheckCharacter(din13: string): string {
  if (din13.length !== 13) {
    throw new RangeError(`DIN proper must be exactly 13 characters, got ${din13.length}`);
  }
  return isoValueChar(isoMod37_2(din13));
}

/**
 * Calculates the Type 3 flag character value (ST-001 §A.2): the ISO 7064 mod 37-2 checksum
 * of the 13-character DIN, offset by 60, formatted as a 2-digit string ("60".."96").
 */
export function calculateDinType3Flag(din13: string): string {
  const checksum = isoMod37_2(din13);
  return String(checksum + 60).padStart(2, '0');
}

/**
 * Calculates the Global Registration Identifier for Donors [039] 2-digit mod 37-2 checksum
 * over its own preceding content (ST-001 §2.4.39: `nnnn` + `aaaaaaaaaaaaa`, 17 characters).
 */
export function calculateGridChecksum(gridPrefix17: string): string {
  if (gridPrefix17.length !== 17) {
    throw new RangeError(`GRID checksum input must be exactly 17 characters, got ${gridPrefix17.length}`);
  }
  return String(isoMod37_2(gridPrefix17)).padStart(2, '0');
}

/**
 * Calculates the Basic UDI-DI mod 37-2 checksum (ST-017 Appendix 1) over the 16-character
 * `nnnnnppppppqqqqq` (FIN(P) + FPC + PDC), zero-padded to 2 digits.
 */
export function calculateBasicUdiDiChecksum(basicUdiDi16: string): string {
  if (basicUdiDi16.length !== 16) {
    throw new RangeError(`Basic UDI-DI checksum input must be exactly 16 characters, got ${basicUdiDi16.length}`);
  }
  return String(isoMod37_2(basicUdiDi16)).padStart(2, '0');
}

/**
 * Verifies a full 18-character Basic UDI-DI (16-char body + 2-digit checksum) per ST-017 Appendix 1.
 */
export function verifyBasicUdiDiChecksum(basicUdiDi18: string): boolean {
  if (basicUdiDi18.length !== 18) {
    return false;
  }
  const body = basicUdiDi18.slice(0, 16);
  const checksum = basicUdiDi18.slice(16, 18);
  return calculateBasicUdiDiChecksum(body) === checksum;
}
