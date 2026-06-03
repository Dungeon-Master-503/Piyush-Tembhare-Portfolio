/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PortfolioData } from "./types";

export const initialPortfolioData: PortfolioData = {
  userName: "Piyush Tembhare",
  aboutText: "I am a freelance frontend engineer and an avid student of python and artificial intelligence. Driven by Swiss modern design principles and clean functional minimalist code, I engineer highly immersive websites that breathe life into premium brand stories. Based in India, I bridges the line between flawless editorial interfaces and intelligent backend applications.",
  skills: [
    "Freelancing",
    "Frontend Development",
    "Web Development",
    "Python for AI",
    "Tailwind CSS v4",
    "React / TypeScript",
    "Always Learning ✦"
  ],
  stats: {
    projectsDone: 2,
    skillsCount: 7,
    yearsLearning: 3
  },
  projects: [
    {
      id: "the-kitchen-ai-studio",
      name: "The Kitchen by AI Studio",
      description: "Designed and developed a modern, responsive website for a local café to establish its online presence and showcase its menu, services, and contact information. Focused on clean UI/UX, mobile responsiveness, and fast loading performance to improve customer engagement and accessibility.",
      url: "https://the-kitchen-by-ai-stud-piyush.vercel.app/",
      tags: ["React", "Vite", "Tailwind CSS", "UI/UX Design", "Responsive Layout", "Interactive Menu"]
    },
    {
      id: "cafe-eden-tumsar",
      name: "Cafe Eden Tumsar",
      description: "Designed and built a premium café website focused on enhancing customer engagement and brand identity. The website provides an immersive browsing experience with elegant visuals, detailed product showcases, and streamlined navigation to help visitors explore the café's offerings effortlessly.",
      url: "https://cafe-eden-tumsar.vercel.app/",
      tags: ["React", "TypeScript", "Aesthetic UI", "Brand Identity", "Interactive Gallery", "Mobile-First"]
    }
  ]
};
