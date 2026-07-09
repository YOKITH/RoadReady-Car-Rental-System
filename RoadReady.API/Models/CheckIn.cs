using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RoadReady.API.Models
{
    public class CheckIn
    {
        [Key]
        public int CheckInId { get; set; }

        // ===========================
        // Reservation
        // ===========================

        [Required(ErrorMessage = "Reservation is required.")]
        public int ReservationId { get; set; }

        [ForeignKey(nameof(ReservationId))]
        public Reservation Reservation { get; set; } = null!;

        // ===========================
        // Rental Agent
        // ===========================

        [Required(ErrorMessage = "Rental Agent is required.")]
        public int RentalAgentId { get; set; }

        [ForeignKey(nameof(RentalAgentId))]
        public User RentalAgent { get; set; } = null!;

        // ===========================
        // Check-In Details
        // ===========================

        [Required]
        public DateTime CheckInDateTime { get; set; } = DateTime.UtcNow;

        [Required(ErrorMessage = "Odometer reading is required.")]
        [Range(0, 999999, ErrorMessage = "Odometer reading must be between 0 and 999999.")]
        public int OdometerStart { get; set; }

        [Required(ErrorMessage = "Fuel level is required.")]
        [StringLength(20, ErrorMessage = "Fuel level cannot exceed 20 characters.")]
        public string FuelLevel { get; set; } = string.Empty;

        [Required]
        public bool KeyHandedOver { get; set; }

        [StringLength(500, ErrorMessage = "Remarks cannot exceed 500 characters.")]
        public string? Remarks { get; set; }
    }
}