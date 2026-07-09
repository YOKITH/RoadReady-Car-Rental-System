import { useLocation, useNavigate } from "react-router-dom";

import ReservationForm from "../../components/ReservationForm/ReservationForm";

import fleetBg from "../../Images/fleet-bg.png";

import "./CreateReservation.css";

function CreateReservation() {

    const location = useLocation();
    const navigate = useNavigate();

    const car = location.state?.car;

    if (!car) {

        return (

            <div
                className="reservation-error"
                style={{
                    backgroundImage: `
                        linear-gradient(
                            rgba(15,23,42,0.65),
                            rgba(15,23,42,0.65)
                        ),
                        url(${fleetBg})
                    `
                }}
            >

                <h2>No Car Selected</h2>

                <p>
                    Please select a vehicle before making a reservation.
                </p>

                <button
                    onClick={() => navigate("/cars")}
                >
                    Browse Cars
                </button>

            </div>

        );

    }

    return (

        <div
            className="create-reservation-page"
            style={{
                backgroundImage: `
                    linear-gradient(
                        rgba(15,23,42,0.65),
                        rgba(15,23,42,0.65)
                    ),
                    url(${fleetBg})
                `
            }}
        >

            <div className="page-header">

                <h1>
                    Reserve Your Vehicle
                </h1>

                <p>
                    Complete the reservation details below.
                </p>

            </div>

            <div className="reservation-container">

                <div className="car-summary">

                    <img
                        src={
                            car.imageUrl ||
                            "https://via.placeholder.com/450x250"
                        }
                        alt={`${car.brand} ${car.model}`}
                    />

                    <div className="car-details">

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
                            <strong>Price :</strong> ₹{car.pricePerDay} / Day
                        </p>

                        <span
                            className={
                                car.isAvailable
                                    ? "available"
                                    : "unavailable"
                            }
                        >
                            {car.isAvailable
                                ? "Available"
                                : "Unavailable"}
                        </span>

                    </div>

                </div>

                <ReservationForm car={car} />

            </div>

        </div>

    );

}

export default CreateReservation;