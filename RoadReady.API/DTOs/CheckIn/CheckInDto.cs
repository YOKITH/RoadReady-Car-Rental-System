using System.ComponentModel.DataAnnotations;

namespace RoadReady.API.DTOs.CheckIn
{
    public class CheckInDto
    {
        [Required]
        public int ReservationId { get; set; }

        [Required]
        public int RentalAgentId { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int OdometerStart { get; set; }

        [Required]
        [StringLength(20)]
        public string FuelLevel { get; set; } = string.Empty;

        [Required]
        public bool KeyHandedOver { get; set; }

        [StringLength(500)]
        public string? Remarks { get; set; }
    }
}