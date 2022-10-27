using BugTrackerApp.Core.Extensions;
using BugTrackerApp.Core.Model.Users;
using BugTrackerApp.Data.Entity;
using BugTrackerApp.Data.Repositories;

namespace BugTrackerApp.Services
{
    public class UserService : IUserService
    {
        private IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
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

        public async Task<UserLoginDto> GetLoginDtoByUserName(string userName)
        {
            var user = await _userRepository.GetByUserName(userName);

            return user?.ToUserLoginDto();
        }
    }
}
