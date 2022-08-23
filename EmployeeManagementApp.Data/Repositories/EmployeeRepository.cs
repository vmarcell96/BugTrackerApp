using EmployeeManagementApp.Data.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagementApp.Data.Repositories
{
    public class EmployeeRepository : IRepository<Employee>
    {
        private readonly EmployeeManagementAppContext _context;

        public EmployeeRepository(EmployeeManagementAppContext context)
        {
            _context = context;
        }

        public Task Add(Employee entity)
        {
            throw new NotImplementedException();
        }

        public Task Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Employee> Get(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Employee>> GetAll()
        {
            return await _context.Employees.AsNoTracking().ToListAsync();
        }

        public Task<Employee> Update(Employee entity)
        {
            throw new NotImplementedException();
        }
    }
}
