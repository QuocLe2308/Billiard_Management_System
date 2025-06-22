using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductService.Models
{
    public class Drink
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DrinkId { get; set; }

        [Required]
        public string DrinkName { get; set; }

        [Required]
        public int DrinkPrice { get; set; }

        [Required]
        public int Stock { get; set; }

        [Required]
        [ForeignKey("ProductCategory")]
        public int CategoryId { get; set; }  

        public ProductCategory ProductCategory { get; set; }  

        public DateTime? CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; } = DateTime.Now;

        [Required]
        public int CreatedBy { get; set; }

        public int? UpdatedBy { get; set; }
    }
}
