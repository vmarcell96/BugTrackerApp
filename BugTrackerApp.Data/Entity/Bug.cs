using System.ComponentModel.DataAnnotations;

namespace BugTrackerApp.Data.Entity
{
    public class Bug
    {
        public int Id { get; set; }
        [Required]
        public int ProjectId { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Details { get; set; }
        public int AssigneeId { get; set; }
        [Required]
        public int Priority { get; set; }
        [Required]
        public bool IsFixed { get; set; }
        [Required]
        public int CreatorId { get; set; }
        public DateTime PostDate { get; set; } = DateTime.Now;
    }
}
