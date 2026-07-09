import "./About.css";

function About() {
    return (
        <div className="about-page">
            <div className="about-container">
                <h1>About RoadReady</h1>

                <p className="about-subtitle">
                    Your trusted partner for convenient, affordable, and reliable
                    car rentals.
                </p>

                <section className="about-section">
                    <h2>Who We Are</h2>

                    <p>
                        RoadReady is an online car rental platform that makes
                        renting vehicles simple, secure, and convenient. Whether
                        you need a compact car for city travel or a spacious SUV
                        for a family trip, RoadReady provides a wide selection
                        of well-maintained vehicles to suit every journey.
                    </p>
                </section>

                <section className="about-section">
                    <h2>Our Mission</h2>

                    <p>
                        Our mission is to simplify the vehicle rental experience
                        by providing a fast, transparent, and secure platform
                        where customers can browse, reserve, and manage vehicles
                        with ease.
                    </p>
                </section>

                <section className="about-section">
                    <h2>Why Choose RoadReady?</h2>

                    <div className="features">
                        <div className="feature-card">
                            <span>🚗</span>
                            <h3>Premium Fleet</h3>
                            <p>
                                Wide range of quality vehicles for every
                                journey.
                            </p>
                        </div>

                        <div className="feature-card">
                            <span>💳</span>
                            <h3>Secure Payments</h3>
                            <p>
                                Fast and secure online payment using Razorpay.
                            </p>
                        </div>

                        <div className="feature-card">
                            <span>📅</span>
                            <h3>Easy Reservations</h3>
                            <p>
                                Book your vehicle in just a few simple steps.
                            </p>
                        </div>

                        <div className="feature-card">
                            <span>🛠️</span>
                            <h3>24/7 Support</h3>
                            <p>
                                Dedicated customer support whenever you need
                                help.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="about-section">
                    <h2>Our Services</h2>

                    <ul>
                        <li>✔ Browse available rental vehicles</li>
                        <li>✔ Reserve vehicles online</li>
                        <li>✔ Secure online payments</li>
                        <li>✔ Manage reservations</li>
                        <li>✔ View payment history</li>
                        <li>✔ Customer reviews and ratings</li>
                    </ul>
                </section>

                <section className="about-section">
                    <h2>Contact Us</h2>

                    <p>📍 Coimbatore, Tamil Nadu</p>
                    <p>📧 support@roadready.com</p>
                    <p>📞 +91 98765 43210</p>
                </section>
            </div>
        </div>
    );
}

export default About;