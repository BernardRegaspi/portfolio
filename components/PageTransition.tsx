"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { revealPageTransition } from '@/utils/transition';

const PageTransition = () => {
  const transitionRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    // Only trigger reveal transition on non-homepage routes
    if (pathname !== '/') {
      // Ensure blocks are visible and covering screen immediately
      const blocks = document.querySelectorAll(".block");
      if (blocks.length > 0) {
        gsap.set(blocks, {
          visibility: "visible",
          scaleY: 1,
          force3D: true
        });
      }
      
      // Start reveal after ensuring page is rendered
      const timer = setTimeout(() => {
        revealPageTransition();
      }, 200);
      
      return () => clearTimeout(timer);
    } else {
      // On homepage, ensure blocks are hidden
      const blocks = document.querySelectorAll(".block");
      if (blocks.length > 0) {
        gsap.set(blocks, {
          visibility: "hidden",
          scaleY: 0
        });
      }
    }
  }, [pathname]);

  return (
    <div ref={transitionRef} className="transition">
      <div className="transition-row row-1">
        {[...Array(5)].map((_, i) => (
          <div key={`top-${i}`} className="block"></div>
        ))}
      </div>
      <div className="transition-row row-2">
        {[...Array(5)].map((_, i) => (
          <div key={`bottom-${i}`} className="block"></div>
        ))}
      </div>
    </div>
  );
};

export default PageTransition;
