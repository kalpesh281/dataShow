import React from 'react';


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
                <h1 className="text-center">Data Container</h1>
                <h5 className="text-center mb-3">Please select any option...</h5>

                <div className="row justify-content-center">
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
