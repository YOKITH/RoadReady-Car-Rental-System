namespace RoadReady.API.DTOs.Maintenance
{
    public class MaintenanceResponseDto
    {
        public int ReportId { get; set; }

        public int CarId { get; set; }

        public string CarName { get; set; } = string.Empty;

        public string MaintenanceType { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public decimal EstimatedCost { get; set; }

        public string Priority { get; set; } = string.Empty;

        public string Status { get; set; } = string.Empty;

        public DateTime ReportedDate { get; set; }

        public DateTime? CompletedDate { get; set; }

        public string ReportedBy { get; set; } = string.Empty;
    }
}