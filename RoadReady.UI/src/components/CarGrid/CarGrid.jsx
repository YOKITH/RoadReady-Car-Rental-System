import CarCard from "../CarCard/CarCard";

import "./CarGrid.css";

function CarGrid({ cars }) {

    if (cars.length === 0) {

        return (

            <div className="no-cars">

                <h2>No Cars Found</h2>

                <p>
                    Try changing your search or filter options.
                </p>

            </div>

        );

    }

    return (

        <div className="car-grid">

            {

                cars.map((car) => (

                    <CarCard
                        key={car.carId}
                        car={car}
                    />

                ))

            }

        </div>

    );

}

export default CarGrid;