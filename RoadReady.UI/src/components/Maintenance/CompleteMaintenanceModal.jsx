import { useState } from "react";
import "./CompleteMaintenanceModal.css";
import { completeMaintenance } from "../../api/maintenanceApi";

const CompleteMaintenanceModal = ({ report, onClose, onSuccess }) => {
  const [completionRemarks, setCompletionRemarks] = useState("");
  const [loading, setLoading] = useState(false);

  if (!report) return null;

  const handleComplete = async () => {
    if (!completionRemarks.trim()) {
      alert("Please enter completion remarks.");
      return;
    }

    try {
      setLoading(true);

      await completeMaintenance(report.reportId, {
        completionRemarks,
      });

      alert("Maintenance completed successfully.");

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Unable to complete maintenance."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="maintenance-modal">
        <h2>Complete Maintenance</h2>

        <div className="modal-details">
          <p><strong>Report ID :</strong> #{report.reportId}</p>
          <p><strong>Vehicle :</strong> {report.carName}</p>
          <p><strong>Registration :</strong> {report.registrationNumber}</p>
          <p><strong>Maintenance Type :</strong> {report.maintenanceType}</p>
          <p><strong>Priority :</strong> {report.priority}</p>
          <p><strong>Estimated Cost :</strong> ₹ {report.estimatedCost}</p>
        </div>

        <div className="form-group">
          <label>Completion Remarks</label>

          <textarea
            rows="5"
            placeholder="Enter maintenance completion remarks..."
            value={completionRemarks}
            onChange={(e) => setCompletionRemarks(e.target.value)}
          />
        </div>

        <div className="modal-buttons">
          <button
            className="complete-btn"
            onClick={handleComplete}
            disabled={loading}
          >
            {loading ? "Completing..." : "Complete Maintenance"}
          </button>

          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteMaintenanceModal;