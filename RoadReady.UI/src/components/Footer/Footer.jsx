import { Link } from "react-router-dom";

import "./Footer.css";

function Footer() {

    const currentYear = new Date().getFullYear();

    return (

        <footer className="footer">

            <div className="footer-container">

                {/* Company Info */}

                <div className="footer-section">

                    <h2 className="footer-logo">
                        🚗 RoadReady
                    </h2>

                    <p>
                        RoadReady is a modern car rental platform that
                        helps customers book premium vehicles quickly,
                        securely, and at affordable prices.
                    </p>

                </div>

                {/* Quick Links */}

                <div className="footer-section">

                    <h3> Quick Links </h3>

                    <ul>

                        <li>
                            <Link to="/">Home</Link> </li>

                        <li> <Link to="/cars">Cars</Link> </li>

                        <li> <Link to="/reservations"> Reservations </Link> </li>

                        <li> <Link to="/about"> About </Link> </li>

                    </ul>
                </div>

                {/* Contact */}

                <div className="footer-section">

                    <h3> Contact </h3>

                    <p>📍 Coimbatore, Tamil Nadu</p>

                    <p>📞 +91 9344966969</p>

                    <p>✉ iamyokith@gmail.com</p>

                </div>

                {/* Social */}

                <div className="footer-section">

                    <h3> Follow Us </h3>

                    <div className="social-links">

                        <a href="https://facebook.com" target="_blank" rel="noreferrer" > 
                                Facebook </a>

                        <a href="https://instagram.com" target="_blank" rel="noreferrer" >
                            Instagram </a>

                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" >
                            LinkedIn </a>

                    </div>
                </div>
            </div>

            <hr />

            <div className="footer-bottom">
                <p> © {currentYear} RoadReady.
                    All Rights Reserved. </p>

            </div>
        </footer>
    );
}
export default Footer;