import { useEffect, useState } from "react";

import {
    getRevenueReport,
    getReservationReport,
    getTopCarsReport,
    getMonthlyRevenueReport
} from "../../../api/reportsApi";

import RevenueReport from "../../../components/RevenueReport/RevenueReport";
import ReservationReport from "../../../components/ReservationReport/ReservationReport";
import TopCarsReport from "../../../components/TopCarsReport/TopCarsReport";
import MonthlyRevenueChart from "../../../components/MonthlyRevenueChart/MonthlyRevenueChart";
//import ReportFilters from "../../../components/ReportFilters/ReportFilters";
//import ExportButtons from "../../../components/ExportButtons/ExportButtons";

import "./Reports.css";

function Reports() {

    const [revenue, setRevenue] = useState(null);

    const [reservationReport, setReservationReport] = useState(null);

    const [topCars, setTopCars] = useState([]);

    const [monthlyRevenue, setMonthlyRevenue] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        window.scrollTo(0, 0);

        loadReports();

    }, []);

    async function loadReports() {

        try {

            setLoading(true);

            const [

                revenueResponse,

                reservationResponse,

                topCarsResponse,

                monthlyRevenueResponse

            ] = await Promise.all([

                getRevenueReport(),

                getReservationReport(),

                getTopCarsReport(),

                getMonthlyRevenueReport()

            ]);

            setRevenue(revenueResponse);

            setReservationReport(reservationResponse);

            console.log(topCarsResponse);

            setTopCars(topCarsResponse);

            setMonthlyRevenue(monthlyRevenueResponse);

        }

        catch (error) {

            setError(error.message);

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <div className="reports-page">

                <h2>

                    Loading Reports...

                </h2>

            </div>

        );

    }

    if (error) {

        return (

            <div className="reports-page">

                <h2>

                    {error}

                </h2>

            </div>

        );

    }

    return (

        <div className="reports-page">

            <div className="reports-header">

                <h1>

                    Reports & Analytics

                </h1>

                <p>

                    Analyze revenue, reservations and vehicle performance.

                </p>

            </div>

            {/* <ReportFilters /> */}

            <div className="reports-grid">

                <RevenueReport
                    revenue={revenue}
                />

                <ReservationReport
                    report={reservationReport}
                />

            </div>

            <TopCarsReport
                cars={topCars}
            />

            <MonthlyRevenueChart
                data={monthlyRevenue}
            />

            {/* <ExportButtons /> */}

        </div>

    );

}

export default Reports;