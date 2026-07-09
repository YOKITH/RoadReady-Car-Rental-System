import { useEffect, useState } from "react";

import { updateCar } from "../../api/carApi";

import "./EditCar.css";

function EditCar({

    car,

    onClose

}) {

    const [formData, setFormData] = useState({ brand: "", model: "",year: "",
        location: "", pricePerDay: "", description: "", imageUrl: "", isAvailable: true
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
        if (car) {
            setFormData({
                brand: car.brand, model: car.model,
                year: car.year, location: car.location, pricePerDay: car.pricePerDay,
                description: car.description, imageUrl: car.imageUrl,isAvailable: car.isAvailable
            });
        }
    }, [car]);

    function handleChange(event) {
        const { name,value,type,checked } = event.target;
        setFormData(previous => ({
            ...previous,
            [name]: type === "checkbox" ? checked : value
        }));
    }
    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        try {
            setLoading(true);
            await updateCar(
                car.carId,
                formData
            );
            alert("✅ Car updated successfully.");
            onClose();
        }
        catch (error) {
            setError(error.message);
        }

        finally {
            setLoading(false);
        }
    }

    return (
        <div className="edit-car-overlay">
            <div className="edit-car-container">
                <h2> Edit Car </h2>
                {

                    error &&
                    <p className="error"> {error}</p>
                }

                <form onSubmit={handleSubmit}>
                    <input type="text"
                        name="brand" placeholder="Brand"
                        value={formData.brand} onChange={handleChange} required />

                    <input type="text" name="model"
                        placeholder="Model" value={formData.model} onChange={handleChange}
                        required />

                    <input type="number" name="year" placeholder="Year" value={formData.year}
                    onChange={handleChange} required />

                    <input type="text" name="location"
                        placeholder="Location" value={formData.location} onChange={handleChange}
                        required />

                    <input type="number" name="pricePerDay"
                        placeholder="Price Per Day" value={formData.pricePerDay}
                        onChange={handleChange} required />

                    <textarea rows="4" name="description"
                        placeholder="Description" value={formData.description} onChange={handleChange}/>

                    <input type="text" name="imageUrl"
                        placeholder="Image URL" value={formData.imageUrl} onChange={handleChange}/>

                    <label className="checkbox">
                        <input type="checkbox" name="isAvailable"
                            checked={formData.isAvailable} onChange={handleChange} />
                        Available
                    </label>

                    <div className="button-group">
                        <button type="submit" disabled={loading} >
                            {
                                loading ? "Updating..." : "Update Car"
                            }
                        </button>

                        <button type="button" className="cancel-btn" onClick={onClose} >
                            Cancel </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default EditCar;