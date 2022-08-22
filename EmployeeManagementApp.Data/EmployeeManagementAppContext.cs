using EmployeeManagementApp.Data.Entity;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementApp.Data
{
    public class EmployeeManagementAppContext : DbContext
    {
        public EmployeeManagementAppContext(DbContextOptions<EmployeeManagementAppContext> options) : base(options)
        {

        }

        public DbSet<Employee> Employees { get; set; }
    }
}
