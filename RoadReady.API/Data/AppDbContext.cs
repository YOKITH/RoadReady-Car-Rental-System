using Microsoft.EntityFrameworkCore;
using RoadReady.API.Models;

namespace RoadReady.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // ==========================================================
        // DbSets
        // ==========================================================

        public DbSet<User> Users { get; set; }

        public DbSet<Car> Cars { get; set; }

        public DbSet<RefreshToken> RefreshTokens { get; set; }

        public DbSet<Reservation> Reservations { get; set; }

        public DbSet<Payment> Payments { get; set; }

        public DbSet<Review> Reviews { get; set; }

        public DbSet<CheckIn> CheckIns { get; set; }

        public DbSet<CheckOut> CheckOuts { get; set; }

        public DbSet<MaintenanceReport> MaintenanceReports { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ==========================================================
            // User
            // ==========================================================

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // ==========================================================
            // Reservation -> User
            // ==========================================================

            modelBuilder.Entity<Reservation>()
                .HasOne(r => r.User)
                .WithMany(u => u.Reservations)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // ==========================================================
            // Reservation -> Car
            // ==========================================================

            modelBuilder.Entity<Reservation>()
                .HasOne(r => r.Car)
                .WithMany(c => c.Reservations)
                .HasForeignKey(r => r.CarId)
                .OnDelete(DeleteBehavior.Restrict);

            // ==========================================================
            // Payment -> User
            // ==========================================================

            modelBuilder.Entity<Payment>()
                .HasOne(p => p.User)
                .WithMany(u => u.Payments)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // ==========================================================
            // Payment -> Reservation
            // ==========================================================

            modelBuilder.Entity<Payment>()
                .HasOne(p => p.Reservation)
                .WithOne(r => r.Payment)
                .HasForeignKey<Payment>(p => p.ReservationId)
                .OnDelete(DeleteBehavior.Cascade);

            // ==========================================================
            // Review -> User
            // ==========================================================

            modelBuilder.Entity<Review>()
                .HasOne(r => r.User)
                .WithMany(u => u.Reviews)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // ==========================================================
            // Review -> Car
            // ==========================================================

            modelBuilder.Entity<Review>()
                .HasOne(r => r.Car)
                .WithMany(c => c.Reviews)
                .HasForeignKey(r => r.CarId)
                .OnDelete(DeleteBehavior.Cascade);

            // ==========================================================
            // Refresh Token -> User
            // ==========================================================

            modelBuilder.Entity<RefreshToken>()
                .HasOne(rt => rt.User)
                .WithMany(u => u.RefreshTokens)
                .HasForeignKey(rt => rt.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // ==========================================================
            // Check-In -> Reservation (One-to-One)
            // ==========================================================

            modelBuilder.Entity<CheckIn>()
                .HasOne(ci => ci.Reservation)
                .WithOne(r => r.CheckIn)
                .HasForeignKey<CheckIn>(ci => ci.ReservationId)
                .OnDelete(DeleteBehavior.Cascade);

            // ==========================================================
            // Check-In -> Rental Agent
            // ==========================================================

            modelBuilder.Entity<CheckIn>()
                .HasOne(ci => ci.RentalAgent)
                .WithMany(u => u.CheckIns)
                .HasForeignKey(ci => ci.RentalAgentId)
                .OnDelete(DeleteBehavior.Restrict);

            // ==========================================================
            // Check-Out -> Reservation (One-to-One)
            // ==========================================================

            modelBuilder.Entity<CheckOut>()
                .HasOne(co => co.Reservation)
                .WithOne(r => r.CheckOut)
                .HasForeignKey<CheckOut>(co => co.ReservationId)
                .OnDelete(DeleteBehavior.Cascade);

            // ==========================================================
            // Check-Out -> Rental Agent
            // ==========================================================

            modelBuilder.Entity<CheckOut>()
                .HasOne(co => co.RentalAgent)
                .WithMany(u => u.CheckOuts)
                .HasForeignKey(co => co.RentalAgentId)
                .OnDelete(DeleteBehavior.Restrict);

            // ==========================================================
            // Maintenance Report -> Car
            // ==========================================================

            modelBuilder.Entity<MaintenanceReport>()
                .HasOne(m => m.Car)
                .WithMany(c => c.MaintenanceReports)
                .HasForeignKey(m => m.CarId)
                .OnDelete(DeleteBehavior.Restrict);

            // ==========================================================
            // Maintenance Report -> Rental Agent
            // ==========================================================

            modelBuilder.Entity<MaintenanceReport>()
                .HasOne(m => m.ReportedByUser)
                .WithMany(u => u.MaintenanceReports)
                .HasForeignKey(m => m.ReportedBy)
                .OnDelete(DeleteBehavior.Restrict);

            // ==========================================================
            // Decimal Precision
            // ==========================================================

            modelBuilder.Entity<Car>()
                .Property(c => c.PricePerDay)
                .HasPrecision(10, 2);

            modelBuilder.Entity<Payment>()
                .Property(p => p.Amount)
                .HasPrecision(10, 2);

            modelBuilder.Entity<Reservation>()
                .Property(r => r.TotalAmount)
                .HasPrecision(10, 2);

            modelBuilder.Entity<MaintenanceReport>()
                .Property(m => m.EstimatedCost)
                .HasPrecision(10, 2);
        }
    }
}