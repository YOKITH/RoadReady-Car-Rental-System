using System.ComponentModel.DataAnnotations;

namespace RoadReady.API.DTOs.Maintenance
{
    public class CompleteMaintenanceDto
    {
        [Required(ErrorMessage = "Completion remarks are required.")]
        [StringLength(500)]
        public string CompletionRemarks { get; set; } = string.Empty;
    }
}