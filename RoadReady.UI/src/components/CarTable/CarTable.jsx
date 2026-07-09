import "./CarTable.css";

function CarTable({ cars, onEdit, onDelete }) {
    if (cars.length === 0) {
        return (
            <div className="empty-cars">
                No cars available.
            </div>
        );
    }

    return (
        <div className="car-grid">
            {cars.map((car) => (
                <div className="manage-car-card" key={car.carId}>

                    <div className="manage-car-image">

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
                            {car.isAvailable ? "Available" : "Unavailable"}
                        </span>

                    </div>

                    <div className="manage-car-content">

                        <h2>
                            {car.brand} {car.model}
                        </h2>

                        <p>
                            <strong>ID :</strong> {car.carId}
                        </p>

                        <p>
                            <strong>Year :</strong> {car.year}
                        </p>

                        <p>
                            <strong>Location :</strong> {car.location}
                        </p>

                        <p>
                            <strong>Description :</strong>
                            <br />
                            {car.description || "No description available."}
                        </p>

                        <h3>
                            ₹{car.pricePerDay} <span>/ Day</span>
                        </h3>

                        <div className="manage-card-buttons">

                            <button
                                className="edit-btn"
                                onClick={() => onEdit(car)}
                            >
                                Edit
                            </button>

                            <button
                                className="delete-btn"
                                onClick={() => onDelete(car)}
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                </div>
            ))}
        </div>
    );
}

export default CarTable;