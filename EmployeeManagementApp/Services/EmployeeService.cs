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

        public async Task<EmployeeViewDto> AddNewEmployee(EmployeeCreateDto newEmployeeDto)
        {
            Employee entity = newEmployeeDto.ToEmployeeEntity();
            await _employeeRepository.Add(entity);
            return entity.ToEmployeeViewDto();
        }

        public async Task DeleteEmployeeById(int employeeId)
        {
            await _employeeRepository.Delete(employeeId);
        }

        public async Task<List<EmployeeViewDto>> GetAllEmployees()
        {
            var employees = await _employeeRepository.GetAll();
            return employees.ToEmployeeViewDto();
        }

        public async Task<EmployeeViewDto> GetEmployeeById(int employeeId)
        {
            var entity = await _employeeRepository.Get(employeeId);
            return entity.ToEmployeeViewDto();
        }

        public async Task<EmployeeViewDto> UpdateEmployee(EmployeeUpdateDto employeeUpdateDto)
        {
            var entity = await _employeeRepository.Update(employeeUpdateDto.ToEmployeeEntity());
            return entity.ToEmployeeViewDto();
        }
    }
}
