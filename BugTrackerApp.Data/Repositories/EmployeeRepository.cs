using BugTrackerApp.Data.Entity;
using Microsoft.EntityFrameworkCore;

namespace BugTrackerApp.Data.Repositories
{
    public class EmployeeRepository : IRepository<Employee>
    {
        private readonly BugTrackerAppContext _context;

        public EmployeeRepository(BugTrackerAppContext context)
        {
            _context = context;
        }

        public async Task Add(Employee entity)
        {
            await _context.Employees.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            _context.Employees.Remove(await Get(id));
            await _context.SaveChangesAsync();
        }

        public async Task<Employee> Get(int id)
        {
            var emp = await _context.Employees.SingleOrDefaultAsync(emp => emp.Id == id);
            return emp;
        }

        public async Task<List<Employee>> GetAll()
        {
            return await _context.Employees.AsNoTracking().ToListAsync();
        }

        public async Task<Employee> Update(Employee entity)
        {
            var employeeToUpdate = await Get(entity.Id);
            employeeToUpdate.FirstName = entity.FirstName;
            employeeToUpdate.LastName = entity.LastName;
            employeeToUpdate.HiringDate = entity.HiringDate;
            await _context.SaveChangesAsync();
            return employeeToUpdate;
        }
    }
}
