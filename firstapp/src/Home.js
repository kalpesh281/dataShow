import React from 'react';
// import './App.css'


function Home() {
    const clickF = () => {
        window.location.href = "/file";
    };

    const clickD = () => {
        window.location.href = "/edata";
    };
    const clickIP = () => {
        window.location.href = "/ipdata";
    }

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
                        <button className="btn btn-danger btn-lg btn-block" onClick={clickIP}>
                            Input Data
                        </button>

                    </div>
                    <div className="col-md-4" style={{ color: "red" }}>
                        <button className="btn btn-success btn-lg btn-block" onClick={clickD} >
                            DataBase
                        </button>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
