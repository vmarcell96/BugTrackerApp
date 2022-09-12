using EmployeeManagementApp.Core.Model.AuthenticationModels;
using EmployeeManagementApp.Core.Model.AuthenticationModels.Responses;
using EmployeeManagementApp.Core.Model.Users;
using EmployeeManagementApp.Services;
using EmployeeManagementApp.Services.Authenticator;
using EmployeeManagementApp.Services.PasswordHashers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagementApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BugsController : Controller
    {
        public BugsController()
        {
        }

        [HttpGet]
        public async Task<IActionResult> ListBugs()
        {
            return StatusCode(200, "List of bugs");
        }
    }
}
