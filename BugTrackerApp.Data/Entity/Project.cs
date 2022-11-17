using Azure;
using System.ComponentModel.DataAnnotations;

namespace BugTrackerApp.Data.Entity
{
    public class Project
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public bool IsPublic { get; set; }
        [Required]
        public int CreatorId { get; set; }

        private readonly IList<User> _users = new List<User>();
        public IReadOnlyList<User> Users => (IReadOnlyList<User>)_users;

        private readonly IList<Bug> _bugs = new List<Bug>();
        public IReadOnlyList<Bug> Bugs => (IReadOnlyList<Bug>)_bugs;

        public void AddTeamMember(User user)
        {
            _users.Add(user);
        }
        public void AddBug(Bug bug)
        {
            _bugs.Add(bug);
        }
    }
}
