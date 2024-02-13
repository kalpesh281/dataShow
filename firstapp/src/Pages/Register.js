import React, { useState } from 'react';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        department:''
        
    });
    const [userType, setUserType] = useState("")
    const [key, setKey] = useState("")
    const [role, setRole] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!userType) {
            alert('Please select User or Admin');
            return;
        }


        if (userType === "Admin" && key !== "D@7a") {
            alert("Invalid Admin");
            return;
        }

        const { fname, lname, email, password ,department } = formData;

        if (fname === '' || lname === '' || email === '' || password === '' || department==='' || role === '') {
            alert('Please enter all the data first');
            return;
        }

        console.log(fname, lname, email, password);

        try {
            const response = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    fname,
                    lname,
                    email,
                    password,
                    userType,
                    role,
                    department
                }),
            });

            const data = await response.json();
            console.log(data, 'User Registered');
            window.alert('User Registered successfully...');
            window.location.href = '/login';
        } catch (error) {
            console.error('Error during registration:', error.message);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleRole = (e) => {
        setRole(e.target.value);
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <h2 className="mb-4">Register</h2>
                        <div>
                            Register As  <input type='radio' name='UserType' value="User" onChange={(e) => setUserType(e.target.value)} />User
                            <input type='radio' name='UserType' value="Admin" onChange={(e) => setUserType(e.target.value)} />Admin
                        </div>{
                            userType === "Admin" ? <div className="mb-3">
                                <label className="form-label">Secret Key:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Secret Key"
                                    name="Secret Key"

                                    onChange={(e) => setKey(e.target.value)}
                                />
                            </div> : null
                        }

                        <div className="mb-3">
                            <label className="form-label">First name:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="First name"
                                name="fname"
                                value={formData.fname}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Last name:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Last name"
                                name="lname"
                                value={formData.lname}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Department:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter department "
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Role:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter role"
                                name="roles"
                                value={role}
                                onChange={handleRole}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                                Sign up
                            </button>
                        </div>

                        <p className="mt-3">
                            Already have an account?{' '}
                            <a href="/login" className="text-primary">
                                Login.
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
