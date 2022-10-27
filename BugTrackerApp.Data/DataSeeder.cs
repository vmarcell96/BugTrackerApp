using BugTrackerApp.Data.Entity;

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
            _context.Database.EnsureCreated();

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
                    ContributedProjects = new List<Project>()
            },
                new()
                {
                    FirstName = "Anna",
                    LastName = "Faro",
                    UserName = "User",
                    HashedPassword = BCrypt.Net.BCrypt.HashPassword("12345678"),
                    Role = "User",
                    ContributedProjects = new List<Project>( )
                },
                };

                _context.Users.AddRange(users);
                _context.SaveChanges();
            }

        }
    }
}
