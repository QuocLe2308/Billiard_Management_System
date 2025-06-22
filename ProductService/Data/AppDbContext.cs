using Microsoft.EntityFrameworkCore;
using ProductService.Models;

namespace ProductService.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Drink> Drinks { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed default product categories
            modelBuilder.Entity<ProductCategory>().HasData(
                new ProductCategory { CategoryId = 1, CategoryName = "Sinh To", CreatedBy = 1 },
                new ProductCategory { CategoryId = 2, CategoryName = "Bia", CreatedBy = 1 },
                new ProductCategory { CategoryId = 3, CategoryName = "Nuoc Ngot", CreatedBy = 1 },
                new ProductCategory { CategoryId = 4, CategoryName = "Coffee", CreatedBy = 1 }
            );

            //modelBuilder.Entity<ProductCategory>()
            //    .HasMany(c => c.Drinks)
            //    .WithOne(d => d.ProductCategory)
            //    .HasForeignKey(d => d.CategoryId)
            //    .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
