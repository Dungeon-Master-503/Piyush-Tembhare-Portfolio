/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, Flame, Sparkles, Edit2, Check } from "lucide-react";

interface HeroSectionProps {
  userName: string;
  onUpdateUserName: (name: string) => void;
  isAdmin: boolean;
  onScrollToWork: () => void;
  onScrollToConnect: () => void;
  backgroundImageUrl: string;
}

const TYPE_ROLES = [
  "Freelance Developer",
  "Frontend Architect",
  "React & Typescript Expert",
  "Python & AI Explorer"
];

export default function HeroSection({
  userName,
  onUpdateUserName,
  isAdmin,
  onScrollToWork,
  onScrollToConnect,
  backgroundImageUrl,
}: HeroSectionProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userName || "Piyush Tembhare");

  // Sync temp name when props improve
  useEffect(() => {
    setTempName(userName || "Piyush Tembhare");
  }, [userName]);

  // Typewriter algorithm
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = TYPE_ROLES[roleIndex];
    const typingSpeed = isDeleting ? 30 : 75;

    const handleType = () => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          // Pause before deleting
          timer = setTimeout(() => setIsDeleting(true), 2500);
          return;
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % TYPE_ROLES.length);
          return;
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  const handleSaveName = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanTemp = (tempName || "").trim();
    if (cleanTemp) {
      onUpdateUserName(cleanTemp);
      setIsEditingName(false);
    }
  };

  // Gracefully segment name for stylish display layout
  const names = (tempName || "").trim().split(/\s+/);
  const firstName = names[0] || "Piyush";
  const lastName = names.slice(1).join(" ") || "Tembhare";

  return (
    <section className="relative h-screen w-full flex flex-col justify-center overflow-hidden bg-luxury-white">
      {/* Parallax ambient background with low-opacity wash overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.45]"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          transform: `translateY(var(--scroll-offset, 0px))`,
        }}
      />
      
      {/* Editorial geometric overlay */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-luxury-white to-transparent pointer-events-none" />

      {/* Main Container */}
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 flex flex-col justify-between h-[82vh] max-w-7xl pt-24">
        {/* Subtle top organic pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center gap-1.5 self-start bg-luxury-sage/20 border border-luxury-sage/30 px-3.5 py-1 rounded-full text-[9px] uppercase tracking-widest text-[#566e4a] font-medium font-mono"
        >
          <Sparkles size={9} className="animate-pulse" />
          <span>Available for Freelance Craftsmanship</span>
        </motion.div>

        {/* Display Typography */}
        <div className="my-auto space-y-4 md:space-y-6 max-w-4xl relative">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="font-mono text-xs md:text-sm uppercase tracking-widest text-luxury-charcoal/60"
          >
            Hi, I'm
          </motion.p>

          {isEditingName ? (
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSaveName}
              className="flex flex-col sm:flex-row gap-3 items-center max-w-lg z-20 relative bg-luxury-white/90 p-4 rounded-xl border border-luxury-gold shadow-lg"
            >
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="w-full px-4 py-2 border border-luxury-stone focus:border-luxury-charcoal text-sm outline-none font-serif text-luxury-charcoal bg-[#FAFAF8] rounded-md"
                autoFocus
                placeholder="Enter display name..."
              />
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setTempName(userName);
                    setIsEditingName(false);
                  }}
                  className="px-3.5 py-2 border border-luxury-stone/60 text-xs uppercase tracking-wider rounded-md hover:bg-luxury-stone/20 transition flex-1 sm:flex-none justify-center text-center text-luxury-charcoal/80"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-luxury-charcoal text-white text-xs uppercase tracking-wider rounded-md hover:bg-[#1a1a1a] transition flex items-center justify-center gap-1 flex-1 sm:flex-none shadow"
                >
                  <Check size={12} />
                  Update
                </button>
              </div>
            </motion.form>
          ) : (
            <div 
              onDoubleClick={() => { if (isAdmin) setIsEditingName(true); }}
              className={`relative group inline-block ${isAdmin ? "admin-editable-active" : ""}`}
            >
              <h1 className="leading-tight select-none">
                <motion.span
                  initial={{ opacity: 0, filter: "blur(10px)", y: 30 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                  className="block font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-luxury-charcoal tracking-tight font-light font-style-normal"
                >
                  {firstName}
                </motion.span>
                {lastName && (
                  <motion.span
                    initial={{ opacity: 0, filter: "blur(10px)", y: 35 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
                    className="block font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-luxury-charcoal/85 italic font-thin tracking-normal pl-4 sm:pl-16 md:pl-24"
                  >
                    {lastName}
                  </motion.span>
                )}
              </h1>

              {isAdmin && (
                <button
                  onClick={() => setIsEditingName(true)}
                  className="absolute -top-4 -right-4 h-8 w-8 rounded-full bg-luxury-gold text-white flex items-center justify-center hover:scale-105 active:scale-95 transition shadow duration-300 pointer-events-auto"
                  title="Modify Display Signature"
                >
                  <Edit2 size={12} />
                </button>
              )}
              {isAdmin && (
                <span className="block mt-2 font-mono text-[9px] uppercase tracking-widest text-luxury-gold animate-pulse">
                  Double Click name block to modify signature
                </span>
              )}
            </div>
          )}

          {/* Typewriter subtitle role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="h-10 flex items-center"
          >
            <p className="font-mono text-sm sm:text-base md:text-lg tracking-wider text-luxury-charcoal/80 flex items-center">
              <span className="text-luxury-sage mr-2">✦</span>
              <span className="font-medium mr-1">{currentText}</span>
              <span className="w-[1.5px] h-5 bg-luxury-charcoal inline-block animate-pulse"></span>
            </p>
          </motion.div>

          {/* Floating actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            {/* Liquid hover responsive outline buttons */}
            <button
              onClick={onScrollToWork}
              className="relative px-7 py-3.5 overflow-hidden text-xs uppercase tracking-widest font-semibold text-[#FAFAF8] bg-luxury-charcoal border border-luxury-charcoal rounded-lg transition-all duration-300 transform hover:translate-y-[-1px] shadow-sm hover:shadow-lg active:translate-y-0"
            >
              View My Work
            </button>

            <button
              onClick={onScrollToConnect}
              className="relative px-7 py-3.5 overflow-hidden text-xs uppercase tracking-widest font-semibold text-luxury-charcoal border border-luxury-charcoal/50 hover:bg-luxury-cream hover:border-luxury-charcoal rounded-lg transition-all duration-300 transform hover:translate-y-[-1px] active:translate-y-0"
            >
              Let's Connect
            </button>
          </motion.div>
        </div>

        {/* Subtle, thin scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="flex flex-col items-center gap-2 self-center mt-auto cursor-pointer group"
          onClick={onScrollToWork}
        >
          <span className="font-mono text-[9px] uppercase tracking-widest text-luxury-charcoal/40 group-hover:text-luxury-charcoal transition-colors">
            Scroll To Explore
          </span>
          <div className="relative w-[1px] h-12 bg-luxury-stone overflow-hidden rounded-full">
            <motion.div
              animate={{
                y: [0, 48, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-0 inset-x-0 h-4 bg-luxury-sage"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
