import React from 'react'
import { useParams } from 'react-router-dom';
import useProductStore from '../store/store';

export const SingleViewProduct = () => {
    const { id } = useParams();
  const products = useProductStore((state) => state.products);
  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return <div className="p-6 text-center">Product not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
  src={product.imageUrl}
  alt={product.name}
  className="w-full h-96 object-cover rounded-xl shadow-md mb-4 transition-transform duration-300 ease-in-out hover:scale-105"
/>

      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-xl font-semibold text-indigo-600 mb-4">
        ₹{product.price}
      </p>
      <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
        Add to Cart
      </button>
    </div>
  )
}
