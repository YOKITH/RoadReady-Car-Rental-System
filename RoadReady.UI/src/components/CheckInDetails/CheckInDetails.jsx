import "./CheckInDetails.css";

const CheckInDetails = ({ checkIn, onClose }) => {
  if (!checkIn) return null;

  return (
    <div className="details-overlay">

      <div className="details-modal">

        <div className="details-header">
          <h2>Check-In Details</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="details-body">

          <div className="detail-row">
            <span>Check-In ID</span>
            <p>{checkIn.checkInId}</p>
          </div>

          <div className="detail-row">
            <span>Reservation ID</span>
            <p>{checkIn.reservationId}</p>
          </div>

          <div className="detail-row">
            <span>Rental Agent ID</span>
            <p>{checkIn.rentalAgentId}</p>
          </div>

          <div className="detail-row">
            <span>Customer Name</span>
            <p>{checkIn.customerName}</p>
          </div>

          <div className="detail-row">
            <span>Car Name</span>
            <p>{checkIn.carName}</p>
          </div>

          <div className="detail-row">
            <span>Check-In Date</span>
            <p>
              {new Date(
                checkIn.checkInDateTime
              ).toLocaleString()}
            </p>
          </div>

          <div className="detail-row">
            <span>Odometer Start</span>
            <p>{checkIn.odometerStart} km</p>
          </div>

          <div className="detail-row">
            <span>Fuel Level</span>
            <p>{checkIn.fuelLevel}</p>
          </div>

          <div className="detail-row">
            <span>Vehicle Condition</span>
            <p>{checkIn.vehicleCondition}</p>
          </div>

          <div className="detail-row">
            <span>Notes</span>
            <p>{checkIn.notes || "No Notes"}</p>
          </div>

          <div className="license-section">

            <h3>Driver License</h3>

            <img
              src={`https://localhost:7087${checkIn.driverLicensePhoto}`}
              alt="Driver License"
              className="license-image"
            />

          </div>

        </div>

      </div>

    </div>
  );
};

export default CheckInDetails;