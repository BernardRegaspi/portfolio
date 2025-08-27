import React from "react";
import PageTransition from "@/components/PageTransition";
import FullstackHomePage from "@/components/fullstack-components/FullstackHomePage";
import NavbarWorks from "@/components/NavbarWorks";

const FullstackDevelopment = () => {
  return (
    <div>
      <PageTransition />
      <FullstackHomePage />
      <NavbarWorks />
    </div>
  );
};

export default FullstackDevelopment;
