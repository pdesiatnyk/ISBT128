namespace Iccbba.Isbt128;

/// <summary>Thrown by <see cref="Isbt128Parser.Parse"/> when a barcode string is not a structurally/semantically valid ISBT 128 message.</summary>
public sealed class Isbt128ParseException : Exception
{
    /// <summary>Character offset within the original input where the problem was detected.</summary>
    public int Position { get; }

    /// <summary>Short machine-readable reason code (e.g. "UNKNOWN_DATA_IDENTIFIER", "LENGTH_MISMATCH").</summary>
    public string Reason { get; }

    public Isbt128ParseException(string message, int position, string reason)
        : base($"{message} (at position {position})")
    {
        Position = position;
        Reason = reason;
    }
}
