using TableService.Models;
using Microsoft.EntityFrameworkCore;

namespace TableService.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Table> Tables { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Table>().HasData(
                new Table { TableId = 1, TableNumber = "Ban 1", TableType = "VIP", TableStart = DateTime.Now, Price = 100000m, Status = "Available" },
                new Table { TableId = 2, TableNumber = "Ban 2", TableType = "Standard", TableStart = DateTime.Now, Price = 80000m, Status = "Available" },
                new Table { TableId = 3, TableNumber = "Ban 3", TableType = "VIP", TableStart = DateTime.Now, Price = 100000m, Status = "Occupied" },
                new Table { TableId = 4, TableNumber = "Ban 4", TableType = "Standard", TableStart = DateTime.Now, Price = 80000m, Status = "Available" },
                new Table { TableId = 5, TableNumber = "Ban 5", TableType = "Standard", TableStart = DateTime.Now, Price = 80000m, Status = "Available" },
                new Table { TableId = 6, TableNumber = "Ban 6", TableType = "VIP", TableStart = DateTime.Now, Price = 100000m, Status = "Occupied" },
                new Table { TableId = 7, TableNumber = "Ban 7", TableType = "Standard", TableStart = DateTime.Now, Price = 80000m, Status = "Available" },
                new Table { TableId = 8, TableNumber = "Ban 8", TableType = "VIP", TableStart = DateTime.Now, Price = 120000m, Status = "Available" },
                new Table { TableId = 9, TableNumber = "Ban 9", TableType = "Standard", TableStart = DateTime.Now, Price = 80000m, Status = "Occupied" },
                new Table { TableId = 10, TableNumber = "Ban 10", TableType = "VIP", TableStart = DateTime.Now, Price = 120000m, Status = "Available" }
            );
        }
    }
}
