using AutoFixture;
using BugTrackerApp.Controllers;
using BugTrackerApp.Core.Model.Employees;
using BugTrackerApp.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagerApp.Test
{
    [TestClass]
    public class EmployeesControllerTests
    {
        private Mock<IEmployeeService> _employeeServiceMock;
        private Mock<ILogger<EmployeesController>> _logger;
        private Fixture _fixture;
        private EmployeesController _controller;

        public EmployeesControllerTests()
        {
            _fixture = new Fixture();
            _employeeServiceMock = new Mock<IEmployeeService>();
            _logger = new Mock<ILogger<EmployeesController>>();
        }

        [TestMethod]
        public async Task ListEmployees_ReturnsOk()
        {
            // Arrange
            var employeeViews = _fixture.CreateMany<EmployeeViewDto>(5).ToList();

            _employeeServiceMock.Setup(x => x.GetAllEmployees()).Returns(Task.Run(() => employeeViews));

            _controller = new EmployeesController(_employeeServiceMock.Object, _logger.Object);

            // Act
            var result = await _controller.ListEmployees();

            var obj = result as ObjectResult;

            // Assert
            Assert.AreEqual(200, obj.StatusCode);
        }

        [TestMethod]
        public async Task ListEmployees_ThrowsException()
        {
            // Arrange
            _employeeServiceMock.Setup(x => x.GetAllEmployees()).Throws(new Exception());

            _controller = new EmployeesController(_employeeServiceMock.Object, _logger.Object);

            // Act
            var result = await _controller.ListEmployees();

            var obj = result as ObjectResult;

            // Assert
            Assert.AreEqual(400, obj.StatusCode);
        }

        [TestMethod]
        public async Task AddEmployee_ReturnsOk()
        {
            // Arrange
            var employeeCreateDto = _fixture.Create<EmployeeCreateDto>();

            var employeeViewDto = _fixture.Create<EmployeeViewDto>();

            _employeeServiceMock.Setup(x => x.AddNewEmployee(employeeCreateDto)).Returns(Task.Run(() => employeeViewDto));

            _controller = new EmployeesController(_employeeServiceMock.Object, _logger.Object);

            // Act
            var result = await _controller.AddEmployee(employeeCreateDto);

            var obj = result as ObjectResult;

            // Assert   
            Assert.AreEqual(201, obj.StatusCode);
        }

        [TestMethod]
        public async Task UpdateEmployee_ReturnsOk()
        {
            // Arrange
            var employeeUpdateDto = _fixture.Create<EmployeeUpdateDto>();

            var employeeViewDto = _fixture.Create<EmployeeViewDto>();

            _employeeServiceMock.Setup(x => x.UpdateEmployee(employeeUpdateDto)).Returns(Task.Run(() => employeeViewDto));

            _controller = new EmployeesController(_employeeServiceMock.Object, _logger.Object);

            // Act
            var result = await _controller.UpdateEmployee(employeeUpdateDto);

            var obj = result as ObjectResult;

            // Assert   
            Assert.AreEqual(200, obj.StatusCode);
        }

        [TestMethod]
        public async Task DeleteEmployee_ReturnsOk()
        {
            // Arrange
            var id = _fixture.Create<int>();

            _employeeServiceMock.Setup(x => x.DeleteEmployeeById(id)).Returns(Task.CompletedTask);

            _controller = new EmployeesController(_employeeServiceMock.Object, _logger.Object);

            // Act
            var result = await _controller.DeleteEmployee(id);

            var obj = result as ObjectResult;

            // Assert   
            Assert.AreEqual(200, obj.StatusCode);
        }

        [TestMethod]
        public async Task GetEmployeeById_ReturnsOk()
        {
            // Arrange
            var employeeView = _fixture.Create<EmployeeViewDto>();
            var id = _fixture.Create<int>();

            _employeeServiceMock.Setup(x => x.GetEmployeeById(id)).Returns(Task.Run(() => employeeView));

            _controller = new EmployeesController(_employeeServiceMock.Object, _logger.Object);

            // Act
            var result = await _controller.GetEmployeeById(id);

            var obj = result as ObjectResult;

            // Assert
            Assert.AreEqual(200, obj.StatusCode);
        }
    }
}