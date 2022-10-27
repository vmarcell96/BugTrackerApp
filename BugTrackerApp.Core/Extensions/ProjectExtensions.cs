using BugTrackerApp.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BugTrackerApp.Core.Model.Projects;

namespace BugTrackerApp.Core.Extensions
{
    public static class ProjectExtensions
    {
        public static ProjectViewDto ToProjectViewDto(this Project project)
        {
            return new ProjectViewDto
            {
                Id = project.Id,
                Name = project.Name,
                Description = project.Description,
                TeamMembers = project.TeamMembers,
                Bugs = project.Bugs,
                IsPublic = project.IsPublic,
                CreatorId = project.CreatorId
            };
        }

        public static List<ProjectViewDto> ToProjectViewDto(this List<Project> projects)
        {
            var projectViews = new List<ProjectViewDto>();
            foreach (var project in projects)
            {
                projectViews.Add(ToProjectViewDto(project));
            }
            return projectViews;
        }

        public static Project ToProjectEntity(this ProjectCreateDto project)
        {
            return new Project
            {
                Name = project.Name,
                Description = project.Description,
                TeamMembers = new List<UserTeamMember>(),
                Bugs = new List<Bug>(),
                IsPublic = project.IsPublic,
                CreatorId = project.CreatorId
            };
        }

        public static Project ToProjectEntity(this ProjectViewDto project)
        {
            return new Project
            {
                Id = project.Id,
                Name = project.Name,
                Description = project.Description,
                TeamMembers = project.TeamMembers,
                Bugs = project.Bugs,
                IsPublic = project.IsPublic,
                CreatorId = project.CreatorId
            };
        }
    }
}
