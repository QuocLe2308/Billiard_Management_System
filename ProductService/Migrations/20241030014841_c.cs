using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProductService.Migrations
{
    /// <inheritdoc />
    public partial class c : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedAt",
                table: "Drinks",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Drinks",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.UpdateData(
                table: "ProductCategories",
                keyColumn: "CategoryId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 10, 30, 8, 48, 40, 850, DateTimeKind.Local).AddTicks(1628), new DateTime(2024, 10, 30, 8, 48, 40, 850, DateTimeKind.Local).AddTicks(1651) });

            migrationBuilder.UpdateData(
                table: "ProductCategories",
                keyColumn: "CategoryId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 10, 30, 8, 48, 40, 850, DateTimeKind.Local).AddTicks(1655), new DateTime(2024, 10, 30, 8, 48, 40, 850, DateTimeKind.Local).AddTicks(1655) });

            migrationBuilder.UpdateData(
                table: "ProductCategories",
                keyColumn: "CategoryId",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 10, 30, 8, 48, 40, 850, DateTimeKind.Local).AddTicks(1657), new DateTime(2024, 10, 30, 8, 48, 40, 850, DateTimeKind.Local).AddTicks(1657) });

            migrationBuilder.UpdateData(
                table: "ProductCategories",
                keyColumn: "CategoryId",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 10, 30, 8, 48, 40, 850, DateTimeKind.Local).AddTicks(1659), new DateTime(2024, 10, 30, 8, 48, 40, 850, DateTimeKind.Local).AddTicks(1659) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedAt",
                table: "Drinks",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Drinks",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

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
    }
}
