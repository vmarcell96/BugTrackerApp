using BugTrackerApp.Data.Entity;
using Microsoft.EntityFrameworkCore;

namespace BugTrackerApp.Data
{
    public class BugTrackerAppContext : DbContext
    {
        public BugTrackerAppContext(DbContextOptions<BugTrackerAppContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Project> Projects { get; set; }
    }
}
