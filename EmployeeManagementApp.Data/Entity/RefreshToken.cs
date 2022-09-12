using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagementApp.Data.Entity
{
    public class RefreshToken
    {
        public int ID { get; set; }
        public string Token { get; set; }
        public int UserId { get; set; }

    }
}
