import { useEffect, useState } from "react";

import ReviewCard from "../ReviewCard/ReviewCard";

import { getReviewsByCar } from "../../api/reviewApi";

import "./ReviewList.css";

function ReviewList({ carId }) {

    const [reviews, setReviews] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        if (carId) {

            loadReviews();

        }

    }, [carId]);

    async function loadReviews() {

        try {

            setLoading(true);

            const data = await getReviewsByCar(carId);

            setReviews(data);

        }

        catch (error) {

            setError(error.message);

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <div className="review-list">

                {/* <h2>

                    Customer Reviews

                </h2> */}

                <p>

                    Loading reviews...

                </p>

            </div>

        );

    }

    if (error) {

        return (

            <div className="review-list">

                {/* <h2>

                    Customer Reviews

                </h2> */}

                <p className="error-message">

                    {error}

                </p>

            </div>

        );

    }

    return (

        <div className="review-list">

            {/* <h2>

                Customer Reviews

            </h2> */}

            {

                reviews.length === 0

                    ?

                    (

                        <div className="empty-review">

                            No reviews available for this car.

                        </div>

                    )

                    :

                    (

                        reviews.map((review) => (

                            <ReviewCard

                                key={review.reviewId}

                                review={review}

                            />

                        ))

                    )

            }

        </div>

    );

}

export default ReviewList;