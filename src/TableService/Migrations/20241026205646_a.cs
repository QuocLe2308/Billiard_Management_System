using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TableService.Migrations
{
    /// <inheritdoc />
    public partial class a : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tables",
                columns: table => new
                {
                    TableId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TableNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TableType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TableStart = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tables", x => x.TableId);
                });

            migrationBuilder.InsertData(
                table: "Tables",
                columns: new[] { "TableId", "Price", "Status", "TableNumber", "TableStart", "TableType" },
                values: new object[,]
                {
                    { 1, 100000m, "Available", "Ban 1", new DateTime(2024, 10, 27, 3, 56, 46, 303, DateTimeKind.Local).AddTicks(8745), "VIP" },
                    { 2, 80000m, "Available", "Ban 2", new DateTime(2024, 10, 27, 3, 56, 46, 303, DateTimeKind.Local).AddTicks(8759), "Standard" },
                    { 3, 100000m, "Occupied", "Ban 3", new DateTime(2024, 10, 27, 3, 56, 46, 303, DateTimeKind.Local).AddTicks(8761), "VIP" },
                    { 4, 80000m, "Available", "Ban 4", new DateTime(2024, 10, 27, 3, 56, 46, 303, DateTimeKind.Local).AddTicks(8762), "Standard" },
                    { 5, 80000m, "Available", "Ban 5", new DateTime(2024, 10, 27, 3, 56, 46, 303, DateTimeKind.Local).AddTicks(8763), "Standard" },
                    { 6, 100000m, "Occupied", "Ban 6", new DateTime(2024, 10, 27, 3, 56, 46, 303, DateTimeKind.Local).AddTicks(8766), "VIP" },
                    { 7, 80000m, "Available", "Ban 7", new DateTime(2024, 10, 27, 3, 56, 46, 303, DateTimeKind.Local).AddTicks(8768), "Standard" },
                    { 8, 120000m, "Available", "Ban 8", new DateTime(2024, 10, 27, 3, 56, 46, 303, DateTimeKind.Local).AddTicks(8769), "VIP" },
                    { 9, 80000m, "Occupied", "Ban 9", new DateTime(2024, 10, 27, 3, 56, 46, 303, DateTimeKind.Local).AddTicks(8770), "Standard" },
                    { 10, 120000m, "Available", "Ban 10", new DateTime(2024, 10, 27, 3, 56, 46, 303, DateTimeKind.Local).AddTicks(8771), "VIP" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tables");
        }
    }
}
