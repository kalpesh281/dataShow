import React, { useState } from 'react';


const LoginPage = (props) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        if (email === '' || password === '') {
            alert('Please enter the data first');
            return;
        }
        if(!email){
            alert("Please Enter Valid Email")
        }

        // console.log(email, password);

        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();
            console.log(data, 'User Registered');

            if (data.status === 'ok') {
                alert('Login successful');
                window.localStorage.setItem('token', data.data);
                window.localStorage.setItem('loggedIn', true);
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Error during login:', error.message);
        }
    };

    

    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit}>
                            <h2>Login</h2>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="E-mail"
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>

                            <p className="mt-3">Don't have an account yet? <a href="/register">Register</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
