using EmployeeManagementApp.Core.Model.Employees;
using EmployeeManagementApp.Data.Entity;


namespace EmployeeManagementApp.Core.Extensions
{
    public static class EmployeeExtensions
    {
        public static EmployeeViewDto ToEmployeeViewDto(this Employee employee)
        {
            return new EmployeeViewDto()
            {
                ID = employee.ID,
                FirstName = employee.FirstName,
                LastName = employee.LastName
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
    }
}
