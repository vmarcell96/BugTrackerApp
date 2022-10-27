using BugTrackerApp.Core.Model.Employees;
using BugTrackerApp.Core.Model.Users;

namespace BugTrackerApp.Services
{
    public interface IUserService
    {
        public Task<List<UserViewDto>> GetAllUsers();

        public Task<UserViewDto> AddNewUser(UserCreateDto newUserDto);

        public Task<UserViewDto> GetUserById(int userId);

        public Task DeleteUserById(int userId);

        public Task<UserViewDto> UpdateUser(UserUpdateDto userUpdateDto);

        public Task<UserLoginDto> GetLoginDtoByUserName(string username);
    }
}
