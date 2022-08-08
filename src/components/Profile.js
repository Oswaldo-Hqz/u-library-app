import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Profile = () => {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) {
        return <Navigate to="/login"/>
    }
        
    return (
        <div className="container">
            <div className="col-12">
                <div className="h-100 p-5 bg-light border rounded-3">
                    <h2>User Information</h2>
                    <hr/>
                    <p>"Welcome back, <strong>{currentUser.first_name + " " + currentUser.last_name}</strong></p>
                    {/* <p>
                        <strong>Id:</strong> {currentUser.id}
                    </p> */}
                    <p>
                        <strong>Email:</strong> {currentUser.email}
                    </p>
                    <p>
                        <strong>Role:</strong> {currentUser.role_name}
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Profile;
