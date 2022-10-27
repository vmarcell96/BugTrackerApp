using BugTrackerApp.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BugTrackerApp.Data.Repositories
{
    public interface IRefreshTokenRepository
    {
        Task Add(RefreshToken refreshToken);
        Task Delete(int id);
        Task<RefreshToken> GetByToken(string refreshToken);
        Task<RefreshToken> GetById(int id);
        Task DeleteAll(int id);
    }
}
