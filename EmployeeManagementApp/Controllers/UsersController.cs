using EmployeeManagementApp.Core.Model.Employees;
using EmployeeManagementApp.Core.Model.Users;
using EmployeeManagementApp.Services;
using EmployeeManagementApp.Services.PasswordHashers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly IUserService _userService;
        private readonly IPasswordHasher _passwordHasher;
        private readonly ILogger<UsersController> _logger;

        public UsersController(IUserService userService, IPasswordHasher passwordHasher, ILogger<UsersController> logger)
        {
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
            _passwordHasher = passwordHasher;
            _logger = logger;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> ListUsers()
        {
            try
            {
                var users = await _userService.GetAllUsers();
                return StatusCode(200, users);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [Authorize]
        [HttpGet("{id}", Name = "Getuser")]
        public async Task<IActionResult> GetUserById(int id)
        {
            try
            {
                var employee = await _userService.GetUserById(id);
                return StatusCode(200, employee);
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogError($"No user found with id: {id}.", ex);
                return NotFound($"User with ID:{id} not found.");
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> AddUser(UserCreateDto newuserDto)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    newuserDto.Password = _passwordHasher.HashPassword(newuserDto.Password);
                    var userViewDto = await _userService.AddNewUser(newuserDto);
                    return StatusCode(201, userViewDto);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError("Something went wrong when adding new user.");
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                await _userService.DeleteUserById(id);
                return StatusCode(200, true);
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogError($"No user found with id: {id}.", ex);
                return NotFound($"User with ID:{id} not found.");
            }
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(UserUpdateDto userUpdateDto)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var updateduserDto = await _userService.UpdateUser(userUpdateDto);
                    return StatusCode(200, updateduserDto);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError($"No user found with id: {userUpdateDto.ID}.", ex);
                return NotFound($"User with ID:{userUpdateDto.ID} not found.");
            }
        }
    }
}
