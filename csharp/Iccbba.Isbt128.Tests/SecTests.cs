namespace Iccbba.Isbt128.Tests;

public class SecTests
{
    // ST-012 Figure 2 eye-readable example.
    [Fact]
    public void ParsesFigure2EyeReadableExample()
    {
        var fields = Sec.ParseSecText("SEC: PL001499Z549917123456 A00T041600320171231");
        Assert.Equal("PL", fields["countryIdentifier"]);
        Assert.Equal("001499", fields["tissueEstablishmentCode"]);
        Assert.Equal("Z549917123456", fields["uniqueDonationNumber"]);
        Assert.Equal("A", fields["codingSystemIdentifier"]);
        Assert.Equal("ISBT 128", fields["codingSystem"]);
        Assert.Equal("00T0416", fields["productCode"]);
        Assert.Equal("003", fields["splitNumber"]);
        Assert.Equal("2017-12-31", fields["expiryDate"]);
    }

    [Fact]
    public void RecognizesSecTextCaseInsensitively()
    {
        Assert.True(Sec.IsSecText("SEC: PL001499Z549917123456 A00T041600320171231"));
        Assert.True(Sec.IsSecText("sec: PL001499Z549917123456 A00T041600320171231"));
        Assert.False(Sec.IsSecText("=A99991712345600"));
    }

    // ST-012 §6.2 Data Matrix symbol 2 example: SEC alone, electronic DS038 content.
    [Fact]
    public void DecodesSection62DataMatrixSymbol2Example()
    {
        var fields = Sec.DecodeSecContent("PL001499Z549917123456A00T041600320181231");
        Assert.Equal("PL", fields["countryIdentifier"]);
        Assert.Equal("Z549917123456", fields["uniqueDonationNumber"]);
        Assert.Equal("00T0416", fields["productCode"]);
        Assert.Equal("003", fields["splitNumber"]);
        Assert.Equal("2018-12-31", fields["expiryDate"]);
    }

    [Fact]
    public void RejectsMalformedSecText()
    {
        Assert.Throws<FormatException>(() => Sec.ParseSecText("SEC: too short"));
    }

    [Fact]
    public void TreatsAllZeroExpiryAsUnspecified()
    {
        var content = "PL" + "001499" + new string('0', 13) + "A" + new string('0', 7) + new string('0', 3) + new string('0', 8);
        Assert.Equal(40, content.Length);
        var fields = Sec.DecodeSecContent(content);
        Assert.Equal("", fields["expiryDate"]);
    }
}
