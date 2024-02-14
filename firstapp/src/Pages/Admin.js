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
                console.log(data)
            } catch (error) {
                console.error('Error fetching users:', error.message);
            }

        };







        fetchUsers();
    }, []);


    const handlePermissionChange = async (userEmail, permission) => {
        try {
            const response = await fetch('http://localhost:8000/permission', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: userEmail, permission }),
            });

            const updatedUser = await response.json();

            // const f = window.localStorage.setItem('permission', updatedUser.permission)
            console.log(updatedUser)

            setUsers(users.map((user) => (user.email === userEmail ? updatedUser : user)));

            console.log(`User ${userEmail} permission changed to: ${permission}`);
        } catch (error) {
            console.error('Error updating permission:', error.message);
        }
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
                                            checked={user?.permissions?.includes('RW')}
                                            value="RW"
                                            onChange={() => handlePermissionChange(user.email, 'RW')}
                                        />
                                        RW
                                    </label>
                                    <label style={{ marginRight: "10px" }}>
                                        <input
                                            type="radio"
                                            name={`permission_${user.email}`}
                                            checked={user?.permissions?.includes('RO')}
                                            value="RO"
                                            onChange={() => handlePermissionChange(user.email, 'RO')}
                                        />
                                        RO
                                    </label>
                                    <label style={{ marginRight: "10px" }}>
                                        <input
                                            type="radio"
                                            name={`permission_${user.email}`}
                                            value="N"
                                            onChange={() => handlePermissionChange(user.email, 'N')}
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
