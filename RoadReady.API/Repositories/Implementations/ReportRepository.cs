using Microsoft.EntityFrameworkCore;
using RoadReady.API.Data;
using RoadReady.API.DTOs;
using RoadReady.API.Repositories.Interfaces;

namespace RoadReady.API.Repositories
{
    public class ReportRepository : IReportRepository
    {
        private readonly AppDbContext _context;

        public ReportRepository(AppDbContext context)
        {
            _context = context;
        }

        // =====================================================
        // Revenue Report
        // =====================================================

        public async Task<RevenueReportDto> GetRevenueReportAsync()
        {
            var today = DateTime.Today;

            return new RevenueReportDto
            {
                // Total Revenue
                TotalRevenue = await _context.Payments
                    .Where(p => p.PaymentStatus == "Success")
                    .SumAsync(p => (decimal?)p.Amount) ?? 0,

                // Today's Revenue
                TodayRevenue = await _context.Payments
                    .Where(p =>
                        p.PaymentStatus == "Success" &&
                        p.PaymentDate.Date == today)
                    .SumAsync(p => (decimal?)p.Amount) ?? 0,

                // Current Month Revenue
                MonthlyRevenue = await _context.Payments
                    .Where(p =>
                        p.PaymentStatus == "Success" &&
                        p.PaymentDate.Month == today.Month &&
                        p.PaymentDate.Year == today.Year)
                    .SumAsync(p => (decimal?)p.Amount) ?? 0,

                // Current Year Revenue
                YearlyRevenue = await _context.Payments
                    .Where(p =>
                        p.PaymentStatus == "Success" &&
                        p.PaymentDate.Year == today.Year)
                    .SumAsync(p => (decimal?)p.Amount) ?? 0,

                // Total Successful Payments
                TotalPayments = await _context.Payments
                    .CountAsync(p => p.PaymentStatus == "Success")
            };
        }

        // =====================================================
        // Reservation Report
        // =====================================================

        public async Task<ReservationReportDto> GetReservationReportAsync()
        {
            return new ReservationReportDto
            {
                TotalReservations = await _context.Reservations.CountAsync(),

                ConfirmedReservations = await _context.Reservations
                    .CountAsync(r => r.Status == "Confirmed"),

                CancelledReservations = await _context.Reservations
                    .CountAsync(r => r.Status == "Cancelled"),

                PendingReservations = await _context.Reservations
                    .CountAsync(r => r.Status == "Pending")
            };
        }

        // =====================================================
        // Top Booked Cars
        // =====================================================

        public async Task<IEnumerable<TopBookedCarDto>> GetTopBookedCarsAsync()
        {
            return await _context.Reservations
                .GroupBy(r => new
                {
                    r.CarId,
                    r.Car.Brand,
                    r.Car.Model
                })
                .Select(g => new TopBookedCarDto
                {
                    CarId = g.Key.CarId,

                    CarName = g.Key.Brand + " " + g.Key.Model,

                    TotalBookings = g.Count(),

                    TotalRevenue = g.Sum(x => x.TotalAmount)
                })
                .OrderByDescending(x => x.TotalBookings)
                .Take(5)
                .ToListAsync();
        }

        // =====================================================
        // Monthly Revenue Report
        // =====================================================

        public async Task<IEnumerable<MonthlyRevenueDto>> GetMonthlyRevenueAsync()
        {
            return await _context.Payments
                .Where(p => p.PaymentStatus == "Success")
                .GroupBy(p => new
                {
                    p.PaymentDate.Year,
                    p.PaymentDate.Month
                })
                .Select(g => new MonthlyRevenueDto
                {
                    Month = g.Key.Month,

                    Revenue = g.Sum(x => x.Amount)
                })
                .OrderBy(x => x.Month)
                .ToListAsync();
        }
    }
}