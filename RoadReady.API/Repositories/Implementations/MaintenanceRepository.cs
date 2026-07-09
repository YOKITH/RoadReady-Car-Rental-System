using Microsoft.EntityFrameworkCore;
using RoadReady.API.Data;
using RoadReady.API.Models;
using RoadReady.API.Repositories.Interfaces;

namespace RoadReady.API.Repositories.Implementations
{
    public class MaintenanceRepository : IMaintenanceRepository
    {
        private readonly AppDbContext _context;

        public MaintenanceRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MaintenanceReport>> GetAllAsync()
        {
            return await _context.MaintenanceReports
                .Include(m => m.Car)
                .Include(m => m.ReportedByUser)
                .OrderByDescending(m => m.ReportedDate)
                .ToListAsync();
        }

        public async Task<MaintenanceReport?> GetByIdAsync(int reportId)
        {
            return await _context.MaintenanceReports
                .Include(m => m.Car)
                .Include(m => m.ReportedByUser)
                .FirstOrDefaultAsync(m => m.ReportId == reportId);
        }

        public async Task AddAsync(MaintenanceReport report)
        {
            await _context.MaintenanceReports.AddAsync(report);
        }

        public Task UpdateAsync(MaintenanceReport report)
        {
            _context.Entry(report).State = EntityState.Modified;
            return Task.CompletedTask;
        }

        public async Task<IEnumerable<MaintenanceReport>> GetPendingReportsAsync()
        {
            return await _context.MaintenanceReports
                .Include(m => m.Car)
                .Include(m => m.ReportedByUser)
                .Where(m => m.Status != "Completed")
                .OrderByDescending(m => m.ReportedDate)
                .ToListAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}