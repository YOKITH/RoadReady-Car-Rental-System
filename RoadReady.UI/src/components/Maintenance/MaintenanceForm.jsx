import { useState } from "react";
import "./MaintenanceForm.css";
import { createMaintenanceReport } from "../../api/maintenanceApi";

const MaintenanceForm = ({ car, rentalAgentId, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    carId: car?.carId || "",
    reportedBy: rentalAgentId,
    maintenanceType: "General Service",
    priority: "Medium",
    estimatedCost: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.description.trim()) {
      alert("Description is required.");
      return;
    }

    if (!formData.estimatedCost) {
      alert("Estimated cost is required.");
      return;
    }

    try {
      setLoading(true);

      await createMaintenanceReport(formData);

      alert("Maintenance Report Created Successfully.");

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Unable to create maintenance report."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="maintenance-form-container">
      <h2>Report Vehicle Maintenance</h2>

      <form className="maintenance-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Vehicle</label>

          <input
            type="text"
            value={`${car?.brand || ""} ${car?.model || ""}`}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Registration Number</label>

          <input
            type="text"
            value={car?.registrationNumber || ""}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Maintenance Type</label>

          <select
            name="maintenanceType"
            value={formData.maintenanceType}
            onChange={handleChange}
          >
            <option value="General Service">General Service</option>
            <option value="Oil Change">Oil Change</option>
            <option value="Engine Repair">Engine Repair</option>
            <option value="Brake Service">Brake Service</option>
            <option value="Tyre Replacement">Tyre Replacement</option>
            <option value="Battery Replacement">Battery Replacement</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Priority</label>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="form-group">
          <label>Estimated Cost</label>

          <input
            type="number"
            name="estimatedCost"
            placeholder="Enter estimated cost"
            value={formData.estimatedCost}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>

          <textarea
            rows="5"
            name="description"
            placeholder="Describe the maintenance issue..."
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="button-group">
          <button
            className="submit-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Report"}
          </button>

          <button
            className="cancel-btn"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default MaintenanceForm;