using BugTrackerApp.Core.Extensions;
using BugTrackerApp.Core.Model;
using BugTrackerApp.Core.Model.Users;
using BugTrackerApp.Data;
using BugTrackerApp.Data.Entity;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;


namespace BugTrackerApp.Services
{
    public class UserService : IUserService
    {
        private readonly BugTrackerAppContext _context;
        private readonly ILogger<UserService> _logger;

        public UserService(BugTrackerAppContext context, ILogger<UserService> logger)
        {
            _context = context;
            _logger = logger;
        }

        private async Task<User?> GetUserEntityById(int id)
        {
            _logger.LogDebug("Logic for getting single user ({id})", id);

            var user = await _context.Users
                .Include(u => u.ContributedProjects)
                    .ThenInclude(p => p.Users)
                .Include(u => u.ContributedProjects)
                    .ThenInclude(p => p.Bugs)
                .SingleOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<Result<List<UserViewDto>>> GetAllUsers()
        {
            try
            {
                var users = await _context.Users
                    .Include(u => u.ContributedProjects)
                        .ThenInclude(p => p.Users)
                    .Include(u => u.ContributedProjects)
                        .ThenInclude(p => p.Bugs)
                    .ToListAsync();

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
                var user = await GetUserEntityById(userId);
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
            catch (Exception e)
            {
                return Result.Fail<UserViewDto>(e.Message);
            }
            
        }

        public async Task<Result> DeleteUserById(int userId)
        {
            try
            {
                var user = await GetUserEntityById(userId);
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
                .Include(u => u.ContributedProjects)
                    .ThenInclude(p => p.Users)
                .Include(u => u.ContributedProjects)
                    .ThenInclude(p => p.Bugs)
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
                var user = await GetUserEntityById(userId);
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

        //userUpdateAdminDto - when the admin user wants to change data of a user
        public async Task<Result<UserViewDto>> UpdateUserWithAdmin(UserUpdateAdminDto userUpdateAdminDto)
        {
            try
            {
                var user = await GetUserEntityById(userUpdateAdminDto.Id);
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
        //userUpdateDto - when the user wants to change data
        public async Task<Result<UserViewDto>> UpdateUser(UserUpdateDto userUpdateDto)
        {
            try
            {
                var user = await GetUserEntityById(userUpdateDto.Id);
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
                var user = await GetUserEntityById(userId);
                //User not found with the provided Id
                if (user == null)
                {
                    return Result.Fail<List<UserViewDto>>($"User with id={userId} not found.");
                }
                //Finding contracts where user is either receiver or sender and accepted
                var requests = _context.FriendRequests.Where(fc =>
                    fc.SenderId == userId && fc.IsAccepted == true || fc.ReceiverId == userId && fc.IsAccepted == true);
                //Select users from the contracts where they were the receivers
                var friends1 = await requests.Where(fc => fc.ReceiverId != userId).Select(fc => fc.ReceiverId).ToListAsync();
                //Select users from the contracts where they were the senders
                var friends2 = await requests.Where(fc => fc.SenderId != userId).Select(fc => fc.SenderId).ToListAsync();

                var friendIdLists = friends1.Concat(friends2).ToList();

                var friends = await _context.Users.Where(u => friendIdLists.Contains(u.Id)).ToListAsync();

                return Result.Ok(friends.ToUserViewDto());
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

        public async Task<Result<List<FriendRequest>>> GetPendingFriendRequests(int userId)
        {
            try
            {
                var user = await GetUserEntityById(userId);
                //User not found with the provided Id
                if (user == null)
                {
                    return Result.Fail<List<FriendRequest>>($"User with id={userId} not found.");
                }
                //Finding contracts where user is either receiver or sender and not accepted
                var requests = await _context.FriendRequests.Where(fc =>
                    fc.SenderId == userId && fc.IsAccepted == false || fc.ReceiverId == userId && fc.IsAccepted == false).ToListAsync();

                return Result.Ok(requests);
            }
            catch (SqlException e)
            {
                return Result.Fail<List<FriendRequest>>(e.Message);
            }
            catch (DbUpdateException e)
            {
                return Result.Fail<List<FriendRequest>>(e.Message);
            }
            catch (Exception e)
            {   
                return Result.Fail<List<FriendRequest>>(e.Message);
            }
        }

        public async Task<Result<FriendRequest>> SendFriendRequest(int senderId, int receiverId)
        {
            try
            {
                var sender = await GetUserEntityById(senderId);
                //User not found with the provided Id
                if (sender == null)
                {
                    return Result.Fail<FriendRequest>($"User(id={senderId}) you are trying to send friend request with not found.");
                }

                var receiver = await GetUserEntityById(receiverId);
                //User not found with the provided Id
                if (receiver == null)
                {
                    return Result.Fail<FriendRequest>($"User(id={receiverId}) you are trying to send friend request to not found.");
                }
                //Check if the same request already happened before
                var sameRequestInDb =
                    await _context.FriendRequests.FirstOrDefaultAsync(fc => fc.ReceiverId == receiver.Id && fc.SenderId == sender.Id);
                if (sameRequestInDb != null)
                {
                    if (sameRequestInDb.IsAccepted)
                    {
                        return Result.Fail<FriendRequest>($"The user you are sending friend request to is already your friend.");
                    }
                    return Result.Fail<FriendRequest>($"You already sent a friend request to {receiver.UserName}.");
                }
                //Check if receiver user already sent a request to sending user
                var requestInDb =
                    await _context.FriendRequests.FirstOrDefaultAsync(fc => fc.ReceiverId == sender.Id && fc.SenderId == receiver.Id);
                if (requestInDb != null)
                {
                    if (requestInDb.IsAccepted)
                    {
                        return Result.Fail<FriendRequest>($"The user you are sending friend request to is already your friend.");
                    }
                    return Result.Fail<FriendRequest>($"{receiver.UserName} has already sent a friend request to you, accept it.");
                }
                //Neither one of the users has sent a request to one another

                var newContract = new FriendRequest()
                {
                    ReceiverId = receiver.Id,
                    SenderId = sender.Id,
                    IsAccepted = false
                };
                await _context.FriendRequests.AddAsync(newContract);
                await _context.SaveChangesAsync();
                return Result.Ok(newContract);
            }
            catch (SqlException e)
            {
                return Result.Fail<FriendRequest>(e.Message);
            }
            catch (DbUpdateException e)
            {
                return Result.Fail<FriendRequest>(e.Message);
            }
            catch (Exception e)
            {
                return Result.Fail<FriendRequest>(e.Message);
            }
        }

        public async Task<Result<FriendRequest>> AcceptFriendRequest(int requestId)
        {
            try
            {
                var request = await _context.FriendRequests.SingleOrDefaultAsync(r => r.Id == requestId);
                //Request not found with the provided Id
                if (request == null)
                {
                    return Result.Fail<FriendRequest>($"Request with id={requestId} not found.");
                }
                //Somehow the request is already accepted (it's a problem if it is)
                if (request.IsAccepted)
                {
                    return Result.Fail<FriendRequest>($"Request with id={requestId} already accepted.");
                }
                //Changing IsAccepted prop to true
                request.IsAccepted = true;
                await _context.SaveChangesAsync();

                return Result.Ok(request);
            }
            catch (SqlException e)
            {
                return Result.Fail<FriendRequest>(e.Message);
            }
            catch (DbUpdateException e)
            {
                return Result.Fail<FriendRequest>(e.Message);
            }
            catch (Exception e)
            {
                return Result.Fail<FriendRequest>(e.Message);
            }
        }
    }
}
