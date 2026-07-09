import { useState } from "react";

import "./CarFilter.css";

function CarFilter({ onFilter }) {

    const [filters, setFilters] = useState({
        availability: "All",
        location: "All",
        sort: "Default"
    });

    const handleChange = (event) => {

        const { name, value } = event.target;

        const updatedFilters = {
            ...filters,
            [name]: value
        };

        setFilters(updatedFilters);

        onFilter(updatedFilters);

    };

    return (

        <div className="car-filter">

            {/* Availability */}

            <div className="filter-group">

                <label>
                    Availability
                </label>

                <select
                    name="availability"
                    value={filters.availability}
                    onChange={handleChange}
                >

                    <option value="All">
                        All
                    </option>

                    <option value="Available">
                        Available
                    </option>

                    <option value="Unavailable">
                        Unavailable
                    </option>

                </select>

            </div>

            {/* Location */}

            <div className="filter-group">

                <label>
                    Location
                </label>

                <select
                    name="location"
                    value={filters.location}
                    onChange={handleChange}
                >

                    <option value="All">
                        All
                    </option>

                    <option value="Coimbatore">
                        Coimbatore
                    </option>

                    <option value="Chennai">
                        Chennai
                    </option>

                    <option value="Bangalore">
                        Bangalore
                    </option>

                    <option value="Hyderabad">
                        Hyderabad
                    </option>

                </select>

            </div>

            {/* Sort */}

            <div className="filter-group">

                <label>
                    Sort By
                </label>

                <select
                    name="sort"
                    value={filters.sort}
                    onChange={handleChange}
                >

                    <option value="Default">
                        Default
                    </option>

                    <option value="PriceLowToHigh">
                        Price : Low to High
                    </option>

                    <option value="PriceHighToLow">
                        Price : High to Low
                    </option>

                    <option value="Newest">
                        Newest
                    </option>

                </select>

            </div>

        </div>

    );

}

export default CarFilter;