using BugTrackerApp.Data.Entity;
using BugTrackerApp.Core.Model.Projects;

namespace BugTrackerApp.Core.Extensions
{
    public static class ProjectExtensions
    {
        public static ProjectViewDto ToProjectViewDto(this Project project)
        {
            var userTeamMembers = ((List<User>)project.Users).ToUserTeamMemberDto();
            return new ProjectViewDto
            {
                Id = project.Id,
                Name = project.Name,
                Description = project.Description,
                TeamMembers = userTeamMembers,
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

    }
}
