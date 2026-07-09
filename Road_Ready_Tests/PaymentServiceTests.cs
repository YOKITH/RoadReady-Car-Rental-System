using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;
using RoadReady.API.DTOs;
using RoadReady.API.Models;
using RoadReady.API.Pagination;
using RoadReady.API.Repositories.Interfaces;
using RoadReady.API.Services;
using AutoMapper;

namespace RoadReady.Tests.Services
{
    [TestFixture]
    public class PaymentServiceTests
    {
        private Mock<IPaymentRepository> _paymentRepositoryMock;
        private Mock<IReservationRepository> _reservationRepositoryMock;
        private Mock<IMapper> _mapperMock;
        private Mock<ILogger<PaymentService>> _loggerMock;
        private Mock<IConfiguration> _configurationMock;

        private PaymentService _paymentService;

        [SetUp]
        public void Setup()
        {
            _paymentRepositoryMock = new Mock<IPaymentRepository>();
            _reservationRepositoryMock = new Mock<IReservationRepository>();
            _mapperMock = new Mock<IMapper>();
            _loggerMock = new Mock<ILogger<PaymentService>>();
            _configurationMock = new Mock<IConfiguration>();

            _paymentService = new PaymentService(
                _paymentRepositoryMock.Object,
                _reservationRepositoryMock.Object,
                _mapperMock.Object,
                _loggerMock.Object,
                _configurationMock.Object);
        }

        #region GetAllPaymentsAsync

        [Test]
        public async Task GetAllPaymentsAsync_Should_Return_All_Payments()
        {
            var payments = new List<Payment>
            {
                new Payment
                {
                    PaymentId = 1,
                    Amount = 5000,
                    PaymentStatus = "Success"
                }
            };

            _paymentRepositoryMock
                .Setup(x => x.GetAllPaymentsAsync())
                .ReturnsAsync(payments);

            var result = await _paymentService.GetAllPaymentsAsync();

            Assert.That(result.Count(), Is.EqualTo(1));
        }

        [Test]
        public void GetAllPaymentsAsync_Should_Throw_Exception()
        {
            _paymentRepositoryMock
                .Setup(x => x.GetAllPaymentsAsync())
                .ThrowsAsync(new Exception());

            Assert.ThrowsAsync<Exception>(
                async () => await _paymentService.GetAllPaymentsAsync());
        }

        #endregion

        #region GetPaymentsByUserIdAsync

        [Test]
        public async Task GetPaymentsByUserIdAsync_Should_Return_User_Payments()
        {
            var payments = new List<Payment>
            {
                new Payment
                {
                    PaymentId = 1,
                    UserId = 5,
                    Amount = 2500
                }
            };

            _paymentRepositoryMock
                .Setup(x => x.GetPaymentsByUserIdAsync(5))
                .ReturnsAsync(payments);

            var result = await _paymentService.GetPaymentsByUserIdAsync(5);

            Assert.That(result.Count(), Is.EqualTo(1));
        }

        [Test]
        public async Task GetPaymentsByUserIdAsync_Should_Return_Empty_List()
        {
            _paymentRepositoryMock
                .Setup(x => x.GetPaymentsByUserIdAsync(100))
                .ReturnsAsync(new List<Payment>());

            var result = await _paymentService.GetPaymentsByUserIdAsync(100);

            Assert.That(result.Count(), Is.EqualTo(0));
        }

        [Test]
        public void GetPaymentsByUserIdAsync_Should_Throw_Exception()
        {
            _paymentRepositoryMock
                .Setup(x => x.GetPaymentsByUserIdAsync(1))
                .ThrowsAsync(new Exception());

            Assert.ThrowsAsync<Exception>(
                async () => await _paymentService.GetPaymentsByUserIdAsync(1));
        }

        #endregion

        #region GetPaymentByIdAsync

        [Test]
        public async Task GetPaymentByIdAsync_Should_Return_Payment()
        {
            var payment = new Payment
            {
                PaymentId = 1,
                Amount = 4000,
                PaymentStatus = "Success"
            };

            _paymentRepositoryMock
                .Setup(x => x.GetPaymentByIdAsync(1))
                .ReturnsAsync(payment);

            var result = await _paymentService.GetPaymentByIdAsync(1);

            Assert.That(result, Is.Not.Null);
            Assert.That(result!.Amount, Is.EqualTo(4000));
        }

        [Test]
        public void GetPaymentByIdAsync_Should_Throw_KeyNotFoundException()
        {
            _paymentRepositoryMock
                .Setup(x => x.GetPaymentByIdAsync(1))
                .ReturnsAsync((Payment?)null);

            Assert.ThrowsAsync<KeyNotFoundException>(
                async () => await _paymentService.GetPaymentByIdAsync(1));
        }

        [Test]
        public void GetPaymentByIdAsync_Should_Throw_Exception()
        {
            _paymentRepositoryMock
                .Setup(x => x.GetPaymentByIdAsync(1))
                .ThrowsAsync(new Exception());

            Assert.ThrowsAsync<Exception>(
                async () => await _paymentService.GetPaymentByIdAsync(1));
        }

        #endregion

        #region GetPagedPaymentsAsync

        [Test]
        public async Task GetPagedPaymentsAsync_Should_Return_PagedPayments()
        {
            var response = new PagedResponse<Payment>
            {
                Data = new List<Payment>
                {
                    new Payment
                    {
                        PaymentId = 1,
                        Amount = 5000
                    }
                },
                PageNumber = 1,
                PageSize = 10,
                TotalRecords = 1
            };

            _paymentRepositoryMock
                .Setup(x => x.GetPagedPaymentsAsync(It.IsAny<PaginationParams>()))
                .ReturnsAsync(response);

            var result = await _paymentService.GetPagedPaymentsAsync(new PaginationParams());

            Assert.That(result.TotalRecords, Is.EqualTo(1));
        }

        [Test]
        public void GetPagedPaymentsAsync_Should_Throw_Exception()
        {
            _paymentRepositoryMock
                .Setup(x => x.GetPagedPaymentsAsync(It.IsAny<PaginationParams>()))
                .ThrowsAsync(new Exception());

            Assert.ThrowsAsync<Exception>(
                async () => await _paymentService.GetPagedPaymentsAsync(new PaginationParams()));
        }

        #endregion

        #region CreateRazorpayOrderAsync

        [Test]
        public void CreateRazorpayOrderAsync_Should_Throw_When_Reservation_NotFound()
        {
            _reservationRepositoryMock
                .Setup(x => x.GetReservationByIdAsync(1))
                .ReturnsAsync((Reservation?)null);

            Assert.ThrowsAsync<KeyNotFoundException>(
                async () => await _paymentService.CreateRazorpayOrderAsync(1));
        }

        [Test]
        public void CreateRazorpayOrderAsync_Should_Throw_When_Payment_Already_Completed()
        {
            var reservation = new Reservation
            {
                ReservationId = 1,
                TotalAmount = 5000,
                UserId = 10
            };

            var payment = new Payment
            {
                ReservationId = 1,
                PaymentStatus = "Success"
            };

            _reservationRepositoryMock
                .Setup(x => x.GetReservationByIdAsync(1))
                .ReturnsAsync(reservation);

            _paymentRepositoryMock
                .Setup(x => x.GetPaymentByReservationIdAsync(1))
                .ReturnsAsync(payment);

            Assert.ThrowsAsync<InvalidOperationException>(
                async () => await _paymentService.CreateRazorpayOrderAsync(1));
        }

        [Test]
        public void CreateRazorpayOrderAsync_Should_Throw_Exception()
        {
            _reservationRepositoryMock
                .Setup(x => x.GetReservationByIdAsync(1))
                .ThrowsAsync(new Exception());

            Assert.ThrowsAsync<Exception>(
                async () => await _paymentService.CreateRazorpayOrderAsync(1));
        }

        #endregion
        #region VerifyPaymentAsync

        [Test]
        public void VerifyPaymentAsync_Should_Throw_KeyNotFoundException_When_Reservation_NotFound()
        {
            var paymentDto = new RazorpayPaymentDto
            {
                ReservationId = 1,
                RazorpayOrderId = "order_123",
                RazorpayPaymentId = "pay_123",
                RazorpaySignature = "signature"
            };

            _reservationRepositoryMock
                .Setup(x => x.GetReservationByIdAsync(1))
                .ReturnsAsync((Reservation?)null);

            Assert.ThrowsAsync<KeyNotFoundException>(
                async () => await _paymentService.VerifyPaymentAsync(paymentDto));
        }

        [Test]
        public void VerifyPaymentAsync_Should_Throw_InvalidOperationException_When_Duplicate_Payment()
        {
            var reservation = new Reservation
            {
                ReservationId = 1,
                UserId = 10,
                TotalAmount = 5000
            };

            var payment = new Payment
            {
                PaymentId = 1,
                RazorpayPaymentId = "pay_123"
            };

            var paymentDto = new RazorpayPaymentDto
            {
                ReservationId = 1,
                RazorpayOrderId = "order_123",
                RazorpayPaymentId = "pay_123",
                RazorpaySignature = "signature"
            };

            _reservationRepositoryMock
                .Setup(x => x.GetReservationByIdAsync(1))
                .ReturnsAsync(reservation);

            _paymentRepositoryMock
                .Setup(x => x.GetPaymentByRazorpayPaymentIdAsync("pay_123"))
                .ReturnsAsync(payment);

            Assert.ThrowsAsync<InvalidOperationException>(
                async () => await _paymentService.VerifyPaymentAsync(paymentDto));
        }

        [Test]
        public void VerifyPaymentAsync_Should_Throw_UnauthorizedAccessException_When_Signature_Invalid()
        {
            var reservation = new Reservation
            {
                ReservationId = 1,
                UserId = 10,
                TotalAmount = 5000
            };

            var paymentDto = new RazorpayPaymentDto
            {
                ReservationId = 1,
                RazorpayOrderId = "order_123",
                RazorpayPaymentId = "pay_123",
                RazorpaySignature = "invalid_signature"
            };

            _reservationRepositoryMock
                .Setup(x => x.GetReservationByIdAsync(1))
                .ReturnsAsync(reservation);

            _paymentRepositoryMock
                .Setup(x => x.GetPaymentByRazorpayPaymentIdAsync("pay_123"))
                .ReturnsAsync((Payment?)null);

            _configurationMock
                .Setup(x => x["Razorpay:Secret"])
                .Returns("test_secret");

            Assert.ThrowsAsync<UnauthorizedAccessException>(
                async () => await _paymentService.VerifyPaymentAsync(paymentDto));
        }

        [Test]
        public async Task VerifyPaymentAsync_Should_Save_Payment_And_Confirm_Reservation()
        {
            var reservation = new Reservation
            {
                ReservationId = 1,
                UserId = 5,
                TotalAmount = 5000,
                Status = "Pending"
            };

            string secret = "test_secret";
            string orderId = "order_123";
            string paymentId = "pay_123";

            using var hmac = new System.Security.Cryptography.HMACSHA256(
                System.Text.Encoding.UTF8.GetBytes(secret));

            var hash = hmac.ComputeHash(
                System.Text.Encoding.UTF8.GetBytes($"{orderId}|{paymentId}"));

            string signature = Convert.ToHexString(hash).ToLower();

            var dto = new RazorpayPaymentDto
            {
                ReservationId = 1,
                RazorpayOrderId = orderId,
                RazorpayPaymentId = paymentId,
                RazorpaySignature = signature
            };

            _reservationRepositoryMock
                .Setup(x => x.GetReservationByIdAsync(1))
                .ReturnsAsync(reservation);

            _paymentRepositoryMock
                .Setup(x => x.GetPaymentByRazorpayPaymentIdAsync(paymentId))
                .ReturnsAsync((Payment?)null);

            _configurationMock
                .Setup(x => x["Razorpay:Secret"])
                .Returns(secret);

            _paymentRepositoryMock
                .Setup(x => x.SaveChangesAsync())
                .ReturnsAsync(true);

            var result = await _paymentService.VerifyPaymentAsync(dto);

            Assert.That(result, Is.True);

            Assert.That(reservation.Status, Is.EqualTo("Confirmed"));

            _paymentRepositoryMock.Verify(
                x => x.AddPaymentAsync(It.IsAny<Payment>()),
                Times.Once);

            _reservationRepositoryMock.Verify(
                x => x.UpdateReservationAsync(It.IsAny<Reservation>()),
                Times.Once);

            _paymentRepositoryMock.Verify(
                x => x.SaveChangesAsync(),
                Times.Once);
        }

        [Test]
        public void VerifyPaymentAsync_Should_Throw_Exception_When_SaveChanges_Fails()
        {
            var reservation = new Reservation
            {
                ReservationId = 1,
                UserId = 5,
                TotalAmount = 5000,
                Status = "Pending"
            };

            string secret = "test_secret";
            string orderId = "order_123";
            string paymentId = "pay_123";

            using var hmac = new System.Security.Cryptography.HMACSHA256(
                System.Text.Encoding.UTF8.GetBytes(secret));

            var hash = hmac.ComputeHash(
                System.Text.Encoding.UTF8.GetBytes($"{orderId}|{paymentId}"));

            string signature = Convert.ToHexString(hash).ToLower();

            var dto = new RazorpayPaymentDto
            {
                ReservationId = 1,
                RazorpayOrderId = orderId,
                RazorpayPaymentId = paymentId,
                RazorpaySignature = signature
            };

            _reservationRepositoryMock
                .Setup(x => x.GetReservationByIdAsync(1))
                .ReturnsAsync(reservation);

            _paymentRepositoryMock
                .Setup(x => x.GetPaymentByRazorpayPaymentIdAsync(paymentId))
                .ReturnsAsync((Payment?)null);

            _configurationMock
                .Setup(x => x["Razorpay:Secret"])
                .Returns(secret);

            _paymentRepositoryMock
                .Setup(x => x.SaveChangesAsync())
                .ThrowsAsync(new Exception());

            Assert.ThrowsAsync<Exception>(
                async () => await _paymentService.VerifyPaymentAsync(dto));
        }

        #endregion
    }
}