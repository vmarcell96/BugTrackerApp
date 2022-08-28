using EmployeeManagementApp.Core.Model.Employees;
using EmployeeManagementApp.Core.Model.Users;

namespace EmployeeManagementApp.Services
{
    public interface IUserService
    {
        public Task<List<UserViewDto>> GetAllUsers();

        public Task<UserViewDto> AddNewUser(UserCreateDto newUserDto);

        public Task<UserViewDto> GetUserById(int userId);

        public Task DeleteUserById(int userId);

        public Task<UserViewDto> UpdateUser(UserUpdateDto userUpdateDto);
    }
}
