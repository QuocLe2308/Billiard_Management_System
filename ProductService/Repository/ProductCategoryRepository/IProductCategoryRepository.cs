using ProductService.Models;
using static ProductService.DTOs.ProductCategoryDTOs.ProductCategoryDTOs;
namespace ProductService.Repository.ProductCategoryRepository
{
        public interface IProductCategoryRepository
        {
            Task<IEnumerable<ProductCategory>> GetAllProductCategoriesAsync();
            Task<ProductCategory> GetProductCategoryByIdAsync(int id);
            Task AddProductCategoryAsync(ProductCategory productCategory);
            Task UpdateProductCategoryAsync(int id, ProductCategoryRequestDTO productCategoryRequestDTO);
            Task DeleteProductCategoryAsync(int id);
        }
    }
