import React from 'react';
// import './App.css'


function Home() {
    const clickF = () => {
        window.location.href = "/file";
    };

    const clickD = () => {
        window.location.href = "/data";
    };

    return (
        <>
            <div className="container mt-5">
                <h1 className="text-center" style={{ color: '#358ddc', fontWeight: "bold", marginBottom: "30px", fontSize: "55px" }}>Data Container</h1>
                <h4 className="text-center mb-3" style={{ padding: "20px" }}>Please select any option...</h4>

                <div className="row justify-content-center" style={{ boxSizing: "border-box", marginLeft: "220px" }}>
                    <div className="col-md-4">
                        <button className="btn btn-primary btn-lg btn-block" onClick={clickF}>
                            File Upload
                        </button>
                    </div>

                    <div className="col-md-4">
                        <button className="btn btn-success btn-lg btn-block" onClick={clickD}>
                            Input Data
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
