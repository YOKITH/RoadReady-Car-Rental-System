using RoadReady.API.DTOs.RentalAgent;

namespace RoadReady.API.Services.Interfaces
{
    public interface IRentalAgentService
    {
        Task<DashboardDto> GetDashboardAsync();

        Task<IEnumerable<TodayPickupDto>> GetTodayPickupsAsync();

        Task<IEnumerable<TodayReturnDto>> GetTodayReturnsAsync();
    }
}