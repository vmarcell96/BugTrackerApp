using BugTrackerApp.Core.Model.Projects;
using BugTrackerApp.Data.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTrackerApp.Core.Model.Users
{
    public class UserTeamMemberDto
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public DateTime JoinDate { get; } = DateTime.Now;
    }
}
