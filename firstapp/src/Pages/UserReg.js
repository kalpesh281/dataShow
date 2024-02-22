import React, { useState } from 'react';

const UserReq = () => {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',

        department: ''
    });
    const [role, setRole] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { fname, lname, email, department } = formData;

        if (fname === '' || lname === '' || email === '' || department === '' || role === '') {
            alert('Please enter all the data first');
            return;
        }

        console.log(fname, lname, email,);

        try {
            const response = await fetch('http://localhost:8000/userR', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    fname,
                    lname,
                    email,
                    role,
                    department
                }),
            });

            const data = await response.json();
            console.log(data, 'User Registered');
            window.alert('User On-Board successfully...');
            setFormData({
                fname: '',
                lname: '',
                email: '',
                department: '',
            });
            setRole('')

        } catch (error) {
            console.error('Error during registration:', error.message);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRole = (e) => {
        setRole(e.target.value);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <h2 className="mb-4">On-Board User</h2>

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



                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>


                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserReq;
