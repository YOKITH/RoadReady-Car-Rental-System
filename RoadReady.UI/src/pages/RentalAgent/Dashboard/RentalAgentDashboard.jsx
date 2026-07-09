import { useEffect, useState } from "react";

import "./RentalAgentDashboard.css";

import DashboardCards from "../../../components/Dashboard/DashboardCards";
import TodayPickupTable from "../../../components/Dashboard/TodayPickupTable";
import TodayReturnTable from "../../../components/Dashboard/TodayReturnTable";
import CheckInForm from "../../../components/CheckIn/CheckInForm";
import CheckOutForm from "../../../components/CheckOut/CheckOutForm";

import {
  getDashboard,
  getTodayPickups,
  getTodayReturns,
} from "../../../api/rentalAgentApi";

const RentalAgentDashboard = () => {
  const [dashboard, setDashboard] = useState({});
  const [pickups, setPickups] = useState([]);
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===========================================
  // Check-In States
  // ===========================================

  const [showCheckInForm, setShowCheckInForm] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  // ===========================================
  // Check-Out States
  // ===========================================

  const [showCheckOutForm, setShowCheckOutForm] = useState(false);
  const [selectedReturnReservation, setSelectedReturnReservation] =
    useState(null);

  // ===========================================
  // Load Dashboard
  // ===========================================

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const dashboardData = await getDashboard();
      const pickupData = await getTodayPickups();
      const returnData = await getTodayReturns();

      setDashboard(dashboardData);
      setPickups(pickupData);
      setReturns(returnData);
    } catch (error) {
      console.error(error);
      alert("Unable to load Rental Agent Dashboard.");
    } finally {
      setLoading(false);
    }
  };

  // ===========================================
  // Initial Load
  // ===========================================

  useEffect(() => {
    loadDashboard();
  }, []);

  // ===========================================
  // Check-In
  // ===========================================

  const handleCheckIn = (reservation) => {
    setSelectedReservation(reservation);
    setShowCheckInForm(true);
  };

  const handleCheckInSuccess = () => {
    setShowCheckInForm(false);
    setSelectedReservation(null);
    loadDashboard();
  };

  const handleCheckInCancel = () => {
    setShowCheckInForm(false);
    setSelectedReservation(null);
  };

  // ===========================================
  // Check-Out
  // ===========================================

  const handleCheckOut = (reservation) => {
    setSelectedReturnReservation(reservation);
    setShowCheckOutForm(true);
  };

  const handleCheckOutSuccess = () => {
    setShowCheckOutForm(false);
    setSelectedReturnReservation(null);
    loadDashboard();
  };

  const handleCheckOutCancel = () => {
    setShowCheckOutForm(false);
    setSelectedReturnReservation(null);
  };

  // ===========================================
  // Loading
  // ===========================================

  if (loading) {
    return (
      <div className="dashboard-loading">
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="rental-dashboard">

      {/* Header */}

      <div className="dashboard-header">
        <div>
          <h1>Rental Agent Dashboard</h1>
          <p>Welcome to the Rental Agent Management Panel</p>
        </div>
      </div>

      {/* Dashboard Cards */}

      <DashboardCards dashboard={dashboard} />

      {/* Today's Pickups */}

      <TodayPickupTable
        pickups={pickups}
        onCheckIn={handleCheckIn}
      />

      {/* Check-In Form */}

      {showCheckInForm && (
        <CheckInForm
          reservation={selectedReservation}
          rentalAgentId={1}
          onSuccess={handleCheckInSuccess}
          onCancel={handleCheckInCancel}
        />
      )}

      {/* Today's Returns */}

      <TodayReturnTable
        returns={returns}
        onCheckOut={handleCheckOut}
      />

      {/* Check-Out Form */}

      {showCheckOutForm && (
        <CheckOutForm
          reservation={selectedReturnReservation}
          rentalAgentId={1}
          onSuccess={handleCheckOutSuccess}
          onCancel={handleCheckOutCancel}
        />
      )}

    </div>
  );
};

export default RentalAgentDashboard;