/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, X, ListPlus, FolderGit, LayoutGrid, CheckCircle } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { Project } from "../types";

interface ProjectsSectionProps {
  projects: Project[];
  onAddProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
  isAdmin: boolean;
}

export default function ProjectsSection({
  projects,
  onAddProject,
  onDeleteProject,
  isAdmin,
}: ProjectsSectionProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || !url.trim()) return;

    // Split tags by comma and sanitise
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      url: url.trim(),
      tags: tags.length > 0 ? tags : ["Freelance", "Frontend"],
    };

    onAddProject(newProject);
    
    // Reset Form Input
    setName("");
    setDescription("");
    setUrl("");
    setTagsInput("");
    setIsFormOpen(false);
  };

  return (
    <section id="work" className="py-24 md:py-36 bg-luxury-cream/10 relative">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#566e4a] bg-luxury-sage/20 border border-luxury-sage/30 px-3 py-1 rounded-full inline-block font-medium">
              Portfolio Catalog
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-luxury-charcoal tracking-wide font-light">
              Crafted <span className="italic text-luxury-charcoal/85">Websites</span> & Creative Projects
            </h2>
            <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/60 leading-relaxed font-light">
              A precise grid of full-stack engineering, frontend layouts, custom web applications, and automation scripts. Every detail crafted back to performance, precision, and elegance.
            </p>
          </div>

          {/* Trigger to expand Admin Addition form inside admin state */}
          {isAdmin && (
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="px-5 py-3 bg-[#D4AF37] hover:bg-[#bfa032] text-white rounded-lg text-xs uppercase tracking-widest font-semibold flex items-center gap-2.5 transition-all duration-300 shadow-md transform hover:translate-y-[-1px] cursor-pointer"
            >
              {isFormOpen ? <X size={14} /> : <ListPlus size={14} />}
              <span>{isFormOpen ? "Close Panel" : "Add Website or Project"}</span>
            </button>
          )}
        </div>

        {/* Expandable Project Form Drawer */}
        <AnimatePresence>
          {isAdmin && isFormOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-16"
            >
              <form 
                onSubmit={handleSubmit} 
                className="p-6 md:p-8 rounded-2xl border border-luxury-gold bg-[#FAFAF8] shadow-lg space-y-6 max-w-2xl mx-auto"
              >
                <div className="flex items-center gap-2 border-b border-luxury-stone/50 pb-3">
                  <FolderGit size={18} className="text-luxury-gold" />
                  <h3 className="font-serif text-xl font-light">Insert Website or Project Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-luxury-charcoal/70">
                      Website or Project Name
                    </label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alpine E-Boutique"
                      className="w-full px-4 py-2.5 bg-luxury-cream/40 border border-luxury-stone rounded-lg text-xs outline-none focus:border-luxury-charcoal transition-all font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-luxury-charcoal/70">
                      Live URL (Screenshots auto-load)
                    </label>
                    <input
                      required
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://yourproject.com"
                      className="w-full px-4 py-2.5 bg-luxury-cream/40 border border-luxury-stone rounded-lg text-xs outline-none focus:border-luxury-charcoal transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-luxury-charcoal/70">
                    Website or Project Description
                  </label>
                  <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="Describe the style, purpose, technical stack, and outcomes..."
                    className="w-full px-4 py-2.5 bg-luxury-cream/40 border border-luxury-stone rounded-lg text-xs outline-none focus:border-luxury-charcoal transition-all font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-luxury-charcoal/70">
                    Tags / Technologies (Comma classified)
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="React, TypeScript, Python, Tailwind"
                    className="w-full px-4 py-2.5 bg-luxury-cream/40 border border-luxury-stone rounded-lg text-xs outline-none focus:border-luxury-charcoal transition-all font-mono"
                  />
                  <p className="text-[9px] text-luxury-charcoal/40 font-mono">
                    Divide multiple tools with commas to format them as separate labels.
                  </p>
                </div>

                <div className="flex gap-3 justify-end pt-3 border-t border-luxury-stone/50">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 border border-luxury-stone text-[10px] uppercase tracking-widest font-mono rounded-lg hover:bg-luxury-cream transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-luxury-charcoal text-white text-[10px] uppercase tracking-widest font-mono rounded-lg hover:bg-[#1a1a1a] transition flex items-center gap-1.5"
                  >
                    <CheckCircle size={11} />
                    Deploy to Gallery
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Masonry/Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          <AnimatePresence mode="popLayout">
            {projects.map((proj) => (
              <ProjectCard
                key={proj.id}
                project={proj}
                isAdmin={isAdmin}
                onDelete={onDeleteProject}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State warning */}
        {projects.length === 0 && (
          <div className="py-24 text-center space-y-4">
            <LayoutGrid className="mx-auto text-luxury-charcoal/20 animate-pulse" size={42} />
            <p className="font-serif text-xl text-luxury-charcoal/50">No websites or projects registered yet.</p>
            {isAdmin && (
              <p className="font-mono text-[10px] text-luxury-gold uppercase tracking-widest">
                Use the Add Website or Project button above to publish works.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
