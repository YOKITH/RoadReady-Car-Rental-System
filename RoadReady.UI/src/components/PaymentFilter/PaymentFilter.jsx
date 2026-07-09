import "./PaymentFilter.css";

function PaymentFilter({

    onFilter

}) {

    function handleChange(event) {

        onFilter(event.target.value);

    }

    return (

        <div className="payment-filter">

            <label>

                Sort By

            </label>

            <select
                onChange={handleChange}
                defaultValue="Newest"
            >

                <option value="Newest">

                    Latest

                </option>

                <option value="Oldest">

                    Oldest 

                </option>

            </select>

        </div>

    );

}

export default PaymentFilter;