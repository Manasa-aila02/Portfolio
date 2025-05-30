import React, { useEffect, useRef, useState } from "react";

const colors = [
  "rgba(255, 76, 96, 0.3)",
  "rgba(255, 213, 107, 0.3)",
  "rgba(107, 255, 184, 0.3)",
  "rgba(76, 145, 255, 0.3)",
  "rgba(212, 107, 255, 0.3)",
];

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const requestRef = useRef(null);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [colorIndex, setColorIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile screen width or touch device
    const checkMobile = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768; // or your breakpoint
      setIsMobile(isTouch || isSmallScreen);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // don't run animation on mobile

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      setPosition({ x: currentX, y: currentY });
      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colors.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isMobile]);

  if (isMobile) {
    // On mobile, render nothing or just return null to disable the cursor
    return null;
  }

  return (
    <>
      <style>{`
        body, * {
          cursor: none !important;
        }
      `}</style>
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: position.y,
          left: position.x,
          width: 35,
          height: 35,
          borderRadius: "50%",
          backgroundColor: colors[colorIndex],
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          transition: "background-color 1.5s ease",
          zIndex: 9999,
          backdropFilter: "blur(8px)",
          border: "1.5px solid rgba(255, 255, 255, 0.2)",
          boxShadow: `0 0 8px ${colors[colorIndex]}`,
        }}
      />
    </>
  );
};

export default CustomCursor;
