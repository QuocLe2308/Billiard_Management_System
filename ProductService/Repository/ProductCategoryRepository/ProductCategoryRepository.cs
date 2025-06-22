using ProductService.Models;
using ProductService.Data;
using static ProductService.DTOs.ProductCategoryDTOs.ProductCategoryDTOs;
using Microsoft.EntityFrameworkCore;

namespace ProductService.Repository.ProductCategoryRepository
{
    public class ProductCategoryRepository : IProductCategoryRepository
    {
        private readonly AppDbContext _context;

        public ProductCategoryRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ProductCategory>> GetAllProductCategoriesAsync()
        {
            return await _context.ProductCategories.ToListAsync();
        }

        public async Task<ProductCategory> GetProductCategoryByIdAsync(int id)
        {
            return await _context.ProductCategories.FindAsync(id);
        }

        public async Task AddProductCategoryAsync(ProductCategory productCategory)
        {
            await _context.ProductCategories.AddAsync(productCategory);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProductCategoryAsync(int id, ProductCategoryRequestDTO productCategoryRequestDTO)
        {
            var productCategory = await _context.ProductCategories.FindAsync(id);
            if (productCategory != null)
            {
                productCategory.CategoryName = productCategoryRequestDTO.CategoryName;
                productCategory.Description = productCategoryRequestDTO.Description;
                productCategory.UpdatedAt = DateTime.Now; 
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteProductCategoryAsync(int id)
        {
            var productCategory = await _context.ProductCategories.FindAsync(id);
            if (productCategory != null)
            {
                _context.ProductCategories.Remove(productCategory);
                await _context.SaveChangesAsync();
            }
        }
    }
}
