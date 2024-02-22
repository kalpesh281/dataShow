import React, { useState } from 'react';
import Navbar from './Navbar';
import ReCAPTCHA from 'react-google-recaptcha';


const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',

    });
    const [recaptchaValue, setRecaptchaValue] = useState(null);
    window.localStorage.setItem("token", "");


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!recaptchaValue) {
            alert('Please complete the reCAPTCHA');
            return;
        }

        const { email, password } = formData;


        if (email === '' || password === '') {
            alert('Please enter the data first');
            return;
        }
        if (!email) {
            alert("Please Enter Valid Email")
        }


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
            console.log(data.data, '<=User Registered');

            if (data.status === 'ok') {
                const { token, userType, role, email, department, fname, lname, permissions } = data.data;


                window.localStorage.setItem('token', token);
                window.localStorage.setItem('role', JSON.stringify(role));
                window.localStorage.setItem('password', password);
                window.localStorage.setItem('loggedIn', true);

                window.localStorage.setItem("role", role)
                window.localStorage.setItem('userType', userType);
                window.localStorage.setItem('email', email);
                window.localStorage.setItem("department", department)
                window.localStorage.setItem("fname", fname)
                window.localStorage.setItem("lname", lname)
                window.localStorage.setItem("permissions", JSON.stringify(permissions))
                console.log()

                if (userType === 'Admin') {
                    alert('Login successful Admin');
                } else {
                    alert('Login successful User');
                }
                window.location.href = '/';
            }
        }

        catch (error) {
            console.error('Error during login:', error.message);
        }
    };



    return (
        <>
            <Navbar />
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
                            <div className="mb-3">
                                <ReCAPTCHA
                                    sitekey="6LdX8nspAAAAAJ9lJSXC4XsBz1ErIKxD26qkymmW"
                                    onChange={(value) => setRecaptchaValue(value)}
                                />
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
