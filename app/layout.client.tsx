"use client";

import { useEffect } from "react";

export function CSSPreloadFix() {
  useEffect(() => {
    // Remove unused CSS preload warnings by ensuring all preloaded CSS is used
    const preloadedLinks = document.querySelectorAll(
      'link[rel="preload"][as="style"]'
    );

    preloadedLinks.forEach((link) => {
      const href = (link as HTMLLinkElement).href;

      // Check if the CSS file is actually used
      const isUsed = Array.from(document.styleSheets).some((sheet) => {
        try {
          return (
            sheet.href === href && sheet.cssRules && sheet.cssRules.length > 0
          );
        } catch (e) {
          return false;
        }
      });

      // If not used within 3 seconds, convert preload to regular link
      if (!isUsed) {
        setTimeout(() => {
          const regularLink = document.createElement("link");
          regularLink.rel = "stylesheet";
          regularLink.href = href;
          document.head.appendChild(regularLink);
          link.remove();
        }, 3000);
      }
    });
  }, []);

  return null;
}
