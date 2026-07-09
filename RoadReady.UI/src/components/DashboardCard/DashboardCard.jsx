import "./DashboardCard.css";

function DashboardCard({

    title,

    value,

    color = "#2563eb"

}) {

    return (

        <div className="dashboard-card">

            <h3>

                {title}

            </h3>

            <h2
                style={{
                    color: color
                }}
            >

                {value}

            </h2>

        </div>

    );

}

export default DashboardCard;