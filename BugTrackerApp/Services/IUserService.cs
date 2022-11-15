using BugTrackerApp.Core.Model;
using BugTrackerApp.Core.Model.Users;

namespace BugTrackerApp.Services
{
    public interface IUserService
    {
        Task<Result<List<UserViewDto>>> GetAllUsers();

        Task<Result<UserViewDto>> AddNewUser(UserCreateDto newUserDto);

        Task<Result<UserViewDto>> GetUserById(int userId);

        Task<Result> DeleteUserById(int userId);

        Task<Result<UserViewDto>> UpdateUser(UserUpdateDto userUpdateDto);

        Task<Result<UserLoginDto>> GetLoginDtoByUserName(string username);

        Task<Result<UserLoginDto>> GetLoginDtoByUserId(int userId);
        Task<Result<UserViewDto>> UpdateUserWithAdmin(UserUpdateAdminDto userUpdateAdminDto);
        Task<Result<List<UserViewDto>>> GetFriends(int userId);
        Task<Result<UserViewDto>> AddFriend(int userId, int friendId);
    }
}
