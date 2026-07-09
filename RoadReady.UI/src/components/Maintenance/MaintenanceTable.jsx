import { useMemo, useState } from "react";
import "./MaintenanceTable.css";

const MaintenanceTable = ({ reports = [], onComplete }) => {
  const [search, setSearch] = useState("");

  const filteredReports = useMemo(() => {
    if (!search.trim()) return reports;

    return reports.filter(
      (report) =>
        report.reportId.toString().includes(search) ||
        report.carName?.toLowerCase().includes(search.toLowerCase()) ||
        report.registrationNumber
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [search, reports]);

  return (
    <div className="maintenance-table-container">
      <div className="maintenance-table-header">
        <h2>Maintenance Reports</h2>

        <input
          type="text"
          placeholder="Search Report ID, Car or Registration..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="maintenance-table-wrapper">
        <table className="maintenance-table">
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Car</th>
              {/* <th>Registration</th> */}
              <th>Maintenance Type</th>
              <th>Priority</th>
              <th>Estimated Cost</th>
              <th>Reported Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredReports.length === 0 ? (
              <tr>
                <td colSpan="9" className="no-data">
                  No maintenance reports found.
                </td>
              </tr>
            ) : (
              filteredReports.map((report) => (
                <tr key={report.reportId}>
                  <td>#{report.reportId}</td>
                  <td>{report.carName}</td>
                  {/* <td>{report.registrationNumber}</td> */}
                  <td>{report.maintenanceType}</td>

                  <td>
                    <span
                      className={`priority ${report.priority.toLowerCase()}`}
                    >
                      {report.priority}
                    </span>
                  </td>

                  <td>₹ {report.estimatedCost}</td>

                  <td>
                    {new Date(report.reportedDate).toLocaleDateString()}
                  </td>

                  <td>
    <span
        className={`maintenance-status ${
            report.status
                ?.toLowerCase()
                .replace(/\s+/g, "-") || "default"
        }`}
    >
        {report.status}
    </span>
</td>

                  <td>
                    {report.status === "Pending" ? (
                      <button
                        className="complete-btn"
                        onClick={() => onComplete(report)}
                      >
                        Complete
                      </button>
                    ) : (
                      <button className="completed-btn" disabled>
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

export default MaintenanceTable;