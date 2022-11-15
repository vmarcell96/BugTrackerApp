using BugTrackerApp.Data.Entity;
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
                TeamMembers = (List<UserTeamMember>)project.TeamMembers,
                Bugs = (List<Bug>)project.Bugs,
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
                IsPublic = project.IsPublic,
                CreatorId = project.CreatorId
            };
        }

        public static Project ToProjectEntity(this ProjectViewDto project)
        {
            Project projectEntity = new Project
            {
                Id = project.Id,
                Name = project.Name,
                Description = project.Description,
                IsPublic = project.IsPublic,
                CreatorId = project.CreatorId
            };
            foreach (var teamMemb in project.TeamMembers)
            {
                projectEntity.AddTeamMember(teamMemb);
            }
            foreach (var bug in project.Bugs)
            {
                projectEntity.AddBug(bug);
            }
            return projectEntity;
        }
    }
}
