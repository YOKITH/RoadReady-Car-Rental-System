using AutoMapper;
using Microsoft.Extensions.Logging;
using RoadReady.API.DTOs.Maintenance;
using RoadReady.API.Models;
using RoadReady.API.Repositories.Interfaces;
using RoadReady.API.Services.Interfaces;

namespace RoadReady.API.Services
{
    public class MaintenanceService : IMaintenanceService
    {
        private readonly IMaintenanceRepository _maintenanceRepository;
        private readonly ICarRepository _carRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<MaintenanceService> _logger;

        public MaintenanceService(
            IMaintenanceRepository maintenanceRepository,
            ICarRepository carRepository,
            IMapper mapper,
            ILogger<MaintenanceService> logger)
        {
            _maintenanceRepository = maintenanceRepository;
            _carRepository = carRepository;
            _mapper = mapper;
            _logger = logger;
        }

        // ==========================================================
        // Get All Maintenance Reports
        // ==========================================================

        public async Task<IEnumerable<MaintenanceResponseDto>> GetAllReportsAsync()
        {
            try
            {
                var reports =
                    await _maintenanceRepository.GetAllAsync();

                return _mapper.Map<IEnumerable<MaintenanceResponseDto>>(reports);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error occurred while fetching maintenance reports.");

                throw;
            }
        }

        // ==========================================================
        // Get Maintenance Report By Id
        // ==========================================================

        public async Task<MaintenanceResponseDto?> GetReportByIdAsync(int reportId)
        {
            try
            {
                var report =
                    await _maintenanceRepository.GetByIdAsync(reportId);

                if (report == null)
                {
                    throw new KeyNotFoundException(
                        $"Maintenance report with ID {reportId} not found.");
                }

                return _mapper.Map<MaintenanceResponseDto>(report);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error occurred while fetching maintenance report {ReportId}",
                    reportId);

                throw;
            }
        }

        // ==========================================================
        // Create Maintenance Report
        // ==========================================================

        public async Task<bool> CreateReportAsync(MaintenanceDto dto)
        {
            try
            {
                // =====================================
                // Car Validation
                // =====================================

                var car =
                    await _carRepository.GetCarByIdAsync(dto.CarId);

                if (car == null)
                {
                    throw new KeyNotFoundException(
                        $"Car with ID {dto.CarId} not found.");
                }

                if (car.Status == "Maintenance")
                {
                    throw new InvalidOperationException(
                        "This vehicle is already under maintenance.");
                }

                // =====================================
                // Create Maintenance Report
                // =====================================

                var report =
                    _mapper.Map<MaintenanceReport>(dto);

                report.ReportedDate = DateTime.UtcNow;
                report.Status = "Pending";

                await _maintenanceRepository.AddAsync(report);

                // =====================================
                // Update Car
                // =====================================

                car.Status = "Maintenance";
                car.IsAvailable = false;

                await _carRepository.UpdateCarAsync(car);

                // =====================================
                // Save
                // =====================================

                var saved =
                    await _maintenanceRepository
                        .SaveChangesAsync();

                if (!saved)
                {
                    throw new Exception(
                        "Unable to create maintenance report.");
                }

                _logger.LogInformation(
                    "Maintenance report created successfully for Car {CarId}",
                    dto.CarId);

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error while creating maintenance report.");

                throw;
            }
        }

        // ==========================================================
        // Complete Maintenance
        // ==========================================================

        public async Task<bool> CompleteMaintenanceAsync(
            int reportId,
            CompleteMaintenanceDto dto)
        {
            try
            {
                var report = await _maintenanceRepository.GetByIdAsync(reportId);

                if (report == null)
                {
                    throw new KeyNotFoundException(
                        $"Maintenance Report {reportId} not found.");
                }

                if (report.Status == "Completed")
                {
                    throw new InvalidOperationException(
                        "Maintenance has already been completed.");
                }

                // Update Report

                report.Status = "Completed";
                report.CompletedDate = DateTime.UtcNow;
                report.CompletionRemarks = dto.CompletionRemarks;

                await _maintenanceRepository.UpdateAsync(report);

                // Update Car

                var car =
                    await _carRepository
                        .GetCarByIdAsync(report.CarId);

                if (car != null)
                {
                    car.Status = "Available";
                    car.IsAvailable = true;

                    await _carRepository.UpdateCarAsync(car);
                }

                var saved =
                    await _maintenanceRepository
                        .SaveChangesAsync();

                if (!saved)
                {
                    throw new Exception(
                        "Unable to complete maintenance.");
                }

                _logger.LogInformation(
                    "Maintenance completed successfully. ReportId: {ReportId}",
                    reportId);

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error while completing maintenance.");

                throw;
            }
        }

        // ==========================================================
        // Pending Reports
        // ==========================================================

        public async Task<IEnumerable<MaintenanceResponseDto>>
            GetPendingReportsAsync()
        {
            try
            {
                var reports =
                    await _maintenanceRepository
                        .GetPendingReportsAsync();

                return _mapper.Map<
                    IEnumerable<MaintenanceResponseDto>>(reports);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error while fetching pending maintenance reports.");

                throw;
            }
        }
    }
}