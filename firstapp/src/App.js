// import Register from "./Components/Register";
import React from "react";
import RegisterPage from "./Components/Register";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Home from "./Home";
import LoginPage from "./Components/Login";
// import RegisterPage from "./Components/Register";

function App() {
  return (
    <div className="App">
      {/* <RegisterPage /> */}
      {/* <LoginPage/> */}
      {/* <RegisterPage/> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

