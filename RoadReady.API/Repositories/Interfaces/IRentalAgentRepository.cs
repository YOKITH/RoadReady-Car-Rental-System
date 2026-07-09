using RoadReady.API.Models;

namespace RoadReady.API.Repositories.Interfaces
{
    public interface IRentalAgentRepository
    {
        // ==========================================================
        // Dashboard Statistics
        // ==========================================================

        /// <summary>
        /// Gets the total number of today's vehicle pickups.
        /// </summary>
        Task<int> GetTodayPickupsCountAsync();

        /// <summary>
        /// Gets the total number of today's vehicle returns.
        /// </summary>
        Task<int> GetTodayReturnsCountAsync();

        /// <summary>
        /// Gets the total number of vehicles currently rented.
        /// </summary>
        Task<int> GetCarsCurrentlyRentedCountAsync();

        /// <summary>
        /// Gets the total number of vehicles under maintenance.
        /// </summary>
        Task<int> GetCarsUnderMaintenanceCountAsync();

        // ==========================================================
        // Dashboard Tables
        // ==========================================================

        /// <summary>
        /// Gets today's pickup reservations.
        /// </summary>
        Task<IEnumerable<Reservation>> GetTodayPickupReservationsAsync();

        /// <summary>
        /// Gets today's return reservations.
        /// </summary>
        Task<IEnumerable<Reservation>> GetTodayReturnReservationsAsync();
    }
}