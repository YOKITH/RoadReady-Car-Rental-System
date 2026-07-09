import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getCarById } from "../../api/carApi";
import { addReview } from "../../api/reviewApi";

import { useAuth } from "../../context/AuthContext";

import CarGallery from "../../components/CarGallery/CarGallery";
import ReviewList from "../../components/ReviewList/ReviewList";
import ReviewForm from "../../components/ReviewForm/ReviewForm";

import "./CarDetails.css";

function CarDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const { user } = useAuth();

    const [car, setCar] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [showReviews, setShowReviews] = useState(false);

    const [refreshReviews, setRefreshReviews] = useState(false);

    useEffect(() => {

        loadCar();

    }, [id]);

    async function loadCar() {

        try {

            setLoading(true);

            const response = await getCarById(id);

            setCar(response);

            setError("");

        }
        catch (error) {

            setError(error.message);

        }
        finally {

            setLoading(false);

        }

    }

    function handleBookNow() {

        navigate("/reservations/create", {
            state: {
                car
            }
        });

    }

    function toggleReviews() {

        setShowReviews(!showReviews);

    }

    async function handleAddReview(review) {

        try {

            await addReview({

                carId: car.carId,

                rating: review.rating,

                comment: review.comment

            });

            alert("Review added successfully.");

            setRefreshReviews(!refreshReviews);

        }
        catch (error) {

            console.error(error);

            alert(error.message);

        }

    }

    if (loading) {

        return (

            <div className="loading">

                Loading Car Details...

            </div>

        );

    }

    if (error) {

        return (

            <div className="error">

                {error}

            </div>

        );

    }

    return (

        <div className="car-details-page">

            <div className="car-details-container">

                {/* Left Side - Images */}

                <div className="car-image-section">

                    <CarGallery car={car} />

                </div>

                {/* Right Side - Information */}

                <div className="car-info-section">

                    <h1>

                        {car.brand} {car.model}

                    </h1>

                    <span
                        className={
                            car.isAvailable
                                ? "available"
                                : "unavailable"
                        }
                    >
                        {
                            car.isAvailable
                                ? "Available"
                                : "Not Available"
                        }

                    </span>

                    <div className="car-specifications">

                        <div className="specification">

                            <strong>

                                Brand

                            </strong>

                            <p>

                                {car.brand}

                            </p>

                        </div>

                        <div className="specification">

                            <strong>

                                Model

                            </strong>

                            <p>

                                {car.model}

                            </p>

                        </div>

                        <div className="specification">

                            <strong>

                                Year

                            </strong>

                            <p>

                                {car.year}

                            </p>

                        </div>

                        <div className="specification">

                            <strong>

                                Location

                            </strong>

                            <p>

                                {car.location}

                            </p>

                        </div>

                    </div>

                    <div className="description">

                        <h3>

                            Description

                        </h3>

                        <p>

                            {car.description}

                        </p>

                    </div>

                    <div className="price-section">

                        <h2>

                            ₹{car.pricePerDay}

                            <span>

                                {" "} / Day

                            </span>

                        </h2>

                    </div>

                    <div className="button-group">

                        {/* Only Customer can Book */}

                        {

                            user?.role === "Customer" && (

                                <button
                                    className="book-button"
                                    disabled={!car.isAvailable}
                                    onClick={handleBookNow}
                                >

                                    Book Now

                                </button>

                            )

                        }

                        <button
                            className="review-button"
                            onClick={toggleReviews}
                        >

                            {

                                showReviews

                                    ?

                                    "Hide Reviews"

                                    :

                                    "View Reviews"

                            }

                        </button>

                    </div>

                </div>

            </div>

            {

                showReviews && (

                    <div className="reviews-section">

                        <h2>

                            Customer Reviews

                        </h2>

                        <ReviewList
                            carId={car.carId}
                            refresh={refreshReviews}
                        />

                        <ReviewForm
                            onSubmit={handleAddReview}
                        />

                    </div>

                )

            }

        </div>

    );

}

export default CarDetails;