"use client";

import { useState, useEffect } from "react";
import HomePage from "@/components/HomePage";
import Preloader from "@/components/Preloader";
import Tools from "@/components/Tools";
import Navbar from "@/components/Navbar";
import MyServices from "@/components/MyServices";
import ContactMe from "@/components/ContactMe";
import Footer from "@/components/Footer";
import PreloaderFinished from "@/components/PreloaderFinished";
import MyCertificates from "@/components/MyCertificates";
// import SplineViewer from "@/components/SplineViewer";

export default function Home() {
  const [hasSeenFullPreloader, setHasSeenFullPreloader] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const isPageReload = sessionStorage.getItem("isPageReload");

    if (isPageReload === "true") {
      sessionStorage.removeItem("hasSeenFullPreloader");
      sessionStorage.removeItem("isPageReload");
      setHasSeenFullPreloader(false);
    } else {
      const hasSeenPreloaderInSession = sessionStorage.getItem(
        "hasSeenFullPreloader"
      );

      if (hasSeenPreloaderInSession === "true") {
        setHasSeenFullPreloader(true);
      }
    }

    // Set flag to detect page reload on next load, but only for homepage
    const handleBeforeUnload = () => {
      if (window.location.pathname === "/") {
        sessionStorage.setItem("isPageReload", "true");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Hide scrollbar when preloader is showing
  useEffect(() => {
    if (showPreloader) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scrollbar
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showPreloader]);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    if (!hasSeenFullPreloader) {
      sessionStorage.setItem("hasSeenFullPreloader", "true");
      setHasSeenFullPreloader(true);
    }
  };

  return (
    <div>
      {showPreloader &&
        (!hasSeenFullPreloader ? (
          <Preloader onComplete={handlePreloaderComplete} />
        ) : (
          <PreloaderFinished onComplete={handlePreloaderComplete} />
        ))}
      <Navbar />
      <HomePage />
      <Tools />
      <MyCertificates />
      <MyServices />
      <ContactMe />
      <Footer />
      {/* <SplineViewer /> */}
    </div>
  );
}
