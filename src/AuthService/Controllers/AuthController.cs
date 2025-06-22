using AuthService.Services;
using Microsoft.AspNetCore.Mvc;

namespace AuthService.Controllers
{
    public class AuthController : Controller
    {
        private readonly JwtService _jwtService;

        public AuthController(JwtService jwtService)
        {
            _jwtService = jwtService;
        }
        [HttpPost("createJwt")]
        public IActionResult Login([FromBody] LoginModel login)
        {

                var token = _jwtService.GenerateToken(login.Username, login.Role, login.UserId);

                return Ok(new { Token = token });
        }
        public IActionResult Index()
        {
            return View();
        }
    }

}
public class LoginModel
{
    public string Username { get; set; }
    public string Role { get; set; }
    public int UserId { get; set; }
}
