import "./RatingStars.css";

function RatingStars({

    rating = 0,

    setRating = null,

    editable = false,

    onRatingChange = null

}) {

    function handleClick(value) {

        if (!editable) {

            return;

        }

        if (setRating) {

            setRating(value);

        }

        if (onRatingChange) {

            onRatingChange(value);

        }

    }

    return (

        <div className="rating-stars">

            {

                [1, 2, 3, 4, 5].map((star) => (

                    <span

                        key={star}

                        className={
                            star <= rating
                                ? "star active"
                                : "star"
                        }

                        onClick={() => handleClick(star)}

                        style={{
                            cursor: editable ? "pointer" : "default"
                        }}

                    >

                        ★

                    </span>

                ))

            }

        </div>

    );

}

export default RatingStars;