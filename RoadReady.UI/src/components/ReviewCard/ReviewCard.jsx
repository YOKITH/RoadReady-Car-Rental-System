import RatingStars from "../RatingStars/RatingStars";

import "./ReviewCard.css";

function ReviewCard({ review }) {

    return (

        <div className="review-card">

            <div className="review-header">

                <div>

                    <h3 className="customer-name">

                        {review.customerName || "Customer"}

                    </h3>

                    <p className="review-date">

                        {
                            review.reviewDate
                                ? new Date(
                                    review.reviewDate
                                ).toLocaleDateString()
                                : "Date Not Available"
                        }

                    </p>

                </div>

                <RatingStars
                    rating={review.rating}
                />

            </div>

            <div className="review-body">

                <p>

                    {review.comment || "No review available."}

                </p>

            </div>

            <div className="review-footer">

                <span>

                    Car :

                    <strong>

                        {" "}
                        {review.carName || "N/A"}

                    </strong>

                </span>

            </div>

        </div>

    );

}

export default ReviewCard;