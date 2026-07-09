namespace RoadReady.API.DTOs.RentalAgent
{
    public class DashboardDto
    {
        public int TodayPickups { get; set; }

        public int TodayReturns { get; set; }

        public int CarsCurrentlyRented { get; set; }

        public int CarsUnderMaintenance { get; set; }
    }
}