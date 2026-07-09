// import { useEffect, useState } from "react";

// import { getAllMaintenance } from "../../api/maintenanceApi";

// import MaintenanceCard from "../../components/MaintenanceCard/MaintenanceCard";
// import MaintenanceForm from "../../components/MaintenanceForm/MaintenanceForm";
// import MaintenanceTable from "../../components/Maintenance/MaintenanceTable";

// import "./Maintenance.css";

// function Maintenance() {

//     const [maintenanceList, setMaintenanceList] = useState([]);

//     const [selectedMaintenance, setSelectedMaintenance] = useState(null);

//     const [showForm, setShowForm] = useState(false);

//     const [loading, setLoading] = useState(true);

//     const [error, setError] = useState("");

//     useEffect(() => {

//         loadMaintenance();

//     }, []);

//     async function loadMaintenance() {

//         try {

//             setLoading(true);

//             const response = await getAllMaintenance();

//             setMaintenanceList(response);

//         }

//         catch (error) {

//             setError(error.message);

//         }

//         finally {

//             setLoading(false);

//         }

//     }

//     function handleAddMaintenance() {

//         setSelectedMaintenance(null);

//         setShowForm(true);

//     }

//     function handleEditMaintenance(maintenance) {

//         setSelectedMaintenance(maintenance);

//         setShowForm(true);

//     }

//     function handleCloseForm() {

//         setShowForm(false);

//         loadMaintenance();

//     }

//     return (

//         <div className="maintenance-page">

//             <div className="maintenance-header">

//                 <h1>

//                     Vehicle Maintenance

//                 </h1>

//                 <button

//                     className="add-maintenance-btn"

//                     onClick={handleAddMaintenance}

//                 >

//                     + Add Maintenance

//                 </button>

//             </div>

//             <MaintenanceCard

//                 maintenanceList={maintenanceList}

//             />

//             {

//                 loading

//                     ?

//                     <p>

//                         Loading maintenance records...

//                     </p>

//                     :

//                     error

//                         ?

//                         <p className="error">

//                             {error}

//                         </p>

//                         :

//                         <MaintenanceTable

//                             maintenanceList={maintenanceList}

//                             onEdit={handleEditMaintenance}

//                         />

//             }

//             {

//                 showForm &&

//                 <MaintenanceForm

//                     maintenance={selectedMaintenance}

//                     onClose={handleCloseForm}

//                 />

//             }

//         </div>

//     );

// }

// export default Maintenance;