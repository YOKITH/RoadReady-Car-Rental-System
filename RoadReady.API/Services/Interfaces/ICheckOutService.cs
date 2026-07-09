using RoadReady.API.DTOs.CheckOut;

namespace RoadReady.API.Services.Interfaces
{
    public interface ICheckOutService
    {
        Task<IEnumerable<CheckOutResponseDto>> GetTodayReturnsAsync();

        Task<CheckOutResponseDto?> GetCheckOutByReservationIdAsync(int reservationId);

        Task<CheckOutResponseDto> CreateCheckOutAsync(CheckOutDto dto);

        Task<IEnumerable<CheckOutResponseDto>> GetCheckOutHistoryAsync();
    }
}