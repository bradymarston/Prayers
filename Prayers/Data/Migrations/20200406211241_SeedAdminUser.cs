using Microsoft.EntityFrameworkCore.Migrations;

namespace Prayers.data.Migrations
{
    public partial class SeedAdminUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'33bd8cd2-efc3-4136-848d-2e65e2340b60', N'Admin', N'ADMIN', NULL, NULL, 0, N'AQAAAAEAACcQAAAAEM4SeN6tdByABTSMI4TKjr/dvSjX/NLujT0KIATL+vsbOUpS3kuX/fRkKbuZlwkytg==', N'A6425R7L7OXYL3VFYUDBLIS6OV3PPODL', N'a70b4955-bf84-4b54-a032-506b2fc5717a', NULL, 0, 0, NULL, 1, 0)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData("AspNetUsers", "Id", "33bd8cd2-efc3-4136-848d-2e65e2340b60");
        }
    }
}
