using AutoFixture;
using BugTrackerApp.Controllers;
using BugTrackerApp.Core.Model.Users;
using BugTrackerApp.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace BugTrackerApp.Test
{
    [TestClass]
    public class UsersControllerTests
    {
        private Mock<IUserService> _UserServiceMock;
        private Mock<ILogger<UsersController>> _logger;
        private Fixture _fixture;
        private UsersController _controller;

        public UsersControllerTests()
        {
            _fixture = new Fixture();
            _UserServiceMock = new Mock<IUserService>();
            _logger = new Mock<ILogger<UsersController>>();
        }

        [TestMethod]
        public async Task ListUsers_ReturnsOk()
        {
            // Arrange
            var UserViews = _fixture.CreateMany<UserViewDto>(5).ToList();

            _UserServiceMock.Setup(x => x.GetAllUsers()).Returns(Task.Run(() => UserViews));

            _controller = new UsersController(_UserServiceMock.Object, _logger.Object);

            // Act
            var result = await _controller.ListUsers();

            var obj = result as ObjectResult;

            // Assert
            Assert.AreEqual(200, obj.StatusCode);
        }

        [TestMethod]
        public async Task ListUsers_ThrowsException()
        {
            // Arrange
            _UserServiceMock.Setup(x => x.GetAllUsers()).Throws(new Exception());

            _controller = new UsersController(_UserServiceMock.Object, _logger.Object);

            // Act
            var result = await _controller.ListUsers();

            var obj = result as ObjectResult;

            // Assert
            Assert.AreEqual(400, obj.StatusCode);
        }

        [TestMethod]
        public async Task AddUser_ReturnsOk()
        {
            // Arrange
            var UserCreateDto = _fixture.Create<UserCreateDto>();

            var UserViewDto = _fixture.Create<UserViewDto>();

            _UserServiceMock.Setup(x => x.AddNewUser(UserCreateDto)).Returns(Task.Run(() => UserViewDto));

            _controller = new UsersController(_UserServiceMock.Object, _logger.Object);

            // Act
            var result = await _controller.AddUser(UserCreateDto);

            var obj = result as ObjectResult;

            // Assert   
            Assert.AreEqual(201, obj.StatusCode);
        }

        [TestMethod]
        public async Task UpdateUser_ReturnsOk()
        {
            // Arrange
            var UserUpdateDto = _fixture.Create<UserUpdateDto>();

            var UserViewDto = _fixture.Create<UserViewDto>();

            _UserServiceMock.Setup(x => x.UpdateUser(UserUpdateDto)).Returns(Task.Run(() => UserViewDto));

            _controller = new UsersController(_UserServiceMock.Object, _logger.Object);

            // Act
            var result = await _controller.UpdateUser(UserUpdateDto);

            var obj = result as ObjectResult;

            // Assert   
            Assert.AreEqual(200, obj.StatusCode);
        }

        [TestMethod]
        public async Task DeleteUser_ReturnsOk()
        {
            // Arrange
            var id = _fixture.Create<int>();

            _UserServiceMock.Setup(x => x.DeleteUserById(id)).Returns(Task.CompletedTask);

            _controller = new UsersController(_UserServiceMock.Object, _logger.Object);

            // Act
            var result = await _controller.DeleteUser(id);

            var obj = result as ObjectResult;

            // Assert   
            Assert.AreEqual(200, obj.StatusCode);
        }

        [TestMethod]
        public async Task GetUserById_ReturnsOk()
        {
            // Arrange
            var UserView = _fixture.Create<UserViewDto>();
            var id = _fixture.Create<int>();

            _UserServiceMock.Setup(x => x.GetUserById(id)).Returns(Task.Run(() => UserView));

            _controller = new UsersController(_UserServiceMock.Object, _logger.Object);

            // Act
            var result = await _controller.GetUserById(id);

            var obj = result as ObjectResult;

            // Assert
            Assert.AreEqual(200, obj.StatusCode);
        }
    }
}