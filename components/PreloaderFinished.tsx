"use client";

import React, { useState, useEffect } from "react";
import "../app/styles/preloader.css";

interface PreloaderFinishedProps {
  onComplete?: () => void;
}

export default function PreloaderFinished({ onComplete }: PreloaderFinishedProps) {
  const [visible, setVisible] = useState(true);
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    console.log("Preloader: Starting animation");

    const timer = setTimeout(() => {
      console.log("Preloader: Hiding after animation");
      setVisible(false);
      setTimeout(() => {
        setShouldShow(false);
        onComplete?.(); // Call the completion callback
      }, 900);
    }, 900);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!shouldShow) return null;

  return (
    <div
      className={`preloader-container fixed inset-0 z-[999999] bg-black transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="anime">
        <div className="load">
        </div>
        {/* <LinearProgressWithLabel value={progress} /> */}
      </div>
    </div>
  );
}
