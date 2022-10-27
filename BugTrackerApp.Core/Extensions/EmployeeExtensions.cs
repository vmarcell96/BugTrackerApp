using BugTrackerApp.Core.Model.Employees;
using BugTrackerApp.Data.Entity;


namespace BugTrackerApp.Core.Extensions
{
    public static class EmployeeExtensions
    {
        public static EmployeeViewDto ToEmployeeViewDto(this Employee employee)
        {
            return new EmployeeViewDto()
            {
                Id = employee.Id,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                HiringDate = employee.HiringDate,
            };
        }

        public static List<EmployeeViewDto> ToEmployeeViewDto(this List<Employee> employees)
        {
            var employeeViews = new List<EmployeeViewDto>();
            foreach (var employee in employees)
            {
                employeeViews.Add(ToEmployeeViewDto(employee));
            }
            return employeeViews;
        }

        public static EmployeeCreateDto ToEmployeeCreateDto(this EmployeeViewDto employee)
        {
            return new EmployeeCreateDto()
            {
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                HiringDate = DateTime.Now,
            };
        }

        public static Employee ToEmployeeEntity(this EmployeeCreateDto newEmployee)
        {
            return new Employee()
            {
                FirstName = newEmployee.FirstName,
                LastName = newEmployee.LastName,
                HiringDate = newEmployee.HiringDate,
            };
        }

        public static Employee ToEmployeeEntity(this EmployeeUpdateDto employee)
        {
            return new Employee()
            {
                Id = employee.Id,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                HiringDate = employee.HiringDate,
            };
        }
    }
}
