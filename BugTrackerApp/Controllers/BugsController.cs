using BugTrackerApp.Core.Model.AuthenticationModels;
using BugTrackerApp.Core.Model.AuthenticationModels.Responses;
using BugTrackerApp.Core.Model.Users;
using BugTrackerApp.Services;
using BugTrackerApp.Services.Authenticator;
using BugTrackerApp.Services.PasswordHashers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BugTrackerApp.Controllers
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
