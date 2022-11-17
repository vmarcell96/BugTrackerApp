using System.ComponentModel.DataAnnotations;
namespace BugTrackerApp.Data.Entity
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string HashedPassword { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Role { get; set; }

        private readonly IList<Project> _contributedProjects = new List<Project>();
        public IReadOnlyList<Project> ContributedProjects => (IReadOnlyList<Project>)_contributedProjects;

        
    }
}
