using BugTrackerApp.Core.Extensions;
using BugTrackerApp.Core.Model.Projects;
using BugTrackerApp.Data.Entity;
using BugTrackerApp.Data.Repositories;

namespace BugTrackerApp.Services
{
    public class ProjectService : IProjectService
    {
        private IProjectRepository _projectRepository;
        private IUserRepository _userRepository;

        public ProjectService(IProjectRepository projectRepository, IUserRepository userRepository)
        {
            _projectRepository = projectRepository;
            _userRepository = userRepository;
        }

        public async Task<List<ProjectViewDto>> GetAllProjects()
        {
            var projects = await _projectRepository.GetAll();
            return projects?.ToProjectViewDto();
        }
        public async Task<ProjectViewDto> GetProjectById(int projectId)
        {
            var project = await _projectRepository.GetById(projectId);
            return project?.ToProjectViewDto();
        }

        public async Task<ProjectViewDto> AddNewProject(ProjectCreateDto project)
        {
            var creator = await _userRepository.Get(project.CreatorId);
            if (creator == null)
            {
                return null;
            }
            var newProject = await _projectRepository.Add(project.ToProjectEntity());
            var teamMember = creator.ToUserTeamMember();
            teamMember.ProjectId = newProject.Id;
            await AddTeamMemberToProject(teamMember);
            return newProject.ToProjectViewDto();
        }


        public async Task<ProjectViewDto> AddBugToProject(Bug bug)
        {
            var project = await _projectRepository.AddBug(bug);
            return project?.ToProjectViewDto();
        }

        public async Task<ProjectViewDto> AddTeamMemberToProject(UserTeamMember teamMemb)
        {
            var project = await _projectRepository.AddTeamMember(teamMemb);
            return project?.ToProjectViewDto();
        }

        public async Task<ProjectViewDto> UpdateProject(ProjectViewDto viewDto)
        {
            var project = await _projectRepository.UpdateProject(viewDto.ToProjectEntity());
            return project?.ToProjectViewDto();
        }
    }
}
