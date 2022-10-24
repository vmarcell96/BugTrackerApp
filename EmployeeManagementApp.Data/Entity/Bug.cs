using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagementApp.Data.Entity
{
    public class Bug
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public string Title { get; set; }
        public string Details { get; set; }
        public int AssigneeId { get; set; } = 0;
        public int Priority { get; set; }
        public bool IsFixed { get; set; }
        public int CreatorId { get; set; }
        public DateTime PostDate { get; set; } = DateTime.Now;
    }
}
