import React from "react";
import Footer from "./components/Footer";
import Customize from "./components/Customize";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PremiumCandles from "./components/PremiumCandles";
import HappyCustomers from "./components/HappyCustomers";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/customize" element={<Customize />} />
        <Route exact path="/candleGallery" element={<PremiumCandles />} />
        <Route exact path="/happyCustomers" element={<HappyCustomers />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
