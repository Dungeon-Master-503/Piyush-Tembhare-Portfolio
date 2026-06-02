/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, X, BookmarkCheck } from "lucide-react";

interface SkillsSectionProps {
  skills: string[];
  onAddSkill: (skill: string) => void;
  onRemoveSkill: (skill: string) => void;
  isAdmin: boolean;
}

export default function SkillsSection({
  skills,
  onAddSkill,
  onRemoveSkill,
  isAdmin,
}: SkillsSectionProps) {
  const [newSkill, setNewSkill] = useState("");
  const [inputError, setInputError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanSkill = newSkill.trim();
    if (!cleanSkill) return;

    if (skills.some((s) => s.toLowerCase() === cleanSkill.toLowerCase())) {
      setInputError(true);
      return;
    }

    onAddSkill(cleanSkill);
    setNewSkill("");
    setInputError(false);
  };

  return (
    <section id="skills" className="py-24 bg-luxury-white relative overflow-hidden">
      {/* Absolute decorative nature vector symbol in the background */}
      <div className="absolute right-[-10%] top-[10%] w-[350px] h-[350px] rounded-full border border-luxury-sage/10 pointer-events-none z-0" />

      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#566e4a] bg-luxury-sage/20 border border-luxury-sage/30 px-3 py-1 rounded-full inline-block font-medium">
              Technical Stack & Philosophy
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-luxury-charcoal tracking-wide font-light">
              Core <span className="italic text-luxury-charcoal/85">Proficiencies</span> & Versatilities
            </h2>
            <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/60 leading-relaxed font-light">
              A carefully curated set of development practices, framework systems, and computational principles that guide my day-to-day work.
            </p>
          </div>

          {/* Inline Admin Form for Skill Appends */}
          {isAdmin && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-luxury-cream border border-luxury-gold/50 rounded-xl w-full md:w-80 shadow-md"
            >
              <form onSubmit={handleSubmit} className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block text-[10px] uppercase tracking-widest text-luxury-charcoal/70 font-semibold font-mono">
                    Append Proficiency
                  </label>
                  <span className="text-[10px] bg-luxury-gold text-white px-1.5 py-0.5 rounded font-mono font-medium scale-90">
                    ADMIN
                  </span>
                </div>
                <div className="relative flex">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => {
                      setNewSkill(e.target.value);
                      setInputError(false);
                    }}
                    placeholder="e.g. PyTorch, Next.JS..."
                    className="w-full px-3 py-2 bg-luxury-white border border-luxury-stone font-mono text-xs text-luxury-charcoal rounded-l-lg outline-none focus:border-luxury-charcoal transition-all"
                  />
                  <button
                    type="submit"
                    className="bg-luxury-charcoal hover:bg-black text-white px-3.5 rounded-r-lg transition-all duration-300"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                {inputError && (
                  <p className="text-[10px] text-red-500 font-mono">Proficiency already listed.</p>
                )}
              </form>
            </motion.div>
          )}
        </div>

        {/* Dynamic Tag layout */}
        <div className={`p-8 md:p-12 bg-luxury-cream/35 border border-luxury-stone/50 rounded-2xl flex flex-wrap gap-3 sm:gap-4 justify-center items-center relative ${isAdmin ? "admin-editable-active" : ""}`}>
          
          <AnimatePresence mode="popLayout">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: index * 0.04
                }}
                whileHover={{ scale: 1.04 }}
                className="group relative flex items-center justify-center bg-[#FAFAF8] border border-luxury-stone/60 px-5 py-3 rounded-full shadow-sm hover:shadow hover:border-luxury-sage group transition-all duration-300 select-none cursor-default"
              >
                {/* Micro pulse aura under normal circumstances */}
                <div className="absolute inset-0 rounded-full bg-luxury-sage/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <span className="relative z-10 font-mono text-xs sm:text-sm font-medium tracking-wide text-luxury-charcoal/80 group-hover:text-luxury-charcoal transition-colors">
                  {skill}
                </span>

                {/* Trash/Remove Tag Overlays in Admin Mode */}
                {isAdmin && (
                  <button
                    onClick={() => onRemoveSkill(skill)}
                    className="absolute -top-1.5 -right-1.5 bg-red-100 text-red-600 hover:bg-red-200 h-5 w-5 rounded-full flex items-center justify-center scale-90 shadow border border-red-200 transition-all cursor-pointer pointer-events-auto"
                    title={`Delete tag "${skill}"`}
                  >
                    <X size={10} strokeWidth={3} />
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Informational help note */}
          {skills.length === 0 && (
            <p className="font-mono text-xs text-luxury-charcoal/50 py-10">No items configured yet.</p>
          )}
        </div>

        {/* Floating background aesthetic label */}
        <div className="mt-8 flex justify-center items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-luxury-charcoal/40 text-center select-none">
          <BookmarkCheck size={10} className="text-luxury-sage" />
          <span>Every proficiency backed by rigorous self-driven discovery & testing</span>
        </div>
      </div>
    </section>
  );
}
