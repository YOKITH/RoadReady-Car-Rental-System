namespace RoadReady.API.DTOs
{
    public class ReservationResponseDto
    {
        public int ReservationId { get; set; }

        public int CarId { get; set; }

        public int UserId { get; set; }

        public string CarBrand { get; set; } = string.Empty;

        public string CarModel { get; set; } = string.Empty;

        public string Location { get; set; } = string.Empty;

        public DateTime PickupDate { get; set; }

        public DateTime DropoffDate { get; set; }

        public decimal TotalAmount { get; set; }

        public string Status { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }
    }
}