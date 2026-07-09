import { useMemo, useState } from "react";
import "./CheckOutTable.css";

const CheckOutTable = ({ checkOuts = [] }) => {
  const [search, setSearch] = useState("");

  const filteredCheckOuts = useMemo(() => {
    if (!search.trim()) return checkOuts;

    return checkOuts.filter((item) =>
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
  }, [search, checkOuts]);

  return (
    <div className="checkout-table-container">

      {/* Header */}

      <div className="checkout-table-header">

        <h2>Checked-Out Vehicles</h2>

        <input
          type="text"
          placeholder="Search reservation, customer or car..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* Table */}

      <div className="checkout-table-wrapper">

        <table className="checkout-table">

          <thead>

            <tr>
              <th>Reservation</th>
              <th>Customer</th>
              <th>Car</th>
              <th>Check-Out Time</th>
              <th>Fuel Level</th>
              <th>Odometer</th>
              <th>Damage</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {filteredCheckOuts.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  className="no-data"
                >
                  No checked-out vehicles found.
                </td>

              </tr>

            ) : (

              filteredCheckOuts.map((item) => (

                <tr key={item.checkOutId}>

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
                      item.checkOutDateTime
                    ).toLocaleString()}
                  </td>

                  <td>
                    {item.fuelLevel}
                  </td>

                  <td>
                    {item.odometerEnd} km
                  </td>

                  <td>

                    {item.damageFound ? (

                      <span className="damage-yes">
                        Damage Found
                      </span>

                    ) : (

                      <span className="damage-no">
                        No Damage
                      </span>

                    )}

                  </td>

                  <td> <span className="checkout-status checkedout">
        Checked-Out
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

export default CheckOutTable;