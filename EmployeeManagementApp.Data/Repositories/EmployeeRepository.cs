using EmployeeManagementApp.Data.Entity;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementApp.Data.Repositories
{
    public class EmployeeRepository : IRepository<Employee>
    {
        private readonly EmployeeManagementAppContext _context;

        public EmployeeRepository(EmployeeManagementAppContext context)
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
            var emp = await _context.Employees.SingleOrDefaultAsync(emp => emp.ID == id);
            return emp;
        }

        public async Task<List<Employee>> GetAll()
        {
            return await _context.Employees.AsNoTracking().ToListAsync();
        }

        public async Task<Employee> Update(Employee entity)
        {
            var employeeToUpdate = await Get(entity.ID);
            employeeToUpdate.FirstName = entity.FirstName;
            employeeToUpdate.LastName = entity.LastName;
            employeeToUpdate.HiringDate = entity.HiringDate;
            await _context.SaveChangesAsync();
            return employeeToUpdate;
        }
    }
}
