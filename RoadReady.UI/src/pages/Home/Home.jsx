import "./Home.css";

import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import FeaturedCars from "../../components/FeaturedCars/FeaturedCars";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import Footer from "../../components/Footer/Footer";

function Home() {
    return (
        <div className="home-page">

            <Navbar />

            <main className="home-content">

                <Hero />

                <FeaturedCars />

                <WhyChooseUs />

            </main>

            <Footer />

        </div>
    );
}

export default Home;