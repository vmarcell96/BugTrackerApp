using BugTrackerApp.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BugTrackerApp.Data.Repositories
{
    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly BugTrackerAppContext _context;

        public RefreshTokenRepository(BugTrackerAppContext context)
        {
            _context = context;
        }

        public async Task Add(RefreshToken refreshToken)
        {
            await _context.RefreshTokens.AddAsync(refreshToken);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            RefreshToken tokenToDelete = await GetById(id);
            if (tokenToDelete == null)
            {
                return;
            }
            _context.RefreshTokens.Remove(tokenToDelete);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAll(int id)
        {
            _context.RefreshTokens.RemoveRange(_context.RefreshTokens.Where(t => t.UserId == id));
            await _context.SaveChangesAsync();
        }

        public async Task<RefreshToken> GetById(int id)
        {
            RefreshToken refreshToken = await _context.RefreshTokens.FirstOrDefaultAsync(r => r.Id == id);
            return refreshToken;
        }

        public async Task<RefreshToken> GetByToken(string refreshToken)
        {
            RefreshToken token = await _context.RefreshTokens.FirstOrDefaultAsync(t => t.Token == refreshToken);
            return token;
        }
    }
}
