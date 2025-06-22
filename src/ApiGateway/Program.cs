using System.Net;
using System.Text;
using System.Text.Json;
using ApiGateway;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

// check token
var jwtSettings = builder.Configuration.GetSection("Jwt");
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Secret"]))
    };
    options.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = context =>
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;

            var result = JsonSerializer.Serialize(new { message = "Authentication failed", error = context.Exception.Message });
            return context.Response.WriteAsync(result);
        },
        OnChallenge = context =>
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;

            var result = JsonSerializer.Serialize(new { message = "Authorization has been denied for this request." });
            return context.Response.WriteAsync(result);
        },
        OnForbidden = context =>
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.Forbidden;

            var result = JsonSerializer.Serialize(new { message = "You do not have permission to access this resource." });
            return context.Response.WriteAsync(result);
        }
    };
});
// end check token


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddHttpClient("AuthService", client =>
{
    client.BaseAddress = new Uri("https://172.16.6.46:5002");
});

builder.Services.AddHttpClient("DrinkService", client =>
{
    client.BaseAddress = new Uri("https://172.16.6.46:5003");
});

builder.Services.AddHttpClient("EmployeeService", client =>
{
    client.BaseAddress = new Uri("https://172.16.6.46:5004");
});

builder.Services.AddHttpClient("PayrollService", client =>
{
    client.BaseAddress = new Uri("https://172.16.6.46:5005");
});

builder.Services.AddHttpClient("TableService", client =>
{
    client.BaseAddress = new Uri("http://172.16.6.46:5016");
});
builder.Services.AddHttpClient("ProductService", client =>
{
    client.BaseAddress = new Uri("https://172.16.6.46:7230");
});


builder.Services.AddControllers();
var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();




app.UseCors("AllowAllOrigins");
app.UseHttpsRedirection();
app.UseAuthorization();



if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapTableEndpoints();
app.MapEmployeeEndpoints();
app.MapProductEndPoints();

app.Run();
