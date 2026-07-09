using AutoMapper;
using RoadReady.API.DTOs;
using RoadReady.API.DTOs.CheckIn;
using RoadReady.API.DTOs.CheckOut;
using RoadReady.API.DTOs.Maintenance;
using RoadReady.API.DTOs.RentalAgent;
using RoadReady.API.Models;

namespace RoadReady.API.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // ==========================================================
            // Register User
            // ==========================================================

            CreateMap<RegisterDto, User>()
                .ForMember(dest => dest.UserId, opt => opt.Ignore())
                .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
                .ForMember(dest => dest.Role, opt => opt.Ignore())
                .ForMember(dest => dest.IsActive, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore())

                // Navigation Properties

                .ForMember(dest => dest.Reservations, opt => opt.Ignore())
                .ForMember(dest => dest.Payments, opt => opt.Ignore())
                .ForMember(dest => dest.Reviews, opt => opt.Ignore())
                .ForMember(dest => dest.RefreshTokens, opt => opt.Ignore())
                .ForMember(dest => dest.CheckIns, opt => opt.Ignore())
                .ForMember(dest => dest.CheckOuts, opt => opt.Ignore())
                .ForMember(dest => dest.MaintenanceReports, opt => opt.Ignore());

            // ==========================================================
            // Update User
            // ==========================================================

            CreateMap<UserUpdateDto, User>()
                .ForMember(dest => dest.UserId, opt => opt.Ignore())
                .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore())

                // Navigation Properties

                .ForMember(dest => dest.Reservations, opt => opt.Ignore())
                .ForMember(dest => dest.Payments, opt => opt.Ignore())
                .ForMember(dest => dest.Reviews, opt => opt.Ignore())
                .ForMember(dest => dest.RefreshTokens, opt => opt.Ignore())
                .ForMember(dest => dest.CheckIns, opt => opt.Ignore())
                .ForMember(dest => dest.CheckOuts, opt => opt.Ignore())
                .ForMember(dest => dest.MaintenanceReports, opt => opt.Ignore());

            // ==========================================================
            // Create Car
            // ==========================================================

            CreateMap<CarCreateDto, Car>()
                .ForMember(dest => dest.CarId, opt => opt.Ignore())
                .ForMember(dest => dest.Status, opt => opt.Ignore())

                // Navigation Properties

                .ForMember(dest => dest.Reservations, opt => opt.Ignore())
                .ForMember(dest => dest.Reviews, opt => opt.Ignore())
                .ForMember(dest => dest.MaintenanceReports, opt => opt.Ignore());

            // ==========================================================
            // Update Car
            // ==========================================================

            CreateMap<CarUpdateDto, Car>()
                .ForMember(dest => dest.CarId, opt => opt.Ignore())
                .ForMember(dest => dest.Status, opt => opt.Ignore())

                // Navigation Properties

                .ForMember(dest => dest.Reservations, opt => opt.Ignore())
                .ForMember(dest => dest.Reviews, opt => opt.Ignore())
                .ForMember(dest => dest.MaintenanceReports, opt => opt.Ignore());

            // ==========================================================
            // Reservation
            // ==========================================================

            CreateMap<Reservationdto, Reservation>()
                .ForMember(dest => dest.ReservationId, opt => opt.Ignore())
                .ForMember(dest => dest.TotalAmount, opt => opt.Ignore())
                .ForMember(dest => dest.Status, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())

                // Navigation Properties

                .ForMember(dest => dest.User, opt => opt.Ignore())
                .ForMember(dest => dest.Car, opt => opt.Ignore())
                .ForMember(dest => dest.Payment, opt => opt.Ignore())
                .ForMember(dest => dest.CheckIn, opt => opt.Ignore())
                .ForMember(dest => dest.CheckOut, opt => opt.Ignore());

            CreateMap<Reservation, ReservationResponseDto>()
                .ForMember(dest => dest.CarBrand,
                    opt => opt.MapFrom(src => src.Car.Brand))

                .ForMember(dest => dest.CarModel,
                    opt => opt.MapFrom(src => src.Car.Model))

                .ForMember(dest => dest.Location,
                    opt => opt.MapFrom(src => src.Car.Location));

            // ==========================================================
            // Payment
            // ==========================================================

            CreateMap<RazorpayPaymentDto, Payment>()
                .ForMember(dest => dest.PaymentId, opt => opt.Ignore())
                .ForMember(dest => dest.UserId, opt => opt.Ignore())
                .ForMember(dest => dest.Amount, opt => opt.Ignore())
                .ForMember(dest => dest.PaymentStatus, opt => opt.Ignore())
                .ForMember(dest => dest.PaymentDate, opt => opt.Ignore())

                // Navigation Properties

                .ForMember(dest => dest.User, opt => opt.Ignore())
                .ForMember(dest => dest.Reservation, opt => opt.Ignore());

            // ==========================================================
            // Review
            // ==========================================================

            CreateMap<ReviewDto, Review>()
                .ForMember(dest => dest.ReviewId, opt => opt.Ignore())
                .ForMember(dest => dest.UserId, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())

                // Navigation Properties

                .ForMember(dest => dest.User, opt => opt.Ignore())
                .ForMember(dest => dest.Car, opt => opt.Ignore());

            // ==========================================================
            // Maintenance
            // ==========================================================

            CreateMap<MaintenanceDto, MaintenanceReport>()
                .ForMember(dest => dest.ReportId, opt => opt.Ignore())
                .ForMember(dest => dest.ReportedBy, opt => opt.Ignore())
                .ForMember(dest => dest.ReportedDate, opt => opt.Ignore())
                .ForMember(dest => dest.CompletedDate, opt => opt.Ignore())
                .ForMember(dest => dest.Status, opt => opt.Ignore())
                .ForMember(dest => dest.CompletionRemarks, opt => opt.Ignore())

                // Navigation Properties

                .ForMember(dest => dest.Car, opt => opt.Ignore())
                .ForMember(dest => dest.ReportedByUser, opt => opt.Ignore());

            CreateMap<MaintenanceReport, MaintenanceResponseDto>()
                .ForMember(dest => dest.CarName,
                    opt => opt.MapFrom(src =>
                        src.Car.Brand + " " + src.Car.Model))

                .ForMember(dest => dest.ReportedBy,
                    opt => opt.MapFrom(src =>
                        src.ReportedByUser.FirstName + " " +
                        src.ReportedByUser.LastName));

            // ==========================================================
            // Check-In
            // ==========================================================

            CreateMap<CheckInDto, CheckIn>()
                .ForMember(dest => dest.CheckInId, opt => opt.Ignore())
                .ForMember(dest => dest.CheckInDateTime, opt => opt.Ignore())

                // Navigation Properties

                .ForMember(dest => dest.Reservation, opt => opt.Ignore())
                .ForMember(dest => dest.RentalAgent, opt => opt.Ignore());

            CreateMap<CheckIn, CheckInResponseDto>()
                .ForMember(dest => dest.CustomerName,
                    opt => opt.MapFrom(src =>
                        src.Reservation.User.FirstName + " " +
                        src.Reservation.User.LastName))

                .ForMember(dest => dest.CarName,
                    opt => opt.MapFrom(src =>
                        src.Reservation.Car.Brand + " " +
                        src.Reservation.Car.Model))

                .ForMember(dest => dest.RentalAgentName,
                    opt => opt.MapFrom(src =>
                        src.RentalAgent.FirstName + " " +
                        src.RentalAgent.LastName));

            // ==========================================================
            // Check-Out
            // ==========================================================

            CreateMap<CheckOutDto, CheckOut>()
                .ForMember(dest => dest.CheckOutId, opt => opt.Ignore())
                .ForMember(dest => dest.CheckOutDateTime, opt => opt.Ignore())

                // Navigation Properties

                .ForMember(dest => dest.Reservation, opt => opt.Ignore())
                .ForMember(dest => dest.RentalAgent, opt => opt.Ignore());

            CreateMap<CheckOut, CheckOutResponseDto>()
                .ForMember(dest => dest.CustomerName,
                    opt => opt.MapFrom(src =>
                        src.Reservation.User.FirstName + " " +
                        src.Reservation.User.LastName))

                .ForMember(dest => dest.CarName,
                    opt => opt.MapFrom(src =>
                        src.Reservation.Car.Brand + " " +
                        src.Reservation.Car.Model))

                .ForMember(dest => dest.RentalAgentName,
                    opt => opt.MapFrom(src =>
                        src.RentalAgent.FirstName + " " +
                        src.RentalAgent.LastName));

            // ==========================================================
            // Rental Agent Dashboard
            // ==========================================================

            // DashboardDto is created manually in RentalAgentService,
            // so no mapping is required.

            // ==========================================================
            // Today's Pickups
            // ==========================================================

            CreateMap<Reservation, TodayPickupDto>()
                .ForMember(dest => dest.CustomerName,
                    opt => opt.MapFrom(src =>
                        src.User.FirstName + " " +
                        src.User.LastName))

                .ForMember(dest => dest.CarName,
                    opt => opt.MapFrom(src =>
                        src.Car.Brand + " " +
                        src.Car.Model))

                .ForMember(dest => dest.PickupLocation,
                    opt => opt.MapFrom(src =>
                        src.Car.Location))

                .ForMember(dest => dest.PickupDate,
                    opt => opt.MapFrom(src =>
                        src.PickupDate))

                .ForMember(dest => dest.ReservationStatus,
                    opt => opt.MapFrom(src =>
                        src.Status))

                .ForMember(dest => dest.IsCheckedIn,
                    opt => opt.MapFrom(src =>
                        src.CheckIn != null));

            // ==========================================================
            // Today's Returns
            // ==========================================================

            CreateMap<Reservation, TodayReturnDto>()
                .ForMember(dest => dest.CustomerName,
                    opt => opt.MapFrom(src =>
                        src.User.FirstName + " " +
                        src.User.LastName))

                .ForMember(dest => dest.CarName,
                    opt => opt.MapFrom(src =>
                        src.Car.Brand + " " +
                        src.Car.Model))

                .ForMember(dest => dest.ReturnLocation,
                    opt => opt.MapFrom(src =>
                        src.Car.Location))

                .ForMember(dest => dest.ReturnDate,
                    opt => opt.MapFrom(src =>
                        src.DropoffDate))

                .ForMember(dest => dest.ReservationStatus,
                    opt => opt.MapFrom(src =>
                        src.Status))

                .ForMember(dest => dest.IsCheckedOut,
                    opt => opt.MapFrom(src =>
                        src.CheckOut != null));
        }
    }
}