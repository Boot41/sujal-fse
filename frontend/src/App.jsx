import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./store/auth.jsx"; // Import Auth Context
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import About from "./Pages/About";
import Pricing from "./Pages/Pricing";
import Register from "./Pages/Register";  
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import UserInfo from "./Pages/UserInfo.jsx";
import Logout from "./Pages/Logout.jsx";

// Protected Route Component
const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { isTokenAvailable } = useAuth();
  return isTokenAvailable ? <Component {...rest} /> : <Navigate to="/login" />;
};

const App = () => {
  const { isTokenAvailable } = useAuth();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />

        <Route
          path="/signup"
          element={isTokenAvailable ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/signin"
          element={isTokenAvailable ? <Navigate to="/" /> : <Login />}
        />

        <Route path="/logout" element={<Logout />} />

        <Route
          path="/userinfo"
          element={<ProtectedRoute element={UserInfo} />}
        />  

        <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />

      </Routes>
    </Router>
  );
};

export default App;
