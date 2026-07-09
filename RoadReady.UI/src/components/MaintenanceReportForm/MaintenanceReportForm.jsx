import { useState } from "react";

import { submitMaintenanceReport } from "../../api/rentalAgentApi";

import "./MaintenanceReportForm.css";

function MaintenanceReportForm({

    onClose

}) {

    const [formData, setFormData] = useState({

        carId: "",

        issue: "",

        description: "",

        estimatedCost: "",

        status: "Pending"

    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    function handleChange(event) {

        const {

            name,

            value

        } = event.target;

        setFormData({

            ...formData,

            [name]: value

        });

    }

    async function handleSubmit(event) {

        event.preventDefault();

        setError("");

        try {

            setLoading(true);

            await submitMaintenanceReport(formData);

            alert("Maintenance report submitted successfully.");

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

        <div className="maintenance-overlay">

            <div className="maintenance-form">

                <h2>

                    Report Maintenance

                </h2>

                {

                    error &&

                    <p className="error">

                        {error}

                    </p>

                }

                <form onSubmit={handleSubmit}>

                    <input

                        type="number"

                        name="carId"

                        placeholder="Car ID"

                        value={formData.carId}

                        onChange={handleChange}

                        required

                    />

                    <input

                        type="text"

                        name="issue"

                        placeholder="Issue"

                        value={formData.issue}

                        onChange={handleChange}

                        required

                    />

                    <textarea

                        name="description"

                        placeholder="Description"

                        rows="4"

                        value={formData.description}

                        onChange={handleChange}

                        required

                    />

                    <input

                        type="number"

                        name="estimatedCost"

                        placeholder="Estimated Cost"

                        value={formData.estimatedCost}

                        onChange={handleChange}

                        required

                    />

                    <select

                        name="status"

                        value={formData.status}

                        onChange={handleChange}

                    >

                        <option value="Pending">

                            Pending

                        </option>

                        <option value="In Progress">

                            In Progress

                        </option>

                        <option value="Completed">

                            Completed

                        </option>

                    </select>

                    <div className="button-group">

                        <button

                            type="submit"

                            disabled={loading}

                        >

                            {

                                loading

                                    ? "Submitting..."

                                    : "Submit Report"

                            }

                        </button>

                        <button

                            type="button"

                            className="cancel-btn"

                            onClick={onClose}

                        >

                            Cancel

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default MaintenanceReportForm;