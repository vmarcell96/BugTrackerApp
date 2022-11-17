using BugTrackerApp.Core.Model.Projects;
using BugTrackerApp.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTrackerApp.Core.Model.Users
{
    public class UserFriendDto
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Role { get; set; }


    }
}
