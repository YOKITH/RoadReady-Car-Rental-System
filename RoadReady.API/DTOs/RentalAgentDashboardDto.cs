namespace RoadReady.API.DTOs
{
    public class RentalAgentDashboardDto
    {
        public int TodayPickups { get; set; }

        public int TodayReturns { get; set; }

        public int AvailableVehicles { get; set; }

        public int VehiclesInMaintenance { get; set; }
    }
}