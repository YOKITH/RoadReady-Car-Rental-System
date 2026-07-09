using RoadReady.API.DTOs.CheckIn;

namespace RoadReady.API.Services.Interfaces
{
    public interface ICheckInService
    {
        Task<IEnumerable<CheckInResponseDto>> GetTodayPickupsAsync();

        Task<CheckInResponseDto?> GetCheckInByReservationIdAsync(int reservationId);

        Task<CheckInResponseDto> CreateCheckInAsync(CheckInDto dto);

        Task<IEnumerable<CheckInResponseDto>> GetCheckInHistoryAsync();
    }
}