import React from 'react';

function Profile() {
    // const [users, setUsers] = useState([]);
    // const [userPermission, setUserPermission] = useState(null);
    const userEmail = localStorage.getItem('email');
    const userRole = localStorage.getItem('role');
    const Department = localStorage.getItem('department');
    const fname = localStorage.getItem('fname')
    const lname = localStorage.getItem('lname')
    const permissions = JSON.parse(localStorage.getItem('permissions'))
    console.log(permissions)
    // //const userType= localStorage.getItem('fname')
    // const permission = localStorage.getItem('permission')
    // console.log(permission)
    // const permissions = localStorage.getItem('permissions')





    return (
        <div>
            <div className="mt-4">
                <p>Name: {fname} {lname}</p>
                <p>Email: {userEmail}</p>
                <p>Department: {Department}</p>
                <p>Role: {userRole}</p>
                <p>Permissions :{permissions}</p>

            </div>


        </div>
    )
}

export default Profile




/*

-make one api for getmyinfo
-after getting the data from server store permission in localstorage
-{email}=req.body

*/