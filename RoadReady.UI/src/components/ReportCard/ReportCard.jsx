import "./ReportCard.css";

function ReportCard({

    title,

    value

}) {

    return (

        <div className="report-card">

            <h3 className="report-card-title">

                {title}

            </h3>

            <h2 className="report-card-value">

                {value}

            </h2>

        </div>

    );

}

export default ReportCard;