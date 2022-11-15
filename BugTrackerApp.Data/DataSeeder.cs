using BugTrackerApp.Data.Entity;
using Microsoft.EntityFrameworkCore;

namespace BugTrackerApp.Data
{
    public class DataSeeder
    {
        private readonly BugTrackerAppContext _context;

        public DataSeeder(BugTrackerAppContext context)
        {
            _context = context;
        }

        public void Initialize()
        {
            _context.Database.Migrate();

            if (!_context.Users.Any())
            {
                

                var users = new User[]
                {
                new()
                {
                    FirstName = "John",
                    LastName = "Smith",
                    UserName = "Admin",
                    HashedPassword = BCrypt.Net.BCrypt.HashPassword("12345678"),
                    Role = "Admin",
                    Friends = {  },
                    ContributedProjects = {  }
            },
                new()
                {
                    FirstName = "Anna",
                    LastName = "Faro",
                    UserName = "User",
                    HashedPassword = BCrypt.Net.BCrypt.HashPassword("12345678"),
                    Role = "User",
                    Friends = {  },
                    ContributedProjects = {  }
                },
                };

                _context.Users.AddRange(users);
                _context.SaveChanges();
            }

        }
    }
}
