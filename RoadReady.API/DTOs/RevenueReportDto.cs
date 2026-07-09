namespace RoadReady.API.DTOs
{
    public class RevenueReportDto
    {
        // Total revenue from all successful payments
        public decimal TotalRevenue { get; set; }

        // Revenue collected today
        public decimal TodayRevenue { get; set; }

        // Revenue collected in the current month
        public decimal MonthlyRevenue { get; set; }

        // Revenue collected in the current year
        public decimal YearlyRevenue { get; set; }

        // Number of successful payments
        public int TotalPayments { get; set; }
    }
}