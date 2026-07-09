import "./MaintenanceCard.css";

function MaintenanceCard({

    maintenanceList

}) {

    const total = maintenanceList.length;

    const scheduled = maintenanceList.filter(

        item => item.status === "Scheduled"

    ).length;

    const inProgress = maintenanceList.filter(

        item => item.status === "InProgress"

    ).length;

    const completed = maintenanceList.filter(

        item => item.status === "Completed"

    ).length;

    return (

        <div className="maintenance-cards">

            <div className="maintenance-card">

                <h3>

                    Total Records

                </h3>

                <h2>

                    {total}

                </h2>

            </div>

            <div className="maintenance-card">

                <h3>

                    Scheduled

                </h3>

                <h2>

                    {scheduled}

                </h2>

            </div>

            <div className="maintenance-card">

                <h3>

                    In Progress

                </h3>

                <h2>

                    {inProgress}

                </h2>

            </div>

            <div className="maintenance-card">

                <h3>

                    Completed

                </h3>

                <h2>

                    {completed}

                </h2>

            </div>

        </div>

    );

}

export default MaintenanceCard;