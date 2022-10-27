using BugTrackerApp.Core.Model.Employees;
using BugTrackerApp.Core.Model.RefreshTokens;
using BugTrackerApp.Data.Entity;

namespace BugTrackerApp.Services
{
    public interface IRefreshTokenService
    {
        public Task<RefreshTokenCreateDto> AddNewRefreshToken(RefreshTokenCreateDto refreshToken);
        public Task Delete(int userId);
        public Task<RefreshToken> GetByRefreshToken(string refreshToken);
        public Task DeleteAll(int id);
    }
}
