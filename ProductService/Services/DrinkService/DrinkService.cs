using ProductService.DTOs.DrinkDTOs;
using ProductService.Models;
using ProductService.Repository;
using ProductService.Repository.DrinkRepository;
using System.Collections.Generic;
using System.Threading.Tasks;
using static ProductService.DTOs.DrinkDTOs.DrinkDTOs;

namespace ProductService.Services.DrinkSerivce;

public class DrinkService : IDrinkService
{
    private readonly IDrinkRepository _drinkRepository;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public DrinkService(IDrinkRepository drinkRepository, IHttpContextAccessor httpContextAccessor)
    {
        _drinkRepository = drinkRepository;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<IEnumerable<Drink>> GetAllDrinksAsync()
    {
        return await _drinkRepository.GetAllDrinksAsync();
    }

    public async Task<Drink> GetDrinkByIdAsync(int id)
    {
        return await _drinkRepository.GetDrinkByIdAsync(id);
    }

    public async Task CreateDrinkAsync(DrinkRequestDTO drinkRequestDTO)
        {
            var userId = GetUserIdFromToken();
            var drink = new Drink
            {
                DrinkName = drinkRequestDTO.DrinkName,
                DrinkPrice = drinkRequestDTO.DrinkPrice,
                Stock = drinkRequestDTO.Stock,
                CategoryId = drinkRequestDTO.CategoryId,
                CreatedBy = userId,  
            };
            await _drinkRepository.AddDrinkAsync(drink);
        }

    public async Task UpdateDrinkAsync(int id, DrinkRequestDTO drinkRequestDTO)
    {
        var drink = await _drinkRepository.GetDrinkByIdAsync(id);
        var userId = GetUserIdFromToken();
        if (drink != null)
        {
            drink.DrinkName = drinkRequestDTO.DrinkName;
            drink.DrinkPrice = drinkRequestDTO.DrinkPrice;
            drink.Stock = drinkRequestDTO.Stock;
            drink.CategoryId = drinkRequestDTO.CategoryId;
            drink.UpdatedAt = System.DateTime.Now;
            drink.UpdatedBy = userId;
            await _drinkRepository.UpdateDrinkAsync(id, drinkRequestDTO);
        }
    }

    public async Task DeleteDrinkAsync(int id)
    {
        await _drinkRepository.DeleteDrinkAsync(id);
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
