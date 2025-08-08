import React, { useEffect, useState } from "react";
import useProductStore from "../store/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileDetails = () => {
  const user = useProductStore((state) => state.user);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }
    if (!user?.id) {
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:8080/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          setProducts([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setProducts([]);
      });
  }, [navigate, user]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center gap-6">
          <img
            src={user?.imageUrl|| "/default-avatar.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
          />
          <div>
            <h1 className="text-3xl font-bold">{user?.name}</h1>
            <p className="text-lg opacity-90">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
          Your Products
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-500 text-center py-10 text-lg">
            No products found. Start adding some!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow hover:shadow-xl transition duration-300 overflow-hidden"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-52 object-cover transform hover:scale-105 transition duration-300"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="mt-3 text-blue-600 font-bold text-lg">
                    ₹{product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;
