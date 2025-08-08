import React from "react";
import { Link } from "react-router-dom";

const SingleProduct = ({ product }) => {
  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md transition p-4 bg-white flex flex-col">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md mb-3"
        />
        <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
      </Link>
      <p className="text-sm text-gray-600 flex-1">{product.description}</p>
      <div className="mt-3 flex justify-between items-center">
        <span className="text-indigo-600 font-bold">₹{product.price}</span>
        <button className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
