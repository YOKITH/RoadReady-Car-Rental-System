import "./VehicleStatus.css";

function VehicleStatus({

    title,

    value

}) {

    return (

        <div className="vehicle-status-card">

            <h3>

                {title}

            </h3>

            <h2>

                {value}

            </h2>

        </div>

    );

}

export default VehicleStatus;