import "./WhyChooseUs.css";

function WhyChooseUs() {

    const features = [

        {
            icon: "🚗",
            title: "Premium Fleet",
            description:
                "Choose from a wide range of well-maintained premium vehicles for every journey."
        },

        {
            icon: "💰",
            title: "Affordable Pricing",
            description:
                "Transparent pricing with no hidden charges and flexible rental plans."
        },

        {
            icon: "🔒",
            title: "Secure Payments",
            description:
                "Fast and secure online payment system with trusted payment gateways."
        },

        {
            icon: "📍",
            title: "Multiple Locations",
            description:
                "Pick up and drop off your vehicle from multiple convenient locations."
        },

        {
            icon: "🛠️",
            title: "24/7 Support",
            description:
                "Our customer support team is available around the clock to assist you."
        },

        {
            icon: "⭐",
            title: "Trusted by Customers",
            description:
                "Thousands of satisfied customers trust RoadReady for their travel needs."
        },

        {
            icon: "📅",
            title: "Easy Booking",
            description:
                "Reserve your preferred vehicle in just a few clicks with our simple and hassle-free booking process."
        },

        {
            icon: "🛡️",
            title: "Verified Vehicles",
            description:
                "Every vehicle is thoroughly inspected and maintained to ensure a safe, reliable, and comfortable journey."
        }

    ];

    return (

        <section className="why-choose-us">

            <div className="section-header">

                <h2>
                    Why Choose RoadReady?
                </h2>

                <p>
                    Experience a smarter, safer, and more convenient way to rent vehicles.
                </p>

            </div>

            <div className="features-grid">

                {
                    features.map((feature, index) => (

                        <div
                            className="feature-card"
                            key={index}
                        >

                            <div className="feature-icon">
                                {feature.icon}
                            </div>

                            <h3>
                                {feature.title}
                            </h3>

                            <p>
                                {feature.description}
                            </p>

                        </div>

                    ))
                }

            </div>

        </section>

    );

}

export default WhyChooseUs;