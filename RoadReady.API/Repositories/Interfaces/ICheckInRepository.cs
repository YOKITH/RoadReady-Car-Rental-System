using RoadReady.API.Models;

namespace RoadReady.API.Repositories.Interfaces
{
    public interface ICheckInRepository
    {
        Task<IEnumerable<Reservation>> GetTodayPickupsAsync();

        Task<CheckIn?> GetByReservationIdAsync(int reservationId);

        Task AddAsync(CheckIn checkIn);

        Task<bool> ExistsAsync(int reservationId);

        Task<IEnumerable<CheckIn>> GetHistoryAsync();

        Task<bool> SaveChangesAsync();
    }
}