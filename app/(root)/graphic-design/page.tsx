import React from "react";
import PageTransition from "@/components/PageTransition";
import GraphicHomePage from "@/components/graphic-design-components/GraphicHomePage";
import MyWorks from "@/components/graphic-design-components/MyWorks";
import GraphicNavbar from "@/components/graphic-design-components/GraphicNavbar";
import GraphicContact from "@/components/graphic-design-components/GraphicContact";
import Footer from "@/components/Footer";

const GraphicDesign = () => {
  return (
    <div>
      <PageTransition />
      <GraphicNavbar/>
      <GraphicHomePage />
      <MyWorks/>
      <GraphicContact/>
      <Footer/>
    </div>
  );
};

export default GraphicDesign;
