using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeeManagementApp.Data.Entity;

namespace EmployeeManagementApp.Data.Repositories
{
    public interface IProjectRepository
    {
        Task<Project> Add(Project entity);
        Task<List<Project>> GetAll();
        Task<Project> GetById(int id);
        Task<Project> AddBug(Bug entity);
        Task<Project> AddTeamMember(UserTeamMember teamMemb);

        Task<Project> UpdateProject(Project entity);
    }
}
