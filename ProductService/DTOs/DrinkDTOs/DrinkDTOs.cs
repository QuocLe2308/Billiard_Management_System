using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Query;

namespace ProductService.DTOs.DrinkDTOs
{
    public class DrinkDTOs
    {
        public class DrinkRequestDTO
        {
            public string DrinkName { get; set; }

            public int DrinkPrice { get; set; }

            public int Stock { get; set; }

            public int CategoryId { get; set; }
        }
    }
}
