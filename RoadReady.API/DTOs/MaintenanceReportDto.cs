namespace RoadReady.API.DTOs
{
    public class MaintenanceReportDto
    {
        public int CarId { get; set; }

        public string Issue { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public decimal EstimatedCost { get; set; }

        public string Status { get; set; } = "Pending";
    }
}