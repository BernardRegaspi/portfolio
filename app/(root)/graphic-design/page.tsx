import React from "react";
import PageTransition from "@/components/PageTransition";
import GraphicHomePage from "@/components/graphic-design-components/GraphicHomePage";
import MyWorks from "@/components/graphic-design-components/MyWorks";
import GraphicContact from "@/components/graphic-design-components/GraphicContact";
import Footer from "@/components/Footer";
import NavbarWorks from "@/components/NavbarWorks";

const GraphicDesign = () => {
  return (
    <div>
      <PageTransition />
      <NavbarWorks />
      <GraphicHomePage />
      <MyWorks />
      <GraphicContact />
      <Footer />
    </div>
  );
};

export default GraphicDesign;
