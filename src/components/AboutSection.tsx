/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Edit2, Check, HelpCircle, Camera, Upload, Link2, Trash2 } from "lucide-react";
import InteractiveStats from "./InteractiveStats";

interface AboutSectionProps {
  userName: string;
  aboutText: string;
  onUpdateAboutText: (text: string) => void;
  onUpdatePortrait: (url: string) => void;
  isAdmin: boolean;
  stats: {
    projectsDone: number;
    skillsCount: number;
    yearsLearning: number;
  };
  portraitImageUrl: string;
  portraitBwImg?: string;
  portraitRedImg?: string;
  originalPortraitImg?: string;
}

export default function AboutSection({
  userName,
  aboutText,
  onUpdateAboutText,
  onUpdatePortrait,
  isAdmin,
  stats,
  portraitImageUrl,
  portraitBwImg,
  portraitRedImg,
  originalPortraitImg,
}: AboutSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(aboutText);
  const [isPortraitEditing, setIsPortraitEditing] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [portraitError, setPortraitError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Synchronize when outer state modifications take place
  useEffect(() => {
    setEditText(aboutText);
  }, [aboutText]);

  const handleSave = () => {
    onUpdateAboutText(editText);
    setIsEditing(false);
  };

  return (
    <section id="about" className="py-24 md:py-36 bg-luxury-cream/15 border-y border-luxury-stone/30 relative">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left: Beautiful organic architectural crop frame profile */}
          <div className="lg:col-span-5 flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[380px] md:h-[380px] rounded-full overflow-hidden border border-luxury-stone/50 bg-luxury-stone/20 p-2 shadow-2xl shadow-luxury-charcoal/5 group"
            >
              {/* Inner floating border */}
              <div className="absolute inset-4 rounded-full border border-dashed border-luxury-stone/30 pointer-events-none z-10" />
              
              <img
                src={portraitImageUrl}
                alt={`${userName} portrait`}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover rounded-full transition-all duration-1000 ease-out scale-100 hover:scale-105 ${
                  portraitImageUrl === portraitRedImg ? "" : "grayscale hover:grayscale-0"
                }`}
              />

              {/* Secure Admin Edit Overlay */}
              {isAdmin && (
                <button
                  onClick={() => setIsPortraitEditing(!isPortraitEditing)}
                  className="absolute inset-0 bg-luxury-charcoal/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer z-20 border-none outline-none"
                  title="Upload custom portrait or provide link"
                >
                  <Camera size={28} className="text-luxury-gold mb-1.5 animate-bounce" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#FAFAF8] font-bold">
                    Edit Portal Image
                  </span>
                </button>
              )}
              
              {/* Luxury architectural bottom circular badge */}
              <div className="absolute bottom-4 right-4 bg-luxury-charcoal text-white rounded-full h-14 w-14 sm:h-16 sm:w-16 flex flex-col items-center justify-center p-2 text-center shadow-lg border border-luxury-stone/30 z-20 hover:rotate-12 transition-transform duration-500">
                <span className="font-serif text-[8px] sm:text-[9px] tracking-wider">CREATIVE</span>
                <span className="font-mono text-[6px] sm:text-[7px] uppercase text-luxury-sage tracking-widest font-semibold mt-0.5">DEV</span>
              </div>
            </motion.div>

            {/* High-end Aesthetic Portrait Preset Switcher */}
            <div className="flex flex-col items-center gap-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-luxury-charcoal/40 font-bold">
                Aesthetic Portrait Preset
              </span>
              <div className="flex items-center gap-3 bg-[#FAFAF8] border border-luxury-stone/30 p-1.5 px-3 rounded-full shadow-sm">
                {portraitBwImg && (
                  <button
                    onClick={() => onUpdatePortrait(portraitBwImg)}
                    className={`relative w-8 h-8 rounded-full overflow-hidden border transition-all duration-300 cursor-pointer ${
                      portraitImageUrl === portraitBwImg 
                        ? "border-luxury-gold scale-110 ring-2 ring-luxury-gold/30" 
                        : "border-luxury-stone/30 hover:border-luxury-charcoal hover:scale-105"
                    }`}
                    title="Classic Editorial Mono"
                  >
                    <img src={portraitBwImg} alt="Mono preset" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                  </button>
                )}
                {portraitRedImg && (
                  <button
                    onClick={() => onUpdatePortrait(portraitRedImg)}
                    className={`relative w-8 h-8 rounded-full overflow-hidden border transition-all duration-300 cursor-pointer ${
                      portraitImageUrl === portraitRedImg 
                        ? "border-luxury-gold scale-110 ring-2 ring-luxury-gold/30" 
                        : "border-luxury-stone/30 hover:border-luxury-charcoal hover:scale-105"
                    }`}
                    title="Creative Ambient Crimson"
                  >
                    <img src={portraitRedImg} alt="Crimson preset" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                )}
                {originalPortraitImg && (
                  <button
                    onClick={() => onUpdatePortrait(originalPortraitImg)}
                    className={`relative w-8 h-8 rounded-full overflow-hidden border transition-all duration-300 cursor-pointer ${
                      portraitImageUrl === originalPortraitImg 
                        ? "border-luxury-gold scale-110 ring-2 ring-luxury-gold/30" 
                        : "border-luxury-stone/30 hover:border-luxury-charcoal hover:scale-105"
                    }`}
                    title="Studio Natural"
                  >
                    <img src={originalPortraitImg} alt="Natural preset" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                  </button>
                )}
              </div>
            </div>

            {/* Admin Photo Control panel */}
            {isAdmin && isPortraitEditing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm bg-[#FAFAF8] border border-luxury-gold/40 rounded-xl p-4 shadow-lg space-y-4 text-left relative z-30"
              >
                <div className="flex items-center justify-between border-b border-luxury-stone/30 pb-2">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-luxury-gold font-bold flex items-center gap-1.5">
                    <Camera size={12} /> Custom Artist Portrait
                  </span>
                  <button 
                    onClick={() => {
                      setIsPortraitEditing(false);
                      setPortraitError("");
                    }} 
                    className="text-luxury-charcoal/50 hover:text-luxury-charcoal text-[9px] font-mono uppercase tracking-wider"
                  >
                    Close
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Option 1: File Storage Upload */}
                  <div>
                    <label className="block font-mono text-[8px] uppercase tracking-wider text-luxury-charcoal/60 mb-1">
                      Option A: File Storage Upload
                    </label>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-2 px-3 border border-dashed border-luxury-stone hover:border-luxury-charcoal bg-luxury-cream/15 hover:bg-luxury-cream/30 text-luxury-charcoal text-xs rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-medium"
                    >
                      <Upload size={13} className="text-luxury-gold" />
                      Browse computer file...
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 2 * 1024 * 1024) {
                            setPortraitError("File size is too large (max 2MB for storage safety).");
                            return;
                          }
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            if (typeof reader.result === "string") {
                              onUpdatePortrait(reader.result);
                              setPortraitError("");
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>

                  {/* Option 2: Image Web URL Address */}
                  <div className="space-y-1">
                    <label className="block font-mono text-[8px] uppercase tracking-wider text-luxury-charcoal/60">
                      Option B: Image Web URL Address
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="url"
                        value={imageUrlInput}
                        onChange={(e) => setImageUrlInput(e.target.value)}
                        placeholder="e.g. https://unsplash.com/..."
                        className="flex-grow px-3 py-1.5 bg-luxury-cream/20 border border-luxury-stone rounded-lg text-xs outline-none focus:border-luxury-charcoal transition-all font-sans"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (imageUrlInput.trim()) {
                            onUpdatePortrait(imageUrlInput.trim());
                            setImageUrlInput("");
                            setPortraitError("");
                          }
                        }}
                        className="px-3 bg-luxury-charcoal text-white text-[10px] rounded-lg hover:bg-black transition font-mono uppercase tracking-wide"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  {portraitError && (
                    <p className="text-[9px] text-red-500 font-mono italic bg-red-50 p-1 rounded-md border border-red-100">{portraitError}</p>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#566e4a] bg-luxury-sage/20 border border-luxury-sage/30 px-3 py-1 rounded-full inline-block font-medium">
                {userName}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-luxury-charcoal tracking-wide font-light">
                Crafting digital items that <span className="italic text-luxury-charcoal/85">feel alive</span>.
              </h2>
            </div>

            {/* Editable Biography Space */}
            <div className={`relative group p-1 rounded-lg ${isAdmin ? "admin-editable-active" : ""}`}>
              {isEditing ? (
                <div className="space-y-3">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows={5}
                    className="w-full p-4 bg-luxury-cream border border-luxury-gold focus:border-luxury-charcoal rounded-xl text-[#3a3a3a] outline-none text-base font-sans leading-relaxed transition-all shadow-inner"
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => {
                        setEditText(aboutText);
                        setIsEditing(false);
                      }}
                      className="px-3.5 py-1.5 border border-luxury-stone/60 text-xs uppercase tracking-wider rounded-md hover:bg-luxury-stone/20 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-3.5 py-1.5 bg-luxury-charcoal text-white text-xs uppercase tracking-wider rounded-md hover:bg-luxury-charcoal/95 transition flex items-center gap-1.5 shadow"
                    >
                      <Check size={12} />
                      Commit
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  onDoubleClick={() => { if (isAdmin) setIsEditing(true); }}
                  className="relative group-hover:bg-luxury-stone/10 p-1 rounded transition duration-200"
                >
                  <p className="font-sans text-base md:text-lg text-luxury-charcoal/85 leading-relaxed font-light">
                    {aboutText}
                  </p>
                  {isAdmin && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-luxury-gold text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow duration-300 pointer-events-auto cursor-pointer"
                      title="Edit Bio Description"
                    >
                      <Edit2 size={12} />
                    </button>
                  )}
                  {isAdmin && !isEditing && (
                    <span className="block mt-2 font-mono text-[9px] uppercase tracking-widest text-luxury-gold animate-pulse">
                      Double Click text block to modify inline
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Custom Interactive Stats Section */}
            <InteractiveStats stats={stats} />
          </div>

        </div>
      </div>
    </section>
  );
}
