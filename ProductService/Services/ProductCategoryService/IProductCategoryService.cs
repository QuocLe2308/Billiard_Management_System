using ProductService.Models;
using static ProductService.DTOs.ProductCategoryDTOs.ProductCategoryDTOs;

namespace ProductService.Services.ProductCategoryService
{
    public interface IProductCategoryService
    {
        Task<IEnumerable<ProductCategory>> GetAllProductCategoriesAsync();
        Task<ProductCategory> GetProductCategoryByIdAsync(int id);
        Task AddProductCategoryAsync(ProductCategoryRequestDTO productCategoryRequestDTO);
        Task UpdateProductCategoryAsync(int id, ProductCategoryRequestDTO productCategoryRequestDTO);
        Task DeleteProductCategoryAsync(int id);
    }
}
