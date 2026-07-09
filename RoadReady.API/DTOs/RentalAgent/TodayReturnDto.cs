namespace RoadReady.API.DTOs.RentalAgent
{
    public class TodayReturnDto
    {
        public int ReservationId { get; set; }

        public int CarId { get; set; }

        public string CustomerName { get; set; } = string.Empty;

        public string CarName { get; set; } = string.Empty;

        public string ReturnLocation { get; set; } = string.Empty;

        public DateTime ReturnDate { get; set; }

        public string ReservationStatus { get; set; } = string.Empty;

        public bool IsCheckedOut { get; set; }
    }
}