using Microsoft.AspNetCore.Mvc;
using ProductService.DTOs;
using ProductService.Services;
using System.Threading.Tasks;
using static ProductService.DTOs.DrinkDTOs.DrinkDTOs;

namespace ProductService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DrinkController : ControllerBase
    {
        private readonly IDrinkService _drinkService;

        public DrinkController(IDrinkService drinkService)
        {
            _drinkService = drinkService;
        }

        // GET: api/drink
        [HttpGet]
        public async Task<IActionResult> GetAllDrinks()
        {
            var drinks = await _drinkService.GetAllDrinksAsync();
            return Ok(drinks);
        }

        // GET: api/drink/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDrinkById(int id)
        {
            var drink = await _drinkService.GetDrinkByIdAsync(id);
            if (drink == null)
                return NotFound();
            return Ok(drink);
        }

        // POST: api/drink
        [HttpPost]
        public async Task<IActionResult> CreateDrink([FromBody] DrinkRequestDTO drinkRequestDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _drinkService.CreateDrinkAsync(drinkRequestDTO);

            var createdDrink = await _drinkService.GetAllDrinksAsync(); 
            return CreatedAtAction(nameof(GetAllDrinks), createdDrink); 
        }


        // PUT: api/drink/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDrink(int id, [FromBody] DrinkRequestDTO drinkRequestDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _drinkService.UpdateDrinkAsync(id, drinkRequestDTO);
            return NoContent();
        }

        // DELETE: api/drink/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDrink(int id)
        {
            await _drinkService.DeleteDrinkAsync(id);
            return NoContent();
        }
    }
}
