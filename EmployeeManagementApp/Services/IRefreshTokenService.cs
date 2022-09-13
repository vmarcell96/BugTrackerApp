using EmployeeManagementApp.Core.Model.Employees;
using EmployeeManagementApp.Core.Model.RefreshTokens;
using EmployeeManagementApp.Data.Entity;

namespace EmployeeManagementApp.Services
{
    public interface IRefreshTokenService
    {
        public Task<RefreshTokenCreateDto> AddNewRefreshToken(RefreshTokenCreateDto refreshToken);
        public Task Delete(int userId);
        public Task<RefreshToken> GetByRefreshToken(string refreshToken);
    }
}
