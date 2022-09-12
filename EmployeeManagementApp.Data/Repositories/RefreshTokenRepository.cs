using EmployeeManagementApp.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementApp.Data.Repositories
{
    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly EmployeeManagementAppContext _context;

        public RefreshTokenRepository(EmployeeManagementAppContext context)
        {
            _context = context;
        }

        public async Task Add(RefreshToken refreshToken)
        {
            await _context.RefreshTokens.AddAsync(refreshToken);
            await _context.SaveChangesAsync();
        }

        public async Task<RefreshToken> GetByToken(string refreshToken)
        {
            RefreshToken token = await _context.RefreshTokens.FirstOrDefaultAsync(t => t.Token == refreshToken);
            return token;
        }
    }
}
