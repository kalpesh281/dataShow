// AdminPanel.js
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminPanel = () => {
    const [originalUsers, setOriginalUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerms, setSearchTerms] = useState('');
    const usersPerPage = 10;

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
                // Set default permission 'N' for users who haven't selected a permission
                const usersWithDefaultPermission = data.map(user => (
                    {
                        ...user,
                        permissions: user.permissions && user.permissions.length > 0 ? user.permissions : ['N'],
                    }
                ));
                setOriginalUsers(usersWithDefaultPermission);
                setUsers(usersWithDefaultPermission);
            } catch (error) {
                console.error('Error fetching users:', error.message);
            }
        };

        fetchUsers();
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

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

            setUsers(users.map((user) => (user.email === userEmail ? updatedUser : user)));

            console.log(`User ${userEmail} permission changed to: ${permission}`);
        } catch (error) {
            console.error('Error updating permission:', error.message);
        }
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = () => {
        const searchTermsArray = searchTerms.split(',').map(term => term.trim());

        if (searchTermsArray.length === 0) {
            setUsers(originalUsers);
        } else {
            const filteredUsers = originalUsers.filter(user => {
                return searchTermsArray.every(term =>
                    Object.values(user).some(value =>
                        typeof value === 'string' && value.toLowerCase().includes(term.toLowerCase())
                    )
                );
            });

            setCurrentPage(1);
            setUsers(filteredUsers);
        }
    };
    return (
        <div className="container mt-5">
            <h2>User List</h2>

            <div className="input-group mb-3" style={{ width: '300px' }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    value={searchTerms}
                    onChange={(e) => setSearchTerms(e.target.value)}
                />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>

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
                    {currentUsers.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index + 1 + indexOfFirstUser}</td>
                            <td>{user.fname} {user.lname}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.userType}</td>
                            <td>{user.department}</td>
                            <td>
                                {user.userType !== 'Admin' ? (
                                    <div>
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
                                                checked={user?.permissions?.includes('N')}
                                                value="N"
                                                onChange={() => handlePermissionChange(user.email, 'N')}
                                            />
                                            N
                                        </label>
                                    </div>
                                ) : null}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav aria-label="Page navigation example " style={{ marginLeft: "600px" }}>
                <ul className="pagination">
                    {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
                        <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => paginate(i + 1)}>
                                {i + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default AdminPanel;
