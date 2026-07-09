namespace Iccbba.Isbt128.Tests;

public class ChecksumTests
{
    // ST-001 Appendix A.1 worked example: DIN "G1234 17 654321" -> K = "A".
    [Fact]
    public void CalculatesDinCheckCharacterFromWorkedExample()
    {
        Assert.Equal('A', Checksum.CalculateDinCheckCharacter("G123417654321"));
    }

    // ST-001 Appendix A.2: checksum 10 -> Type 3 flag "70" for the same DIN.
    [Fact]
    public void CalculatesType3FlagFromWorkedExample()
    {
        Assert.Equal("70", Checksum.CalculateDinType3Flag("G123417654321"));
    }

    // ST-017 Appendix 1 worked example: A9990ABC123T0480 -> checksum 08.
    [Fact]
    public void CalculatesBasicUdiDiChecksumFromWorkedExample()
    {
        Assert.Equal("08", Checksum.CalculateBasicUdiDiChecksum("A9990ABC123T0480"));
    }

    [Fact]
    public void VerifiesCorrectFullBasicUdiDi()
    {
        Assert.True(Checksum.VerifyBasicUdiDiChecksum("A9990ABC123T048008"));
    }

    [Fact]
    public void RejectsBasicUdiDiWithCorruptedChecksum()
    {
        Assert.False(Checksum.VerifyBasicUdiDiChecksum("A9990ABC123T048099"));
    }
}
