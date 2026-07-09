import { useState } from "react";

import "./CarGallery.css";

function CarGallery({ car }) {

    const images = [
        car.imageUrl ||
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900",

        car.imageUrl ||
            "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900",

        car.imageUrl ||
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=900",

        car.imageUrl ||
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=900"
    ];

    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (

        <div className="gallery">

            <div className="main-image">

                <img
                    src={selectedImage}
                    alt={`${car.brand} ${car.model}`}
                />

            </div>

            <div className="thumbnail-container">

                {

                    images.map((image, index) => (

                        <img
                            key={index}
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className={
                                selectedImage === image
                                    ? "thumbnail active"
                                    : "thumbnail"
                            }
                            onClick={() => setSelectedImage(image)}
                        />

                    ))

                }

            </div>

        </div>

    );

}

export default CarGallery;