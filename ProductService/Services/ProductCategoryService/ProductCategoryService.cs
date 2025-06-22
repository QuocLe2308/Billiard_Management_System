using ProductService.Models;
using ProductService.Repository.ProductCategoryRepository;
using ProductService.DTOs.ProductCategoryDTOs;
using static ProductService.DTOs.ProductCategoryDTOs.ProductCategoryDTOs;
using static ProductService.DTOs.DrinkDTOs.DrinkDTOs;

namespace ProductService.Services.ProductCategoryService
{
    public class ProductCategoryService : IProductCategoryService
    {
        private readonly IProductCategoryRepository _productCategoryRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ProductCategoryService(IProductCategoryRepository productCategoryRepository, IHttpContextAccessor httpContextAccessor)
        {
            _productCategoryRepository = productCategoryRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<IEnumerable<ProductCategory>> GetAllProductCategoriesAsync()
        {
            return await _productCategoryRepository.GetAllProductCategoriesAsync();
        }

        public async Task<ProductCategory> GetProductCategoryByIdAsync(int id)
        {
            return await _productCategoryRepository.GetProductCategoryByIdAsync(id);
        }

        public async Task AddProductCategoryAsync(ProductCategoryRequestDTO productCategoryRequestDTO)
        {
            var userId = GetUserIdFromToken();
            var productCategory = new ProductCategory
            {
                CategoryName = productCategoryRequestDTO.CategoryName,
                Description = productCategoryRequestDTO.Description,
                CreatedBy = userId,
            };
            await _productCategoryRepository.AddProductCategoryAsync(productCategory);
        }

        public async Task UpdateProductCategoryAsync(int id, ProductCategoryRequestDTO productCategoryRequestDTO)
        {
            var productCategory = await _productCategoryRepository.GetProductCategoryByIdAsync(id);
            var userId = GetUserIdFromToken();
            if (productCategory != null)
            {
                productCategory.CategoryName = productCategoryRequestDTO.CategoryName;
                productCategory.Description = productCategoryRequestDTO.Description;
                productCategory.UpdatedAt = System.DateTime.Now;
                productCategory.UpdatedBy = userId;
                await _productCategoryRepository.UpdateProductCategoryAsync(id, productCategoryRequestDTO);
            }
            await _productCategoryRepository.UpdateProductCategoryAsync(id, productCategoryRequestDTO);
        }

        public async Task DeleteProductCategoryAsync(int id)
        {
            await _productCategoryRepository.DeleteProductCategoryAsync(id);
        }

        private int GetUserIdFromToken()
        {
            var token = _httpContextAccessor.HttpContext.Request.Headers["Authorization"]
                .ToString().Replace("Bearer ", "");

            var handler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var userIdClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "userId");

            return userIdClaim != null ? int.Parse(userIdClaim.Value) : 0;
        }
    }
}
