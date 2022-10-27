using BugTrackerApp.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTrackerApp.Data.Repositories
{
    public interface IUserRepository
    {
        Task<List<User>> GetAll();
        Task<User> Get(int id);
        Task Delete(int id);
        Task Add(User entity);
        Task<User> Update(User entity);
        Task<User> GetByUserName(string username);
    }
}
