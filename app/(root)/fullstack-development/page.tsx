import React from "react";
import PageTransition from "@/components/PageTransition";
import FullstackHomePage from "@/components/fullstack-components/FullstackHomePage";
import FullstackProjects from "@/components/fullstack-components/FullstackProjects";
import FullstackContact from "@/components/fullstack-components/FullstackContact";
import NavbarWorks from "@/components/NavbarWorks";
import Footer from "@/components/Footer";

const FullstackDevelopment = () => {
  return (
    <div>
      <PageTransition />
      <FullstackHomePage />
      <FullstackProjects />
      <FullstackContact />
      <NavbarWorks />
      <Footer/>
    </div>
  );
};

export default FullstackDevelopment;
