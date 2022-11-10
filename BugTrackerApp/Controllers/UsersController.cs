using BugTrackerApp.Core.Model;
using BugTrackerApp.Core.Model.Users;
using BugTrackerApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BugTrackerApp.Core.Model.AuthenticationModels.Responses;
using BugTrackerApp.Core.Model.AuthenticationModels;
using BugTrackerApp.Services.PasswordHashers;
using BugTrackerApp.Data.Entity;

namespace BugTrackerApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly IUserService _userService;
        private readonly ILogger<UsersController> _logger;
        private readonly IPasswordHasher _passwordHasher;

        public UsersController(IUserService userService, ILogger<UsersController> logger, IPasswordHasher passwordHasher)
        {
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _passwordHasher = passwordHasher ?? throw new ArgumentNullException(nameof(passwordHasher));
        }

        //[Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            Result<List<UserViewDto>> users = await _userService.GetAllUsers();
            if (users.Failure)
            {
                _logger.LogError(users.Error);
                return BadRequest(users.Error);
            }
            return StatusCode(200, users.Value);
        }


        //[Authorize]
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            Result<UserViewDto> user = await _userService.GetUserById(id);
            if (user.Failure)
            {
                _logger.LogError(user.Error);
                return BadRequest(user.Error);
            }
            return StatusCode(200, user.Value);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> AddUser(UserCreateDto newUserDto)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<string> errorMessages = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                _logger.LogError(String.Join(' ', errorMessages));
                return BadRequest(new ErrorResponse(errorMessages));
            }
            Result<UserViewDto> user = await _userService.AddNewUser(newUserDto);

            if (user.Failure)
            {
                _logger.LogError(user.Error);
                return BadRequest(user.Error);
            }
            return StatusCode(201, user.Value);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            Result user = await _userService.DeleteUserById(id);
            if (user.Failure)
            {
                _logger.LogError(user.Error);
                return BadRequest(user.Error);
            }
            return StatusCode(200);
        }

        //[Authorize]
        [Route("Update")]
        [HttpPut]
        public async Task<IActionResult> UpdateUser(UserUpdateDto userUpdateDto)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<string> errorMessages = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                _logger.LogError(String.Join(' ', errorMessages));
                return BadRequest(new ErrorResponse(errorMessages));
            }

            Result<UserLoginDto> user = await _userService.GetLoginDtoByUserId(userUpdateDto.Id);
            if (user.Failure)
            {
                _logger.LogError(user.Error);
                return BadRequest(user.Error);
            }

            bool isCorrectPassword = _passwordHasher.VerifyPassword(userUpdateDto.Password, user.Value.HashedPassword);

            if (!isCorrectPassword)
            {
                _logger.LogError($"Cannot update user(id={userUpdateDto.Id}), Incorrect password.");
                return Unauthorized($"Cannot update user(id={userUpdateDto.Id}), Incorrect password.");
            }
            Result<UserViewDto> updatedUser = await _userService.UpdateUser(userUpdateDto);

            if (updatedUser.Failure)
            {
                _logger.LogError(updatedUser.Error);
                return BadRequest(updatedUser.Error);
            }
            return StatusCode(200, updatedUser.Value);
        }


        //Admin roled users can change a user's role too on contrary with user roled users who can only change username,firstname,lastname
        //[Authorize(Roles = "Admin")]
        [Route("AdminUpdate")]
        [HttpPut]
        public async Task<IActionResult> UpdateUserWithAdminUser(UserUpdateAdminDto userUpdateAdminDto)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<string> errorMessages = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                _logger.LogError(String.Join(' ', errorMessages));
                return BadRequest(new ErrorResponse(errorMessages));
            }

            Result<UserLoginDto> user = await _userService.GetLoginDtoByUserId(userUpdateAdminDto.Id);
            if (user.Failure)
            {
                _logger.LogError(user.Error);
                return BadRequest(user.Error);
            }

            Result<UserViewDto> updatedUser = await _userService.UpdateUserWithAdmin(userUpdateAdminDto);

            if (updatedUser.Failure)
            {
                _logger.LogError(updatedUser.Error);
                return BadRequest(updatedUser.Error);
            }
            return StatusCode(200, updatedUser.Value);
        }
    }
}
