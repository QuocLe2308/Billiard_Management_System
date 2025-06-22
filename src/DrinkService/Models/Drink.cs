using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DrinkService.Models
{
    public class Drink
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int DrinkId { get; set; }

        [Required]
        public string DrinkName { get; set; }

        [Required]
        public string DrinkPrice { get; set; }

    }

}