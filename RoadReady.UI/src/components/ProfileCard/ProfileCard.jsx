import { useAuth } from "../../context/AuthContext";

import "./ProfileCard.css";

function ProfileCard() {

    const { user } = useAuth();

    if (!user) {

        return (

            <div className="profile-card">

                <h2>

                    Profile

                </h2>

                <p>

                    User information not available.

                </p>

            </div>

        );

    }

    return (

        <div className="profile-card">

            <h2>

                Profile Information

            </h2>

            <div className="profile-details">

                <div className="profile-item">

                    <label>

                        User ID

                    </label>

                    <span>

                        {user.userId}

                    </span>

                </div>

                <div className="profile-item">

                    <label>

                        Name

                    </label>

                    <span>

                        {user.firstName} {user.lastName}

                    </span>

                </div>

                <div className="profile-item">

                    <label>

                        Email

                    </label>

                    <span>

                        {user.email}

                    </span>

                </div>

                <div className="profile-item">

                    <label>

                        Role

                    </label>

                    <span className="role">

                        {user.role}

                    </span>

                </div>

            </div>

        </div>

    );

}

export default ProfileCard;