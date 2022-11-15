using BugTrackerApp.Core.Model;
using BugTrackerApp.Core.Model.RefreshTokens;
using BugTrackerApp.Data.Entity;

namespace BugTrackerApp.Services
{
    public interface IRefreshTokenService
    {
        public Task<Result> AddNewRefreshToken(RefreshTokenCreateDto refreshToken);
        public Task<Result> Delete(int userId);
        public Task<Result<RefreshToken>> GetByRefreshToken(string refreshToken);
        public Task<Result> DeleteAll(int id);
    }
}
