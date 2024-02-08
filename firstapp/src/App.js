
import React from "react";
import RegisterPage from "./Pages/Register";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";

import LoginPage from "./Pages/Login";

import Data from "./Compo/Data";
import File from "./Compo/File";
import Home from "./Home";
import Database from "./Compo/Database";


function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/file" element={<File />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/ipdata" element={<Data />} />
          <Route path="/edata" element={<Database />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;

