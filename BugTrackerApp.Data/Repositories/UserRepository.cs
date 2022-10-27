using BugTrackerApp.Data.Entity;
using Microsoft.EntityFrameworkCore;

namespace BugTrackerApp.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly BugTrackerAppContext _context;

        public UserRepository(BugTrackerAppContext context)
        {
            _context = context;
        }

        public async Task Add(User entity)
        {
            await _context.Users.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            _context.Users.Remove(await Get(id));
            await _context.SaveChangesAsync();
        }

        public async Task<User> Get(int id)
        {
            var user = await _context.Users
                .Include(u => u.ContributedProjects)
                    .ThenInclude(p => p.TeamMembers)
                .SingleOrDefaultAsync(user => user.Id == id);
            return user;
        }

        public async Task<List<User>> GetAll()
        {
            return await _context.Users
                .Include(u => u.ContributedProjects)
                    .ThenInclude(p => p.TeamMembers)
                .AsNoTracking().ToListAsync();
        }

        public async Task<User> Update(User entity)
        {
            var userToUpdate = await Get(entity.Id);
            userToUpdate.HashedPassword = entity.HashedPassword;
            userToUpdate.FirstName = entity.FirstName;
            userToUpdate.LastName = entity.LastName;
            await _context.SaveChangesAsync();
            return userToUpdate;
        }

        public async Task<User> GetByUserName(string username)
        {
            var user = await _context.Users.AsNoTracking().FirstOrDefaultAsync(user => user.UserName == username);
            return user;
        }
    }
}
