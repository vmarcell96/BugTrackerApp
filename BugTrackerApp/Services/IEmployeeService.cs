using BugTrackerApp.Core.Model.Employees;

namespace BugTrackerApp.Services
{
    public interface IEmployeeService
    {
        public Task<List<EmployeeViewDto>> GetAllEmployees();

        public Task<EmployeeViewDto> AddNewEmployee(EmployeeCreateDto newEmployeeDto);

        public Task<EmployeeViewDto> GetEmployeeById(int employeeId);

        public Task DeleteEmployeeById(int employeeId);

        public Task<EmployeeViewDto> UpdateEmployee(EmployeeUpdateDto employeeUpdateDto);
    }
}
