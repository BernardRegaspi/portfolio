import gsap from "gsap";

export const animatePageTransition = () => {
  return new Promise<void>((resolve) => {
    const blocks = document.querySelectorAll(".block");
    if (!blocks || blocks.length === 0) {
      console.warn("No transition blocks found");
      resolve();
      return;
    }

    const blocksArray = Array.from(blocks);

    // Set initial state: visible and scaled to 0
    gsap.set(blocksArray, { visibility: "visible", scaleY: 0 });
    
    // Animate to cover the screen
    gsap.to(blocksArray, {
      scaleY: 1,
      duration: 1,
      stagger: {
        each: 0.1,
        from: "start",
        grid: [2, 5],
        axis: "x",
      },
      ease: "power4.inOut",
      onComplete: resolve,
    });
  });
};

export const revealPageTransition = () => {
  return new Promise<void>((resolve) => {
    const blocks = document.querySelectorAll(".block");
    if (!blocks || blocks.length === 0) {
      console.warn("No transition blocks found");
      resolve();
      return;
    }

    const blocksArray = Array.from(blocks);

    // Animate to reveal the page (blocks should already be covering screen)
    gsap.to(blocksArray, {
      scaleY: 0,
      duration: 0.8,
      stagger: {
        each: 0.12,
        from: "start",
        grid: [2, 5],
        axis: "x",
      },
      ease: "power3.inOut",
      onComplete: () => {
        gsap.set(blocksArray, { visibility: "hidden" });
        resolve();
      },
    });
  });
};
