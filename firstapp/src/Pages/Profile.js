import React from 'react';
import { Link } from 'react-router-dom';

function Profile() {
    const userEmail = localStorage.getItem('email');
    const userRole = localStorage.getItem('role');
    const Department = localStorage.getItem('department');
    const fname = localStorage.getItem('fname');
    const lname = localStorage.getItem('lname');

    return (
        <div className="container mt-5">
            <div className="card text-center">
                <div className="card-header">
                    <h1 className="mb-0">Profile Page</h1>
                </div>
                <div className="card-body">
                    <h5 className="card-text font-weight-bold">Name: {fname} {lname}</h5>
                    <p className="card-text font-weight-bold">Email: {userEmail}</p>
                    <p className="card-text font-weight-bold">Department: {Department}</p>
                    <p className="card-text font-weight-bold">Role: {userRole}</p>
                </div>
                <div className="card-footer">
                    <Link to="/login" className="btn btn-danger" style={{ fontWeight: "bold", fontSize: "16px" }}>
                        Log Out
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Profile;
