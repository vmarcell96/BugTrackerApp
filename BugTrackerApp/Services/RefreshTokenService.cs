using BugTrackerApp.Core.Extensions;
using BugTrackerApp.Core.Model.RefreshTokens;
using BugTrackerApp.Data.Entity;
using BugTrackerApp.Data.Repositories;

namespace BugTrackerApp.Services
{
    public class RefreshTokenService : IRefreshTokenService
    {
        private IRefreshTokenRepository _refreshTokenRepository;

        public RefreshTokenService(IRefreshTokenRepository refreshTokenRepository)
        {
            _refreshTokenRepository = refreshTokenRepository;
        }
        public async Task<RefreshTokenCreateDto> AddNewRefreshToken(RefreshTokenCreateDto refreshToken)
        {
            await _refreshTokenRepository.Add(refreshToken.ToRefreshTokenEntity());
            return refreshToken;
        }

        public async Task Delete(int id)
        {
            await _refreshTokenRepository.Delete(id);
        }

        public async Task<RefreshToken> GetByRefreshToken(string refreshToken)
        {
            RefreshToken token = await _refreshTokenRepository.GetByToken(refreshToken);
            return token;
        }

        public async Task DeleteAll(int id)
        {
            await _refreshTokenRepository.DeleteAll(id);
        }
    }
}
