using BugTrackerApp.Core.Model;
using BugTrackerApp.Core.Model.Projects;
using BugTrackerApp.Data.Entity;

namespace BugTrackerApp.Services
{
    public interface IProjectService
    {
        public Task<Result<List<ProjectViewDto>>> GetAllProjects();

        public Task<Result<ProjectViewDto>> AddNewProject(ProjectCreateDto project);

        public Task<Result<ProjectViewDto>> GetProjectById(int projectId);

        public Task<Result<ProjectViewDto>> AddBugToProject(Bug entity);

        public Task<Result<ProjectViewDto>> AddTeamMemberToProject(UserTeamMember teamMemb);

        public Task<Result<ProjectViewDto>> UpdateProject(ProjectUpdateDto updateDto);
        public Task<Result<ProjectViewDto>> UpdateBug(Bug bug);
    }
}
