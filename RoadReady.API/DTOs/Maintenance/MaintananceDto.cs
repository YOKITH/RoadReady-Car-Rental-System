using System.ComponentModel.DataAnnotations;

namespace RoadReady.API.DTOs.Maintenance
{
    public class MaintenanceDto
    {
        [Required(ErrorMessage = "Car is required.")]
        public int CarId { get; set; }

        [Required(ErrorMessage = "Maintenance type is required.")]
        [StringLength(50)]
        public string MaintenanceType { get; set; } = string.Empty;

        [Required(ErrorMessage = "Description is required.")]
        [StringLength(500)]
        public string Description { get; set; } = string.Empty;

        [Range(0, 1000000, ErrorMessage = "Estimated cost must be greater than or equal to 0.")]
        public decimal EstimatedCost { get; set; }

        [Required(ErrorMessage = "Priority is required.")]
        public string Priority { get; set; } = "Medium";
    }
}