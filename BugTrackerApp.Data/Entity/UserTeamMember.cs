using System.ComponentModel.DataAnnotations;

namespace BugTrackerApp.Data.Entity
{
    public class UserTeamMember
    {
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public int ProjectId { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public DateTime JoinDate { get; } = DateTime.Now;

    }
}
