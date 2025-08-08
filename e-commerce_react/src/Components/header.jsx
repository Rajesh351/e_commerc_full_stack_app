import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useProductStore from "../store/store";
import axios from "axios";
import toast from "react-hot-toast";

export default function EcommerceHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
const { setUser } = useProductStore();
  const user = useProductStore((state) => state.user);
  const navigate=useNavigate();
  const onSearch = (e) => {
    e.preventDefault();
    alert(`Search for: ${query}`);
  };
  const logoutHandler= async()=>{
   try {
    await axios.post("http://localhost:8080/api/logout");

    // Clear token from localStorage
    localStorage.removeItem("token");

    // Clear Zustand store user data
    setUser(null); // Or {} depending on your store default

    toast.success("Logout successfully");

    // Redirect to login
    navigate("/login");
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  }
  }

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg bg-indigo-600 text-white font-bold">
              EC
            </div>
            <span className="text-lg font-semibold text-gray-800 truncate">
              E-Commerce
            </span>
          </Link>

          {/* Middle: Search */}
          <div className="flex-1 px-4 hidden sm:block">
            <form onSubmit={onSearch} className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="block w-full rounded-lg border border-gray-200 py-2 pl-10 pr-36 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300"
                placeholder="Search for products, categories, brands..."
                type="search"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z"
                  />
                </svg>
              </div>
              <button
                type="submit"
                className="absolute inset-y-0 right-0 mr-2 my-1 px-4 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300"
              >
                Search
              </button>
            </form>
          </div>

          {/* Right: Auth or User */}
          <div className="flex items-center gap-4">
            {/* If user is logged in */}
            {user?.name ? (
              <div className="flex items-center gap-3">
               <Link to={"/profile_details"}>
                <img
                  src={user.imageUrl}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border"
                />
               </Link>
                <span onClick={logoutHandler} className="px-3 py-1.5 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">
                  logout
                </span>
                <Link
                  to="/addproduct"
                  className="px-3 py-1.5 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
                >
                  Add Product
                </Link>
              </div>
            ) : (
              /* If no user */
              <nav className="hidden sm:flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="ml-2 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign up
                </Link>
              </nav>
            )}

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="sm:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={() => setMobileOpen((s) => !s)}
            >
              {mobileOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (simplified) */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-gray-100 px-4 py-3 space-y-3">
          {user?.name ? (
            <div className="flex flex-col items-center gap-3">
              <img
                src={user.imageUrl}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover border"
              />
              <span className="font-medium">{user.name}</span>
              <Link
                to="/addproduct"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
              >
                Add Product
              </Link>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block text-center py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileOpen(false)}
                className="block text-center py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
