using System.Security.Claims;
using EmployeeManagementApp.Core.Extensions;
using EmployeeManagementApp.Core.Model.AuthenticationModels;
using EmployeeManagementApp.Core.Model.AuthenticationModels.Requests;
using EmployeeManagementApp.Core.Model.AuthenticationModels.Responses;
using EmployeeManagementApp.Core.Model.RefreshTokens;
using EmployeeManagementApp.Core.Model.Users;
using EmployeeManagementApp.Data.Entity;
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
        private readonly IRefreshTokenService _refreshTokenService;

        public AuthenticationController(IUserService userService, IPasswordHasher passwordHasher, Authenticator authenticator, IRefreshTokenService refreshTokenService)
        {
            _userService = userService;
            _passwordHasher = passwordHasher;
            _authenticator = authenticator;
            _refreshTokenService = refreshTokenService;
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

            AuthenticatedUserResponse response = _authenticator.Authenticate(user.ToUserAuthenticationDto());

            RefreshTokenCreateDto newRefreshToken = new RefreshTokenCreateDto()
            {
                Token = response.RefreshToken,
                UserId = user.ID,
            };

            await _refreshTokenService.AddNewRefreshToken(newRefreshToken);

            return Ok(response);
        }

        //If your access token is expired you can get a valid one with the help of your refresh token
        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh(RefreshRequest refreshRequest)
        {
            //Validate model
            if (!ModelState.IsValid)
            {
                IEnumerable<string> errorMessages = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));

                return BadRequest(new ErrorResponse(errorMessages));
            }

            bool isValidRefreshToken = _authenticator.ValidateRefreshToken(refreshRequest.RefreshToken);

            if (!isValidRefreshToken)
            {
                return BadRequest(new ErrorResponse("Invalid refresh token!"));
            }

            RefreshToken refreshToken = await _refreshTokenService.GetByRefreshToken(refreshRequest.RefreshToken);

            if (refreshToken == null)
            {
                return NotFound(new ErrorResponse("Invalid refresh token!"));
            }

            UserViewDto user = await _userService.GetUserById(refreshToken.UserId);

            await _refreshTokenService.Delete(refreshToken.UserId);

            if (user == null)
            {
                return NotFound(new ErrorResponse("User not found."));
            }

            AuthenticatedUserResponse response = _authenticator.Authenticate(user.ToUserAuthenticationDto());

            RefreshTokenCreateDto newRefreshToken = new RefreshTokenCreateDto()
            {
                Token = response.RefreshToken,
                UserId = user.ID,
            };

            await _refreshTokenService.AddNewRefreshToken(newRefreshToken);

            return Ok(response);
        }

        //This way if a refresh token gets stolen you can invalidate all with logging out
        [Authorize]
        [HttpDelete("logout")]
        public async Task<IActionResult> Logout()
        {
            string id = HttpContext.User.FindFirstValue("id");
            if (!int.TryParse(id, out int userId))
            {
                return Unauthorized();
            }

            await _refreshTokenService.DeleteAll(userId);

            return NoContent();
        }
    }
}
