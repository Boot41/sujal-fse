import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../store/auth.jsx"; // Import authentication context
import axios from "axios";

const LoginPage = () => {
  const { storingTokenInLS, userAuthentication } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200 && response.data.token) {
        storingTokenInLS(response.data.token); // Store token first
        navigate("/");
        await userAuthentication(); // Fetch user data
         // Redirect to dashboard
      } else {
        setError(response.data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Server error. Please try later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white pt-[80px] md:pt-[90px]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-[600px]">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Sign in to your account</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Email <span className="text-red-500">*</span></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@company.com"
            required
            className="mt-1 p-2 w-full border rounded focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Password <span className="text-red-500">*</span></label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="mt-1 p-2 w-full border rounded focus:border-orange-500 focus:ring-orange-500 pr-10"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-2 flex items-center text-gray-600 hover:text-gray-800"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-5 py-2 text-lg font-bold text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-all"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="pt-5 text-center">
          <p className="text-[15px] md:text-[16px] font-bold text-slate-500">
            Not registered? <Link to="/signup" className="text-orange-600 font-bold hover:text-orange-700">Register here.</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
