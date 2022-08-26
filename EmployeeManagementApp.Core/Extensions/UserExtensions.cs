using EmployeeManagementApp.Core.Model.Users;
using EmployeeManagementApp.Data.Entity;


namespace EmployeeManagementApp.Core.Extensions
{
    public static class UserExtensions
    {
        public static User ToUserEntity(this UserCreateDto userCreateData)
        {
            return new User
            {
                UserName = userCreateData.UserName,
                FirstName = userCreateData.FirstName,
                LastName = userCreateData.LastName,
                HashedPassword = userCreateData.Password,
                Role = userCreateData.Role,
            };
        }
        public static User ToUserEntity(this UserUpdateDto userUpdateData)
        {
            return new User
            {
                ID = userUpdateData.ID,
                FirstName = userUpdateData.FirstName,
                LastName = userUpdateData.LastName,
                HashedPassword = userUpdateData.Password,
            };
        }

        public static UserViewDto ToUserView(this User user)
        {
            return new UserViewDto
            {
                ID = user.ID,
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Role = user.Role,
            };
        }

        public static UserLoginDto ToUserLoginDto(this User user)
        {
            return new UserLoginDto
            {
                ID = user.ID,
                Role = user.Role,
                UserName = user.UserName,
                HashedPassword = user.HashedPassword,
            };
        }
    }
}
