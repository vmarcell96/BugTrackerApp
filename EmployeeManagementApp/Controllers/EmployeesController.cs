using EmployeeManagementApp.Core.Model.Employees;
using EmployeeManagementApp.Services;
using Microsoft.AspNetCore.Mvc;

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
    }
}
