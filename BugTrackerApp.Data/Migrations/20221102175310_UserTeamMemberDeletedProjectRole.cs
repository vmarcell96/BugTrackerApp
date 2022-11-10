using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BugTrackerApp.Data.Migrations
{
    public partial class UserTeamMemberDeletedProjectRole : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProjectRole",
                table: "UserTeamMember");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProjectRole",
                table: "UserTeamMember",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
