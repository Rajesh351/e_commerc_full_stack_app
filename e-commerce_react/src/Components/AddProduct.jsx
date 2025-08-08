import React, { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import useProductData from "../hook/useGetProducts";
import './Raj.css'

export default function AddProduct() {
  const navigate = useNavigate();
   const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: null
  });

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get token from localStorage
   

    try {
      const formData = new FormData();
      formData.append("image", product.image);
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("description", product.description);

      const res = await axios.post(
        "http://localhost:8080/add_product",
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`, // send token
            "Content-Type": "multipart/form-data"
          }
        }
      );

      toast.success(res.data || "Product added successfully");
      navigate("/");
      useProductData();
      

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4 raj3">
      <form
        onSubmit={handleSubmit}
        className=" p-6 rounded-full shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Add Product</h2>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="text"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        ></textarea>

        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          accept="image/*"
          required
          className="w-full mb-3"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
