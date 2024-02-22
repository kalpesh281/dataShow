import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Reset = () => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
    }


    const handleButtonClick = async () => {
        try {
            const response = await axios.post('http://localhost:8000/delpass', { email });

            // Check if the user type is 'admin'
            if (response.data && response.data.userType === 'Admin') {
                alert("You have not reset the password of Admin");
                return;
            }

            alert(" User Password Reset successfully")

        } catch (error) {
            console.error('Error deleting password:', error.message);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Reset Password</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="emailInput"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter your email"
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleButtonClick}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Reset;
