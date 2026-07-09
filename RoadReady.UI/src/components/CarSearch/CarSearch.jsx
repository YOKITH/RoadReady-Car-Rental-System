import { useState } from "react";

import "./CarSearch.css";

function CarSearch({ onSearch }) {

    const [keyword, setKeyword] = useState("");

    const handleChange = (event) => {

        const value = event.target.value;

        setKeyword(value);

        onSearch(value);

    };

    const handleSubmit = (event) => {

        event.preventDefault();

        onSearch(keyword);

    };

    const handleClear = () => {

        setKeyword("");

        onSearch("");

    };

    return (

        <form
            className="car-search"
            onSubmit={handleSubmit}
        >

            <input
                type="text"
                className="search-input"
                placeholder="Search by Brand, Model or Location..."
                value={keyword}
                onChange={handleChange}
            />

            <button
                type="submit"
                className="search-button"
            >
                Search
            </button>

            <button
                type="button"
                className="clear-button"
                onClick={handleClear}
            >
                Clear
            </button>

        </form>

    );

}

export default CarSearch;