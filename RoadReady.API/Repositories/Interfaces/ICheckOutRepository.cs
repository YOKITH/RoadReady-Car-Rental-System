using RoadReady.API.Models;

namespace RoadReady.API.Repositories.Interfaces
{
    public interface ICheckOutRepository
    {
        Task<IEnumerable<Reservation>> GetTodayReturnsAsync();

        Task<CheckOut?> GetByReservationIdAsync(int reservationId);

        Task AddAsync(CheckOut checkOut);

        Task<bool> ExistsAsync(int reservationId);

        Task<IEnumerable<CheckOut>> GetHistoryAsync();

        Task<bool> SaveChangesAsync();
    }
}