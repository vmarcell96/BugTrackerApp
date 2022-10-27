using BugTrackerApp.Core.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BugTrackerApp.Core.Model.RefreshTokens;
using BugTrackerApp.Data.Entity;

namespace BugTrackerApp.Core.Extensions
{
    public static class RefreshTokenExtensions
    {
        public static RefreshToken ToRefreshTokenEntity(this RefreshTokenCreateDto refreshTokenCreateDto)
        {
            return new RefreshToken()
            {
                Token = refreshTokenCreateDto.Token,
                UserId = refreshTokenCreateDto.UserId,
            };
        }
    }
}
