using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;
using RoadReady.API.Models;
using RoadReady.API.Pagination;
using RoadReady.API.Repositories.Interfaces;
using RoadReady.API.Services;

namespace RoadReady.Tests.Services
{
    [TestFixture]
    public class CarServiceTests
    {
        private Mock<ICarRepository> _carRepositoryMock;
        private Mock<ILogger<CarService>> _loggerMock;
        private CarService _carService;

        [SetUp]
        public void Setup()
        {
            _carRepositoryMock = new Mock<ICarRepository>();
            _loggerMock = new Mock<ILogger<CarService>>();

            _carService = new CarService(
                _carRepositoryMock.Object,
                _loggerMock.Object);
        }

        #region GetAllCarsAsync

        [Test]
        public async Task GetAllCarsAsync_Should_Return_All_Cars()
        {
            var cars = new List<Car>
            {
                new Car
                {
                    CarId = 1,
                    Brand = "Toyota"
                }
            };

            _carRepositoryMock
                .Setup(x => x.GetAllCarsAsync())
                .ReturnsAsync(cars);

            var result = await _carService.GetAllCarsAsync();

            Assert.That(result.Count(), Is.EqualTo(1));
        }

        [Test]
        public void GetAllCarsAsync_Should_Throw_Exception()
        {
            _carRepositoryMock
                .Setup(x => x.GetAllCarsAsync())
                .ThrowsAsync(new Exception());

            Assert.ThrowsAsync<Exception>(
                async () => await _carService.GetAllCarsAsync());
        }

        #endregion

        #region GetCarByIdAsync

        [Test]
        public async Task GetCarByIdAsync_Should_Return_Car()
        {
            var car = new Car
            {
                CarId = 1,
                Brand = "BMW"
            };

            _carRepositoryMock
                .Setup(x => x.GetCarByIdAsync(1))
                .ReturnsAsync(car);

            var result = await _carService.GetCarByIdAsync(1);

            Assert.That(result, Is.Not.Null);
            Assert.That(result!.Brand, Is.EqualTo("BMW"));
        }

        [Test]
        public void GetCarByIdAsync_Should_Throw_NotFoundException()
        {
            _carRepositoryMock
                .Setup(x => x.GetCarByIdAsync(1))
                .ReturnsAsync((Car?)null);

            Assert.ThrowsAsync<KeyNotFoundException>(
                async () => await _carService.GetCarByIdAsync(1));
        }

        [Test]
        public void GetCarByIdAsync_Should_Throw_Exception()
        {
            _carRepositoryMock
                .Setup(x => x.GetCarByIdAsync(1))
                .ThrowsAsync(new Exception());

            Assert.ThrowsAsync<Exception>(
                async () => await _carService.GetCarByIdAsync(1));
        }

        #endregion

        #region SearchCarsAsync

        [Test]
        public async Task SearchCarsAsync_Should_Return_Matching_Cars()
        {
            var cars = new List<Car>
            {
                new Car
                {
                    Brand = "Toyota"
                }
            };

            _carRepositoryMock
                .Setup(x => x.SearchCarsAsync("Toyota"))
                .ReturnsAsync(cars);

            var result = await _carService.SearchCarsAsync("Toyota");

            Assert.That(result.Count(), Is.EqualTo(1));
        }

        [Test]
        public async Task SearchCarsAsync_Should_Return_Empty_List()
        {
            _carRepositoryMock
                .Setup(x => x.SearchCarsAsync("Audi"))
                .ReturnsAsync(new List<Car>());

            var result = await _carService.SearchCarsAsync("Audi");

            Assert.That(result.Count(), Is.EqualTo(0));
        }

        [Test]
        public void SearchCarsAsync_Should_Throw_When_Keyword_Is_Empty()
        {
            Assert.ThrowsAsync<ArgumentException>(
                async () => await _carService.SearchCarsAsync(""));
        }

        [Test]
        public void SearchCarsAsync_Should_Throw_Exception()
        {
            _carRepositoryMock
                .Setup(x => x.SearchCarsAsync("BMW"))
                .ThrowsAsync(new Exception());

            Assert.ThrowsAsync<Exception>(
                async () => await _carService.SearchCarsAsync("BMW"));
        }

        #endregion

        #region AddCarAsync

        [Test]
        public async Task AddCarAsync_Should_Add_Car()
        {
            var car = new Car
            {
                Brand = "BMW",
                Model = "X5",
                PricePerDay = 5000
            };

            _carRepositoryMock
                .Setup(x => x.SaveChangesAsync())
                .ReturnsAsync(true);

            var result = await _carService.AddCarAsync(car);

            Assert.That(result, Is.True);

            _carRepositoryMock.Verify(
                x => x.AddCarAsync(It.IsAny<Car>()),
                Times.Once);
        }

        [Test]
        public void AddCarAsync_Should_Throw_When_Brand_Is_Empty()
        {
            var car = new Car
            {
                Brand = "",
                Model = "X5",
                PricePerDay = 5000
            };

            Assert.ThrowsAsync<ArgumentException>(
                async () => await _carService.AddCarAsync(car));
        }

        [Test]
        public void AddCarAsync_Should_Throw_When_Model_Is_Empty()
        {
            var car = new Car
            {
                Brand = "BMW",
                Model = "",
                PricePerDay = 5000
            };

            Assert.ThrowsAsync<ArgumentException>(
                async () => await _carService.AddCarAsync(car));
        }

        [Test]
        public void AddCarAsync_Should_Throw_When_Price_Is_Invalid()
        {
            var car = new Car
            {
                Brand = "BMW",
                Model = "X5",
                PricePerDay = 0
            };

            Assert.ThrowsAsync<ArgumentException>(
                async () => await _carService.AddCarAsync(car));
        }

        [Test]
        public void AddCarAsync_Should_Throw_When_SaveChanges_Fails()
        {
            var car = new Car
            {
                Brand = "BMW",
                Model = "X5",
                PricePerDay = 5000
            };

            _carRepositoryMock
                .Setup(x => x.AddCarAsync(It.IsAny<Car>()))
                .Returns(Task.CompletedTask);

            _carRepositoryMock
                .Setup(x => x.SaveChangesAsync())
                .ThrowsAsync(new Exception());

            Assert.ThrowsAsync<Exception>(
                async () => await _carService.AddCarAsync(car));
        }

        #endregion

        #region UpdateCarAsync

        [Test]
        public async Task UpdateCarAsync_Should_Update_Car()
        {
            var existingCar = new Car
            {
                CarId = 1,
                Brand = "Toyota"
            };

            var updatedCar = new Car
            {
                Brand = "BMW",
                Model = "X5",
                PricePerDay = 6000
            };

            _carRepositoryMock
                .Setup(x => x.GetCarByIdAsync(1))
                .ReturnsAsync(existingCar);

            _carRepositoryMock
                .Setup(x => x.SaveChangesAsync())
                .ReturnsAsync(true);

            var result = await _carService.UpdateCarAsync(1, updatedCar);

            Assert.That(result, Is.True);
            Assert.That(existingCar.Brand, Is.EqualTo("BMW"));
        }

        [Test]
        public void UpdateCarAsync_Should_Throw_When_Car_Not_Found()
        {
            _carRepositoryMock
                .Setup(x => x.GetCarByIdAsync(1))
                .ReturnsAsync((Car?)null);

            Assert.ThrowsAsync<KeyNotFoundException>(
                async () => await _carService.UpdateCarAsync(1, new Car()));
        }

        [Test]
        public void UpdateCarAsync_Should_Throw_Exception()
        {
            _carRepositoryMock
                .Setup(x => x.GetCarByIdAsync(1))
                .ThrowsAsync(new Exception());

            Assert.ThrowsAsync<Exception>(
                async () => await _carService.UpdateCarAsync(1, new Car()));
        }

        #endregion

        #region DeleteCarAsync

        [Test]
        public async Task DeleteCarAsync_Should_Delete_Car()
        {
            var car = new Car
            {
                CarId = 1
            };

            _carRepositoryMock
                .Setup(x => x.GetCarByIdAsync(1))
                .ReturnsAsync(car);

            _carRepositoryMock
                .Setup(x => x.SaveChangesAsync())
                .ReturnsAsync(true);

            var result = await _carService.DeleteCarAsync(1);

            Assert.That(result, Is.True);

            _carRepositoryMock.Verify(
                x => x.DeleteCarAsync(car),
                Times.Once);
        }

        [Test]
        public void DeleteCarAsync_Should_Throw_When_Car_Not_Found()
        {
            _carRepositoryMock
                .Setup(x => x.GetCarByIdAsync(1))
                .ReturnsAsync((Car?)null);

            Assert.ThrowsAsync<KeyNotFoundException>(
                async () => await _carService.DeleteCarAsync(1));
        }

        [Test]
        public void DeleteCarAsync_Should_Throw_Exception()
        {
            _carRepositoryMock
                .Setup(x => x.GetCarByIdAsync(1))
                .ThrowsAsync(new Exception());

            Assert.ThrowsAsync<Exception>(
                async () => await _carService.DeleteCarAsync(1));
        }

        #endregion

        #region GetPagedCarsAsync

        [Test]
        public async Task GetPagedCarsAsync_Should_Return_Paged_Cars()
        {
            var pagedCars = new PagedResponse<Car>
            {
                Data = new List<Car>
                {
                    new Car
                    {
                        CarId = 1,
                        Brand = "Toyota"
                    }
                },
                PageNumber = 1,
                PageSize = 10,
                TotalRecords = 1
            };

            _carRepositoryMock
                .Setup(x => x.GetPagedCarsAsync(It.IsAny<PaginationParams>()))
                .ReturnsAsync(pagedCars);

            var result = await _carService.GetPagedCarsAsync(new PaginationParams());

            Assert.That(result.TotalRecords, Is.EqualTo(1));
        }

        [Test]
        public void GetPagedCarsAsync_Should_Throw_Exception()
        {
            _carRepositoryMock
                .Setup(x => x.GetPagedCarsAsync(It.IsAny<PaginationParams>()))
                .ThrowsAsync(new Exception());

            Assert.ThrowsAsync<Exception>(
                async () => await _carService.GetPagedCarsAsync(new PaginationParams()));
        }

        #endregion
    }
}