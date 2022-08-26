using EmployeeManagementApp.Core.Model.Employees;

namespace EmployeeManagementApp.Services
{
    public interface IUserService
    {
        public Task<List<EmployeeViewDto>> GetAllUsers();

        public Task<EmployeeViewDto> AddNewUser(EmployeeCreateDto newEmployeeDto);

        public Task<EmployeeViewDto> GetUserById(int employeeId);

        public Task DeleteUserById(int employeeId);

        public Task<EmployeeViewDto> UpdateUser(EmployeeUpdateDto employeeUpdateDto);
    }
}
