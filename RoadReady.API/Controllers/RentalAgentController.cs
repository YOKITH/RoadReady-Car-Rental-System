using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RoadReady.API.Services.Interfaces;

namespace RoadReady.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "RentalAgent")]
    public class RentalAgentController : ControllerBase
    {
        private readonly IRentalAgentService _rentalAgentService;
        private readonly ILogger<RentalAgentController> _logger;

        public RentalAgentController(
            IRentalAgentService rentalAgentService,
            ILogger<RentalAgentController> logger)
        {
            _rentalAgentService = rentalAgentService;
            _logger = logger;
        }

        // ==========================================================
        // Dashboard Summary
        // ==========================================================

        [HttpGet("dashboard")]
        public async Task<IActionResult> GetDashboard()
        {
            try
            {
                var dashboard =
                    await _rentalAgentService.GetDashboardAsync();

                return Ok(dashboard);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Error occurred while loading dashboard.");

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    "An error occurred while loading the dashboard.");
            }
        }

        // ==========================================================
        // Today's Pickups
        // ==========================================================

        [HttpGet("today-pickups")]
        public async Task<IActionResult> GetTodayPickups()
        {
            try
            {
                var pickups =
                    await _rentalAgentService.GetTodayPickupsAsync();

                return Ok(pickups);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Error occurred while loading today's pickups.");

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    "An error occurred while loading today's pickups.");
            }
        }

        // ==========================================================
        // Today's Returns
        // ==========================================================

        [HttpGet("today-returns")]
        public async Task<IActionResult> GetTodayReturns()
        {
            try
            {
                var returns =
                    await _rentalAgentService.GetTodayReturnsAsync();

                return Ok(returns);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Error occurred while loading today's returns.");

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    "An error occurred while loading today's returns.");
            }
        }
    }
}