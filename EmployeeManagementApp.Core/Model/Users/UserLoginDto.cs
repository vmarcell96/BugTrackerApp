﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagementApp.Core.Model.Users
{
    public class UserLoginDto
    {
        [Required]
        public int ID { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string HashedPassword { get; set; }
        [Required]
        public string Role { get; set; }
    }
}
