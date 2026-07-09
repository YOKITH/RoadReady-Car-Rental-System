using AutoMapper;
using Microsoft.Extensions.Logging;
using RoadReady.API.DTOs.RentalAgent;
using RoadReady.API.Repositories.Interfaces;
using RoadReady.API.Services.Interfaces;

namespace RoadReady.API.Services
{
    public class RentalAgentService : IRentalAgentService
    {
        private readonly IRentalAgentRepository _rentalAgentRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<RentalAgentService> _logger;

        public RentalAgentService(
            IRentalAgentRepository rentalAgentRepository,
            IMapper mapper,
            ILogger<RentalAgentService> logger)
        {
            _rentalAgentRepository = rentalAgentRepository;
            _mapper = mapper;
            _logger = logger;
        }

        // ==========================================================
        // Dashboard
        // ==========================================================

        public async Task<DashboardDto> GetDashboardAsync()
        {
            try
            {
                return new DashboardDto
                {
                    TodayPickups =
                        await _rentalAgentRepository.GetTodayPickupsCountAsync(),

                    TodayReturns =
                        await _rentalAgentRepository.GetTodayReturnsCountAsync(),

                    CarsCurrentlyRented =
                        await _rentalAgentRepository.GetCarsCurrentlyRentedCountAsync(),

                    CarsUnderMaintenance =
                        await _rentalAgentRepository.GetCarsUnderMaintenanceCountAsync()
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error occurred while loading Rental Agent dashboard.");

                throw;
            }
        }

        // ==========================================================
        // Today's Pickups
        // ==========================================================

        public async Task<IEnumerable<TodayPickupDto>>
            GetTodayPickupsAsync()
        {
            try
            {
                var pickups =
                    await _rentalAgentRepository
                        .GetTodayPickupReservationsAsync();

                return _mapper.Map<IEnumerable<TodayPickupDto>>(pickups);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error occurred while fetching today's pickups.");

                throw;
            }
        }

        // ==========================================================
        // Today's Returns
        // ==========================================================

        public async Task<IEnumerable<TodayReturnDto>> GetTodayReturnsAsync()
        {
            try
            {
                var returns =
                    await _rentalAgentRepository
                        .GetTodayReturnReservationsAsync();

                return _mapper.Map<IEnumerable<TodayReturnDto>>(returns);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error occurred while fetching today's returns.");

                throw;
            }
        }
    }
}