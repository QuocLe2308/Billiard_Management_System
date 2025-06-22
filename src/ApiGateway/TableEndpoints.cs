using Microsoft.AspNetCore.Mvc;

public static class TableEndpoints
{
    public static void MapTableEndpoints(this IEndpointRouteBuilder app)
    {
        // GET all tables
        app.MapGet("/tables", async (HttpContext httpContext) =>
        {
            var httpClientFactory = httpContext.RequestServices.GetService(typeof(IHttpClientFactory)) as IHttpClientFactory;
            var client = httpClientFactory.CreateClient("TableService");
            var response = await client.GetAsync("/api/Table");

            response.EnsureSuccessStatusCode();
            var data = await response.Content.ReadFromJsonAsync<IEnumerable<object>>();
            return data;
        });

        // GET table by ID
        app.MapGet("/tables/{id}", async (int id, HttpContext httpContext) =>
        {
            var httpClientFactory = httpContext.RequestServices.GetService(typeof(IHttpClientFactory)) as IHttpClientFactory;
            var client = httpClientFactory.CreateClient("TableService");
            var response = await client.GetAsync($"/api/Table/{id}");

            response.EnsureSuccessStatusCode();
            var table = await response.Content.ReadFromJsonAsync<object>();
            return table;
        });

        // POST a new table
        app.MapPost("/tables", async (HttpContext httpContext, [FromBody] object table) =>
        {
            var httpClientFactory = httpContext.RequestServices.GetService(typeof(IHttpClientFactory)) as IHttpClientFactory;
            var client = httpClientFactory.CreateClient("TableService");
            var response = await client.PostAsJsonAsync("/api/Table", table);

            response.EnsureSuccessStatusCode();
            var createdTable = await response.Content.ReadFromJsonAsync<object>();
            return createdTable;
        });

        // PUT (update) a table
        app.MapPut("/tables/{id}", async (int id, HttpContext httpContext, [FromBody] object table) =>
        {
            var httpClientFactory = httpContext.RequestServices.GetService(typeof(IHttpClientFactory)) as IHttpClientFactory;
            var client = httpClientFactory.CreateClient("TableService");
            var response = await client.PutAsJsonAsync($"/api/Table/{id}", table);

            response.EnsureSuccessStatusCode();
            return Results.NoContent();
        });

        // DELETE a table
        app.MapDelete("/tables/{id}", async (int id, HttpContext httpContext) =>
        {
            var httpClientFactory = httpContext.RequestServices.GetService(typeof(IHttpClientFactory)) as IHttpClientFactory;
            var client = httpClientFactory.CreateClient("TableService");
            var response = await client.DeleteAsync($"/api/Table/{id}");

            response.EnsureSuccessStatusCode();
            return Results.NoContent();
        });
    }
}
