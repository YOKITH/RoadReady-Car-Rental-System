import { useEffect, useState } from "react";

import { getAllCars } from "../../api/carApi";

import CarTable from "../../components/CarTable/CarTable";
import AddCar from "../../components/AddCar/AddCar";
import EditCar from "../../components/EditCar/EditCar";
import DeleteCar from "../../components/DeleteCar/DeleteCar";

import "./ManageCars.css";

function ManageCars() {

    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);

    const [showAddCar, setShowAddCar] = useState(false);
    const [showEditCar, setShowEditCar] = useState(false);
    const [showDeleteCar, setShowDeleteCar] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadCars();
    }, []);

    async function loadCars() {

        try {

            setLoading(true);

            const response = await getAllCars();

            setCars(response);

            setError("");

        }

        catch (error) {

            setError(error.message);

        }

        finally {

            setLoading(false);

        }

    }

    function handleAddCar() {

        setShowAddCar(true);

    }

    function handleEditCar(car) {

        setSelectedCar(car);

        setShowEditCar(true);

    }

    function handleDeleteCar(car) {

        setSelectedCar(car);

        setShowDeleteCar(true);

    }

    return (

        <div className="manage-cars-page">

            {/* Header */}

            <div className="manage-cars-header">

                <div>

                    <h1>Manage Cars</h1>

                    <p>
                        Manage your fleet, availability and pricing.
                    </p>

                </div>

                <button
                    className="add-button"
                    onClick={handleAddCar}
                >
                    <span>＋</span>
                    Add Car
                </button>

            </div>

            {/* Table */}

            <div className="table-container">

                {

                    loading ? (

                        <div className="loading">

                            Loading Cars...

                        </div>

                    )

                    :

                    error ? (

                        <div className="error">

                            {error}

                        </div>

                    )

                    :

                    (

                        <CarTable
                            cars={cars}
                            onEdit={handleEditCar}
                            onDelete={handleDeleteCar}
                        />

                    )

                }

            </div>

            {/* Add Car Modal */}

            {

                showAddCar && (

                    <AddCar
                        onClose={() => {

                            setShowAddCar(false);

                            loadCars();

                        }}
                    />

                )

            }

            {/* Edit Car Modal */}

            {

                showEditCar && (

                    <EditCar
                        car={selectedCar}
                        onClose={() => {

                            setShowEditCar(false);

                            loadCars();

                        }}
                    />

                )

            }

            {/* Delete Car Modal */}

            {

                showDeleteCar && (

                    <DeleteCar
                        car={selectedCar}
                        onClose={() => {

                            setShowDeleteCar(false);

                            loadCars();

                        }}
                    />

                )

            }

        </div>

    );

}

export default ManageCars;