using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagementApp.Data.Entity
{
    public class Bug
    {
        public int ID { get; set; }
        public string ProjectId { get; set; }
        public string Title { get; set; }
        public string Details { get; set; }
        public string Version { get; set; }
        public string Assigned { get; set; }
        public User Creator { get; set; }
        public int Priority { get; set; }
        public DateTime PostDate { get; set; }
    }
}
