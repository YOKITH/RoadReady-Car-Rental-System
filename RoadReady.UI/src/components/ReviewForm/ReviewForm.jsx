import { useState } from "react";

import RatingStars from "../RatingStars/RatingStars";

import "./ReviewForm.css";

function ReviewForm({ onSubmit }) {

    const [rating, setRating] = useState(0);

    const [comment, setComment] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = (event) => {

    event.preventDefault();

    console.log("Submit button clicked");

    setError("");

    if (rating === 0) {

        console.log("Rating is 0");

        setError("Please select a rating.");

        return;
    }

    if (!comment.trim()) {

        console.log("Comment is empty");

        setError("Please enter your review.");

        return;
    }

    const review = {
        rating,
        comment
    };

    console.log("Review Object:", review);

    if (onSubmit) {

        console.log("Calling Parent onSubmit");

        onSubmit(review);
    }

    setRating(0);
    setComment("");
};

    return (

        <div className="review-form">

            <h2>

                Write a Review

            </h2>

            {

                error &&

                <div className="review-error">

                    {error}

                </div>

            }

            <form onSubmit={handleSubmit}>

                <div className="form-group">

                    <label>

                        Rating

                    </label>

                    <RatingStars

                        rating={rating}

                        setRating={setRating}

                        editable={true}

                    />

                </div>

                <div className="form-group">

                    <label>

                        Review

                    </label>

                    <textarea

                        rows="5"

                        placeholder="Share your experience..."

                        value={comment}

                        onChange={(event) =>
                            setComment(event.target.value)
                        }

                    />

                </div>

                <button
                    type="submit"
                    className="submit-review-btn"
                >

                    Submit Review

                </button>

            </form>

        </div>

    );

}

export default ReviewForm;