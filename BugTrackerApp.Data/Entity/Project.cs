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

        private readonly IList<UserTeamMember> _teamMembers = new List<UserTeamMember>();
        public IReadOnlyList<UserTeamMember> TeamMembers => (IReadOnlyList<UserTeamMember>)_teamMembers;

        private readonly IList<Bug> _bugs = new List<Bug>();
        public IReadOnlyList<Bug> Bugs => (IReadOnlyList<Bug>)_bugs;      

        public void AddTeamMember(UserTeamMember teamMember)
        {
            teamMember.ProjectId = Id;
            _teamMembers.Add(teamMember);
        }

        public void AddBug(Bug bug)
        {
            _bugs.Add(bug);
        }
    }
}
