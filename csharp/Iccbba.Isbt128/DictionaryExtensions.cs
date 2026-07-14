using System.Collections.Generic;

namespace Iccbba.Isbt128
{
    /// <summary>
    /// <c>Dictionary&lt;TKey,TValue&gt;.GetValueOrDefault(TKey, TValue)</c> is not part of
    /// netstandard2.0's BCL surface (it ships from netstandard2.1/.NET Core 2.0 onward) — this
    /// polyfills the same behavior for the netstandard2.0 target.
    /// </summary>
    internal static class DictionaryExtensions
    {
        internal static TValue GetValueOrDefault<TKey, TValue>(this Dictionary<TKey, TValue> dictionary, TKey key, TValue defaultValue) =>
            dictionary.TryGetValue(key, out var value) ? value : defaultValue;
    }
}
