import "./TopCarsReport.css";

function TopCarsReport({ cars }) {
    if (!cars || cars.length === 0) {
        return (
            <div className="top-cars-report">
                <h2>Top Booked Cars</h2>
                <p>No booking data available.</p>
            </div>
        );
    }

    return (
        <div className="top-cars-report">
            <h2>Top Booked Cars</h2>

            <table className="top-cars-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Brand</th>
                        <th>Total Bookings</th>
                        <th>Total Revenue</th>
                    </tr>
                </thead>

                <tbody>
                    {cars.map((car, index) => (
                        <tr key={car.carId ?? index}>
                            <td>{index + 1}</td>
                            <td>{car.carName}</td>
                            <td>{car.totalBookings}</td>
                            <td>₹{car.totalRevenue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TopCarsReport;