using AutoMapper;
using Microsoft.Extensions.Logging;
using RoadReady.API.DTOs.CheckOut;
using RoadReady.API.Models;
using RoadReady.API.Repositories.Interfaces;
using RoadReady.API.Services.Interfaces;

namespace RoadReady.API.Services
{
    public class CheckOutService : ICheckOutService
    {
        private readonly ICheckOutRepository _checkOutRepository;
        private readonly ICheckInRepository _checkInRepository;
        private readonly IReservationRepository _reservationRepository;
        private readonly ICarRepository _carRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<CheckOutService> _logger;

        public CheckOutService(
            ICheckOutRepository checkOutRepository,
            ICheckInRepository checkInRepository,
            IReservationRepository reservationRepository,
            ICarRepository carRepository,
            IMapper mapper,
            ILogger<CheckOutService> logger)
        {
            _checkOutRepository = checkOutRepository;
            _checkInRepository = checkInRepository;
            _reservationRepository = reservationRepository;
            _carRepository = carRepository;
            _mapper = mapper;
            _logger = logger;
        }

        // ==========================================================
        // Today's Returns
        // ==========================================================

        public async Task<IEnumerable<CheckOutResponseDto>> GetTodayReturnsAsync()
        {
            try
            {
                var reservations =
                    await _checkOutRepository.GetTodayReturnsAsync();

                return reservations
                    .Select(r => new CheckOutResponseDto
                    {
                        ReservationId = r.ReservationId,

                        CustomerName =
                            $"{r.User.FirstName} {r.User.LastName}",

                        CarName =
                            $"{r.Car.Brand} {r.Car.Model}",

                        RentalAgentName = string.Empty,

                        CheckOutDateTime = DateTime.MinValue,

                        OdometerEnd = 0,

                        FuelLevel = string.Empty,

                        DamageFound = false,

                        Remarks = null
                    })
                    .ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error occurred while fetching today's returns.");

                throw;
            }
        }

        // ==========================================================
        // Get Check-Out By Reservation
        // ==========================================================

        public async Task<CheckOutResponseDto?>
            GetCheckOutByReservationIdAsync(int reservationId)
        {
            try
            {
                var checkOut =
                    await _checkOutRepository
                        .GetByReservationIdAsync(reservationId);

                if (checkOut == null)
                {
                    throw new KeyNotFoundException(
                        $"Check-Out not found for Reservation {reservationId}");
                }

                return _mapper.Map<CheckOutResponseDto>(checkOut);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error occurred while fetching Check-Out for Reservation {ReservationId}",
                    reservationId);

                throw;
            }
        }

        // ==========================================================
        // Create Check-Out
        // ==========================================================

        public async Task<CheckOutResponseDto> CreateCheckOutAsync(CheckOutDto dto)
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

                if (reservation.Status != "Active")
                {
                    throw new InvalidOperationException(
                        "Only active reservations can be checked out.");
                }

                // =====================================
                // Check-In Validation
                // =====================================

                var checkIn =
                    await _checkInRepository
                        .GetByReservationIdAsync(dto.ReservationId);

                if (checkIn == null)
                {
                    throw new InvalidOperationException(
                        "Vehicle has not been checked in.");
                }

                // =====================================
                // Duplicate Check-Out Validation
                // =====================================

                var existingCheckOut =
                    await _checkOutRepository
                        .GetByReservationIdAsync(dto.ReservationId);

                if (existingCheckOut != null)
                {
                    throw new InvalidOperationException(
                        "Vehicle has already been checked out.");
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

                // =====================================
                // Create Check-Out
                // =====================================

                var checkOut = _mapper.Map<CheckOut>(dto);

                checkOut.CheckOutDateTime = DateTime.UtcNow;

                await _checkOutRepository.AddAsync(checkOut);

                // =====================================
                // Update Reservation
                // =====================================

                reservation.Status = "Completed";

                await _reservationRepository
                    .UpdateReservationAsync(reservation);

                // =====================================
                // Update Car Status
                // =====================================

                if (dto.DamageFound)
                {
                    car.Status = "Maintenance";
                    car.IsAvailable = false;

                    _logger.LogInformation(
                        "Vehicle {CarId} moved to Maintenance after Check-Out.",
                        car.CarId);
                }
                else
                {
                    car.Status = "Available";
                    car.IsAvailable = true;

                    _logger.LogInformation(
                        "Vehicle {CarId} is available for booking.",
                        car.CarId);
                }

                await _carRepository.UpdateCarAsync(car);

                // =====================================
                // Save Changes
                // =====================================

                var saved = await _checkOutRepository.SaveChangesAsync();

                if (!saved)
                {
                    throw new Exception(
                        "Failed to complete vehicle check-out.");
                }

                _logger.LogInformation(
                    "Vehicle checked out successfully. ReservationId: {ReservationId}",
                    reservation.ReservationId);

                // =====================================
                // Return Response
                // =====================================

                var createdCheckOut =
                    await _checkOutRepository
                        .GetByReservationIdAsync(dto.ReservationId);

                if (createdCheckOut == null)
                {
                    throw new Exception(
                        "Unable to retrieve newly created Check-Out.");
                }

                return _mapper.Map<CheckOutResponseDto>(
                    createdCheckOut);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error occurred while performing vehicle Check-Out.");

                throw;
            }
        }

        // ==========================================================
        // Check-Out History
        // ==========================================================

        public async Task<IEnumerable<CheckOutResponseDto>> GetCheckOutHistoryAsync()
        {
            try
            {
                var history =
                    await _checkOutRepository.GetHistoryAsync();

                return _mapper.Map<IEnumerable<CheckOutResponseDto>>(history);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error occurred while fetching Check-Out history.");

                throw;
            }
        }
    }
}