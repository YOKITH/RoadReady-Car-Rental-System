using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RoadReady.API.Models
{
    public class MaintenanceReport
    {
        // ===========================
        // Primary Key
        // ===========================

        [Key]
        public int ReportId { get; set; }

        // ===========================
        // Car Details
        // ===========================

        [Required(ErrorMessage = "Car is required.")]
        public int CarId { get; set; }

        [ForeignKey(nameof(CarId))]
        public Car Car { get; set; } = null!;

        // ===========================
        // Rental Agent Details
        // ===========================

        [Required(ErrorMessage = "Reported By is required.")]
        public int ReportedBy { get; set; }

        [ForeignKey(nameof(ReportedBy))]
        public User ReportedByUser { get; set; } = null!;

        // ===========================
        // Maintenance Information
        // ===========================

        [Required(ErrorMessage = "Maintenance type is required.")]
        [StringLength(50, ErrorMessage = "Maintenance type cannot exceed 50 characters.")]
        public string MaintenanceType { get; set; } = string.Empty;

        [Required(ErrorMessage = "Description is required.")]
        [StringLength(500, ErrorMessage = "Description cannot exceed 500 characters.")]
        public string Description { get; set; } = string.Empty;

        [Range(0, 1000000, ErrorMessage = "Estimated cost must be between 0 and 1000000.")]
        public decimal EstimatedCost { get; set; }

        [Required(ErrorMessage = "Priority is required.")]
        [StringLength(20)]
        public string Priority { get; set; } = "Medium";
        // Low, Medium, High

        [Required]
        [StringLength(20)]
        public string Status { get; set; } = "Pending";
        // Pending
        // In Progress
        // Completed

        // ===========================
        // Dates
        // ===========================

        [Required]
        public DateTime ReportedDate { get; set; } = DateTime.UtcNow;

        public DateTime? CompletedDate { get; set; }

        // ===========================
        // Completion Details
        // ===========================

        [StringLength(500, ErrorMessage = "Completion remarks cannot exceed 500 characters.")]
        public string? CompletionRemarks { get; set; }
    }
}