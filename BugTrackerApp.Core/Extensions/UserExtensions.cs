using BugTrackerApp.Core.Model.Users;
using BugTrackerApp.Data.Entity;


namespace BugTrackerApp.Core.Extensions
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
                HashedPassword = BCrypt.Net.BCrypt.HashPassword(userCreateData.Password),
                Role = userCreateData.Role,
            };
        }

        public static UserViewDto ToUserViewDto(this User user)
        {
            return new UserViewDto
            {
                Id = user.Id,
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Role = user.Role,
                ContributedProjects = user.ContributedProjects
            };
        }

        public static List<UserViewDto> ToUserViewDto(this List<User> users)
        {
            var userViews = new List<UserViewDto>();
            foreach (var user in users)
            {
                userViews.Add(ToUserViewDto(user));
            }
            return userViews;
        }

        public static UserLoginDto ToUserLoginDto(this User user)
        {
            return new UserLoginDto
            {
                Id = user.Id,
                Role = user.Role,
                UserName = user.UserName,
                HashedPassword = user.HashedPassword,
            };
        }

        public static UserAuthenticationDto ToUserAuthenticationDto(this UserLoginDto userLoginDto)
        {
            return new UserAuthenticationDto
            {
                Id = userLoginDto.Id,
                UserName = userLoginDto.UserName,
                Role = userLoginDto.Role,
            };
        }

        public static UserAuthenticationDto ToUserAuthenticationDto(this UserViewDto userViewDto)
        {
            return new UserAuthenticationDto
            {
                Id = userViewDto.Id,
                UserName = userViewDto.UserName,
                Role = userViewDto.Role,
            };
        }

        public static UserTeamMember ToUserTeamMember(this User user)
        {
            return new UserTeamMember
            {
                UserId = user.Id,
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
            };
        }
    }
}
