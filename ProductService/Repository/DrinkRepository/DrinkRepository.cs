using Microsoft.EntityFrameworkCore;
using ProductService.Data;
using ProductService.Models;
using ProductService.Repository.DrinkRepository;
using System.Collections.Generic;
using System.Threading.Tasks;
using static ProductService.DTOs.DrinkDTOs.DrinkDTOs;

namespace ProductService.Repository.DrinkRepository
{
    public class DrinkRepository : IDrinkRepository
    {
        private readonly AppDbContext _context;

        public DrinkRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Drink>> GetAllDrinksAsync()
        {
            return await _context.Drinks.Include(d => d.ProductCategory).ToListAsync();
        }

        public async Task<Drink> GetDrinkByIdAsync(int id)
        {
            return await _context.Drinks.Include(d => d.ProductCategory).FirstOrDefaultAsync(d => d.DrinkId == id);
        }

        public async Task AddDrinkAsync(Drink drink)
        {
            await _context.Drinks.AddAsync(drink);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateDrinkAsync(int id, DrinkRequestDTO drinkRequestDTO)
        {
            var drink = await _context.Drinks.FindAsync(id);
            if (drink != null)
            {
                drink.DrinkName = drinkRequestDTO.DrinkName;
                drink.DrinkPrice = drinkRequestDTO.DrinkPrice; 
                drink.Stock = drinkRequestDTO.Stock;
                drink.CategoryId = drinkRequestDTO.CategoryId; 
                await _context.SaveChangesAsync();
            }
        }


        public async Task DeleteDrinkAsync(int id)
        {
            var drink = await _context.Drinks.FindAsync(id);
            if (drink != null)
            {
                _context.Drinks.Remove(drink);
                await _context.SaveChangesAsync();
            }
        }
    }
}
