import { useEffect, useState } from "react";

import { getAllCars } from "../../api/carApi";

import CarSearch from "../../components/CarSearch/CarSearch";
import CarFilter from "../../components/CarFilter/CarFilter";
import CarGrid from "../../components/CarGrid/CarGrid";

import fleetBg from "../../Images/fleet-bg.png";

import "./Cars.css";

function Cars() {

    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadCars();
    }, []);

    async function loadCars() {
        try {
            const response = await getAllCars();

            console.log("Cars:", response);

            setCars(response);
            setFilteredCars(response);
        }
        catch (error) {
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    function handleSearch(keyword) {

        if (!keyword.trim()) {
            setFilteredCars(cars);
            return;
        }

        const result = cars.filter(car =>
            car.brand.toLowerCase().includes(keyword.toLowerCase()) ||
            car.model.toLowerCase().includes(keyword.toLowerCase()) ||
            car.location.toLowerCase().includes(keyword.toLowerCase())
        );

        setFilteredCars(result);
    }

    function handleFilter(filters) {

        let result = [...cars];

        // Availability Filter
        if (filters.availability !== "All") {
            result = result.filter(car =>
                filters.availability === "Available"
                    ? car.isAvailable
                    : !car.isAvailable
            );
        }

        // Location Filter
        if (filters.location !== "All") {
            result = result.filter(car =>
                car.location.trim().toLowerCase() ===
                filters.location.trim().toLowerCase()
            );
        }

        // Sorting
        switch (filters.sort) {

            case "PriceLowToHigh":
                result.sort((a, b) => a.pricePerDay - b.pricePerDay);
                break;

            case "PriceHighToLow":
                result.sort((a, b) => b.pricePerDay - a.pricePerDay);
                break;

            case "Newest":
                result.sort((a, b) => b.year - a.year);
                break;

            default:
                break;
        }

        setFilteredCars(result);
    }

    return (

        <div
            className="cars-page"
            style={{
                backgroundImage: `
                    linear-gradient(
                        rgba(15,23,42,0.65),
                        rgba(15,23,42,0.65)
                    ),
                    url(${fleetBg})
                `,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                minHeight: "100vh"
            }}
        >

            <div className="cars-header">
                <h1>Explore Our Fleet</h1>
                <p>Find the perfect vehicle for your next journey.</p>
            </div>

            <div className="cars-toolbar">

                <CarSearch
                    onSearch={handleSearch}
                />

                <CarFilter
                    onFilter={handleFilter}
                />

            </div>

            {loading &&
                <div className="loading">
                    Loading Cars...
                </div>
            }

            {error &&
                <div className="error">
                    {error}
                </div>
            }

            {!loading && !error &&
                <CarGrid
                    cars={filteredCars}
                />
            }

        </div>
    );
}

export default Cars;