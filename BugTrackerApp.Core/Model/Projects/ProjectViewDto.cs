﻿using BugTrackerApp.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BugTrackerApp.Core.Model.Users;

namespace BugTrackerApp.Core.Model.Projects
{
    public class ProjectViewDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<UserTeamMemberDto> TeamMembers { get; set; }
        public List<Bug> Bugs { get; set; }
        public bool IsPublic { get; set; }
        public int CreatorId { get; set; }
    }
}
