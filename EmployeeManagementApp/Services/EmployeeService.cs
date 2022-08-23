using EmployeeManagementApp.Core.Extensions;
using EmployeeManagementApp.Core.Model.Employees;
using EmployeeManagementApp.Data.Entity;
using EmployeeManagementApp.Data.Repositories;

namespace EmployeeManagementApp.Services
{
    public class EmployeeService : IEmployeeService
    {
        private IRepository<Employee> _employeeRepository;

        public EmployeeService(IRepository<Employee> employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public Task<EmployeeViewDto> AddNewEmployee(EmployeeViewDto newEmployeeDto)
        {
            throw new NotImplementedException();
        }

        public Task DeleteEmployeeById(int employeeId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<EmployeeViewDto>> GetAllEmployees()
        {
            var employees = await _employeeRepository.GetAll();
            return employees.ToEmployeeViewDto();
        }

        public Task<EmployeeViewDto> GetEmployeeById(int employeeId)
        {
            throw new NotImplementedException();
        }

        public Task<EmployeeViewDto> UpdateEmployee(EmployeeUpdateDto employeeUpdateDto)
        {
            throw new NotImplementedException();
        }
    }
}
