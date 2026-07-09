namespace RoadReady.API.DTOs.RentalAgent
{
    public class TodayPickupDto
    {
        public int ReservationId { get; set; }

        public int CarId { get; set; }

        public string CustomerName { get; set; } = string.Empty;

        public string CarName { get; set; } = string.Empty;

        public string PickupLocation { get; set; } = string.Empty;

        public DateTime PickupDate { get; set; }

        public string ReservationStatus { get; set; } = string.Empty;

        public bool IsCheckedIn { get; set; }
    }
}