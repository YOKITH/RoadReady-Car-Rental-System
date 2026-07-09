import "./CheckOutDetails.css";

const CheckOutDetails = ({ checkOut, onClose }) => {
  if (!checkOut) return null;

  return (
    <div className="details-overlay">

      <div className="details-modal">

        <div className="details-header">
          <h2>Check-Out Details</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="details-body">

          <div className="detail-row">
            <span>Check-Out ID</span>
            <p>{checkOut.checkOutId}</p>
          </div>

          <div className="detail-row">
            <span>Reservation ID</span>
            <p>{checkOut.reservationId}</p>
          </div>

          <div className="detail-row">
            <span>Rental Agent ID</span>
            <p>{checkOut.rentalAgentId}</p>
          </div>

          <div className="detail-row">
            <span>Customer Name</span>
            <p>{checkOut.customerName}</p>
          </div>

          <div className="detail-row">
            <span>Car Name</span>
            <p>{checkOut.carName}</p>
          </div>

          <div className="detail-row">
            <span>Check-Out Date</span>
            <p>
              {new Date(
                checkOut.checkOutDateTime
              ).toLocaleString()}
            </p>
          </div>

          <div className="detail-row">
            <span>Odometer End</span>
            <p>{checkOut.odometerEnd} km</p>
          </div>

          <div className="detail-row">
            <span>Fuel Level</span>
            <p>{checkOut.fuelLevel}</p>
          </div>

          <div className="detail-row">
            <span>Damage Found</span>
            <p
              className={
                checkOut.damageFound
                  ? "damage-yes"
                  : "damage-no"
              }
            >
              {checkOut.damageFound ? "Yes" : "No"}
            </p>
          </div>

          {checkOut.damageFound && (
            <div className="detail-row">
              <span>Damage Description</span>
              <p>{checkOut.damageDescription}</p>
            </div>
          )}

          <div className="detail-row">
            <span>Extra Charges</span>
            <p>₹ {Number(checkOut.extraCharges).toFixed(2)}</p>
          </div>

          <div className="detail-row">
            <span>Notes</span>
            <p>{checkOut.notes || "No Notes"}</p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default CheckOutDetails;