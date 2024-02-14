import React, { useState,useEffect } from 'react';

function Profile() {
    const [users, setUsers] = useState([]);
    // const [userPermission, setUserPermission] = useState(null);
    // const userEmail = localStorage.getItem('email');
    // const userRole = localStorage.getItem('role');
    // const Department = localStorage.getItem('department');
    // const fname = localStorage.getItem('fname')
    // //const userType= localStorage.getItem('fname')
    // const lname = localStorage.getItem('lname')
    // const permission = localStorage.getItem('permission')
    // console.log(permission)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8000/info', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                });

                const data = await response.json();
                console.log(data)
                // setUsers(data);


            } catch (error) {
                console.error('Error fetching users:', error.message);
            }

        }
        fetchUsers();
    }, []);



    return (
        <div>
            {/* <div className="mt-4">
                <p>Name: {fname} {lname}</p>

                <p>Email: {userEmail}</p>
                <p>Department: {Department}</p>
                <p>Role: {userRole}</p>
                <p>Permissions :{permission}</p>

            </div> */}
            <p>hello</p>

        </div>
    )
}

export default Profile




/*

-make one api for getmyinfo
-after getting the data from server store permission in localstorage
-{email}=req.body

*/