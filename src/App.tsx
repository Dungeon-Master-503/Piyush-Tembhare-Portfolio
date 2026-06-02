/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Trash2, LogOut, ArrowUp, Menu, X, ArrowUpRight, Lock } from "lucide-react";

import CustomCursor from "./components/CustomCursor";
import AdminModal from "./components/AdminModal";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";

import { PortfolioData, Project } from "./types";
import { initialPortfolioData } from "./data";

// Resolve generated master assets using static Vite asset resolution
const mountainMistImg = new URL("./assets/images/mountain_mist_1780325086245.png", import.meta.url).href;
const profilePortraitImg = new URL("./assets/images/profile_portrait_1780325107018.png", import.meta.url).href;
const portraitBwImg = new URL("./assets/images/piyush_portrait_bw_1780407660201.png", import.meta.url).href;
const portraitRedImg = new URL("./assets/images/piyush_portrait_red_1780407681641.png", import.meta.url).href;

export default function App() {
  // --- STATE PERSISTENCE CLIENT SIDE ---
  const [portfolio, setPortfolio] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem("piyush_portfolio_data_v2");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure any preloaded mock show projects are automatically and cleanly removed from client browser storage
        if (parsed.projects && Array.isArray(parsed.projects)) {
          parsed.projects = parsed.projects.filter((p: any) => 
            p.id !== "proj-1" && 
            p.id !== "proj-2" && 
            p.id !== "proj-3" &&
            p.name !== "Alpine Design Agency" &&
            p.name !== "Zenith Python AI Playpen" &&
            p.name !== "Sabi Artisan Marketplace"
          );
        }
        return {
          ...initialPortfolioData,
          ...parsed
        };
      } catch (err) {
        // Fallback on corrupt parsing
      }
    }
    return initialPortfolioData;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem("piyush_admin_auth") === "authenticated";
  });
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Synchronize state down to localStorage
  useEffect(() => {
    localStorage.setItem("piyush_portfolio_data_v2", JSON.stringify(portfolio));
  }, [portfolio]);

  // Set the dynamic luxury SEO page title
  useEffect(() => {
    document.title = `${portfolio.userName} — Frontend Developer & Freelancer`;
  }, [portfolio.userName]);

  // Monitor Scroll Progress & Top visibility triggers
  useEffect(() => {
    const handleScroll = () => {
      // 1. Progress line computation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollHeight((window.scrollY / totalHeight) * 100);
      }

      // 2. Parallax offsets
      document.documentElement.style.setProperty("--scroll-offset", `${window.scrollY * 0.3}px`);

      // 3. Back-to-top status
      if (window.scrollY > 600) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Monitor Hash navigations immediately (/#admin)
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === "#admin") {
        setIsAdminModalOpen(true);
      }
    };

    // Initial load check
    checkHash();

    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  // --- COMPONENT HANDLERS FOR ADMINISTRATIVE COMMANDS ---
  const handleLoginSuccess = () => {
    setIsAdmin(true);
    sessionStorage.setItem("piyush_admin_auth", "authenticated");
    // Clear URL hash to look clean
    if (window.location.hash === "#admin") {
      window.location.hash = "";
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem("piyush_admin_auth");
  };

  const handleUpdateUserName = (newName: string) => {
    setPortfolio((prev) => ({
      ...prev,
      userName: newName,
    }));
  };

  const handleUpdateAboutText = (newText: string) => {
    setPortfolio((prev) => ({
      ...prev,
      aboutText: newText,
    }));
  };

  const handleUpdatePortrait = (newUrl: string) => {
    setPortfolio((prev) => ({
      ...prev,
      portraitImageUrl: newUrl,
    }));
  };

  const handleAddSkill = (newSkill: string) => {
    setPortfolio((prev) => {
      if (prev.skills.includes(newSkill)) return prev;
      return {
        ...prev,
        skills: [...prev.skills, newSkill],
        stats: {
          ...prev.stats,
          skillsCount: prev.skills.length + 1,
        },
      };
    });
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setPortfolio((prev) => {
      const filtered = prev.skills.filter((s) => s !== skillToRemove);
      return {
        ...prev,
        skills: filtered,
        stats: {
          ...prev.stats,
          skillsCount: Math.max(0, filtered.length),
        },
      };
    });
  };

  const handleAddProject = (newProject: Project) => {
    setPortfolio((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects],
      stats: {
        ...prev.stats,
        projectsDone: prev.projects.length + 1,
      },
    }));
  };

  const handleDeleteProject = (projectId: string) => {
    setPortfolio((prev) => {
      const filtered = prev.projects.filter((p) => p.id !== projectId);
      return {
        ...prev,
        projects: filtered,
        stats: {
          ...prev.stats,
          projectsDone: Math.max(0, filtered.length),
        },
      };
    });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-luxury-white text-luxury-charcoal flex flex-col selection:bg-luxury-sage/40">
      
      {/* 3% opacity micro organic texture layer */}
      <div className="grain-overlay" />

      {/* Lagging magnetic interactive dots */}
      <CustomCursor />

      {/* Editorial top thin linear progress bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-luxury-sage z-[9999] transition-all duration-100"
        style={{ width: `${scrollHeight}%` }}
      />

      {/* Floating active header */}
      <header className="fixed top-0 left-0 inset-x-0 h-20 items-center justify-between px-6 md:px-12 lg:px-24 flex z-50 pointer-events-none max-w-7xl mx-auto">
        {/* PT Monogram Emblem */}
        <div 
          onClick={() => scrollToSection("top")}
          className="h-10 w-10 flex items-center justify-center rounded-full border border-luxury-stone/60 bg-luxury-white/70 backdrop-blur-md pointer-events-auto cursor-pointer hover:border-luxury-charcoal transition shadow-sm font-serif select-none font-bold"
        >
          PT
        </div>

        {/* Minimal logout node inside Admin state */}
        {isAdmin ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 bg-[#FAFAF8] border border-luxury-gold/50 rounded-full py-1.5 px-4 shadow-md pointer-events-auto"
          >
            <span className="w-1.5 h-1.5 bg-luxury-gold rounded-full inline-block animate-ping"></span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-luxury-gold font-semibold">
              Admin Engaged
            </span>
            <button
              onClick={handleLogout}
              className="p-1 rounded-full text-luxury-charcoal/60 hover:text-red-500 hover:bg-red-50 transition cursor-pointer"
              title="Lock credentials panel"
            >
              <LogOut size={12} />
            </button>
          </motion.div>
        ) : (
          <button
            onClick={() => setIsAdminModalOpen(true)}
            className="h-10 px-4 flex items-center justify-center gap-2 rounded-full border border-luxury-stone/60 bg-[#FAFAF8]/95 backdrop-blur-md pointer-events-auto cursor-pointer hover:border-luxury-charcoal hover:bg-luxury-white transition shadow-sm font-sans text-[10px] uppercase tracking-widest text-luxury-charcoal"
            title="Access Piyush's portfolio editing portal"
            id="admin-portal-trigger"
          >
            <Lock size={11} className="text-luxury-gold" />
            <span>Studio Entry</span>
          </button>
        )}
      </header>

      {/* Hero Entrance Block */}
      <HeroSection
        userName={portfolio.userName}
        onUpdateUserName={handleUpdateUserName}
        isAdmin={isAdmin}
        onScrollToWork={() => scrollToSection("work")}
        onScrollToConnect={() => scrollToSection("connect")}
        backgroundImageUrl={mountainMistImg}
      />

      {/* About Biography Block */}
      <AboutSection
        userName={portfolio.userName}
        aboutText={portfolio.aboutText}
        onUpdateAboutText={handleUpdateAboutText}
        onUpdatePortrait={handleUpdatePortrait}
        isAdmin={isAdmin}
        stats={portfolio.stats}
        portraitImageUrl={portfolio.portraitImageUrl || portraitBwImg}
        portraitBwImg={portraitBwImg}
        portraitRedImg={portraitRedImg}
        originalPortraitImg={profilePortraitImg}
      />

      {/* Skills Component Block */}
      <SkillsSection
        skills={portfolio.skills}
        onAddSkill={handleAddSkill}
        onRemoveSkill={handleRemoveSkill}
        isAdmin={isAdmin}
      />

      {/* Portfolio Projects Grid */}
      <ProjectsSection
        projects={portfolio.projects}
        onAddProject={handleAddProject}
        onDeleteProject={handleDeleteProject}
        isAdmin={isAdmin}
      />

      {/* Secure Contact Inquiry Gateway */}
      <ContactSection />

      {/* Footer Details */}
      <footer className="bg-luxury-cream/30 border-t border-luxury-stone/30 py-8 text-center relative z-10">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-luxury-charcoal/50">
            Crafted with precision by {portfolio.userName} © 2026
          </p>
          <p className="font-serif text-[10px] uppercase tracking-widest text-[#566e4a] self-center">
            {portfolio.userName} ✦ Freelance Frontend Developer
          </p>
          <p className="font-mono text-[9px] text-luxury-charcoal/40 uppercase tracking-widest">
            Bespoke Digital Experience
          </p>
        </div>
      </footer>

      {/* Back to top dynamic float ring */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 0.85, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 left-6 z-40 bg-[#FAFAF8] border border-luxury-stone hover:border-luxury-charcoal text-luxury-charcoal p-3 rounded-full shadow-lg hover:opacity-100 transition duration-300 pointer-events-auto cursor-pointer"
            title="Return to Altitude"
          >
            <ArrowUp size={14} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Absolute Secret Password Hotspot (bottom-right 40x40px trigger) */}
      <div
        onClick={() => setIsAdminModalOpen(true)}
        className="fixed bottom-0 right-0 h-10 w-10 z-[500] cursor-default bg-transparent opacity-0 select-none editable-hotspot"
        title="Admin Hotspot"
      />

      {/* Admin Authorization Portal Modal Overlay */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        isAdmin={isAdmin}
        onLogout={handleLogout}
      />
    </div>
  );
}
