using EmployeeManagementApp.Core.Extensions;
using EmployeeManagementApp.Core.Model.Users;
using EmployeeManagementApp.Data.Entity;
using EmployeeManagementApp.Data.Repositories;

namespace EmployeeManagementApp.Services
{
    public class UserService : IUserService
    {
        private IRepository<User> _userRepository;

        public UserService(IRepository<User> userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UserViewDto> AddNewUser(UserCreateDto newUserDto)
        {
            User entity = newUserDto.ToUserEntity();
            await _userRepository.Add(entity);
            return entity.ToUserViewDto();
        }

        public async Task DeleteUserById(int userId)
        {
            await _userRepository.Delete(userId);
        }

        public async Task<List<UserViewDto>> GetAllUsers()
        {
            var users = await _userRepository.GetAll();
            return users.ToUserViewDto();
        }

        public async Task<UserViewDto> GetUserById(int userId)
        {
            var entity = await _userRepository.Get(userId);
            return entity.ToUserViewDto();
        }

        public async Task<UserViewDto> UpdateUser(UserUpdateDto userUpdateDto)
        {
            var entity = await _userRepository.Update(userUpdateDto.ToUserEntity());
            return entity.ToUserViewDto();
        }
    }
}
