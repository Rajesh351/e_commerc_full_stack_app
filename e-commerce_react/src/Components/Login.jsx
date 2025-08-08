import React, { useState } from "react";
import './Raj.css'
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useProductStore from "../store/store";

export default function Login() {
  const {  setUser } = useProductStore();
const user = useProductStore((state) => state.user);

  const navigate=useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();
  data.append("email", credentials.email);   // Use actual value, not setter
  data.append("password", credentials.password);

  try {
    const res = await axios.post("http://localhost:8080/login", data, {
      // DO NOT manually set multipart boundary
      headers: { "Content-Type": "application/json" },
    });

       const [token, email, name, imageUrl,id] = res.data;
     
    // Save token
    localStorage.setItem("token", token);

    // Update user state
    setUser({ name, email, imageUrl,id });

    toast.success("Welcome back to E-Commerce");
    navigate("/"); // Redirect after login

  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center  p-4 raj">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Please login to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={credentials.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none sm:text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={credentials.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none sm:text-sm"
            />
          </div>

          {/* Remember Me + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-gray-600">Remember me</span>
            </label>
            <a href="/forgot_password" className="text-indigo-500 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-md transition-all"
          >
            Login
          </button>
        </form>

        {/* Sign Up link */}
        <p className="text-center text-gray-600 mt-6 text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="text-indigo-500 font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
