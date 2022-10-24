using EmployeeManagementApp.Core.Model.Users;
using EmployeeManagementApp.Services;
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
        private readonly ILogger<UsersController> _logger;

        public UsersController(IUserService userService, ILogger<UsersController> logger)
        {
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
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

        //[Authorize]
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            try
            {
                var employee = await _userService.GetUserById(id);
                if (employee == null)
                {
                    return NotFound($"User with id:{id} not found");
                }
                return StatusCode(200, employee);
            }
            catch (Exception ex)
            {
                _logger.LogError($"No user found with Id: {id}.", ex);
                return BadRequest();
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> AddUser(UserCreateDto newUserDto)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var userViewDto = await _userService.AddNewUser(newUserDto);
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
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                await _userService.DeleteUserById(id);
                return StatusCode(200, true);
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogError($"No user found with Id: {id}.", ex);
                return NotFound($"User with Id:{id} not found.");
            }
        }

        [Authorize]
        [HttpPut]
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
                _logger.LogError($"No user found with Id: {userUpdateDto.Id}.", ex);
                return NotFound($"User with Id:{userUpdateDto.Id} not found.");
            }
        }
    }
}
