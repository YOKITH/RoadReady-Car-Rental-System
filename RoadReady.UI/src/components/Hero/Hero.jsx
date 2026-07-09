import { Link } from "react-router-dom";

import "./Hero.css";

function Hero() {

    return (

        <section className="hero">

            <div className="hero-content">

                <p className="hero-subtitle">
                    🚗 Welcome to RoadReady
                </p>

                <h1 className="hero-title">
                    Rent Your Dream Car
                    <br />
                    Anytime, Anywhere
                </h1>

                <p className="hero-description">

                    Choose from a wide range of premium vehicles at
                    affordable prices. Enjoy a seamless booking
                    experience with secure payments and trusted service.

                </p>

                <div className="hero-buttons">

                    <Link
                        to="/cars"
                        className="btn-primary"
                    >
                        Explore Cars
                    </Link>

                    <Link
                        to="/register"
                        className="btn-secondary"
                    >
                        Get Started
                    </Link>

                </div>

                <div className="hero-stats">

                    <div className="stat-card">
                        <h3>500+</h3>
                        <p>Cars Available</p>
                    </div>

                    <div className="stat-card">
                        <h3>10K+</h3>
                        <p>Happy Customers</p>
                    </div>

                    <div className="stat-card">
                        <h3>50+</h3>
                        <p>Locations</p>
                    </div>

                </div>

            </div>

            <div className="hero-image">

                <img
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900"
                    alt="Luxury Car"
                />

            </div>

        </section>

    );

}

export default Hero;