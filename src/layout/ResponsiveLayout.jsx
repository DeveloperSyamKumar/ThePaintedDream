import React, { useEffect, useState } from "react";
import MobHome from "../mobile/MobHome";
import Home from "../components/Home";

export default function ResponsiveLayout() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768); // mobile breakpoint
    };

    checkScreen(); // initial
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <>
      {isMobile ? <MobHome /> : <Home />}
    </>
  );
}
