
import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Customize from "./components/Customize";
import MobHome from "./mobile/MobHome";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PremiumCandles from "./components/PremiumCandles";
import HappyCustomers from "./components/HappyCustomers";
import LuxuryBirthdayGiftModal from "./components/LuxuryBirthdayGiftPoster";

const App = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowModal(true), 500); // opens after app loads
  }, []);

  return (
    <>
      <Navbar />

      {/* Popup on app start */}
      <LuxuryBirthdayGiftModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />

      <Routes>
        <Route path="/" element={<MobHome />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/candleGallery" element={<PremiumCandles />} />
        <Route path="/happyCustomers" element={<HappyCustomers />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
