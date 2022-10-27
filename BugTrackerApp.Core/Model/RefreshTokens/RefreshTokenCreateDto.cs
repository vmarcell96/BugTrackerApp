using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTrackerApp.Core.Model.RefreshTokens
{
    public class RefreshTokenCreateDto
    {
        public string Token { get; set; }
        public int UserId { get; set; }
    }
}
