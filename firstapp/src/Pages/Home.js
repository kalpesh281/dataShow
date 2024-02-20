import React from 'react';

import { Link } from 'react-router-dom'

import img1 from '../logo_u.png'


function Home() {
    const userType = localStorage.getItem('userType');

    return (
        <><div style={{ backgroundColor: "#F8C97D", height: "100vh", width: "100vw" }}>
            <div className="container mt-2" >
                <div><Link to='/profile' style={{ textDecoration: "none" }}><div style={{ marginLeft: "1280px", }}><img src={img1} alt='error' style={{ height: "120px", width: "100px" }} /></div><div style={{ marginLeft: "1310px", marginTop: "-25px" }}><p style={{ color: "black" }}>Profile</p></div>
                </Link></div>
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
                    <div className="col-md-4" style={{ color: "white", }}>
                        <button className="btn btn-outline-secondary btn-lg btn-block" >
                            <Link to="/edata" style={{ color: "black", textDecoration: "none" }}>Database</Link>
                        </button>

                    </div>
                    {userType === 'Admin' && (
                        <div className="col-md-4" style={{ color: "white", marginTop: "20px" }}>
                            <button className="btn btn-outline-success btn-lg btn-block">
                                <Link to="panel" style={{ color: "black", textDecoration: "none" }}>List Of User</Link>
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
        </>
    );
}

export default Home;
