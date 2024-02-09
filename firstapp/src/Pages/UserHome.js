import React from 'react'
import { Link } from 'react-router-dom'

function userHome() {
    return (
        <div>
            <div className="container mt-5">
                <h1 className="text-center" style={{ color: '#358ddc', fontWeight: "bold", marginBottom: "30px", fontSize: "55px" }}>Data Container</h1>
                <h4 className="text-center mb-3" style={{ padding: "20px" }}>Please select any option...</h4>

                <div className="row justify-content-center" style={{ boxSizing: "border-box", marginLeft: "220px" }}>
                    <div className="col-md-4">
                        <button className="btn btn-primary btn-lg btn-block" >
                            <Link to="/file" style={{ color: "white", textDecoration: "none" }}>File Upload</Link>
                        </button>
                    </div>

                    <div className="col-md-4">
                        <button className="btn btn-danger btn-lg btn-block" >
                            <Link to="/ipdata" style={{ color: "white", textDecoration: "none" }}>InputData</Link>
                        </button>

                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default userHome
