import { useMemo, useState } from "react";
import "./CheckInTable.css";

const CheckInTable = ({ checkIns = [] }) => {
  const [search, setSearch] = useState("");

  const filteredCheckIns = useMemo(() => {
    if (!search.trim()) return checkIns;

    return checkIns.filter((item) =>
      item.customerName
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      item.carName
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      item.reservationId
        .toString()
        .includes(search)
    );
  }, [search, checkIns]);

  return (
    <div className="checkin-table-container">

      <div className="checkin-table-header">

        <h2>Checked-In Vehicles</h2>

        <input
          type="text"
          placeholder="Search reservation, customer or car..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="checkin-table-wrapper">

        <table className="checkin-table">

          <thead>

            <tr>
              <th>Reservation</th>
              <th>Customer</th>
              <th>Car</th>
              <th>Check-In Time</th>
              <th>Fuel Level</th>
              <th>Odometer</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {filteredCheckIns.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  className="no-data"
                >
                  No checked-in vehicles found.
                </td>

              </tr>

            ) : (

              filteredCheckIns.map((item) => (

                <tr key={item.checkInId}>

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
                      item.checkInDateTime
                    ).toLocaleString()}
                  </td>

                  <td>
                    {item.fuelLevel}
                  </td>

                  <td>
                    {item.odometerStart} km
                  </td>

                  <td>
    <span className="checkin-table-status checked-in">
        Checked-In
    </span>
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

export default CheckInTable;