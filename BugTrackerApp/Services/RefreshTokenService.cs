using BugTrackerApp.Core.Extensions;
using BugTrackerApp.Core.Model;
using BugTrackerApp.Core.Model.Projects;
using BugTrackerApp.Core.Model.RefreshTokens;
using BugTrackerApp.Data;
using BugTrackerApp.Data.Entity;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
//using System.Data.Entity.Core;
//using System.Data.Entity.Validation;

namespace BugTrackerApp.Services
{
    public class RefreshTokenService : IRefreshTokenService
    {
        private readonly BugTrackerAppContext _context;

        public RefreshTokenService(BugTrackerAppContext context)
        {
            _context = context;
        }

        public async Task<Result> AddNewRefreshToken(RefreshTokenCreateDto refreshToken)
        {
            try
            {
                var refreshTokenEntity = refreshToken.ToRefreshTokenEntity();
                await _context.RefreshTokens.AddAsync(refreshTokenEntity);
                await _context.SaveChangesAsync();
                return Result.Ok();
            }
            catch (SqlException e)
            {
                Console.WriteLine("error");
                return Result.Fail(e.Message);
            }
            catch (DbUpdateException e)
            {
                return Result.Fail(e.Message);
            }
            //catch (EntityCommandExecutionException e)
            //{
            //    return Result.Fail(e.Message);
            //}
            //catch (DbEntityValidationException e)
            //{
            //    return Result.Fail(e.Message);
            //}
            catch (Exception e)
            {
                return Result.Fail(e.Message);
            }
        }

        public async Task<Result> Delete(int id)
        {
            try
            {
                RefreshToken? refreshToken = await _context.RefreshTokens.FirstOrDefaultAsync(r => r.Id == id);
                if (refreshToken == null)
                {
                    return Result.Fail("Refresh token with the provided id not found.");
                }

                _context.RefreshTokens.Remove(refreshToken);
                await _context.SaveChangesAsync();
                return Result.Ok();
            }
            catch (SqlException e)
            {
                return Result.Fail(e.Message);
            }
            catch (DbUpdateException e)
            {
                return Result.Fail(e.Message);
            }
            catch (Exception e)
            {
                return Result.Fail(e.Message);
            }
        }

        public async Task<Result<RefreshToken>> GetByRefreshToken(string refreshToken)
        {
            try
            {
                RefreshToken? token = await _context.RefreshTokens.FirstOrDefaultAsync(t => t.Token == refreshToken);
                if (token == null)
                {
                    return Result.Fail<RefreshToken>("Refresh token with the provided id not found.");
                }
                return Result.Ok(token);
            }
            catch (SqlException e)
            {
                return Result.Fail<RefreshToken>(e.Message);
            }
            catch (Exception e)
            {
                return Result.Fail<RefreshToken>(e.Message);
            }
        }

        public async Task<Result> DeleteAll(int id)
        {
            try
            {
                _context.RefreshTokens.RemoveRange(_context.RefreshTokens.Where(t => t.UserId == id));
                await _context.SaveChangesAsync();
                return Result.Ok();
            }
            catch (SqlException e)
            {
                return Result.Fail(e.Message);
            }
            catch (DbUpdateException e)
            {
                return Result.Fail(e.Message);
            }
            catch (Exception e)
            {
                return Result.Fail(e.Message);
            }
        }
    }
}
