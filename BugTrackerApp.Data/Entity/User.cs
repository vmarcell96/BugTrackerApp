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

        private readonly List<Project> _contributedProjects;
        private List<User> _friends;
        public List<Project> ContributedProjects => _contributedProjects;
        public List<User> Friends => _friends;

        public void AddContributedProject(Project project)
        {
            _contributedProjects.Add(project);
        }
        public void AddFriend(User user)
        {
            this._friends.Add(user);
        }



    }
}
