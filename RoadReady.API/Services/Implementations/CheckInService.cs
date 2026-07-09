using AutoMapper;
using Microsoft.Extensions.Logging;
using RoadReady.API.DTOs.CheckIn;
using RoadReady.API.Models;
using RoadReady.API.Repositories.Interfaces;
using RoadReady.API.Services.Interfaces;

namespace RoadReady.API.Services
{
    public class CheckInService : ICheckInService
    {
        private readonly ICheckInRepository _checkInRepository;
        private readonly IReservationRepository _reservationRepository;
        private readonly ICarRepository _carRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<CheckInService> _logger;

        public CheckInService(
            ICheckInRepository checkInRepository,
            IReservationRepository reservationRepository,
            ICarRepository carRepository,
            IMapper mapper,
            ILogger<CheckInService> logger)
        {
            _checkInRepository = checkInRepository;
            _reservationRepository = reservationRepository;
            _carRepository = carRepository;
            _mapper = mapper;
            _logger = logger;
        }

        // ==========================================================
        // Today's Pickups
        // ==========================================================

        public async Task<IEnumerable<CheckInResponseDto>> GetTodayPickupsAsync()
        {
            try
            {
                var reservations =
                    await _checkInRepository.GetTodayPickupsAsync();

                return reservations
                    .Select(r => new CheckInResponseDto
                    {
                        ReservationId = r.ReservationId,

                        CustomerName =
                            $"{r.User.FirstName} {r.User.LastName}",

                        CarName =
                            $"{r.Car.Brand} {r.Car.Model}",

                        RentalAgentName = string.Empty,

                        OdometerStart = 0,

                        FuelLevel = string.Empty,

                        KeyHandedOver = false,

                        CheckInDateTime = DateTime.MinValue,

                        Remarks = null
                    })
                    .ToList();
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
        // Get Check-In By Reservation
        // ==========================================================

        public async Task<CheckInResponseDto?>
            GetCheckInByReservationIdAsync(int reservationId)
        {
            try
            {
                var checkIn =
                    await _checkInRepository
                        .GetByReservationIdAsync(reservationId);

                if (checkIn == null)
                {
                    throw new KeyNotFoundException(
                        $"Check-In not found for Reservation {reservationId}");
                }

                return _mapper.Map<CheckInResponseDto>(checkIn);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error occurred while fetching Check-In for Reservation {ReservationId}",
                    reservationId);

                throw;
            }
        }

        // ==========================================================
        // Create Check-In
        // ==========================================================

        public async Task<CheckInResponseDto> CreateCheckInAsync(CheckInDto dto)
        {
            try
            {
                // =====================================
                // Reservation Validation
                // =====================================

                var reservation =
                    await _reservationRepository
                        .GetReservationByIdAsync(dto.ReservationId);

                if (reservation == null)
                {
                    throw new KeyNotFoundException(
                        $"Reservation with ID {dto.ReservationId} not found.");
                }

                if (reservation.Status != "Confirmed")
                {
                    throw new InvalidOperationException(
                        "Only confirmed reservations can be checked in.");
                }

                // =====================================
                // Duplicate Check-In Validation
                // =====================================

                var existingCheckIn =
                    await _checkInRepository
                        .GetByReservationIdAsync(dto.ReservationId);

                if (existingCheckIn != null)
                {
                    throw new InvalidOperationException(
                        "This reservation has already been checked in.");
                }

                // =====================================
                // Car Validation
                // =====================================

                var car =
                    await _carRepository
                        .GetCarByIdAsync(reservation.CarId);

                if (car == null)
                {
                    throw new KeyNotFoundException(
                        "Assigned car not found.");
                }

                if (!car.IsAvailable)
                {
                    throw new InvalidOperationException(
                        "Car is currently unavailable.");
                }

                if (car.Status == "Maintenance")
                {
                    throw new InvalidOperationException(
                        "Car is under maintenance.");
                }

                // =====================================
                // Create Check-In
                // =====================================

                var checkIn = new CheckIn
                {
                    ReservationId = dto.ReservationId,
                    RentalAgentId = dto.RentalAgentId,
                    CheckInDateTime = DateTime.UtcNow,
                    OdometerStart = dto.OdometerStart,
                    FuelLevel = dto.FuelLevel,
                    KeyHandedOver = dto.KeyHandedOver,
                    Remarks = dto.Remarks
                };

                await _checkInRepository.AddAsync(checkIn);

                // =====================================
                // Update Reservation
                // =====================================

                reservation.Status = "Active";

                await _reservationRepository
                    .UpdateReservationAsync(reservation);

                // =====================================
                // Update Car
                // =====================================

                car.Status = "Rented";
                car.IsAvailable = false;

                await _carRepository
                    .UpdateCarAsync(car);

                // =====================================
                // Save Changes
                // =====================================

                var saved =
                    await _checkInRepository.SaveChangesAsync();

                if (!saved)
                {
                    throw new Exception(
                        "Failed to complete vehicle check-in.");
                }

                _logger.LogInformation(
                    "Vehicle checked in successfully. ReservationId: {ReservationId}",
                    reservation.ReservationId);

                // Reload Check-In with navigation properties

                var createdCheckIn =
                    await _checkInRepository
                        .GetByReservationIdAsync(dto.ReservationId);

                if (createdCheckIn == null)
                {
                    throw new Exception(
                        "Unable to retrieve newly created Check-In.");
                }

                return _mapper.Map<CheckInResponseDto>(
                    createdCheckIn);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error occurred while performing vehicle Check-In.");

                throw;
            }
        }

        // ==========================================================
        // Check-In History
        // ==========================================================

        public async Task<IEnumerable<CheckInResponseDto>> GetCheckInHistoryAsync()
        {
            try
            {
                var history =
                    await _checkInRepository.GetHistoryAsync();

                return _mapper.Map<IEnumerable<CheckInResponseDto>>(history);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error occurred while fetching Check-In history.");

                throw;
            }
        }
    }
}