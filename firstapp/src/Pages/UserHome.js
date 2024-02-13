import React from 'react'
import { Link } from 'react-router-dom'

function userHome() {
    const userEmail = localStorage.getItem('email');
    const userRole = localStorage.getItem('role');
    const userType = localStorage.getItem('userType');
    return (
        <div>
            <div className="container mt-5">
                <h1 className="text-center" style={{ color: '#358ddc', fontWeight: "bold", marginBottom: "30px", fontSize: "55px" }}>Data Container</h1>
                <h4 className="text-center mb-3" style={{ padding: "20px" }}>Please select any option...</h4>

                <div className="row justify-content-center" style={{ boxSizing: "border-box", marginLeft: "220px" }}>
                    <div className="col-md-4">
                        <button className="btn btn-outline-primary btn-lg btn-block" >
                            <Link to="/file" style={{ color: "black", textDecoration: "none" }}>File Upload</Link>
                        </button>
                    </div>

                    <div className="col-md-4">
                        <button className="btn btn-outline-danger btn-lg btn-block" >
                            <Link to="/ipdata" style={{ color: "black", textDecoration: "none" }}>InputData</Link>
                        </button>

                    </div>

                    <div className="col-md-4" style={{ color: "white", marginTop: "20px" }}> <button className="btn btn-outline-info btn-lg btn-block" >
                        <Link to="/login" style={{ color: "black", textDecoration: "none" }} >LogOut</Link>
                    </button>
                    </div>


                    <div className="mt-4">
                        <p>Email: {userEmail}</p>
                        <p>Role: {userRole}</p>
                        <p>User Type: {userType}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default userHome
