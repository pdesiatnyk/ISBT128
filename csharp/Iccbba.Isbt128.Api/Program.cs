using System.Text.Json;
using Iccbba.Isbt128;

var builder = WebApplication.CreateBuilder(args);

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
});

const string ShowcaseDevCorsPolicy = "ShowcaseDev";
builder.Services.AddCors(options =>
{
    options.AddPolicy(ShowcaseDevCorsPolicy, policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();
app.UseCors(ShowcaseDevCorsPolicy);

app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

// Parses a barcode with the C# ISBT 128 parser for the showcase app (see /showcase).
// Returns 200 with success=false (not 4xx/5xx) for an invalid barcode, since that's an
// expected outcome the frontend renders the same way as a successful parse.
app.MapPost("/api/parse", (ParseRequest request) =>
{
    try
    {
        var result = Isbt128Parser.Parse(request.Barcode);
        return Results.Ok(new { success = true, result });
    }
    catch (Isbt128ParseException ex)
    {
        return Results.Ok(new
        {
            success = false,
            error = new { message = ex.Message, position = ex.Position, reason = ex.Reason },
        });
    }
});

// Builds a UDI barcode from typed DI/PI fields for the showcase app (see /showcase).
// Returns 200 with success=false for invalid input, same rationale as /api/parse.
app.MapPost("/api/build", (BuildUdiInput input) =>
{
    try
    {
        var barcode = Isbt128Parser.BuildUdi(input);
        return Results.Ok(new { success = true, barcode });
    }
    catch (Isbt128BuildException ex)
    {
        return Results.Ok(new
        {
            success = false,
            error = new { message = ex.Message, field = ex.Field, reason = ex.Reason },
        });
    }
});

app.Run();

internal sealed record ParseRequest(string Barcode);
