import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EcommerceHeader from "./Components/Header";
import { ListofProducts } from "./Components/ListofProducts";
import useProductData from "./hook/useGetProducts";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { SingleViewProduct } from "./Components/SingleViewProduct";
import AddProduct from "./Components/AddProduct";
import { Forgot_pasword } from "./Components/Forgot_pasword";
import ProfileDetails from "./Components/ProfileDetails";


function App() {
  useProductData();

  return (
    <Router>
      {/* Header visible on all pages */}
      <EcommerceHeader />

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<ListofProducts />} />
        <Route path="/listofproducts" element={<ListofProducts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
         <Route path="/product/:id" element={<SingleViewProduct />} />
         <Route path="/addproduct" element={<AddProduct/>} />
         <Route path="/forgot_password" element={<Forgot_pasword/>} />
         <Route path="/profile_details" element={<ProfileDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;
