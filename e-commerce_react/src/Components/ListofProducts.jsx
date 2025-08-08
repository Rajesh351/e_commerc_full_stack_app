import React from "react";
import useProductStore from "../store/store";
import SingleProduct from "./SingleProduct";
import './Raj.css'

export const ListofProducts = () => {
  const products = useProductStore((state) => state.products);

  return (
    <div className="grid gap-6 sm:grid-cols-2 sm:mt-[10px] md:grid-cols-3 md:mt-[10px] lg:grid-cols-4 p-4 mx-auto w-[80%] mt-[20px] raj2">
      {products && products.length > 0 ? (
        products.map((product) => (
          <SingleProduct key={product.id} product={product} />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No products available
        </p>
      )}
    </div>
  );
};
