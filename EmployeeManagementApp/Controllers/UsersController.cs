using EmployeeManagementApp.Core.Model.Employees;
using EmployeeManagementApp.Core.Model.Users;
using EmployeeManagementApp.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
        }

        [HttpGet]
        public async Task<ActionResult<List<UserViewDto>>> Listusers()
        {
            return await _userService.GetAllUsers();
        }

        [HttpGet("{id}", Name = "Getuser")]
        public async Task<ActionResult<UserViewDto>> GetuserById(int id)
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

        [HttpPost]
        public async Task<ActionResult<UserViewDto>> AddUser(UserCreateDto newuserDto)
        {
            try
            {
                var userViewDto = await _userService.AddNewUser(newuserDto);
                return Ok(userViewDto);
            }
            catch (DbUpdateException)
            {
                return BadRequest("Something went wrong adding new user.");
            }
        }

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
