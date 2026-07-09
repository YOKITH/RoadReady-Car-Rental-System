using Microsoft.EntityFrameworkCore;
using RoadReady.API.Data;
using RoadReady.API.Models;
using RoadReady.API.Repositories.Interfaces;

namespace RoadReady.API.Repositories.Implementations
{
    public class CheckOutRepository : ICheckOutRepository
    {
        private readonly AppDbContext _context;

        public CheckOutRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Reservation>> GetTodayReturnsAsync()
        {
            var today = DateTime.Today;

            return await _context.Reservations
                .Include(r => r.User)
                .Include(r => r.Car)
                .Include(r => r.CheckOut)
                .Where(r =>
                    r.Status == "Active" &&
                    r.DropoffDate.Date == today &&
                    r.CheckOut == null)
                .ToListAsync();
        }

        public async Task<CheckOut?> GetByReservationIdAsync(int reservationId)
        {
            return await _context.CheckOuts
                .Include(c => c.Reservation)
                .ThenInclude(r => r.User)
                .Include(c => c.Reservation.Car)
                .FirstOrDefaultAsync(c =>
                    c.ReservationId == reservationId);
        }

        public async Task AddAsync(CheckOut checkOut)
        {
            await _context.CheckOuts.AddAsync(checkOut);
        }

        public async Task<bool> ExistsAsync(int reservationId)
        {
            return await _context.CheckOuts
                .AnyAsync(c => c.ReservationId == reservationId);
        }

        public async Task<IEnumerable<CheckOut>> GetHistoryAsync()
        {
            return await _context.CheckOuts
                .Include(c => c.Reservation)
                .ThenInclude(r => r.User)
                .Include(c => c.Reservation.Car)
                .OrderByDescending(c => c.CheckOutDateTime)
                .ToListAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync()>0;
        }
    }
}