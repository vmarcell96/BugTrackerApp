using BugTrackerApp.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTrackerApp.Core.Model.Projects
{
    public class ProjectCreateDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsPublic { get; set; }
        public int CreatorId { get; set; } = 0;
    }
}
