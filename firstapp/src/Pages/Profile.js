import React from 'react'

function Profile() {
    const userEmail = localStorage.getItem('email');
    const userRole = localStorage.getItem('role');
    const Department = localStorage.getItem('department');
    const fname = localStorage.getItem('fname')
    //const userType= localStorage.getItem('fname')
    const lname = localStorage.getItem('lname')
    return (
        <div>
            <div className="mt-4">
                <p>Name: {fname} {lname}</p>

                <p>Email: {userEmail}</p>
                <p>Department: {Department}</p>
                <p>Role: {userRole}</p>

            </div>
        </div>
    )
}

export default Profile
