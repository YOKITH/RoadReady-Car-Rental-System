using System.ComponentModel.DataAnnotations;

namespace RoadReady.API.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        [Phone]
        [StringLength(15)]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        [StringLength(20)]
        public string Role { get; set; } = "Customer";
        // Customer, Admin, RentalAgent

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        // ==========================================================
        // Navigation Properties
        // ==========================================================

        public ICollection<Reservation> Reservations { get; set; }
            = new List<Reservation>();

        public ICollection<Payment> Payments { get; set; }
            = new List<Payment>();

        public ICollection<Review> Reviews { get; set; }
            = new List<Review>();

        public ICollection<RefreshToken> RefreshTokens { get; set; }
            = new List<RefreshToken>();

        // Rental Agent Operations

        public ICollection<CheckIn> CheckIns { get; set; }
            = new List<CheckIn>();

        public ICollection<CheckOut> CheckOuts { get; set; }
            = new List<CheckOut>();

        public ICollection<MaintenanceReport> MaintenanceReports { get; set; }
            = new List<MaintenanceReport>();
    }
}