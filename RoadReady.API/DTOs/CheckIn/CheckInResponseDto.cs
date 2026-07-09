namespace RoadReady.API.DTOs.CheckIn
{
    public class CheckInResponseDto
    {
        public int CheckInId { get; set; }

        public int ReservationId { get; set; }

        public string CustomerName { get; set; } = string.Empty;

        public string CarName { get; set; } = string.Empty;

        public string RentalAgentName { get; set; } = string.Empty;

        public DateTime CheckInDateTime { get; set; }

        public int OdometerStart { get; set; }

        public string FuelLevel { get; set; } = string.Empty;

        public bool KeyHandedOver { get; set; }

        public string? Remarks { get; set; }
    }
}