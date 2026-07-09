import "./StatusDropdown.css";

function StatusDropdown({

    value,

    onChange

}) {

    function handleChange(event) {

        onChange(event.target.value);

    }

    return (

        <div className="status-dropdown">

            <label>

                Maintenance Status

            </label>

            <select

                value={value}

                onChange={handleChange}

            >

                <option value="Scheduled">

                    Scheduled

                </option>

                <option value="InProgress">

                    In Progress

                </option>

                <option value="Completed">

                    Completed

                </option>

                <option value="Cancelled">

                    Cancelled

                </option>

            </select>

        </div>

    );

}

export default StatusDropdown;