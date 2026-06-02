/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isClicking, setIsClicking] = useState(false);

  // Position coordinates for mouse
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for trailing effect
  const springConfig = { damping: 40, stiffness: 450, mass: 0.5 };
  const trailingX = useSpring(cursorX, springConfig);
  const trailingY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 4);
      cursorY.set(e.clientY - 4);
      if (isHidden) setIsHidden(false);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Dynamic hover triggers
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'button, a, input, textarea, [role="button"], [contenteditable="true"], .admin-editable, .editable-hotspot'
      );
      
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovered(true));
        el.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Initial listener build and periodic rebuild in case DOM changes
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      observer.disconnect();
    };
  }, [cursorX, cursorY, isHidden]);

  if (isHidden) return null;

  return (
    <>
      {/* Precision center dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-luxury-charcoal rounded-full pointer-events-none z-[10000] hidden lg:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isClicking ? 0.6 : isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? "#2C2C2C" : "#2C2C2C",
        }}
        transition={{ type: "tween", duration: 0.15 }}
      />

      {/* Trailing fine aura ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-luxury-charcoal/20 pointer-events-none z-[9999] hidden lg:block"
        style={{
          x: trailingX,
          y: trailingY,
          width: 32,
          height: 32,
          // Offset to center around mouse point
          translateX: "-12px",
          translateY: "-12px",
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovered ? 1.8 : 1,
          borderColor: isHovered ? "rgba(44, 44, 44, 0.8)" : "rgba(44, 44, 44, 0.2)",
          backgroundColor: isHovered ? "rgba(200, 213, 192, 0.25)" : "rgba(200, 213, 192, 0)",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 25, mass: 0.2 }}
      />
    </>
  );
}
