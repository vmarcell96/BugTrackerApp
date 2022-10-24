using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployeeManagementApp.Data.Migrations
{
    public partial class UserMemberRefactor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "UserTeamMember",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "UserTeamMember");
        }
    }
}
