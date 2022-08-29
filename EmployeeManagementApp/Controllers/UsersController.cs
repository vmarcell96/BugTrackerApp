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

        public UsersController(IUserService userService, IPasswordHasher passwordHasher)
        {
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
            _passwordHasher = passwordHasher;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<UserViewDto>>> ListUsers()
        {
            return await _userService.GetAllUsers();
        }

        [Authorize]
        [HttpGet("{id}", Name = "Getuser")]
        public async Task<ActionResult<UserViewDto>> GetUserById(int id)
        {
            try
            {
                return await _userService.GetUserById(id);
            }
            catch (InvalidOperationException)
            {
                return NotFound($"user with ID:{id} not found.");
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<UserViewDto>> AddUser(UserCreateDto newuserDto)
        {
            try
            {
                newuserDto.Password = _passwordHasher.HashPassword(newuserDto.Password);
                var userViewDto = await _userService.AddNewUser(newuserDto);
                return Ok(userViewDto);
            }
            catch (DbUpdateException)
            {
                return BadRequest("Something went wrong adding new user.");
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            try
            {
                await _userService.DeleteUserById(id);
                return NoContent();
            }
            catch (InvalidOperationException)
            {
                return NotFound($"User with ID:{id} not found.");
            }
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<UserViewDto>> UpdateUser(UserUpdateDto userUpdateDto)
        {
            try
            {
                var updateduserDto = await _userService.UpdateUser(userUpdateDto);
                return updateduserDto;
            }
            catch (DbUpdateException)
            {
                return NotFound($"User with ID:{userUpdateDto.ID} not found.");
            }
        }
    }
}
