using System.Security.Claims;
using BugTrackerApp.Core.Extensions;
using BugTrackerApp.Core.Model;
using BugTrackerApp.Core.Model.AuthenticationModels;
using BugTrackerApp.Core.Model.AuthenticationModels.Requests;
using BugTrackerApp.Core.Model.AuthenticationModels.Responses;
using BugTrackerApp.Core.Model.RefreshTokens;
using BugTrackerApp.Core.Model.Users;
using BugTrackerApp.Data.Entity;
using BugTrackerApp.Services;
using BugTrackerApp.Services.Authenticator;
using BugTrackerApp.Services.PasswordHashers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BugTrackerApp.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthenticationController : Controller
    {
        private readonly IUserService _userService;
        private readonly IPasswordHasher _passwordHasher;
        private readonly Authenticator _authenticator;
        private readonly IRefreshTokenService _refreshTokenService;
        private readonly ILogger<AuthenticationController> _logger;

        public AuthenticationController(IUserService userService, 
                                        IPasswordHasher passwordHasher, 
                                        Authenticator authenticator, 
                                        IRefreshTokenService refreshTokenService,
                                        ILogger<AuthenticationController> logger)
        {
            _userService = userService;
            _passwordHasher = passwordHasher;
            _authenticator = authenticator;
            _refreshTokenService = refreshTokenService;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<string> errorMessages = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                _logger.LogError(String.Join(' ', errorMessages));
                return BadRequest(new ErrorResponse(errorMessages));
            }

            Result<UserLoginDto> user = await _userService.GetLoginDtoByUserName(loginRequest.Username);
            if (user.Failure)
            {
                _logger.LogError(user.Error);
                return BadRequest(user.Error);
            }

            bool isCorrectPassword = _passwordHasher.VerifyPassword(loginRequest.Password, user.Value.HashedPassword);

            if (!isCorrectPassword)
            {
                return Unauthorized("Incorrect password");
            }

            AuthenticatedUserResponse response = _authenticator.Authenticate(user.Value.ToUserAuthenticationDto());

            RefreshTokenCreateDto newRefreshToken = new RefreshTokenCreateDto()
            {
                Token = response.RefreshToken,
                UserId = user.Value.Id,
            };

            await _refreshTokenService.AddNewRefreshToken(newRefreshToken);

            return Ok(response);
        }

        //If your access token is expired you can get a valid one with the help of your refresh token
        [Authorize]
        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh(RefreshRequest refreshRequest)
        {
            //Validate model
            if (!ModelState.IsValid)
            {
                IEnumerable<string> errorMessages = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                _logger.LogError(String.Join(' ', errorMessages));
                return BadRequest(new ErrorResponse(errorMessages));
            }

            bool isValidRefreshToken = _authenticator.ValidateRefreshToken(refreshRequest.RefreshToken);

            if (!isValidRefreshToken)
            {
                _logger.LogError("Invalid refresh token!");
                return BadRequest(new ErrorResponse("Invalid refresh token!"));
            }

            Result<RefreshToken> refreshTokenResult = await _refreshTokenService.GetByRefreshToken(refreshRequest.RefreshToken);

            if (refreshTokenResult.Failure)
            {
                _logger.LogError(refreshTokenResult.Error);
                return NotFound(refreshTokenResult.Error);
            }

            Result<UserViewDto> userResult = await _userService.GetUserById(refreshTokenResult.Value.UserId);

            if (userResult.Failure)
            {
                _logger.LogError(userResult.Error);
                return BadRequest(userResult.Error);
            }

            Result deleteResult = await _refreshTokenService.Delete(refreshTokenResult.Value.Id);

            if (deleteResult.Failure)
            {
                _logger.LogError(deleteResult.Error);
                return BadRequest(deleteResult.Error);
            }

            AuthenticatedUserResponse response = _authenticator.Authenticate(userResult.Value.ToUserAuthenticationDto());

            RefreshTokenCreateDto newRefreshToken = new RefreshTokenCreateDto()
            {
                Token = response.RefreshToken,
                UserId = userResult.Value.Id,
            };

            var addRefreshTokenResult = await _refreshTokenService.AddNewRefreshToken(newRefreshToken);

            if (addRefreshTokenResult.Failure)
            {
                _logger.LogError(addRefreshTokenResult.Error);
                return BadRequest(addRefreshTokenResult.Error);
            }

            return Ok(response);
        }

        //This way if a refresh token gets stolen you can invalidate all with logging out
        [Authorize]
        [HttpDelete("logout")]
        public async Task<IActionResult> Logout()
        {
            string id = HttpContext.User.FindFirstValue("Id");
            if (!int.TryParse(id, out int userId))
            {
                return Unauthorized();
            }

            var deleteResult = await _refreshTokenService.DeleteAll(userId);

            if (deleteResult.Failure)
            {
                _logger.LogError(deleteResult.Error);
                return BadRequest(deleteResult.Error);
            }

            return NoContent();
        }
    }
}
