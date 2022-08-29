using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace EmployeeManagerApp.Test
{
    [TestClass]
    public class ApiTests
    {
        [TestMethod]
        public void TestMethod1()
        {
            // Arrange
            var webAppFactory = new WebApplicationFactory<Program>();
            var httpClient = webAppFactory.CreateDefaultClient();

            // Act

            // Assert
        }
    }
}