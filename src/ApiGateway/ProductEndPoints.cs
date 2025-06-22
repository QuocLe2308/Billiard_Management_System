using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;

namespace ApiGateway
{
    public static class ProductEndPoints
    {
        public static void MapProductEndPoints(this IEndpointRouteBuilder app)
        {
            app.MapGet("/Drink", [Authorize] async (HttpContext httpContext) =>
            {
                var httpClientFactory = httpContext.RequestServices.GetService(typeof(IHttpClientFactory)) as IHttpClientFactory;
                var client = httpClientFactory.CreateClient("ProductService");
                var response = await client.GetAsync("/api/Drink");

                response.EnsureSuccessStatusCode();
                var data = await response.Content.ReadFromJsonAsync<IEnumerable<object>>();
                return data;
            });

            app.MapGet("/Drink/{id}", [Authorize] async (int id, HttpContext httpContext) =>
            {
                var httpClientFactory = httpContext.RequestServices.GetService(typeof(IHttpClientFactory)) as IHttpClientFactory;
                var client = httpClientFactory.CreateClient("ProductService");
                var response = await client.GetAsync($"/api/Drink/{id}");

                response.EnsureSuccessStatusCode();
                var drink = await response.Content.ReadFromJsonAsync<object>();
                return drink;
            });

            app.MapPost("/Drink", [Authorize] async (HttpContext httpContext, [FromBody] object drink) =>
            {
                var httpClientFactory = httpContext.RequestServices.GetService(typeof(IHttpClientFactory)) as IHttpClientFactory;
                var client = httpClientFactory.CreateClient("ProductService");
                var response = await client.PostAsJsonAsync("/api/Drink", drink);

                response.EnsureSuccessStatusCode();
                var createdDrink = await response.Content.ReadFromJsonAsync<object>();
                //return Results.Created($"/employees/{createdEmployee.Id}", createdEmployee);
                return createdDrink;
            });

            app.MapPut("/Drink/{id}", [Authorize] async (int id, HttpContext httpContext, [FromBody] object drink) =>
            {
                var httpClientFactory = httpContext.RequestServices.GetService(typeof(IHttpClientFactory)) as IHttpClientFactory;
                var client = httpClientFactory.CreateClient("ProductService");
                var response = await client.PutAsJsonAsync($"/api/Drink/{id}", drink);

                response.EnsureSuccessStatusCode();
                return Results.NoContent();
            });

            app.MapDelete("/Drink/{id}", [Authorize] async (int id, HttpContext httpContext) =>
            {
                var httpClientFactory = httpContext.RequestServices.GetService(typeof(IHttpClientFactory)) as IHttpClientFactory;
                var client = httpClientFactory.CreateClient("ProductService");
                var response = await client.DeleteAsync($"/api/Drink/{id}");

                response.EnsureSuccessStatusCode();
                return Results.NoContent();
            });
            app.MapGet("/ProductCategory", [Authorize] async (HttpContext httpContext) =>
            {
                var httpClientFactory = httpContext.RequestServices.GetService(typeof(IHttpClientFactory)) as IHttpClientFactory;
                var client = httpClientFactory.CreateClient("ProductService");
                var response = await client.GetAsync("/api/ProductCategory");

                response.EnsureSuccessStatusCode();
                var data = await response.Content.ReadFromJsonAsync<IEnumerable<object>>();
                return data;
            });

            app.MapGet("/ProductCategory/{id}", [Authorize] async (int id, HttpContext httpContext) =>
            {
                var httpClientFactory = httpContext.RequestServices.GetService(typeof(IHttpClientFactory)) as IHttpClientFactory;
                var client = httpClientFactory.CreateClient("ProductService");
                var response = await client.GetAsync($"/api/ProductCategory/{id}");

                response.EnsureSuccessStatusCode();
                var drink = await response.Content.ReadFromJsonAsync<object>();
                return drink;
            });

            app.MapPost("/ProductCategory", [Authorize] async (HttpContext httpContext, [FromBody] object productCategory) =>
            {
                var httpClientFactory = httpContext.RequestServices.GetService(typeof(IHttpClientFactory)) as IHttpClientFactory;
                var client = httpClientFactory.CreateClient("ProductService");
                var response = await client.PostAsJsonAsync("/api/ProductCategory", productCategory);

                response.EnsureSuccessStatusCode();
                var createdDrink = await response.Content.ReadFromJsonAsync<object>();
                //return Results.Created($"/employees/{createdEmployee.Id}", createdEmployee);
                return createdDrink;
            });

            app.MapPut("/ProductCategory/{id}", [Authorize] async (int id, HttpContext httpContext, [FromBody] object productCategory) =>
            {
                var httpClientFactory = httpContext.RequestServices.GetService(typeof(IHttpClientFactory)) as IHttpClientFactory;
                var client = httpClientFactory.CreateClient("ProductService");
                var response = await client.PutAsJsonAsync($"/api/ProductCategory/{id}", productCategory);

                response.EnsureSuccessStatusCode();
                return Results.NoContent();
            });

            app.MapDelete("/ProductCategory/{id}", [Authorize] async (int id, HttpContext httpContext) =>
            {
                var httpClientFactory = httpContext.RequestServices.GetService(typeof(IHttpClientFactory)) as IHttpClientFactory;
                var client = httpClientFactory.CreateClient("ProductService");
                var response = await client.DeleteAsync($"/api/ProductCategory/{id}");

                response.EnsureSuccessStatusCode();
                return Results.NoContent();
            });
        }
    }
}
