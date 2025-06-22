using ProductService.DTOs.DrinkDTOs;
using ProductService.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using static ProductService.DTOs.DrinkDTOs.DrinkDTOs;

namespace ProductService.Services
{
    public interface IDrinkService
    {
        Task<IEnumerable<Drink>> GetAllDrinksAsync();
        Task<Drink> GetDrinkByIdAsync(int id);
        Task CreateDrinkAsync(DrinkRequestDTO drinkRequestDTO);
        Task UpdateDrinkAsync(int id, DrinkRequestDTO drinkRequestDTO);
        Task DeleteDrinkAsync(int id);
    }
}
