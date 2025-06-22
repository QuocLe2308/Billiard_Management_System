using System.ComponentModel.DataAnnotations;

namespace OrderService.DTOs.OrderDTOs
{
    public class OrderDTOs
    {
        public class OrderCreateDTO 
        {
            public int TableId { get; set; }
        }
        public class OrderUpdateDTO
        {
            public DateTime? OrderDate { get; set; } = DateTime.Now;
            public int? UpdateBy { get; set; }
            public string? Status { get; set; }

            public int? TableId { get; set; }

            public decimal? TotalPrice { get; set; }

            public DateTime? CreatedAt { get; set; } = DateTime.Now;
            public DateTime? UpdatedAt { get; set; } = DateTime.Now;
            public DateTime? TimeEnd {  get; set; } 
        }

        public class Response
        {
            public bool Success { get; set; }
            public string Message { get; set; }
        }

    }
}
