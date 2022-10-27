using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BugTrackerApp.Data.Entity;
using Microsoft.EntityFrameworkCore;

namespace BugTrackerApp.Data.Repositories
{
    public class ProjectRepository : IProjectRepository
    {

        private BugTrackerAppContext _context;
        public ProjectRepository(BugTrackerAppContext context)
        {
            _context = context;
        }
        public async Task<Project> Add(Project entity)
        {
            await _context.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }



        public async Task<List<Project>> GetAll()
        {
            return await _context.Projects
                .Include(p => p.TeamMembers)
                .Include(p => p.Bugs)
                .AsNoTracking().ToListAsync();
        }

        public async Task<Project> GetById(int id)
        {
            var project = await _context.Projects
                .Include(p => p.TeamMembers)
                .Include(p => p.Bugs)
                .SingleOrDefaultAsync(project => project.Id == id);
            return project;
        }

        public async Task<Project> AddBug(Bug bugEntity)
        {
            var project = await GetById(bugEntity.ProjectId);
            if (project == null)
            {
                return null;
            }
            project.Bugs.Add(bugEntity);
            await _context.SaveChangesAsync();
            return project;
        }

        public async Task<Project> UpdateProject(Project entity)
        {
            var project = await GetById(entity.Id);
            if (project == null)
            {
                return null;
            }
            project.Description = entity.Description;
            project.Name = entity.Name;
            project.IsPublic = entity.IsPublic;
            await _context.SaveChangesAsync();
            return project;
        }

        public async Task<Project> AddTeamMember(UserTeamMember teamMemb)
        {
            var project = await GetById(teamMemb.ProjectId);
            if (project == null)
            {
                throw new Exception($"Project not found with id:{teamMemb.ProjectId}");
            }

            var user = await _context.Users.SingleOrDefaultAsync(u => u.Id == teamMemb.UserId);
            if (user == null)
            {
                throw new Exception($"User not found with id:{teamMemb.Id}");
            }
            project.TeamMembers.Add(teamMemb);
            if (user.ContributedProjects == null)
            {
                user.ContributedProjects = new List<Project>();
            }
            user.ContributedProjects.Add(project);
            await _context.SaveChangesAsync();
            return project;
        }

    }
}
