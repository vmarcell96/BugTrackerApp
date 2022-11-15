using BugTrackerApp.Core.Extensions;
using BugTrackerApp.Core.Model;
using BugTrackerApp.Core.Model.Users;
using BugTrackerApp.Data;
using BugTrackerApp.Data.Entity;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
//using System.Data.Entity.Core;
//using System.Data.Entity.Validation;

namespace BugTrackerApp.Services
{
    public class UserService : IUserService
    {
        private readonly BugTrackerAppContext _context;

        public UserService(BugTrackerAppContext context)
        {
            _context = context;
        }
        public async Task<Result<List<UserViewDto>>> GetAllUsers()
        {
            try
            {
                var users = await _context.Users
                    .Include(u => u.Friends)
                    .Include(u => u.ContributedProjects)
                    .ThenInclude(p => p.TeamMembers)
                    .AsNoTracking().ToListAsync();

                return Result.Ok(users.ToUserViewDto());
            }
            catch (SqlException e)
            {
                return Result.Fail<List<UserViewDto>>(e.Message);
            }
            catch (Exception e)
            {
                return Result.Fail<List<UserViewDto>>(e.Message);
            }

        }
        public async Task<Result<UserViewDto>> GetUserById(int userId)
        {
            try
            {
                var user = await _context.Users
                    .Include(u => u.Friends)
                    .Include(u => u.ContributedProjects)
                    .ThenInclude(p => p.TeamMembers)
                    .SingleOrDefaultAsync(u => u.Id == userId);
                if (user == null)
                {
                    return Result.Fail<UserViewDto>($"User with id={userId} not found.");
                }
                return Result.Ok(user.ToUserViewDto());
            }
            catch (SqlException e)
            {
                return Result.Fail<UserViewDto>(e.Message);
            }
            catch (Exception e)
            {
                return Result.Fail<UserViewDto>(e.Message);
            }

        }

        public async Task<Result<UserViewDto>> AddNewUser(UserCreateDto newUserDto)
        {
            try
            {
                User entity = newUserDto.ToUserEntity();
                await _context.Users.AddAsync(entity);
                await _context.SaveChangesAsync();
                return Result.Ok(entity.ToUserViewDto());
            }
            catch (SqlException e)
            {
                return Result.Fail<UserViewDto>(e.Message);
            }
            catch (DbUpdateException e)
            {
                return Result.Fail<UserViewDto>(e.Message);
            }
            //catch (EntityCommandExecutionException e)
            //{
            //    return Result.Fail<UserViewDto>(e.Message);
            //}
            //catch (DbEntityValidationException e)
            //{
            //    return Result.Fail<UserViewDto>(e.Message);
            //}
            catch (Exception e)
            {
                return Result.Fail<UserViewDto>(e.Message);
            }
            
        }

        public async Task<Result> DeleteUserById(int userId)
        {
            try
            {
                var user = await _context.Users
                    .Include(u => u.Friends)
                    .Include(u => u.ContributedProjects)
                    .ThenInclude(p => p.TeamMembers)
                    .SingleOrDefaultAsync(u => u.Id == userId);
                if (user == null)
                {
                    return Result.Fail<UserViewDto>($"User with id={userId} not found.");
                }
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
                return Result.Ok();
            }
            catch (SqlException e)
            {
                return Result.Fail(e.Message);
            }
            catch (DbUpdateException e)
            {
                return Result.Fail(e.Message);
            }
            catch (Exception e)
            {
                return Result.Fail(e.Message);
            }
        }




        public async Task<Result<UserLoginDto>> GetLoginDtoByUserName(string userName)
        {
            try
            {
                var user = await _context.Users
                    .Include(u => u.Friends)
                    .Include(u => u.ContributedProjects)
                    .ThenInclude(p => p.TeamMembers)
                    .SingleOrDefaultAsync(u => u.UserName == userName);
                if (user == null)
                {
                    return Result.Fail<UserLoginDto>($"User with username={userName} not found.");
                }

                return Result.Ok(user.ToUserLoginDto());
            }
            catch (SqlException e)
            {
                return Result.Fail<UserLoginDto>(e.Message);
            }
            catch (Exception e)
            {
                return Result.Fail<UserLoginDto>(e.Message);
            }
        }

        public async Task<Result<UserLoginDto>> GetLoginDtoByUserId(int userId)
        {
            try
            {
                var user = await _context.Users
                    .Include(u => u.Friends)
                    .Include(u => u.ContributedProjects)
                    .ThenInclude(p => p.TeamMembers)
                    .SingleOrDefaultAsync(u => u.Id == userId);
                if (user == null)
                {
                    return Result.Fail<UserLoginDto>($"User with id={userId} not found.");
                }

                return Result.Ok(user.ToUserLoginDto());
            }
            catch (SqlException e)
            {
                return Result.Fail<UserLoginDto>(e.Message);
            }
            catch (Exception e)
            {
                return Result.Fail<UserLoginDto>(e.Message);
            }
        }

        public async Task<Result<UserViewDto>> UpdateUserWithAdmin(UserUpdateAdminDto userUpdateAdminDto)
        {
            try
            {
                var user = await _context.Users
                    .Include(u => u.Friends)
                    .Include(u => u.ContributedProjects)
                    .ThenInclude(p => p.TeamMembers)
                    .SingleOrDefaultAsync(u => u.Id == userUpdateAdminDto.Id);
                if (user == null)
                {
                    return Result.Fail<UserViewDto>($"User with id={userUpdateAdminDto.Id} not found.");
                }
                user.UserName = userUpdateAdminDto.UserName;
                user.FirstName = userUpdateAdminDto.FirstName;
                user.LastName = userUpdateAdminDto.LastName;
                user.Role = userUpdateAdminDto.Role;
                await _context.SaveChangesAsync();
                return Result.Ok(user.ToUserViewDto());

            }
            catch (SqlException e)
            {
                return Result.Fail<UserViewDto>(e.Message);
            }
            catch (DbUpdateException e)
            {
                return Result.Fail<UserViewDto>(e.Message);
            }
            catch (Exception e)
            {
                return Result.Fail<UserViewDto>(e.Message);
            }
        }
        public async Task<Result<UserViewDto>> UpdateUser(UserUpdateDto userUpdateDto)
        {
            try
            {
                var user = await _context.Users
                    .Include(u => u.Friends)
                    .Include(u => u.ContributedProjects)
                    .ThenInclude(p => p.TeamMembers)
                    .SingleOrDefaultAsync(u => u.Id == userUpdateDto.Id);
                if (user == null)
                {
                    return Result.Fail<UserViewDto>($"User with id={userUpdateDto.Id} not found.");
                }
                user.UserName = userUpdateDto.UserName;
                user.FirstName = userUpdateDto.FirstName;
                user.LastName = userUpdateDto.LastName;
                await _context.SaveChangesAsync();
                return Result.Ok(user.ToUserViewDto());

            }
            catch (SqlException e)
            {
                return Result.Fail<UserViewDto>(e.Message);
            }
            catch (DbUpdateException e)
            {
                return Result.Fail<UserViewDto>(e.Message);
            }
            catch (Exception e)
            {
                return Result.Fail<UserViewDto>(e.Message);
            }
        }

        public async Task<Result<List<UserViewDto>>> GetFriends(int userId)
        {
            try
            {
                var user = await _context.Users
                    .Include(u => u.Friends)
                    .Include(u => u.ContributedProjects)
                    .ThenInclude(p => p.TeamMembers)
                    .SingleOrDefaultAsync(u => u.Id == userId);
                //User not found with the provided Id
                if (user == null)
                {
                    return Result.Fail<List<UserViewDto>>($"User with id={userId} not found.");
                }
                return Result.Ok(user.Friends.ToUserViewDto());
            }
            catch (SqlException e)
            {
                return Result.Fail<List<UserViewDto>>(e.Message);
            }
            catch (DbUpdateException e)
            {
                return Result.Fail<List<UserViewDto>>(e.Message);
            }
            catch (Exception e)
            {
                return Result.Fail<List<UserViewDto>>(e.Message);
            }
        }

        public async Task<Result<UserViewDto>> AddFriend(int userId, int friendId)
        {
            try
            {
                var user = await _context.Users
                    .Include(u => u.Friends)
                    .Include(u => u.ContributedProjects)
                    .ThenInclude(p => p.TeamMembers)
                    .SingleOrDefaultAsync(u => u.Id == userId);
                //User not found with the provided Id
                if (user == null)
                {
                    return Result.Fail<UserViewDto>($"User with id={userId} not found.");
                }

                var friend = await _context.Users
                    .Include(u => u.Friends)
                    .Include(u => u.ContributedProjects)
                    .ThenInclude(p => p.TeamMembers)
                    .SingleOrDefaultAsync(u => u.Id == friendId);
                //User not found with the provided Id
                if (friend == null)
                {
                    return Result.Fail<UserViewDto>($"User(friend) with id={friendId} not found.");
                }

                //Both users are found
                //Currently only the friend user being added to the user's friend list
                //No pending request implemented yet
                
                user.AddFriend(friend);
                return Result.Ok(user.ToUserViewDto());
            }
            catch (SqlException e)
            {
                return Result.Fail<UserViewDto>(e.Message);
            }
            catch (DbUpdateException e)
            {
                return Result.Fail<UserViewDto>(e.Message);
            }
            catch (Exception e)
            {
                return Result.Fail<UserViewDto>(e.Message);
            }
        }
    }
}
