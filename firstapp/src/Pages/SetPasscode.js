import React, { useState } from 'react';
import Navbar from './Navbar';

const SetPasscodePage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isPasswordValid = () => {
        const { password } = formData;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{16,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (!isPasswordValid()) {
            alert("Password does not meet the policy requirements");
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/setpass', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                window.alert('Passcode set successfully!');
                window.location.href = '/login';
            } else {
                window.alert('Error setting passcode: ' + data.errors[0].msg);
            }
        } catch (error) {
            console.error('Error setting passcode:', error.message);
        }
    };

    const isButtonDisabled = formData.password !== formData.confirmPassword || !isPasswordValid();

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit}>
                            <h2 className="mb-4">Set User Password</h2>

                            <div className="mb-3">
                                <label className="form-label">Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Confirm Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirm password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary" disabled={isButtonDisabled}>
                                    Set Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SetPasscodePage;
