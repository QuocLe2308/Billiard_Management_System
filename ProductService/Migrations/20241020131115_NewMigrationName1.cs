using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProductService.Migrations
{
    /// <inheritdoc />
    public partial class NewMigrationName1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ProductCategories",
                keyColumn: "CategoryId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 10, 20, 20, 11, 15, 407, DateTimeKind.Local).AddTicks(6932), new DateTime(2024, 10, 20, 20, 11, 15, 407, DateTimeKind.Local).AddTicks(6947) });

            migrationBuilder.UpdateData(
                table: "ProductCategories",
                keyColumn: "CategoryId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 10, 20, 20, 11, 15, 407, DateTimeKind.Local).AddTicks(6950), new DateTime(2024, 10, 20, 20, 11, 15, 407, DateTimeKind.Local).AddTicks(6950) });

            migrationBuilder.UpdateData(
                table: "ProductCategories",
                keyColumn: "CategoryId",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 10, 20, 20, 11, 15, 407, DateTimeKind.Local).AddTicks(6951), new DateTime(2024, 10, 20, 20, 11, 15, 407, DateTimeKind.Local).AddTicks(6952) });

            migrationBuilder.UpdateData(
                table: "ProductCategories",
                keyColumn: "CategoryId",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 10, 20, 20, 11, 15, 407, DateTimeKind.Local).AddTicks(6953), new DateTime(2024, 10, 20, 20, 11, 15, 407, DateTimeKind.Local).AddTicks(6953) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ProductCategories",
                keyColumn: "CategoryId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 10, 20, 19, 36, 48, 741, DateTimeKind.Local).AddTicks(6358), new DateTime(2024, 10, 20, 19, 36, 48, 741, DateTimeKind.Local).AddTicks(6375) });

            migrationBuilder.UpdateData(
                table: "ProductCategories",
                keyColumn: "CategoryId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 10, 20, 19, 36, 48, 741, DateTimeKind.Local).AddTicks(6378), new DateTime(2024, 10, 20, 19, 36, 48, 741, DateTimeKind.Local).AddTicks(6378) });

            migrationBuilder.UpdateData(
                table: "ProductCategories",
                keyColumn: "CategoryId",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 10, 20, 19, 36, 48, 741, DateTimeKind.Local).AddTicks(6380), new DateTime(2024, 10, 20, 19, 36, 48, 741, DateTimeKind.Local).AddTicks(6380) });

            migrationBuilder.UpdateData(
                table: "ProductCategories",
                keyColumn: "CategoryId",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 10, 20, 19, 36, 48, 741, DateTimeKind.Local).AddTicks(6381), new DateTime(2024, 10, 20, 19, 36, 48, 741, DateTimeKind.Local).AddTicks(6381) });
        }
    }
}
