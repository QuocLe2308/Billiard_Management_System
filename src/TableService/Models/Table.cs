using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TableService.Models
{
    public class Table
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TableId { get; set; } 

        [Required]
        public string TableNumber { get; set; }

        [Required]
        public string TableType { get; set; } 

        [Required]
        public DateTime TableStart { get; set; } 

        [Required]
        public decimal Price { get; set; } 

        [Required]
        public string Status { get; set; } 
    }
}