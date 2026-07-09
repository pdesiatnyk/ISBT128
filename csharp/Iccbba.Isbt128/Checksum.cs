namespace Iccbba.Isbt128;

/// <summary>
/// ISO/IEC 7064 modulus 37-2 "pure system" check character algorithm.
/// </summary>
/// <remarks>
/// Standard reference: ST-001 Appendix A.1-A.3 (Table 35 [RT035]); reused verbatim by:
/// the Donation Identification Number check character K and Type 3 flag characters (§A.1-A.2),
/// the Global Registration Identifier for Donors [039] embedded checksum (§2.4.39),
/// and the Basic UDI-DI checksum (ST-017 Appendix 1).
/// The recursive ("pure system recursive method") implementation below is the one given
/// informatively in ST-001 Appendix A.3, and produces identical results to the
/// position-weighted method shown in the Appendix A.1 worked example.
/// </remarks>
public static class Checksum
{
    private const string Iso7064Alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ*";

    /// <summary>Returns the ISO 7064 check value (0-36) for a single character, per Table 35 [RT035].</summary>
    public static int IsoCharValue(char c)
    {
        var value = Iso7064Alphabet.IndexOf(c);
        if (value == -1)
        {
            throw new ArgumentOutOfRangeException(nameof(c), $"Character '{c}' is not valid in the ISO/IEC 7064 mod 37-2 alphabet");
        }
        return value;
    }

    /// <summary>Returns the character corresponding to an ISO 7064 check value (0-36), per Table 35 [RT035].</summary>
    public static char IsoValueChar(int value)
    {
        if (value < 0 || value > 36)
        {
            throw new ArgumentOutOfRangeException(nameof(value), $"ISO/IEC 7064 check value {value} out of range 0-36");
        }
        return Iso7064Alphabet[value];
    }

    /// <summary>
    /// Computes the ISO/IEC 7064 modulus 37-2 checksum value (0-36) over <paramref name="input"/>.
    /// <paramref name="input"/> must contain only characters from the ISO 7064 alphabet (0-9, A-Z, *).
    /// </summary>
    public static int IsoMod37_2(string input)
    {
        var sum = 0;
        foreach (var c in input)
        {
            sum = (sum + IsoCharValue(c)) * 2 % 37;
        }
        return (38 - sum) % 37;
    }

    /// <summary>
    /// Calculates the DIN keyboard-entry check character K (ST-001 §A.1) from the 13-character
    /// DIN proper (<c>αppppyynnnnnn</c> — excludes the leading <c>=</c> and the 2-character flag).
    /// </summary>
    public static char CalculateDinCheckCharacter(string din13)
    {
        if (din13.Length != 13)
        {
            throw new ArgumentException($"DIN proper must be exactly 13 characters, got {din13.Length}", nameof(din13));
        }
        return IsoValueChar(IsoMod37_2(din13));
    }

    /// <summary>
    /// Calculates the Type 3 flag character value (ST-001 §A.2): the ISO 7064 mod 37-2 checksum
    /// of the 13-character DIN, offset by 60, formatted as a 2-digit string ("60".."96").
    /// </summary>
    public static string CalculateDinType3Flag(string din13)
    {
        var checksum = IsoMod37_2(din13);
        return (checksum + 60).ToString().PadLeft(2, '0');
    }

    /// <summary>
    /// Calculates the Global Registration Identifier for Donors [039] 2-digit mod 37-2 checksum
    /// over its own preceding content (ST-001 §2.4.39: <c>nnnn</c> + <c>aaaaaaaaaaaaa</c>, 17 characters).
    /// </summary>
    public static string CalculateGridChecksum(string gridPrefix17)
    {
        if (gridPrefix17.Length != 17)
        {
            throw new ArgumentException($"GRID checksum input must be exactly 17 characters, got {gridPrefix17.Length}", nameof(gridPrefix17));
        }
        return IsoMod37_2(gridPrefix17).ToString().PadLeft(2, '0');
    }

    /// <summary>
    /// Calculates the Basic UDI-DI mod 37-2 checksum (ST-017 Appendix 1) over the 16-character
    /// <c>nnnnnppppppqqqqq</c> (FIN(P) + FPC + PDC), zero-padded to 2 digits.
    /// </summary>
    public static string CalculateBasicUdiDiChecksum(string basicUdiDi16)
    {
        if (basicUdiDi16.Length != 16)
        {
            throw new ArgumentException($"Basic UDI-DI checksum input must be exactly 16 characters, got {basicUdiDi16.Length}", nameof(basicUdiDi16));
        }
        return IsoMod37_2(basicUdiDi16).ToString().PadLeft(2, '0');
    }

    /// <summary>
    /// Verifies a full 18-character Basic UDI-DI (16-char body + 2-digit checksum) per ST-017 Appendix 1.
    /// </summary>
    public static bool VerifyBasicUdiDiChecksum(string basicUdiDi18)
    {
        if (basicUdiDi18.Length != 18) return false;
        var body = basicUdiDi18[..16];
        var checksum = basicUdiDi18[16..18];
        return CalculateBasicUdiDiChecksum(body) == checksum;
    }
}
