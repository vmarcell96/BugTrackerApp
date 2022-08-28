using EmployeeManagementApp.Core.Model.Employees;
using EmployeeManagementApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : Controller
    {
        private readonly IEmployeeService _employeeService;

        public EmployeesController(IEmployeeService employeeService)
        {
            _employeeService = employeeService ?? throw new ArgumentNullException(nameof(employeeService));
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<EmployeeViewDto>>> ListEmployees()
        {
            return await _employeeService.GetAllEmployees();
        }

        [Authorize]
        [HttpGet("{id}", Name = "GetEmployee")]
        public async Task<ActionResult<EmployeeViewDto>> GetEmployeeById(int id)
        {
            try
            {
                return await _employeeService.GetEmployeeById(id);
            }
            catch (InvalidOperationException)
            {
                return NotFound($"Employee with ID:{id} not found.");
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<EmployeeViewDto>> AddEmployee(EmployeeCreateDto newEmployeeDto)
        {
            try
            {
                var employeeViewDto = await _employeeService.AddNewEmployee(newEmployeeDto);
                return Ok(employeeViewDto);
            }
            catch (DbUpdateException)
            {
                return BadRequest("Something went wrong adding new employee.");
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEmployee(int id)
        {
            try
            {
                await _employeeService.DeleteEmployeeById(id);
                return NoContent();
            }
            catch (InvalidOperationException)
            {
                return NotFound($"Employee with ID:{id} not found.");
            }
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<EmployeeViewDto>> UpdateEmployee(EmployeeUpdateDto employeeUpdateDto)
        {
            try
            {
                var updatedEmployeeDto = await _employeeService.UpdateEmployee(employeeUpdateDto);
                return updatedEmployeeDto;
            }
            catch (DbUpdateException)
            {
                return NotFound($"Employee with ID:{employeeUpdateDto.ID} not found.");
            }
        }
    }
}
