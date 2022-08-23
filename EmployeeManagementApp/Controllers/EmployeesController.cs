using EmployeeManagementApp.Core.Model.Employees;
using EmployeeManagementApp.Services;
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

        [HttpGet]
        public async Task<ActionResult<List<EmployeeViewDto>>> ListEmployees()
        {
            return await _employeeService.GetAllEmployees();
        }

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

        [HttpPost("AddEmployee")]
        public async Task<ActionResult<EmployeeViewDto>> AddEmployee(EmployeeCreateDto newEmployeeDto)
        {
            try
            {
                var employeeViewDto = await _employeeService.AddNewEmployee(newEmployeeDto);
                return CreatedAtRoute("AddEmployee", new { id = employeeViewDto.ID }, employeeViewDto);
            }
            catch (DbUpdateException)
            {
                return BadRequest("Something went wrong adding new employee.");
            }
        }
    }
}
