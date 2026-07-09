import { Link } from "react-router-dom";

function CarCard({ car }) {

    return (

        <div className="car-card">

            <div className="car-image">

                <img
                    src={
                        car.imageUrl ||
                        "https://via.placeholder.com/400x250?text=RoadReady"
                    }
                    alt={`${car.brand} ${car.model}`}
                />

            </div>

            <div className="car-body">

                <h3>
                    {car.brand} {car.model}
                </h3>

                <p>
                    <strong>Year :</strong> {car.year}
                </p>

                <p>
                    <strong>Location :</strong> {car.location}
                </p>

                <p>
                    <strong>Status :</strong>

                    <span
                        className={
                            car.isAvailable
                                ? "available"
                                : "unavailable"
                        }
                    >
                        {car.isAvailable
                            ? " Available"
                            : " Not Available"}
                    </span>

                </p>

                <h2>

                    ₹{car.pricePerDay}

                    <span>/Day</span>

                </h2>

                <Link
                    to={`/cars/${car.carId}`}
                    className="book-btn"
                >
                    View Details
                </Link>

            </div>

        </div>

    );

}

export default CarCard;