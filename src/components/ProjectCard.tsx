/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { ExternalLink, Trash2, Globe, LayoutTemplate } from "lucide-react";
import { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  isAdmin: boolean;
  onDelete: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isAdmin, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Generate Microlink screenshot URL
  const screenshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(project.url)}&screenshot=true&embed=screenshot.url`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-luxury-stone/60 bg-luxury-cream/30 p-5 min-h-[380px] hover:shadow-2xl hover:shadow-luxury-charcoal/5 transition-all duration-500 hover:-translate-y-1"
    >
      {/* Tiny Admin Overlay Frame Trash Badge */}
      {isAdmin && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (confirm(`Do you wish to remove "${project.name}"?`)) {
              onDelete(project.id);
            }
          }}
          className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100 hover:scale-110 active:scale-95 transition-all duration-300 shadow"
          title="Delete Project Assignment"
        >
          <Trash2 size={14} />
        </button>
      )}

      {/* Card Content Top half */}
      <div className="space-y-4">
        {/* Fine-art Mockup Window Frame */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-luxury-stone/30 border border-luxury-stone/40">
          {!imageError ? (
            <img
              src={screenshotUrl}
              alt={`${project.name} live preview thumbnail`}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            // Exquisite geometric fallback placeholder with luxury nature tone
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-tr from-luxury-cream via-luxury-stone/30 to-luxury-sage/20 p-4 text-center">
              <Globe size={24} className="text-luxury-charcoal/30 animate-pulse mb-1" />
              <p className="font-mono text-[9px] uppercase tracking-widest text-luxury-charcoal/50">
                Preview Generated
              </p>
            </div>
          )}

          {/* Quick interactive glass backdrop on hover */}
          <div className="absolute inset-0 bg-luxury-charcoal/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>

        <div className="space-y-1.5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-luxury-charcoal/50 block">
            Featured Interface
          </span>
          <h3 className="font-serif text-2xl tracking-wide text-luxury-charcoal group-hover:text-luxury-charcoal-light transition-colors">
            {project.name}
          </h3>
          <p className="font-sans text-xs text-luxury-charcoal/70 leading-relaxed pt-1 line-clamp-3">
            {project.description}
          </p>
        </div>
      </div>

      {/* Card Content Footer half */}
      <div className="mt-6 space-y-4 pt-4 border-t border-luxury-stone/30">
        {/* Dynamic Tag list */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-block font-mono text-[9px] uppercase tracking-wider text-luxury-charcoal/60 bg-luxury-stone/30 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Call to action arrow link */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-luxury-charcoal hover:gap-2.5 transition-all duration-300 group-hover:text-luxury-gold"
        >
          <span>Examine Project</span>
          <ExternalLink size={11} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-luxury-charcoal/60 group-hover:text-luxury-gold" />
        </a>
      </div>

      {/* Decorative luxury side focus line */}
      <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-luxury-sage scale-y-0 group-hover:scale-y-100 transform origin-top transition-transform duration-500" />
    </motion.div>
  );
};

export default ProjectCard;
