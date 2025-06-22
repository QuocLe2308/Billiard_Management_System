using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OrderService.Models
{
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderId { get; set; }

        [Required]
        public DateTime OrderDate { get; set; } = DateTime.Now;

        [Required]
        public string Status { get; set; } = "Pending";

        [Required]
        public int TableId { get; set; }

        public decimal? TotalPrice { get; set; }

        public DateTime? CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; } = DateTime.Now;

        [Required]
        public int CreatedBy { get; set; }
        public int? UpdatedBy { get; set; }
        public List<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

        [Required]
        public DateTime TimeStart { get; set; } = DateTime.Now;

        [Required]
        public DateTime TimeEnd { get; set; }
    }
}
