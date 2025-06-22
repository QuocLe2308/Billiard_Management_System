using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrderService.DTOs.RequestModels
{
    public class RequestModels
    {
        public class TableDto
        {
            public int TableId { get; set; }

            public string TableNumber { get; set; }

            public string TableType { get; set; }

            public DateTime TableStart { get; set; }

            public decimal Price { get; set; }

            public string Status { get; set; }
        }
        
        public class DrinkDto
        {
            public int DrinkId { get; set; }

            public string DrinkName { get; set; }

            public int DrinkPrice { get; set; }

            public int Stock { get; set; }

            public int CategoryId { get; set; }
        }
    }
}
