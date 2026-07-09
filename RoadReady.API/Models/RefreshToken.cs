namespace RoadReady.API.Models
{
    public class RefreshToken
    {
        public int RefreshTokenId { get; set; }

        public string Token { get; set; } = string.Empty;

        public DateTime ExpiryDate { get; set; }

        public DateTime CreatedAt { get; set; }

        public int UserId { get; set; }

        public User User { get; set; } = null!;
    }
}