using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RoadReady.API.DTOs.CheckIn;
using RoadReady.API.Services.Interfaces;

namespace RoadReady.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "RentalAgent")]
    public class CheckInsController : ControllerBase
    {
        private readonly ICheckInService _checkInService;
        private readonly ILogger<CheckInsController> _logger;

        public CheckInsController(
            ICheckInService checkInService,
            ILogger<CheckInsController> logger)
        {
            _checkInService = checkInService;
            _logger = logger;
        }

        // ==========================================================
        // Today's Pickups
        // ==========================================================

        [HttpGet("today")]
        public async Task<IActionResult> GetTodayPickups()
        {
            try
            {
                var pickups =
                    await _checkInService.GetTodayPickupsAsync();

                return Ok(pickups);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error occurred while fetching today's pickups.");

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    "An error occurred while fetching today's pickups.");
            }
        }

        // ==========================================================
        // Get Check-In By Reservation
        // ==========================================================

        [HttpGet("{reservationId:int}")]
        public async Task<IActionResult> GetCheckInByReservation(
            int reservationId)
        {
            try
            {
                var checkIn =
                    await _checkInService
                        .GetCheckInByReservationIdAsync(reservationId);

                if (checkIn == null)
                {
                    return NotFound(
                        $"Check-In not found for Reservation {reservationId}");
                }

                return Ok(checkIn);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error occurred while fetching Check-In.");

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    "An error occurred while fetching the Check-In.");
            }
        }

        // ==========================================================
        // Create Check-In
        // ==========================================================

        [HttpPost]
        public async Task<IActionResult> CreateCheckIn(
            [FromBody] CheckInDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var response =
                    await _checkInService
                        .CreateCheckInAsync(dto);

                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error occurred while creating Check-In.");

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    ex.Message);
            }
        }

        // ==========================================================
        // Check-In History
        // ==========================================================

        [HttpGet("history")]
        public async Task<IActionResult> GetHistory()
        {
            try
            {
                var history =
                    await _checkInService
                        .GetCheckInHistoryAsync();

                return Ok(history);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error occurred while fetching Check-In history.");

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    "An error occurred while fetching Check-In history.");
            }
        }
    }
}