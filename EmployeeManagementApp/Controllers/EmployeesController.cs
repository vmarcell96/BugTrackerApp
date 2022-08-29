﻿using EmployeeManagementApp.Core.Model.Employees;
using EmployeeManagementApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : Controller
    {
        private readonly IEmployeeService _employeeService;
        private readonly ILogger<EmployeesController> _logger;

        public EmployeesController(IEmployeeService employeeService, ILogger<EmployeesController> logger)
        {
            _employeeService = employeeService ?? throw new ArgumentNullException(nameof(employeeService));
            _logger = logger;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> ListEmployees()
        {
            try
            {
                var employees = await _employeeService.GetAllEmployees();
                return StatusCode(200, employees);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [Authorize]
        [HttpGet("{id}", Name = "GetEmployee")]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            try
            {
                var employee = await _employeeService.GetEmployeeById(id);
                return StatusCode(200, employee);
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogError($"No employee found with id: {id}.", ex);
                return NotFound($"Employee with ID:{id} not found.");
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> AddEmployee(EmployeeCreateDto newEmployeeDto)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var employeeViewDto = await _employeeService.AddNewEmployee(newEmployeeDto);
                    return StatusCode(201, employeeViewDto);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError("Something went wrong when adding new employee.");
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            try
            {
                await _employeeService.DeleteEmployeeById(id);
                return StatusCode(200, true);
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogError($"No employee found with id: {id}.", ex);
                return NotFound($"Employee with ID:{id} not found.");
            }
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(EmployeeUpdateDto employeeUpdateDto)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var updatedEmployeeDto = await _employeeService.UpdateEmployee(employeeUpdateDto);
                    return StatusCode(200, updatedEmployeeDto);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError($"No employee found with id: {employeeUpdateDto.ID}.", ex);
                return NotFound($"Employee with ID:{employeeUpdateDto.ID} not found.");
            }
        }
    }
}
