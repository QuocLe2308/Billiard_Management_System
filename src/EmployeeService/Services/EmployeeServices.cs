using EmployeeService.Data;
using Microsoft.AspNetCore.Mvc;
using EmployeeService.DTO;
using Microsoft.EntityFrameworkCore;
using System.Net.Http;
using System.Text.Json;
namespace EmployeeService.Services
{
    public class EmployeeServices
    {
        private readonly AppDbContext _context;
        private readonly IHttpClientFactory _httpClientFactory;

        public EmployeeServices(AppDbContext context, IHttpClientFactory httpClientFactory)
        {
            _context = context;
            _httpClientFactory = httpClientFactory;
        }

        //public async Task<ActionResult<EmployeeInfo>> LoginAsync(LoginRequest request)
        //{
        //    var employee = await _context.Employees
        //        .FirstOrDefaultAsync(e => e.Username == request.Username);

        //    if (employee == null || !request.Password.Equals(employee.Password))
        //    {
        //        return new UnauthorizedResult();
        //    }

        //    return new ActionResult<EmployeeInfo>(new EmployeeInfo
        //    {
        //        Username = employee.Username,
        //        Role = employee.Role
        //    });

        //}

        public async Task<ActionResult<EmployeeInfo>> LoginAsync(LoginRequest request)
        {
            var employee = await _context.Employees
                .FirstOrDefaultAsync(e => e.Username == request.Username);

            if (employee == null || !request.Password.Equals(employee.Password))
            {
                return new ObjectResult(new { message = "Username or Password is not correct" })
                {
                    StatusCode = 400
                };
            }

            var client = _httpClientFactory.CreateClient("AuthService");
            var loginModel = new LoginModel
            {
                Username = employee.Username,
                Role = employee.Role,
                UserId = employee.Id
            };

            var authResponse = await client.PostAsJsonAsync("createJwt", loginModel);

            if (!authResponse.IsSuccessStatusCode)
            {
                return new ObjectResult(new { message = "Failed to create token" })
                {
                    StatusCode = (int)authResponse.StatusCode
                };
            }

            var responseContent = await authResponse.Content.ReadAsStringAsync();
            using JsonDocument document = JsonDocument.Parse(responseContent);
            JsonElement root = document.RootElement;

            if (root.TryGetProperty("token", out JsonElement tokenElement))
            {
                string token = tokenElement.GetString();

                return new OkObjectResult(new EmployeeInfo
                {
                    Username = employee.Username,
                    Role = employee.Role,
                    UserId = employee.Id,
                    Token = token
                });
            }
            else
            {
                return new ObjectResult(new { message = "Token not found in response" })
                {
                    StatusCode = 500
                };
            }
        }



        public class LoginModel
        {
            public string Username { get; set; }
            public string Role { get; set; }
            public int UserId { get; set; }
        }
    }

}
