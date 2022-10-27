using BugTrackerApp.Core.Model.Projects;
using BugTrackerApp.Data.Entity;
using BugTrackerApp.Services;
using BugTrackerApp.Services.PasswordHashers;
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

        [HttpGet]
        public async Task<IActionResult> GetAllProjects()
        {
            try
            {
                var projects = await _projectService.GetAllProjects();
                return StatusCode(200, projects);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetProjectById(int id)
        {
            try
            {
                var project = await _projectService.GetProjectById(id);
                if (project == null)
                {
                    return NotFound($"Project not found with id:{id}");
                }
                return StatusCode(200, project);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("AddProject")]
        [HttpPost()]
        public async Task<IActionResult> AddProject(ProjectCreateDto createDto)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var project = await _projectService.AddNewProject(createDto);
                    if (project == null)
                    {
                        return NotFound($"User not found with id:{createDto.CreatorId}");
                    }

                    return StatusCode(201, project);
                }
                else
                {
                    return BadRequest("Invalid ModelState");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("AddMember")]
        [HttpPost]
        public async Task<IActionResult> AddTeamMemberToProject(UserTeamMember newMember)
        {
            try
            {
                var project = await _projectService.AddTeamMemberToProject(newMember);
                return StatusCode(200, project);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("AddBug")]
        [HttpPost]
        public async Task<IActionResult> AddBugToProject(Bug bug)
        {
            try
            {
                var project = await _projectService.AddBugToProject(bug);
                if (project == null)
                {
                    return NotFound($"Project not found with id:{bug.ProjectId}");
                }
                return StatusCode(200, project);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProject(ProjectViewDto viewDto)
        {
            try
            {
                var project = await _projectService.UpdateProject(viewDto);
                if (project == null)
                {
                    return NotFound($"Project not found with id:{viewDto.Id}");
                }
                return StatusCode(200, project);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
