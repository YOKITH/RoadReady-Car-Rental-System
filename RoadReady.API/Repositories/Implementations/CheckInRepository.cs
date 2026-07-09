using Microsoft.EntityFrameworkCore;
using RoadReady.API.Data;
using RoadReady.API.Models;
using RoadReady.API.Repositories.Interfaces;

namespace RoadReady.API.Repositories.Implementations
{
    public class CheckInRepository : ICheckInRepository
    {
        private readonly AppDbContext _context;

        public CheckInRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Reservation>> GetTodayPickupsAsync()
        {
            var today = DateTime.Today;

            return await _context.Reservations
                .Include(r => r.User)
                .Include(r => r.Car)
                .Include(r => r.CheckIn)
                .Where(r =>
                    r.Status == "Confirmed" &&
                    r.PickupDate.Date == today &&
                    r.CheckIn == null)
                .ToListAsync();
        }

        public async Task<CheckIn?> GetByReservationIdAsync(int reservationId)
        {
            return await _context.CheckIns
                .Include(c => c.Reservation)
                .ThenInclude(r => r.User)
                .Include(c => c.Reservation.Car)
                .FirstOrDefaultAsync(c =>
                    c.ReservationId == reservationId);
        }

        public async Task AddAsync(CheckIn checkIn)
        {
            await _context.CheckIns.AddAsync(checkIn);
        }

        public async Task<bool> ExistsAsync(int reservationId)
        {
            return await _context.CheckIns
                .AnyAsync(c => c.ReservationId == reservationId);
        }

        public async Task<IEnumerable<CheckIn>> GetHistoryAsync()
        {
            return await _context.CheckIns
                .Include(c => c.Reservation)
                .ThenInclude(r => r.User)
                .Include(c => c.Reservation.Car)
                .OrderByDescending(c => c.CheckInDateTime)
                .ToListAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}