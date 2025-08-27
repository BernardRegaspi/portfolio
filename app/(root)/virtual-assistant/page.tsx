import React from "react";
import PageTransition from "@/components/PageTransition";
import VirtualAssistantHomePage from "@/components/virtual-assistant-components/VirtualAssistantHomePage";
import NavbarWorks from "@/components/NavbarWorks";

const VirtualAssistant = () => {
  return (
    <div>
      <PageTransition />
      <VirtualAssistantHomePage/>
      <NavbarWorks/>
    </div>
  );
};

export default VirtualAssistant;
