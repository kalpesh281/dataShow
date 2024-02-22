
import React from "react";
import RegisterPage from "./Pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./Pages/Login";

import Data from "./Compo/Data";
import File from "./Compo/File";
import Home from "./Pages/Home";


import Database from "./Compo/Database";


import Private from "./Compo/Private";
import AdminPanel from "./Pages/Admin";
import Profile from "./Pages/Profile";
import UserReq from "./Pages/UserReg";
import SetPasscode from "./Pages/SetPasscode";
import Navbar from "./Pages/Navbar";


function App() {





  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<Private><Home /></Private>} />
            <Route path="/edata" element={<Private><Database /></Private>} />
            <Route path="/ipdata" element={<Private><Data /></Private>} />
            <Route path="/file" element={<Private><File /></Private>} />
            <Route path="/adduser" element={<Private> <UserReq /></Private>} />
            <Route path="/profile" element={<Private><Profile /></Private>} />

            <Route path="/panel" element={<AdminPanel />} />
            <Route path="/navbar" element={<Navbar />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/setpass" element={<SetPasscode />} />
          </Routes>
        </Router>
        {/* <SetPasscode /> */}
      </div>
    </>
  );
}

export default App;

