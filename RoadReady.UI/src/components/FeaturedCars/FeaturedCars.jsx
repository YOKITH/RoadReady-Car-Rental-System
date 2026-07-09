import { useEffect, useState } from "react";

import { getAllCars } from "../../api/carApi";

import CarCard from "./CarCard";

import "./FeaturedCars.css";

function FeaturedCars() {

    const [cars, setCars] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadCars();

    }, []);

    async function loadCars() {

        try {

            const response = await getAllCars();

            // Show only the top 4 premium available cars
            const featuredCars = response
                .filter(car => car.isAvailable)
                .sort((a, b) => b.pricePerDay - a.pricePerDay)
                .slice(0, 4);

            setCars(featuredCars);

        }
        catch (error) {

            setError(error.message);

        }
        finally {

            setLoading(false);

        }

    }

    return (

        <section className="featured-cars">

            <div className="section-header">

                <h2>

                    Featured Cars

                </h2>

                <p>

                    Discover our premium collection of rental cars.

                </p>

            </div>

            {

                loading &&

                <h3 className="loading">

                    Loading Cars...

                </h3>

            }

            {

                error &&

                <h3 className="error">

                    {error}

                </h3>

            }

            {

                !loading && !error && (

                    <div className="cars-grid">

                        {

                            cars.map(car => (

                                <CarCard
                                    key={car.carId}
                                    car={car}
                                />

                            ))

                        }

                    </div>

                )

            }

        </section>

    );

}

export default FeaturedCars;