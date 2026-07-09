namespace RoadReady.API.DTOs.CheckOut
{
    public class CheckOutResponseDto
    {
        public int CheckOutId { get; set; }

        public int ReservationId { get; set; }

        public string CustomerName { get; set; } = string.Empty;

        public string CarName { get; set; } = string.Empty;

        public string RentalAgentName { get; set; } = string.Empty;

        public DateTime CheckOutDateTime { get; set; }

        public int OdometerEnd { get; set; }

        public string FuelLevel { get; set; } = string.Empty;

        public bool DamageFound { get; set; }

        public string? Remarks { get; set; }
    }
}