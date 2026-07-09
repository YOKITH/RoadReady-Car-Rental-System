import { useEffect } from "react";

import { useAuth } from "../../context/AuthContext";

import ProfileCard from "../../components/ProfileCard/ProfileCard";
import UserReservations from "../../components/UserReservations/UserReservations";

import fleetBg from "../../Images/fleet-bg.png";

import "./Profile.css";

function Profile() {

    const { user } = useAuth();

    useEffect(() => {

        window.scrollTo(0, 0);

    }, []);

    return (

        <div
            className="profile-page"
            style={{
                backgroundImage: `
                    linear-gradient(
                        rgba(15,23,42,0.65),
                        rgba(15,23,42,0.65)
                    ),
                    url(${fleetBg})
                `
            }}
        >

            <div className="profile-container">

                <div className="profile-header">

                    <h1>
                        My Profile
                    </h1>

                    <p>
                        {
                            user?.role === "Customer"
                                ? "View your profile information and reservation history."
                                : "View your profile information."
                        }
                    </p>

                </div>

                <div className="profile-card-section">

                    <ProfileCard />

                </div>

                {
                    user?.role === "Customer" && (

                        <div className="reservation-section">

                            <UserReservations />

                        </div>

                    )
                }

            </div>

        </div>

    );

}

export default Profile;