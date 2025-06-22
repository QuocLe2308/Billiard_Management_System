using Microsoft.AspNetCore.Mvc;
using ProductService.Models;
using ProductService.DTOs.ProductCategoryDTOs;
using ProductService.Services.ProductCategoryService;
using static ProductService.DTOs.ProductCategoryDTOs.ProductCategoryDTOs;

namespace ProductService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductCategoryController : ControllerBase
    {
        private readonly IProductCategoryService _productCategoryService;

        public ProductCategoryController(IProductCategoryService productCategoryService)
        {
            _productCategoryService = productCategoryService;
        }

        // GET: api/ProductCategory
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductCategory>>> GetAllProductCategories()
        {
            var categories = await _productCategoryService.GetAllProductCategoriesAsync();
            return Ok(categories);
        }

        // GET: api/ProductCategory/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductCategory>> GetProductCategoryById(int id)
        {
            var category = await _productCategoryService.GetProductCategoryByIdAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        // POST: api/ProductCategory
        [HttpPost]
        public async Task<ActionResult> AddProductCategory(ProductCategoryRequestDTO productCategoryRequestDTO)
        {
            await _productCategoryService.AddProductCategoryAsync(productCategoryRequestDTO);
            return Created("api/ProductCategory", null); // Trả về 201 Created mà không cần ID
        }

        // PUT: api/ProductCategory/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProductCategory(int id, ProductCategoryRequestDTO productCategoryRequestDTO)
        {
            var category = await _productCategoryService.GetProductCategoryByIdAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            await _productCategoryService.UpdateProductCategoryAsync(id, productCategoryRequestDTO);
            return NoContent();
        }

        // DELETE: api/ProductCategory/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductCategory(int id)
        {
            var category = await _productCategoryService.GetProductCategoryByIdAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            await _productCategoryService.DeleteProductCategoryAsync(id);
            return NoContent();
        }
    }
}
