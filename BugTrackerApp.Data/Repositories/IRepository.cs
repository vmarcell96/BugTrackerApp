using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTrackerApp.Data.Repositories
{
    public interface IRepository<T>
    {
        Task<List<T>> GetAll();
        Task<T> Get(int id);
        Task Delete(int id);
        Task Add(T entity);
        Task<T> Update(T entity);

    }
}
