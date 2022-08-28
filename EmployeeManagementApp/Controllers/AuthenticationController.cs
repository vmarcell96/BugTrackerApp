using EmployeeManagementApp.Core.Model.AuthenticationModels;
using EmployeeManagementApp.Core.Model.AuthenticationModels.Responses;
using EmployeeManagementApp.Core.Model.Users;
using EmployeeManagementApp.Services;
using EmployeeManagementApp.Services.Authenticator;
using EmployeeManagementApp.Services.PasswordHashers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagementApp.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthenticationController : Controller
    {
        private readonly IUserService _userService;
        private readonly IPasswordHasher _passwordHasher;
        private readonly Authenticator _authenticator;

        public AuthenticationController(IUserService userService, IPasswordHasher passwordHasher, Authenticator authenticator)
        {
            _userService = userService;
            _passwordHasher = passwordHasher;
            _authenticator = authenticator;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<string> errorMessages = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));

                return BadRequest(new ErrorResponse(errorMessages));
            }

            UserLoginDto user = await _userService.GetLoginDtoByUserName(loginRequest.Username);

            if (user == null)
            {
                return Unauthorized("User does not exist");
            }

            bool isCorrectPassword = _passwordHasher.VerifyPassword(loginRequest.Password, user.HashedPassword);

            if (!isCorrectPassword)
            {
                return Unauthorized("Incorrect password");
            }

            AuthenticatedUserResponse response = await _authenticator.Authenticate(user);

            return Ok(response);
        }
    }
}
