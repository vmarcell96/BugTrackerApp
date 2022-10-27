using BugTrackerApp.Core.Model.Projects;
using BugTrackerApp.Data.Entity;

namespace BugTrackerApp.Services
{
    public interface IProjectService
    {
        public Task<List<ProjectViewDto>> GetAllProjects();

        public Task<ProjectViewDto> AddNewProject(ProjectCreateDto project);

        public Task<ProjectViewDto> GetProjectById(int projectId);

        public Task<ProjectViewDto> AddBugToProject(Bug entity);

        public Task<ProjectViewDto> AddTeamMemberToProject(UserTeamMember teamMemb);

        public Task<ProjectViewDto> UpdateProject(ProjectViewDto viewDto);

    }
}
