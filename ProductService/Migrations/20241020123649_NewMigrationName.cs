using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ProductService.Migrations
{
    /// <inheritdoc />
    public partial class NewMigrationName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProductCategories",
                columns: table => new
                {
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductCategories", x => x.CategoryId);
                });

            migrationBuilder.CreateTable(
                name: "Drinks",
                columns: table => new
                {
                    DrinkId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DrinkName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DrinkPrice = table.Column<int>(type: "int", nullable: false),
                    Stock = table.Column<int>(type: "int", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Drinks", x => x.DrinkId);
                    table.ForeignKey(
                        name: "FK_Drinks_ProductCategories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "ProductCategories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "ProductCategories",
                columns: new[] { "CategoryId", "CategoryName", "CreatedAt", "CreatedBy", "Description", "UpdatedAt", "UpdatedBy" },
                values: new object[,]
                {
                    { 1, "Sinh To", new DateTime(2024, 10, 20, 19, 36, 48, 741, DateTimeKind.Local).AddTicks(6358), 1, null, new DateTime(2024, 10, 20, 19, 36, 48, 741, DateTimeKind.Local).AddTicks(6375), null },
                    { 2, "Bia", new DateTime(2024, 10, 20, 19, 36, 48, 741, DateTimeKind.Local).AddTicks(6378), 1, null, new DateTime(2024, 10, 20, 19, 36, 48, 741, DateTimeKind.Local).AddTicks(6378), null },
                    { 3, "Nuoc Ngot", new DateTime(2024, 10, 20, 19, 36, 48, 741, DateTimeKind.Local).AddTicks(6380), 1, null, new DateTime(2024, 10, 20, 19, 36, 48, 741, DateTimeKind.Local).AddTicks(6380), null },
                    { 4, "Coffee", new DateTime(2024, 10, 20, 19, 36, 48, 741, DateTimeKind.Local).AddTicks(6381), 1, null, new DateTime(2024, 10, 20, 19, 36, 48, 741, DateTimeKind.Local).AddTicks(6381), null }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Drinks_CategoryId",
                table: "Drinks",
                column: "CategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Drinks");

            migrationBuilder.DropTable(
                name: "ProductCategories");
        }
    }
}
