import { useState } from "react";
import "./CheckOutForm.css";
import { createCheckOut } from "../../api/checkOutApi";

const CheckOutForm = ({
  reservation,
  rentalAgentId,
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    reservationId: reservation?.reservationId || "",
    rentalAgentId: rentalAgentId,
    odometerEnd: "",
    fuelLevel: "Full",
    damageFound: false,
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

    if (!formData.odometerEnd) {
      alert("Please enter odometer reading.");
      return;
    }

    if (!formData.fuelLevel) {
      alert("Please select fuel level.");
      return;
    }

    try {
      setLoading(true);

      await createCheckOut(formData);

      alert("✅Vehicle checked-out successfully.");

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
        "Unable to complete check-out."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-form-container">

      <h2>Vehicle Check-Out</h2>

      <form
        className="checkout-form"
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
          <label>Odometer End</label>

          <input
            type="number"
            name="odometerEnd"
            value={formData.odometerEnd}
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

        {/* Damage */}

        <div className="checkbox-group">

          <input
            id="damageFound"
            type="checkbox"
            name="damageFound"
            checked={formData.damageFound}
            onChange={handleChange}
          />

          <label htmlFor="damageFound">
            Damage Found
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
              ? "Checking-Out..."
              : "Complete Check-Out"}
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

export default CheckOutForm;