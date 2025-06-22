using ProductService.Models;
using static ProductService.DTOs.DrinkDTOs.DrinkDTOs;
namespace ProductService.Repository.DrinkRepository
{
    public interface IDrinkRepository
    {
        Task<IEnumerable<Drink>> GetAllDrinksAsync();
        Task<Drink> GetDrinkByIdAsync(int id);
        Task AddDrinkAsync(Drink drink);
        Task UpdateDrinkAsync(int id, DrinkRequestDTO drinkRequestDTO);
        Task DeleteDrinkAsync(int id);
    }
}
