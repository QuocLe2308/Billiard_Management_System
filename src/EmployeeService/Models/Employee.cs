using System.ComponentModel.DataAnnotations;

namespace EmployeeService.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [StringLength(15)]
        public string Phone { get; set; }

        [Required]
        public string Role { get; set; } // staff, manager, admin

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
