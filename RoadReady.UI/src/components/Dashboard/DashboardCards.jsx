import "./DashboardCards.css";


const DashboardCards = ({ dashboard }) => {
  return (
    <div className="dashboard-cards">

      <div className="dashboard-card pickup-card">
        {/* <div className="card-icon">
          <FaClipboardCheck />
        </div> */}

        <div className="card-content">
          <h3>Today's Pickups</h3>
          <h2>{dashboard?.todayPickups ?? 0}</h2>
        </div>
      </div>

      <div className="dashboard-card return-card">
        {/* <div className="card-icon">
          <FaCarSide />
        </div> */}

        <div className="card-content">
          <h3>Today's Returns</h3>
          <h2>{dashboard?.todayReturns ?? 0}</h2>
        </div>
      </div>

      <div className="dashboard-card rented-card">
        {/* <div className="card-icon">
          <FaCar />
        </div> */}

        <div className="card-content">
          <h3>Cars Rented</h3>
          <h2>{dashboard?.carsCurrentlyRented ?? 0}</h2>
        </div>
      </div>

      <div className="dashboard-card maintenance-card">
        {/* <div className="card-icon">
          <FaTools />
        </div> */}

        <div className="card-content">
          <h3>Under Maintenance</h3>
          <h2>{dashboard?.carsUnderMaintenance ?? 0}</h2>
        </div>
      </div>

    </div>
  );
};

export default DashboardCards;