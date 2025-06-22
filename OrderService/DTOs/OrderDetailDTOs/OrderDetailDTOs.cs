using System.ComponentModel.DataAnnotations;

namespace OrderService.DTOs.OrderDetailDTOs
{
    public class OrderDetailDTOs
    {
        public class OrderDetailCreateDTO
        {
            public int OrderId { get; set; }
            public int DrinkId { get; set; }
            public int Quantity { get; set; }
            public decimal TotalPrice { get; set; }
        }

        public class OrderDetailUpdateDTO 
        {
            public int? DrinkId { get; set; }

            public int? Quantity { get; set; }

            public decimal? TotalPrice { get; set; }
        }

        public class Bill
        {
            public DateTime TimeStart { get; set; }
            public DateTime TimeEnd { get; set; }
            public decimal TableCost { get; set; }
            public List<DrinkSummary> DrinkSummaries { get; set; }
            public decimal TotalCost { get; set; }
        }

        public class DrinkSummary
        {
            public string DrinkName { get; set; }
            public int Quantity { get; set; }
            public decimal TotalPrice { get; set; }
            public decimal DrinkPrice { get; set; }
        }

        public class UpdateStatusRequest
        {
            public string NewStatus { get; set; }
        }

        public class ViewListDrink
        {
            public int OrderDetailId { get; set; }
            public int OrderId { get; set; }
            public int DrinkId { get; set; }
            public String DrinkName { get; set; }
            public int Quantity { get; set; }
            public decimal TotalPrice { get; set; }
        }

        public class OrderCostViewModel
        {
            public decimal TotalCost { get; set; } // Tổng chi phí
            public decimal PlayCost { get; set; } // Chi phí chơi
            public IEnumerable<ViewListDrink> DrinkDetails { get; set; } // Danh sách chi tiết đồ uống
        }

    }
}
