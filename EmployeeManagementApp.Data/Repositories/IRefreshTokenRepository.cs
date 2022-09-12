using EmployeeManagementApp.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagementApp.Data.Repositories
{
    public interface IRefreshTokenRepository
    {
        Task Add(RefreshToken refreshToken);
        Task<RefreshToken> GetByToken(string refreshToken);
    }
}
