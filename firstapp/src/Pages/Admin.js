// AdminPanel.js
import React, { useEffect, useState } from 'react';



const AdminPanel = () => {
    const [users, setUsers] = useState([]);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8000/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                });

                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error.message);
            }
        };

        fetchUsers();
    }, []);

    // Define a function to handle radio button changes
    const handlePermissionChange = (userId, permission) => {
        // Update the user's permission in the state or send a request to the server
        // based on your application logic
        console.log(`User ${userId} permission changed to: ${permission}`);
    };

    return (
        <div className="container mt-5">
            <h2>User List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>UserType</th>
                        <th>Department</th>
                        <th>Permissions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.fname} {user.lname}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.userType}</td>
                            <td>{user.department}</td>
                            <td>

                                <div >
                                    <label style={{ marginRight: "10px" }}>
                                        <input
                                            type="radio"
                                            name={`permission_${user._id}`}
                                            value="RW"
                                            onChange={() => handlePermissionChange(user._id, 'RW')}
                                        />
                                        RW
                                    </label>
                                    <label style={{ marginRight: "10px" }}>
                                        <input
                                            type="radio"
                                            name={`permission_${user._id}`}
                                            value="RO"
                                            onChange={() => handlePermissionChange(user._id, 'RO')}
                                        />
                                        RO
                                    </label>
                                    <label style={{ marginRight: "10px" }}>
                                        <input
                                            type="radio"
                                            name={`permission_${user._id}`}
                                            value="N"
                                            onChange={() => handlePermissionChange(user._id, 'N')}
                                        />
                                        N
                                    </label>

                                </div>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ display: 'grid' }}>
                <p>R/W : Read/Write</p>
                <p>RO : Read Only</p>
                <p>N: None</p></div>
        </div>
    );
};

export default AdminPanel;
