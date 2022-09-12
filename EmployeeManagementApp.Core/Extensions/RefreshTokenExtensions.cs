using EmployeeManagementApp.Core.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeeManagementApp.Core.Model.RefreshTokens;
using EmployeeManagementApp.Data.Entity;

namespace EmployeeManagementApp.Core.Extensions
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
