import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    businessType: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
        const response = await axios.post("http://localhost:5000/api/v1/auth/register", formData, {
            headers: { "Content-Type": "application/json" },
          });
          

      if (response.status === 201) {
        alert("Registration successful! Please log in.");
        navigate("/signin"); // Redirect to login page
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Registration failed. Try again.");
      } else {
        setError("Server error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-white pt-[80px] md:pt-[90px]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm md:shadow-lg w-full max-w-[600px]">
        <h2 className="text-3xl md:text-4xl font-roboto font-extrabold mb-3">Create an account</h2>
        <p className="text-[15px] md:text-[17px] font-roboto font-semibold text-slate-600 mb-5">
          Join our AI-powered inventory management platform designed for retailers.
        </p>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-roboto font-bold">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            className="mt-1 p-2 w-full border rounded focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-roboto font-bold">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="mt-1 p-2 w-full border rounded focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        {/* Password Field with Toggle */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 font-roboto font-bold">
            Password <span className="text-red-500">*</span>
          </label>
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

        {/* Business Type Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-roboto font-bold">
            Business Type <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            placeholder="E.g., Grocery, Electronics"
            required
            className="mt-1 p-2 w-full border rounded focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        {/* Register Button - Full Width */}
        <button
          type="submit"
          className="w-full px-5 py-3 text-[16px] font-bold text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-all cursor-pointer"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        {/* Login Link */}
        <div className="pt-5 text-center">
          <p className="text-[15px] md:text-[16px] font-bold text-slate-500">
            Already have an account?{" "}
            <Link to="/signin" className="text-[#fd9f60] font-bold hover:text-[#FF7D49]">
              Login here.
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
