using RoadReady.API.DTOs.Maintenance;

namespace RoadReady.API.Services.Interfaces
{
    public interface IMaintenanceService
    {
        Task<IEnumerable<MaintenanceResponseDto>> GetAllReportsAsync();

        Task<MaintenanceResponseDto?> GetReportByIdAsync(int reportId);

        Task<bool> CreateReportAsync(MaintenanceDto dto);

        Task<bool> CompleteMaintenanceAsync(int reportId,
            CompleteMaintenanceDto dto);

        Task<IEnumerable<MaintenanceResponseDto>> GetPendingReportsAsync();
    }
}