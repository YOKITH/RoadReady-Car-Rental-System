namespace RoadReady.API.DTOs
{
    public class VehicleStatusDto
    {
        public int CarId { get; set; }

        public string Brand { get; set; } = string.Empty;

        public string Model { get; set; } = string.Empty;

        public string RegistrationNumber { get; set; } = string.Empty;

        public string Status { get; set; } = string.Empty;

        public string Location { get; set; } = string.Empty;
    }
}