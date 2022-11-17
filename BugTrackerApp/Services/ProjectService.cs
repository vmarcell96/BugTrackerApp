using BugTrackerApp.Core.Extensions;
using BugTrackerApp.Core.Model;
using BugTrackerApp.Core.Model.Projects;
using BugTrackerApp.Data;
using BugTrackerApp.Data.Entity;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace BugTrackerApp.Services
{
    public class ProjectService : IProjectService
    {
        private readonly BugTrackerAppContext _context;

        public ProjectService(BugTrackerAppContext context)
        {
            _context = context;
        }

        public async Task<Result<List<ProjectViewDto>>> GetAllProjects()
        {
            try
            {
                var projects = await _context.Projects
                    .Include(p => p.Users)
                    .Include(p => p.Bugs)
                    .AsNoTracking().ToListAsync();

                return Result.Ok(projects.ToProjectViewDto());
            }
            catch (DbUpdateException e)
            {
                return Result.Fail<List<ProjectViewDto>>(e.Message);
            }
            catch (Exception e)
            {
                return Result.Fail<List<ProjectViewDto>>(e.Message);
            }
        }
        public async Task<Result<ProjectViewDto>> GetProjectById(int projectId)
        {
            try
            {
                var foundProject = await _context.Projects
                    .Include(p => p.Users)
                    .Include(p => p.Bugs)
                    .SingleOrDefaultAsync(p => p.Id == projectId);
                if (foundProject == null)
                {
                    return Result.Fail<ProjectViewDto>($"There are no projects in the database with the searched Id:{projectId}");
                }
                return Result.Ok(foundProject.ToProjectViewDto());
            }
            
            catch (Exception e)
            {
                return Result.Fail<ProjectViewDto>(e.Message);
            }
        }

        public async Task<Result<ProjectViewDto>> AddNewProject(ProjectCreateDto project)
        {
            try
            {
                //If creator user doesn't exist there is no need to create the project
                var creatorUser = await _context.Users
                    .Include(u => u.ContributedProjects)
                    .ThenInclude(p => p.Users)
                    .SingleOrDefaultAsync(user => user.Id == project.CreatorId);
                if (creatorUser == null)
                {
                    return Result.Fail<ProjectViewDto>(
                        $"The user creating the project doesn't exist in the database (id={project.CreatorId})");
                }

                //Creating project
                Project projectEntity = project.ToProjectEntity();
                await _context.AddAsync(projectEntity);
                //Adding user to project's team members 
                //projectEntity.AddTeamMember(creatorUser.ToUserTeamMember());
                //Adding project to user's contributed projects
                projectEntity.AddTeamMember(creatorUser);
                await _context.SaveChangesAsync();
                //Return the created project's view dto
                return Result.Ok(projectEntity.ToProjectViewDto());
            }
            catch (SqlException e)
            {
                Console.WriteLine("error");
                return Result.Fail<ProjectViewDto>(e.Message);
            }
            catch (DbUpdateException e)
            {
                return Result.Fail<ProjectViewDto>(e.Message);
            }
            catch (Exception e)
            {
                return Result.Fail<ProjectViewDto>(e.Message);
            }
        }

        public async Task<Result<ProjectViewDto>> AddTeamMemberToProject(int userId, int projectId)
        {
            try
            {
                //Check if user exists
                var user = await _context.Users
                    .Include(u => u.ContributedProjects)
                        .ThenInclude(p => p.Users)
                    .Include(u => u.ContributedProjects)
                    .ThenInclude(p => p.Bugs)
                    .SingleOrDefaultAsync(u => u.Id == userId);
                if (user == null)
                {
                    return Result.Fail<ProjectViewDto>($"The user(id={userId}) you are trying to add to project(id={userId}) doesn't exists.");
                }
                //Check if project exists
                var project = await _context.Projects
                    .Include(p => p.Users)
                    .Include(p => p.Bugs)
                    .SingleOrDefaultAsync(p => p.Id == projectId);
                if (project == null)
                {
                    return Result.Fail<ProjectViewDto>($"The project(id={projectId}) you are trying to add user(id={projectId}) to doesn't exists.");
                }

                //the project automatically being added to the users contributed projects list
                //only need to add to the project's team members list
                if (project.Users.Any(u => u.Id == userId))
                {
                    return Result.Fail<ProjectViewDto>($"User with id={userId} already part of the project.");
                }
                project.AddTeamMember(user);
                await _context.SaveChangesAsync();
                return Result.Ok(project.ToProjectViewDto());
            }
            catch (DbUpdateException e)
            {
                return Result.Fail<ProjectViewDto>(e.Message);
            }
            catch (Exception e)
            {
                return Result.Fail<ProjectViewDto>(e.Message);
            }
        }

        public async Task<Result<ProjectViewDto>> AddBugToProject(Bug bug)
        {
            try
            {
                //Check if user exists
                var creator = await _context.Users
                    .Include(u => u.ContributedProjects)
                    .ThenInclude(p => p.Users)
                    .SingleOrDefaultAsync(user => user.Id == bug.CreatorId);
                if (creator == null)
                {
                    return Result.Fail<ProjectViewDto>($"The user(id={bug.CreatorId}) you are trying to add a bug with, to project(id={bug.ProjectId}) doesn't exists.");
                }
                //Check if project exists
                var project = await _context.Projects
                    .Include(p => p.Users)
                    .Include(p => p.Bugs)
                    .SingleOrDefaultAsync(p => p.Id == bug.ProjectId);
                if (project == null)
                {
                    return Result.Fail<ProjectViewDto>($"The project(id={bug.ProjectId}) you are trying to add a bug to doesn't exists.");
                }

                //the projectId automatically being added to the bug entity

                project.AddBug(bug);
                await _context.SaveChangesAsync();
                return Result.Ok(project.ToProjectViewDto());
            }
            catch (DbUpdateException e)
            {
                return Result.Fail<ProjectViewDto>(e.Message);
            }
            catch (Exception e)
            {
                return Result.Fail<ProjectViewDto>(e.Message);
            }
        }


        public async Task<Result<ProjectViewDto>> UpdateProject(ProjectUpdateDto updateDto)
        {
            try
            {
                //Check if project exists
                var project = await _context.Projects
                    .Include(p => p.Users)
                    .Include(p => p.Bugs)
                    .SingleOrDefaultAsync(p => p.Id == updateDto.ProjectId);
                if (project == null)
                {
                    return Result.Fail<ProjectViewDto>($"The project(id={updateDto.ProjectId}) you are trying to update doesn't exist.");
                }
                //Update project's fields
                project.Name = updateDto.Name;
                project.Description = updateDto.Description;
                project.IsPublic = updateDto.IsPublic;
                await _context.SaveChangesAsync();
                return Result.Ok(project.ToProjectViewDto());
            }
            catch (DbUpdateException e)
            {
                return Result.Fail<ProjectViewDto>(e.Message);
            }
            catch (Exception e)
            {
                return Result.Fail<ProjectViewDto>(e.Message);
            }
        }

        public async Task<Result> DeleteProject(int projectId)
        {
            throw new NotImplementedException();
        }

        public async Task<Result<ProjectViewDto>> UpdateBug(Bug bug)
        {
            try
            {
                //Check if project exists
                var project = await _context.Projects
                    .Include(p => p.Users)
                    .Include(p => p.Bugs)
                    .SingleOrDefaultAsync(p => p.Id == bug.ProjectId);
                if (project == null)
                {
                    return Result.Fail<ProjectViewDto>($"The project(id={bug.ProjectId}) you are trying to update doesn't exist.");
                }
                //Update project's fields
                var bugToUpdate = project.Bugs.SingleOrDefault(b => b.Id == bug.Id);
                if (bugToUpdate == null)
                {
                    return Result.Fail<ProjectViewDto>($"The bug(id={bug.Id}) you are trying to update doesn't exist.");
                }
                bugToUpdate.AssigneeId = bug.AssigneeId;
                bugToUpdate.Details = bug.Details;
                bugToUpdate.Title = bug.Title;
                bugToUpdate.Priority = bug.Priority;
                bugToUpdate.IsFixed = bug.IsFixed;
                await _context.SaveChangesAsync();
                return Result.Ok(project.ToProjectViewDto());
            }
            catch (DbUpdateException e)
            {
                return Result.Fail<ProjectViewDto>(e.Message);
            }
            catch (Exception e)
            {
                return Result.Fail<ProjectViewDto>(e.Message);
            }
        }
    }
}
