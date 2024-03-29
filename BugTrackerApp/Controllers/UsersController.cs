﻿using BugTrackerApp.Core.Model;
using BugTrackerApp.Core.Model.Users;
using BugTrackerApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BugTrackerApp.Core.Model.AuthenticationModels.Responses;
using BugTrackerApp.Services.PasswordHashers;
using BugTrackerApp.Data.Entity;

namespace BugTrackerApp.Controllers
{
    [Authorize]
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
        [Authorize(Roles = "Admin")]
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

        [Route("GetFriends")]
        [HttpPost]
        public async Task<IActionResult> GetFriends(int userId)
        {
            Result<List<UserViewDto>> friends = await _userService.GetFriends(userId);
            if (friends.Failure)
            {
                _logger.LogError(friends.Error);
                return BadRequest(friends.Error);
            }
            return StatusCode(200, friends.Value);
        }
        
        [Route("SendFriendRequest")]
        [HttpPost]
        public async Task<IActionResult> SendFriendRequest(int senderId, int receiverId)
        {
            Result<FriendRequest> request = await _userService.SendFriendRequest(senderId, receiverId);
            if (request.Failure)
            {
                _logger.LogError(request.Error);
                return BadRequest(request.Error);
            }
            return StatusCode(200, request.Value);
        }

        [Route("AcceptFriendRequest")]
        [HttpPost]
        public async Task<IActionResult> AcceptFriendRequest(int requestId)
        {
            Result<FriendRequest> user = await _userService.AcceptFriendRequest(requestId);
            if (user.Failure)
            {
                _logger.LogError(user.Error);
                return BadRequest(user.Error);
            }
            return StatusCode(200, user.Value);
        }

        [Route("GetPendingFriendRequests")]
        [HttpPost]
        public async Task<IActionResult> GetPendingFriendRequests(int userId)
        {
            Result<List<FriendRequest>> user = await _userService.GetPendingFriendRequests(userId);
            if (user.Failure)
            {
                _logger.LogError(user.Error);
                return BadRequest(user.Error);
            }
            return StatusCode(200, user.Value);
        }
    }
}
