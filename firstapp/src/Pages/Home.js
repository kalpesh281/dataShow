import React from 'react';
// import './App.css'
import { Link } from 'react-router-dom'
import Profile from './Profile';


function Home() {

    return (
        <>
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
                    <div className="col-md-4" style={{ color: "white", }}>
                        <button className="btn btn-outline-warning btn-lg btn-block" >
                            <Link to="/edata" style={{ color: "black", textDecoration: "none" }}>Database</Link>
                        </button>

                    </div>

                    <div className="col-md-4" style={{ color: "white", marginTop: "20px" }}> <button className="btn btn-outline-success btn-lg btn-block" >
                        <Link to="panel" style={{ color: "black", textDecoration: "none" }} >List Of User</Link>
                    </button>
                    </div>

                    <div className="col-md-4" style={{ color: "white", marginTop: "20px" }}> <button className="btn btn-outline-info btn-lg btn-block" >
                        <Link to="login" style={{ color: "black", textDecoration: "none" }} >LogOut</Link>
                    </button>
                    </div>


                    <Profile />
                </div>
            </div>
        </>
    );
}

export default Home;
