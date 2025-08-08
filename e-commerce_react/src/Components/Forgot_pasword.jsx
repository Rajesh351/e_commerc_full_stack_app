import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Forgot_pasword = () => {
      

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
    const res = await axios.post("http://localhost:8080/forgot", data, {
      headers: { "Content-Type": "application/json" },
    });
    navigate("/login"); // Redirect after login

  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center  p-4 raj">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
        Please enter the correct Email
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Forgot your Password
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email 
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
               New Password
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

          

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-md transition-all"
          >
            Forgot 
          </button>
        </form>

       
      </div>
    </div>
  )
}
