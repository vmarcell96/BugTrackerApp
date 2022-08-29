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

            if (!_context.Users.Any())
            {
                var users = new User[]
                {
                new()
                {
                    FirstName = "John",
                    LastName = "Smith",
                    UserName = "Admin",
                    HashedPassword = BCrypt.Net.BCrypt.HashPassword("12345678"),
                    Role = "Admin"
                },
                new()
                {
                    FirstName = "Anna",
                    LastName = "Faro",
                    UserName = "User",
                    HashedPassword = BCrypt.Net.BCrypt.HashPassword("12345678"),
                    Role = "User",
                },
                };

                _context.Users.AddRange(users);
                _context.SaveChanges();
            }


                if (_context.Employees.Any())
            {
                return;
            }

            var employees = new Employee[]
            {
                new Employee{ FirstName = "John", LastName = "Smith", HiringDate = DateTime.Parse("2004-01-13") },
                new Employee{ FirstName = "Sue", LastName = "Black", HiringDate = DateTime.Parse("2015-04-11") },
                new Employee{ FirstName = "Nick", LastName = "Cruz", HiringDate = DateTime.Parse("2020-07-30") },
                new Employee{ FirstName = "Anne", LastName = "Morgan", HiringDate = DateTime.Parse("2009-08-01") },
            };

            _context.Employees.AddRange(employees);

            _context.SaveChanges();
        }
    }
}
