import "./TodayPickupTable.css";

const TodayPickupTable = ({
  pickups = [],
  onCheckIn,
}) => {
  return (
    <div className="pickup-container">

      <div className="pickup-header">
        <h2>Today's Pickups</h2>

        <span className="pickup-count">
          Total : {pickups.length}
        </span>
      </div>

      <div className="pickup-table-wrapper">

        <table className="pickup-table">

          <thead>

            <tr>
              <th>Reservation ID</th>
              <th>Customer</th>
              <th>Car</th>
              <th>Pickup Date</th>
              <th>Location</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {pickups.length === 0 ? (

              <tr>
                <td
                  colSpan="7"
                  className="no-data"
                >
                  No pickups scheduled for today.
                </td>
              </tr>

            ) : (

              pickups.map((pickup) => (

                <tr key={pickup.reservationId}>

                  <td>
                    #{pickup.reservationId}
                  </td>

                  <td>
                    {pickup.customerName}
                  </td>

                  <td>
                    {pickup.carName}
                  </td>

                  <td>
                    {new Date(
                      pickup.pickupDate
                    ).toLocaleString()}
                  </td>

                  <td>
                    {pickup.pickupLocation}
                  </td>

                  <td>

    <span
    className={`pickup-table-status ${
        pickup.isCheckedIn
            ? "checked-in"
            : "confirmed"
    }`}
>

        {pickup.isCheckedIn
            ? "Checked-In"
            : pickup.reservationStatus}

    </span>

</td>

                  <td>

                    {!pickup.isCheckedIn ? (

                      <button
                        className="checkin-btn"
                        onClick={() =>
                          onCheckIn(pickup)
                        }
                      >
                        Check-In
                      </button>

                    ) : (

                      <button
                        className="completed-btn"
                        disabled
                      >
                        Completed
                      </button>

                    )}

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default TodayPickupTable;