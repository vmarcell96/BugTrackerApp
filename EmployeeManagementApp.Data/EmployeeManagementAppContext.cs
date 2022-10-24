﻿using EmployeeManagementApp.Data.Entity;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementApp.Data
{
    public class EmployeeManagementAppContext : DbContext
    {
        public EmployeeManagementAppContext(DbContextOptions<EmployeeManagementAppContext> options) : base(options)
        {

        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Project> Projects { get; set; }
    }
}
