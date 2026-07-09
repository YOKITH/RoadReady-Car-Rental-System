using RoadReady.API.Models;

namespace RoadReady.API.Repositories.Interfaces
{
    public interface IMaintenanceRepository
    {
        // ==========================================================
        // Get All Maintenance Reports
        // ==========================================================

        Task<IEnumerable<MaintenanceReport>> GetAllAsync();

        // ==========================================================
        // Get Report By Id
        // ==========================================================

        Task<MaintenanceReport?> GetByIdAsync(int reportId);

        // ==========================================================
        // Add Maintenance Report
        // ==========================================================

        Task AddAsync(MaintenanceReport report);

        // ==========================================================
        // Update Maintenance Report
        // ==========================================================

        Task UpdateAsync(MaintenanceReport report);

        // ==========================================================
        // Get Pending Reports
        // ==========================================================

        Task<IEnumerable<MaintenanceReport>> GetPendingReportsAsync();

        // ==========================================================
        // Save Changes
        // ==========================================================

        Task<bool> SaveChangesAsync();
    }
}