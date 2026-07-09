import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./Maintenance.css";

import MaintenanceForm from "../../../components/Maintenance/MaintenanceForm";
import MaintenanceTable from "../../../components/Maintenance/MaintenanceTable";
import CompleteMaintenanceModal from "../../../components/Maintenance/CompleteMaintenanceModal";

import {
    getAllMaintenanceReports
} from "../../../api/maintenanceApi";

const Maintenance = () => {

    const location = useLocation();

    // Car passed from Dashboard
    const car = location.state?.car || null;

    // Replace with logged-in Rental Agent ID
    const rentalAgentId = 1;

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);

    // ===========================================
    // Load Maintenance Reports
    // ===========================================

    const loadReports = async () => {

        try {

            setLoading(true);

            const response = await getAllMaintenanceReports();

            setReports(response);

        } catch (error) {

            console.error(error);

            alert("Unable to load maintenance reports.");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadReports();

    }, []);

    // ===========================================
    // Open Maintenance Form
    // ===========================================

    const handleAddMaintenance = () => {

        if (!car) {

            alert("Please select a vehicle from the Dashboard before creating a maintenance report.");

            return;

        }

        setShowForm(true);

    };

    // ===========================================
    // Form Success
    // ===========================================

    const handleFormSuccess = () => {

        setShowForm(false);

        loadReports();

    };

    // ===========================================
    // Cancel Form
    // ===========================================

    const handleCancel = () => {

        setShowForm(false);

    };

    // ===========================================
    // Complete Maintenance
    // ===========================================

    const handleComplete = (report) => {

        setSelectedReport(report);

    };

    // ===========================================
    // Modal Success
    // ===========================================

    const handleModalSuccess = () => {

        setSelectedReport(null);

        loadReports();

    };

    // ===========================================
    // Loading
    // ===========================================

    if (loading) {

        return (

            <div className="maintenance-loading">

                <h2>Loading Maintenance Reports...</h2>

            </div>

        );

    }

    // ===========================================
    // UI
    // ===========================================

    return (

        <div className="maintenance-page">

            {/* Header */}

            <div className="page-header">

                <div>

                    <h1>Vehicle Maintenance</h1>

                    <p>
                        Manage maintenance reports and vehicle servicing.
                    </p>

                </div>

                <div className="header-buttons">

                    <button
                        className="add-btn"
                        onClick={handleAddMaintenance}
                    >
                        + Add New Maintenance
                    </button>

                    <button
                        className="refresh-btn"
                        onClick={loadReports}
                    >
                        Refresh
                    </button>

                </div>

            </div>

            {/* Maintenance Form */}

            {showForm && car && (

                <MaintenanceForm
                    car={car}
                    rentalAgentId={rentalAgentId}
                    onSuccess={handleFormSuccess}
                    onCancel={handleCancel}
                />

            )}

            {/* Maintenance Reports Table */}

            <MaintenanceTable
                reports={reports}
                onComplete={handleComplete}
            />

            {/* Complete Maintenance Modal */}

            {selectedReport && (

                <CompleteMaintenanceModal
                    report={selectedReport}
                    onClose={() => setSelectedReport(null)}
                    onSuccess={handleModalSuccess}
                />

            )}

        </div>

    );

};

export default Maintenance;