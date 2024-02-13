import React from 'react'

function Profile() {
    const userEmail = localStorage.getItem('email');
    const userRole = localStorage.getItem('role');
    const userType = localStorage.getItem('userType');
  return (
    <div>
          <div className="mt-4">
              <p>Email: {userEmail}</p>
              <p>Role: {userRole}</p>
              <p>User Type: {userType}</p>
          </div>
    </div>
  )
}

export default Profile
