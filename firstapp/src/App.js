
import React from "react";
import RegisterPage from "./Pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./Pages/Login";

import Data from "./Compo/Data";
import File from "./Compo/File";
import Home from "./Pages/Home";
// import UserHome from "./Pages/UserHome";

import Database from "./Compo/Database";
// import Role from "./Compo/Role";

import Private from "./Compo/Private";
import AdminPanel from "./Pages/Admin";
import Profile from "./Pages/Profile";


function App() {

  // const userType = localStorage.getItem('userType');
 


  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            {/* isAuthenticated={isLoggedIn} */}


            <Route exact path="/" element={<Private><Home /></Private>} />
            <Route path="/edata" element={<Private><Database /></Private>} />
            <Route path="/ipdata" element={<Private><Data /></Private>} />
            <Route path="/file" element={<Private><File /></Private>} />
            {/* <Route path="/userpage" element={<Private><UserHome /></Private>} /> */}

            <Route path="/profile" element={<Private><Profile/></Private>} />

            <Route path="/panel" element={<AdminPanel />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>

      </div>
    </>
  );
}

export default App;

