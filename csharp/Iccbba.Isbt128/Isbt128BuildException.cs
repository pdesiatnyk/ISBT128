using System;

namespace Iccbba.Isbt128
{
    /// <summary>Thrown by <see cref="Isbt128Parser.BuildUdi"/> when the supplied input cannot be encoded
    /// into a structurally valid ISBT 128 UDI barcode.</summary>
    public sealed class Isbt128BuildException : Exception
    {
        /// <summary>Dotted path of the offending input field, e.g. "PI.DonationIdentificationNumber.Year".</summary>
        public string Field { get; }

        /// <summary>Short machine-readable reason code (e.g. "INVALID_LENGTH", "MISSING_FIELD").</summary>
        public string Reason { get; }

        public Isbt128BuildException(string message, string field, string reason)
            : base($"{message} (field {field})")
        {
            Field = field;
            Reason = reason;
        }
    }
}
