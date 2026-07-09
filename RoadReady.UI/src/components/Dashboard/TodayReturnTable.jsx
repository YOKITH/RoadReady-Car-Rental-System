import "./TodayReturnTable.css";

const TodayReturnTable = ({
  returns = [],
  onCheckOut,
}) => {
  return (
    <div className="return-container">

      <div className="return-header">
        <h2>Today's Returns</h2>

        <span className="return-count">
          Total : {returns.length}
        </span>
      </div>

      <div className="return-table-wrapper">

        <table className="return-table">

          <thead>

            <tr>
              <th>Reservation ID</th>
              <th>Customer</th>
              <th>Car</th>
              <th>Return Date</th>
              <th>Location</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {returns.length === 0 ? (

              <tr>
                <td
                  colSpan="7"
                  className="no-data"
                >
                  No returns scheduled for today.
                </td>
              </tr>

            ) : (

              returns.map((item) => (

                <tr key={item.reservationId}>

                  <td>
                    #{item.reservationId}
                  </td>

                  <td>
                    {item.customerName}
                  </td>

                  <td>
                    {item.carName}
                  </td>

                  <td>
                    {new Date(
                      item.returnDate
                    ).toLocaleString()}
                  </td>

                  <td>
                    {item.returnLocation}
                  </td>

                  <td>

    <span
        className={`return-table-status ${
            item.isCheckedOut
                ? "checked-out"
                : "active"
        }`}
    >
        {item.isCheckedOut
            ? "Checked-Out"
            : item.reservationStatus}
    </span>

</td>

                  <td>

                    {!item.isCheckedOut ? (

                      <button
                        className="checkout-btn"
                        onClick={() =>
                          onCheckOut(item)
                        }
                      >
                        Check-Out
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

export default TodayReturnTable;