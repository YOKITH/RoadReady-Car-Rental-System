import { useState } from "react";

import { addCar } from "../../api/carApi";

import "./AddCar.css";

function AddCar({ onClose }) {

    const [formData, setFormData] = useState({
        brand: "", model: "", year: "",
        location: "", pricePerDay: "", description: "", imageUrl: "", isAvailable: true});

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function handleChange(event) {
        const { name, value, type, checked } = event.target;
        setFormData(previous => ({
            ...previous,
            [name]:
                type === "checkbox" ? checked : value})); }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        try {
            setLoading(true);
            await addCar(formData);
            alert("✅ Car added successfully.");
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
        <div className="add-car-overlay">

            <div className="add-car-container">

                <h2> Add New Car </h2>
                {
                    error &&
                    <p className="error"> {error} </p>
                }
                <form onSubmit={handleSubmit}>

                    <input type="text" name="brand" placeholder="Brand"
                        value={formData.brand} onChange={handleChange} required />

                    <input type="text" name="model" placeholder="Model"
                        value={formData.model} onChange={handleChange} required />

                    <input type="number" name="year" placeholder="Year"
                        value={formData.year} onChange={handleChange} required />

                    <input type="text" name="location" placeholder="Location" value={formData.location}
                        onChange={handleChange} required />

                    <input type="number" name="pricePerDay" placeholder="Price Per Day"
                        value={formData.pricePerDay} onChange={handleChange} required/>

                    <textarea name="description" placeholder="Description" rows="4"
                        value={formData.description} onChange={handleChange} />

                    <input type="text" name="imageUrl" placeholder="Image URL"
                        value={formData.imageUrl} onChange={handleChange} />

                    <label className="checkbox">
                        <input type="checkbox" name="isAvailable"
                            checked={formData.isAvailable} onChange={handleChange}/>
                        Available
                    </label>

                    <div className="button-group">
                        <button type="submit" disabled={loading} >
                            {
                                loading ? "Adding..." : "Add Car"
                            }
                        </button>
                        <button type="button" className="cancel-btn" onClick={onClose}> Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default AddCar;