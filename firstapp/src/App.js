
import React from "react";
import RegisterPage from "./Pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./Pages/Login";

import Data from "./Compo/Data";
import File from "./Compo/File";
import Home from "./Pages/Home";
import UserHome from "./Pages/UserHome";

import Database from "./Compo/Database";


import Private from "./Compo/Private";
import AdminPanel from "./Pages/Admin";


function App() {


  


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
            <Route path="/userpage" element={<Private><UserHome /></Private>} />

            {/* <Route exact path="/" element={<Home />} />
            <Route path="/edata" element={<Database />} />
            <Route path="/ipdata" element={<Data />} />
            <Route path="/file" element={<File />} />
            <Route path="/userpage" element={<UserHome />} /> */}
            
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

