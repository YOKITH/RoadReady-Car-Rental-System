using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RoadReady.API.Models
{
    public class CheckOut
    {
        [Key]
        public int CheckOutId { get; set; }

        [Required]
        public int ReservationId { get; set; }

        [ForeignKey(nameof(ReservationId))]
        public Reservation Reservation { get; set; } = null!;

        [Required]
        public int RentalAgentId { get; set; }

        [ForeignKey(nameof(RentalAgentId))]
        public User RentalAgent { get; set; } = null!;

        public DateTime CheckOutDateTime { get; set; } = DateTime.UtcNow;

        [Required]
        public int OdometerEnd { get; set; }

        [Required]
        public string FuelLevel { get; set; } = string.Empty;

        [Required]
        public bool DamageFound { get; set; }

        public string? Remarks { get; set; }
    }
}