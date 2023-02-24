using BugTrackerApp.Core.Extensions;
using BugTrackerApp.Core.Model;
using BugTrackerApp.Core.Model.AuthenticationModels.Responses;
using BugTrackerApp.Core.Model.Projects;
using BugTrackerApp.Data.Entity;
using BugTrackerApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BugTrackerApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : Controller
    {
        private readonly IProjectService _projectService;
        private readonly ILogger<ProjectsController> _logger;

        public ProjectsController(IProjectService projectService, ILogger<ProjectsController> logger)
        {
            _projectService = projectService ?? throw new ArgumentNullException(nameof(projectService));
            _logger = logger;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllProjects()
        {
            Result<List<ProjectViewDto>> projects = await _projectService.GetAllProjects();
            if (projects.Failure)
            {
                _logger.LogError(projects.Error);
                return BadRequest(projects.Error);
            }
            return StatusCode(200, projects.Value);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetProjectById(int id)
        {
            Result<ProjectViewDto> project = await _projectService.GetProjectById(id);
            if (project.Failure)
            {
                _logger.LogError(project.Error);
                return BadRequest(project.Error);
            }
            return StatusCode(200, project.Value);
        }

        [Authorize]
        [Route("AddProject")]
        [HttpPost()]
        public async Task<IActionResult> AddProject(ProjectCreateDto createDto)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<string> errorMessages = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                _logger.LogError(String.Join(' ', errorMessages));
                return BadRequest(new ErrorResponse(errorMessages));
            }
            Result<ProjectViewDto> project = await _projectService.AddNewProject(createDto);

            if (project.Success)
            {
                return StatusCode(201, project.Value);
            }
            _logger.LogError(project.Error);
            return BadRequest(project.Error);

        }

        [Authorize]
        [Route("AddMember")]
        [HttpPost]
        public async Task<IActionResult> AddTeamMemberToProject(int userId, int projectId)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<string> errorMessages = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                _logger.LogError(String.Join(' ', errorMessages));
                return BadRequest(new ErrorResponse(errorMessages));
            }
            Result<ProjectViewDto> project = await _projectService.AddTeamMemberToProject(userId, projectId);

            if (project.Failure)
            {
                _logger.LogError(project.Error);
                return BadRequest(project.Error);
            }
            return StatusCode(201, project.Value);
        }

        [Authorize]
        [Route("AddBug")]
        [HttpPost]
        public async Task<IActionResult> AddBugToProject(Bug bug)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<string> errorMessages = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                _logger.LogError(String.Join(' ', errorMessages));
                return BadRequest(new ErrorResponse(errorMessages));
            }
            Result<ProjectViewDto> project = await _projectService.AddBugToProject(bug);

            if (project.Failure)
            {
                _logger.LogError(project.Error);
                return BadRequest(project.Error);
            }
            return StatusCode(201, project.Value);
        }

        [Authorize]
        [Route("updateProject")]
        [HttpPut]
        public async Task<IActionResult> UpdateProject(ProjectUpdateDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<string> errorMessages = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                _logger.LogError(String.Join(' ', errorMessages));
                return BadRequest(new ErrorResponse(errorMessages));
            }
            Result<ProjectViewDto> project = await _projectService.UpdateProject(updateDto);

            if (project.Failure)
            {
                _logger.LogError(project.Error);
                return BadRequest(project.Error);
            }
            return StatusCode(200, project.Value);
        }

        [Authorize]
        [Route("updateBug")]
        [HttpPut]
        public async Task<IActionResult> UpdateBug(Bug bug)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<string> errorMessages = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                _logger.LogError(String.Join(' ', errorMessages));
                return BadRequest(new ErrorResponse(errorMessages));
            }
            Result<ProjectViewDto> project = await _projectService.UpdateBug(bug);

            if (project.Failure)
            {
                _logger.LogError(project.Error);
                return BadRequest(project.Error);
            }
            return StatusCode(200, project.Value);
        }
    }
}
