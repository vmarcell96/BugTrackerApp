using BugTrackerApp.Core.Model.Projects;
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
            var projectViewDtos = ((List<Project>)user.ContributedProjects).ToProjectViewDto();
            var userView = new UserViewDto
            {
                Id = user.Id,
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Role = user.Role,
                ContributedProjects = projectViewDtos,
            };
            return userView;
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

        public static UserFriendDto ToUserFriendDto(this User user)
        {
            var friend = new UserFriendDto
            {
                UserId = user.Id,
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Role = user.Role,
            };
            return friend;
        }

        public static List<UserFriendDto> ToUserFriendDto(this List<User> users)
        {
            var userViews = new List<UserFriendDto>();
            foreach (var user in users)
            {
                userViews.Add(ToUserFriendDto(user));
            }
            return userViews;
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


        public static UserTeamMemberDto ToUserTeamMemberDto(this User user)
        {
            return new UserTeamMemberDto
            {
                UserId = user.Id,
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
            };
        }

        public static List<UserTeamMemberDto> ToUserTeamMemberDto(this List<User> users)
        {
            var userViews = new List<UserTeamMemberDto>();
            foreach (var user in users)
            {
                userViews.Add(ToUserTeamMemberDto(user));
            }
            return userViews;
        }
    }
}
