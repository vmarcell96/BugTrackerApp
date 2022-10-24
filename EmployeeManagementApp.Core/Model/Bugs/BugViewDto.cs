using EmployeeManagementApp.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagementApp.Core.Model.Bugs
{
    public class BugViewDto
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public string Title { get; set; }
        public string Details { get; set; }
        public User Assignee { get; set; }
        public User Creator { get; set; }
        public int Priority { get; set; }
        public DateTime PostDate { get; set; }
    }
}
