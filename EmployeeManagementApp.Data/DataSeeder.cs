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

            if (!_context.Employees.Any())
            {
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

            //var testProject1 = new Project
            //{
            //    Name = "Test Project 1",
            //    Description =
            //        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            //    TeamMembers = new List<UserTeamMember>
            //    {
            //        new UserTeamMember
            //        {
            //            ProjectId = 1,
            //            UserName = "Admin",
            //            FirstName = "John",
            //            LastName = "Smith",
            //            Role = "Admin"
            //        }
            //    },
            //    Bugs = new List<Bug>(),
            //    IsPublic = true,
            //    CreatorId = 1
            //};

            //var testProject2 = new Project
            //{
            //    Name = "Test Project 2",
            //    Description =
            //        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            //    TeamMembers = new List<UserTeamMember>
            //    {
            //        new UserTeamMember
            //        {
            //            ProjectId = 2,
            //            UserName = "User",
            //            FirstName = "Anna",
            //            LastName = "Faro",
            //            Role = "User"
            //        }
            //    },
            //    Bugs = new List<Bug>(),
            //    IsPublic = true,
            //    CreatorId = 2
            //};


            //if (!_context.Projects.Any())
            //{
            //    var projects = new Project[]
            //    {
            //        testProject1,
            //        testProject2
            //    };

            //    _context.AddRange(projects);
            //    _context.SaveChanges();

            //};

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
                    Role = "Admin",
                    ContributedProjects = new List<Project>()
            },
                new()
                {
                    FirstName = "Anna",
                    LastName = "Faro",
                    UserName = "User",
                    HashedPassword = BCrypt.Net.BCrypt.HashPassword("12345678"),
                    Role = "User",
                    ContributedProjects = new List<Project>( )
                },
                };

                _context.Users.AddRange(users);
                _context.SaveChanges();
            }

        }
    }
}
