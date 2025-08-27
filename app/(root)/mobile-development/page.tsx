import React from "react";
import PageTransition from "@/components/PageTransition";
import MobileDevHomePage from "@/components/mobile-dev-components/MobileDevHomePage";
import NavbarWorks from "@/components/NavbarWorks";
const MobileDevelopment = () => {
  return (
    <div>
      <PageTransition />
      <MobileDevHomePage />
      <NavbarWorks />
    </div>
  );
};

export default MobileDevelopment;
