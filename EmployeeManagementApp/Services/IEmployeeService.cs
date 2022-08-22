﻿using EmployeeManagementApp.Core.Model.Employees;

namespace EmployeeManagementApp.Services
{
    public interface IEmployeeService
    {
        public Task<List<EmployeeViewDto>> GetAllEmployees();

        public Task<EmployeeViewDto> AddNewEmployee(EmployeeViewDto newEmployeeDto);

        public Task<EmployeeViewDto> GetEmployeeById(int employeeId);

        public Task DeleteEmployeeById(int employeeId);

        public Task<EmployeeViewDto> UpdateEmployee(EmployeeUpdateDto employeeUpdateDto);
    }
}