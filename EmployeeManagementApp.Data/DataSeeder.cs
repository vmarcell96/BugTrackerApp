using EmployeeManagementApp.Data.Entity;

namespace EmployeeManagementApp.Data
{
    public class DataSeeder
    {
        private readonly EmployeeManagementAppContext _context;

        public DataSeeder(EmployeeManagementAppContext context)
        {
            _context = context;
        }

        public void Initialize()
        {
            _context.Database.EnsureCreated();

            if (_context.Employees.Any())
            {
                return;
            }

            var employees = new Employee[]
            {
                new Employee{ FirstName = "John", LastName = "Smith", HiringDate = DateTime.Parse("2004-01-13") },
                new Employee{ FirstName = "Sue", LastName = "Black", HiringDate = DateTime.Parse("2015-04-11") },
                new Employee{ FirstName = "Nick", LastName = "Cruz", HiringDate = DateTime.Parse("2020-07-30") },
                new Employee{ FirstName = "Anne", LastName = "Morgan", HiringDate = DateTime.Parse("209-08-01") },
            };

            foreach (var employee in employees)
            {
                _context.Employees.Add(employee);
            }

            _context.SaveChanges();
        }
    }
}
