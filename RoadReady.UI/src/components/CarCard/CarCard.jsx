import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./CarCard.css";

function CarCard({ car }) {

    const { user } = useAuth();

    return (

        <div className="car-card">

            <div className="car-image">

                <img
                    src={
                        car.imageUrl
                            ? car.imageUrl
                            : "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800"
                    }
                    alt={`${car.brand} ${car.model}`}
                />

                <span
                    className={
                        car.isAvailable
                            ? "status available"
                            : "status unavailable"
                    }
                >
                    {car.isAvailable
                        ? "Available"
                        : "Unavailable"}
                </span>

            </div>

            <div className="car-content">

                <h2>

                    {car.brand} {car.model}

                </h2>

                <p>

                    <strong>Year :</strong> {car.year}

                </p>

                <p>

                    <strong>Location :</strong> {car.location}

                </p>

                <p>

                    <strong>Description :</strong>

                    <br />

                    {
                        car.description
                            ? car.description
                            : "No description available."
                    }

                </p>

                <div className="price-section">

                    <span className="price">

                        ₹{car.pricePerDay}

                    </span>

                    <span className="per-day">

                        / Day

                    </span>

                </div>

                <div className="button-group">

                    <Link
                        to={`/cars/${car.carId}`}
                        className="details-button"
                    >

                        View Details

                    </Link>

                    {
                        user?.role === "Customer" &&
                        car.isAvailable && (

                            <Link
                                to="/reservations/create"
                                state={{ car }}
                                className="book-button"
                            >

                                Book Now

                            </Link>

                        )
                    }

                </div>

            </div>

        </div>

    );

}

export default CarCard;