using BugTrackerApp.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTrackerApp.Core.Model.Users
{
    public class UserViewDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Role { get; set; }

        public List<int> asd = new List<int>();

        public IReadOnlyList<Project> ContributedProjects = new List<Project>();
    }
}
