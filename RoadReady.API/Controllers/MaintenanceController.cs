using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RoadReady.API.DTOs.Maintenance;
using RoadReady.API.Services.Interfaces;

namespace RoadReady.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "RentalAgent,Admin")]
    public class MaintenanceController : ControllerBase
    {
        private readonly IMaintenanceService _maintenanceService;
        private readonly ILogger<MaintenanceController> _logger;

        public MaintenanceController(
            IMaintenanceService maintenanceService,
            ILogger<MaintenanceController> logger)
        {
            _maintenanceService = maintenanceService;
            _logger = logger;
        }

        // ==========================================================
        // Get All Maintenance Reports
        // ==========================================================

        [HttpGet]
        public async Task<IActionResult> GetAllReports()
        {
            try
            {
                var reports =
                    await _maintenanceService.GetAllReportsAsync();

                return Ok(reports);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Error while fetching maintenance reports.");

                return StatusCode(500,
                    "An error occurred while fetching maintenance reports.");
            }
        }

        // ==========================================================
        // Get Maintenance Report By Id
        // ==========================================================

        [HttpGet("{reportId:int}")]
        public async Task<IActionResult> GetReportById(int reportId)
        {
            try
            {
                var report =
                    await _maintenanceService.GetReportByIdAsync(reportId);

                if (report == null)
                    return NotFound();

                return Ok(report);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Error while fetching maintenance report.");

                return StatusCode(500,
                    "An error occurred while fetching the maintenance report.");
            }
        }

        // ==========================================================
        // Create Maintenance Report
        // ==========================================================

        [HttpPost]
        public async Task<IActionResult> CreateReport(
            [FromBody] MaintenanceDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var result =
                    await _maintenanceService.CreateReportAsync(dto);

                if (!result)
                    return BadRequest(
                        "Unable to create maintenance report.");

                return Ok(new
                {
                    Message = "Maintenance report created successfully."
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Error while creating maintenance report.");

                return StatusCode(500,
                    "An error occurred while creating the maintenance report.");
            }
        }

        // ==========================================================
        // Complete Maintenance
        // ==========================================================

        [HttpPut("{reportId:int}/complete")]
        public async Task<IActionResult> CompleteMaintenance(
            int reportId,
            [FromBody] CompleteMaintenanceDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var result =
                    await _maintenanceService
                        .CompleteMaintenanceAsync(reportId, dto);

                if (!result)
                    return BadRequest(
                        "Unable to complete maintenance.");

                return Ok(new
                {
                    Message = "Maintenance completed successfully."
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Error while completing maintenance.");

                return StatusCode(500,
                    "An error occurred while completing maintenance.");
            }
        }

        // ==========================================================
        // Get Pending Reports
        // ==========================================================

        [HttpGet("pending")]
        public async Task<IActionResult> GetPendingReports()
        {
            try
            {
                var reports =
                    await _maintenanceService
                        .GetPendingReportsAsync();

                return Ok(reports);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Error while fetching pending reports.");

                return StatusCode(500,
                    "An error occurred while fetching pending maintenance reports.");
            }
        }
    }
}