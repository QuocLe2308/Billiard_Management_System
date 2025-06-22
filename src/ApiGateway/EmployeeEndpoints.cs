using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System.Collections.Generic;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

public static class EmployeeEndpoints
{
    public static void MapEmployeeEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/auth/login-account", async (IHttpClientFactory httpClientFactory, [FromBody] object loginRequest) =>
        {
            var employeeClient = httpClientFactory.CreateClient("EmployeeService");


            var employeeResponse = await employeeClient.PostAsJsonAsync("/api/Employee/login", loginRequest);


            var employeeInfo = await employeeResponse.Content.ReadFromJsonAsync<object>();


            return Results.Json(employeeInfo, statusCode: (int)employeeResponse.StatusCode);
        });



        app.MapGet("/employees", [Authorize] async (HttpContext httpContext) =>
        {
            var httpClientFactory = httpContext.RequestServices.GetService(typeof(IHttpClientFactory)) as IHttpClientFactory;
            var client = httpClientFactory.CreateClient("EmployeeService");
            var response = await client.GetAsync("/api/Employee");

            response.EnsureSuccessStatusCode();
            var data = await response.Content.ReadFromJsonAsync<IEnumerable<object>>();
            return data;
        });

        app.MapGet("/employees/{id}", [Authorize] async (int id, HttpContext httpContext) =>
        {
            var httpClientFactory = httpContext.RequestServices.GetService(typeof(IHttpClientFactory)) as IHttpClientFactory;
            var client = httpClientFactory.CreateClient("EmployeeService");
            var response = await client.GetAsync($"/api/Employee/{id}");

            response.EnsureSuccessStatusCode();
            var employee = await response.Content.ReadFromJsonAsync<object>();
            return employee;
        });

        app.MapPost("/employees", [Authorize] async (HttpContext httpContext, [FromBody] object employee) =>
        {
            var httpClientFactory = httpContext.RequestServices.GetService(typeof(IHttpClientFactory)) as IHttpClientFactory;
            var client = httpClientFactory.CreateClient("EmployeeService");
            var response = await client.PostAsJsonAsync("/api/Employee", employee);

            response.EnsureSuccessStatusCode();
            var createdEmployee = await response.Content.ReadFromJsonAsync<object>();
            //return Results.Created($"/employees/{createdEmployee.Id}", createdEmployee);
            return createdEmployee;
        });

        app.MapPut("/employees/{id}", [Authorize] async (int id, HttpContext httpContext, [FromBody] object employee) =>
        {
            var httpClientFactory = httpContext.RequestServices.GetService(typeof(IHttpClientFactory)) as IHttpClientFactory;
            var client = httpClientFactory.CreateClient("EmployeeService");
            var response = await client.PutAsJsonAsync($"/api/Employee/{id}", employee);

            response.EnsureSuccessStatusCode();
            return Results.NoContent();
        });

        app.MapDelete("/employees/{id}", [Authorize] async (int id, HttpContext httpContext) =>
        {
            var httpClientFactory = httpContext.RequestServices.GetService(typeof(IHttpClientFactory)) as IHttpClientFactory;
            var client = httpClientFactory.CreateClient("EmployeeService");
            var response = await client.DeleteAsync($"/api/Employee/{id}");

            response.EnsureSuccessStatusCode();
            return Results.NoContent();
        });
    }
}
