using Microsoft.EntityFrameworkCore;
using RoadReady.API.Data;
using RoadReady.API.Models;
using RoadReady.API.Repositories.Interfaces;

namespace RoadReady.API.Repositories.Implementations
{
    public class RentalAgentRepository : IRentalAgentRepository
    {
        private readonly AppDbContext _context;

        public RentalAgentRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<int> GetTodayPickupsCountAsync()
        {
            var today = DateTime.Today;

            return await _context.Reservations.CountAsync(r =>
                r.Status == "Confirmed" &&
                r.PickupDate.Date == today);
        }

        public async Task<int> GetTodayReturnsCountAsync()
        {
            var today = DateTime.Today;

            return await _context.Reservations.CountAsync(r =>
                r.Status == "Active" &&
                r.DropoffDate.Date == today);
        }

        public async Task<int> GetCarsCurrentlyRentedCountAsync()
        {
            return await _context.Cars.CountAsync(c =>
                c.Status == "Rented");
        }

        public async Task<int> GetCarsUnderMaintenanceCountAsync()
        {
            return await _context.Cars.CountAsync(c =>
                c.Status == "Maintenance");
        }

        public async Task<IEnumerable<Reservation>> GetTodayPickupReservationsAsync()
        {
            var today = DateTime.Today;

            return await _context.Reservations
                .Include(r => r.User)
                .Include(r => r.Car)
                .Include(r => r.CheckIn)
                .Where(r =>
                    r.Status == "Confirmed" &&
                    r.PickupDate.Date == today)
                .ToListAsync();
        }

        public async Task<IEnumerable<Reservation>> GetTodayReturnReservationsAsync()
        {
            var today = DateTime.Today;

            return await _context.Reservations
                .Include(r => r.User)
                .Include(r => r.Car)
                .Include(r => r.CheckOut)
                .Where(r =>
                    r.Status == "Active" &&
                    r.DropoffDate.Date == today)
                .ToListAsync();
        }
    }
}