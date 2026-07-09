import { useState } from "react";
import "./CheckInForm.css";
import { createCheckIn } from "../../api/checkInApi";

const CheckInForm = ({
  reservation,
  rentalAgentId,
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    reservationId: reservation?.reservationId || "",
    rentalAgentId: rentalAgentId,
    odometerStart: "",
    fuelLevel: "Full",
    keyHandedOver: true,
    remarks: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.odometerStart) {
      alert("Please enter odometer reading.");
      return;
    }

    if (!formData.fuelLevel) {
      alert("Please select fuel level.");
      return;
    }

    try {
      setLoading(true);

      await createCheckIn(formData);

      alert("✅Vehicle checked-in successfully.");

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
        "Unable to complete check-in."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkin-form-container">

      <h2>Vehicle Check-In</h2>

      <form
        className="checkin-form"
        onSubmit={handleSubmit}
      >

        {/* Reservation */}

        <div className="form-group">
          <label>Reservation ID</label>

          <input
            type="text"
            value={reservation?.reservationId || ""}
            readOnly
          />
        </div>

        {/* Customer */}

        <div className="form-group">
          <label>Customer</label>

          <input
            type="text"
            value={reservation?.customerName || ""}
            readOnly
          />
        </div>

        {/* Car */}

        <div className="form-group">
          <label>Car</label>

          <input
            type="text"
            value={reservation?.carName || ""}
            readOnly
          />
        </div>

        {/* Odometer */}

        <div className="form-group">
          <label>Odometer Start</label>

          <input
            type="number"
            name="odometerStart"
            value={formData.odometerStart}
            onChange={handleChange}
            placeholder="Enter odometer reading"
            required
          />
        </div>

        {/* Fuel Level */}

        <div className="form-group">
          <label>Fuel Level</label>

          <select
            name="fuelLevel"
            value={formData.fuelLevel}
            onChange={handleChange}
          >
            <option value="Empty">Empty</option>
            <option value="Quarter">Quarter</option>
            <option value="Half">Half</option>
            <option value="Three Quarters">
              Three Quarters
            </option>
            <option value="Full">Full</option>
          </select>
        </div>

        {/* Key */}

        <div className="checkbox-group">

          <input
            id="keyHandedOver"
            type="checkbox"
            name="keyHandedOver"
            checked={formData.keyHandedOver}
            onChange={handleChange}
          />

          <label htmlFor="keyHandedOver">
            Key Handed Over
          </label>

        </div>

        {/* Remarks */}

        <div className="form-group">

          <label>Remarks</label>

          <textarea
            rows="4"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Additional remarks..."
          />

        </div>

        {/* Buttons */}

        <div className="button-group">

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading
              ? "Checking-In..."
              : "Complete Check-In"}
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
};

export default CheckInForm;