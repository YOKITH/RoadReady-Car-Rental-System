using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RoadReady.API.DTOs.CheckOut;
using RoadReady.API.Services.Interfaces;

namespace RoadReady.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "RentalAgent")]
    public class CheckOutsController : ControllerBase
    {
        private readonly ICheckOutService _checkOutService;
        private readonly ILogger<CheckOutsController> _logger;

        public CheckOutsController(
            ICheckOutService checkOutService,
            ILogger<CheckOutsController> logger)
        {
            _checkOutService = checkOutService;
            _logger = logger;
        }

        // ==========================================================
        // Today's Returns
        // ==========================================================

        [HttpGet("today")]
        public async Task<IActionResult> GetTodayReturns()
        {
            try
            {
                var returns =
                    await _checkOutService.GetTodayReturnsAsync();

                return Ok(returns);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error occurred while fetching today's returns.");

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    "An error occurred while fetching today's returns.");
            }
        }

        // ==========================================================
        // Get Check-Out By Reservation
        // ==========================================================

        [HttpGet("{reservationId:int}")]
        public async Task<IActionResult> GetCheckOutByReservation(
            int reservationId)
        {
            try
            {
                var checkOut =
                    await _checkOutService
                        .GetCheckOutByReservationIdAsync(reservationId);

                if (checkOut == null)
                {
                    return NotFound(
                        $"Check-Out not found for Reservation {reservationId}");
                }

                return Ok(checkOut);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error occurred while fetching Check-Out.");

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    "An error occurred while fetching the Check-Out.");
            }
        }

        // ==========================================================
        // Create Check-Out
        // ==========================================================

        [HttpPost]
        public async Task<IActionResult> CreateCheckOut(
            [FromBody] CheckOutDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var response =
                    await _checkOutService
                        .CreateCheckOutAsync(dto);

                return CreatedAtAction(
                    nameof(GetCheckOutByReservation),
                    new { reservationId = response.ReservationId },
                    response);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error occurred while creating Check-Out.");

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    ex.Message);
            }
        }

        // ==========================================================
        // Check-Out History
        // ==========================================================

        [HttpGet("history")]
        public async Task<IActionResult> GetHistory()
        {
            try
            {
                var history =
                    await _checkOutService
                        .GetCheckOutHistoryAsync();

                return Ok(history);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error occurred while fetching Check-Out history.");

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    "An error occurred while fetching Check-Out history.");
            }
        }
    }
}