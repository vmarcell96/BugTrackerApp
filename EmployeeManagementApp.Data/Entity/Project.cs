using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagementApp.Data.Entity
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<UserTeamMember> TeamMembers { get; set; }
        public List<Bug> Bugs { get; set; }
        public bool IsPublic { get; set; }
        public int CreatorId { get; set; }
    }
}
