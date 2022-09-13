using EmployeeManagementApp.Core.Extensions;
using EmployeeManagementApp.Core.Model.RefreshTokens;
using EmployeeManagementApp.Data.Entity;
using EmployeeManagementApp.Data.Repositories;

namespace EmployeeManagementApp.Services
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
