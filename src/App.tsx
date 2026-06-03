/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Trash2, LogOut, ArrowUp, Menu, X, ArrowUpRight, Lock } from "lucide-react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

import CustomCursor from "./components/CustomCursor";
import AdminModal from "./components/AdminModal";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";

import { PortfolioData, Project } from "./types";
import { initialPortfolioData } from "./data";
import { db, handleFirestoreError, OperationType } from "./firebase";

// Resolve generated master assets using static Vite asset resolution
const mountainMistImg = new URL("./assets/images/mountain_mist_1780325086245.png", import.meta.url).href;
const profilePortraitImg = new URL("./assets/images/profile_portrait_1780325107018.png", import.meta.url).href;
const portraitBwImg = new URL("./assets/images/piyush_portrait_bw_1780407660201.png", import.meta.url).href;
const portraitRedImg = new URL("./assets/images/piyush_portrait_red_1780407681641.png", import.meta.url).href;

export default function App() {
  const [portfolio, setPortfolio] = useState<PortfolioData>(initialPortfolioData);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem("piyush_admin_auth") === "authenticated";
  });
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Real-time Firestore document snapshot subscription
  useEffect(() => {
    const docRef = doc(db, "portfolio", "data");
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as PortfolioData;

          // Clean out any preloaded legacy mock design items
          const originalLength = data.projects?.length || 0;
          if (data.projects && Array.isArray(data.projects)) {
            data.projects = data.projects.filter((p: any) =>
              p.id !== "proj-1" &&
              p.id !== "proj-2" &&
              p.id !== "proj-3" &&
              p.id !== "proj-swiss-modern" &&
              p.id !== "proj-sovereign-ai" &&
              p.id !== "proj-sabi-hearth" &&
              p.name !== "Alpine Design Agency" &&
              p.name !== "Zenith Python AI Playpen" &&
              p.name !== "Sabi Artisan Marketplace" &&
              p.name !== "Aetheris — Swiss Modern Architecture Lab" &&
              p.name !== "Sovereign AI — LLM Playpen & Pipeline Planner" &&
              p.name !== "Sabi Hearth — Japanese Ceramic Gallery"
            );
          }

          // Safe repopulate if list gets completely cleared out
          let needsSyncBack = originalLength !== (data.projects?.length || 0);
          if (!data.projects || data.projects.length === 0) {
            data.projects = initialPortfolioData.projects;
            if (data.stats) {
              data.stats.projectsDone = initialPortfolioData.projects.length;
            }
            needsSyncBack = true;
          }

          const mergedPortfolio = {
            ...initialPortfolioData,
            ...data,
          };

          setPortfolio(mergedPortfolio);

          // If we had legacy files cleaned, save the clean version permanently back to Firestore.
          if (needsSyncBack) {
            setDoc(docRef, mergedPortfolio)
              .then(() => {
                console.log("Cloud Firestore synchronized with clean updated portfolio projects.");
              })
              .catch((err) => {
                console.error("Error back-syncing cleaned portfolio projects:", err);
              });
          }
        } else {
          // Document does not exist in Cloud database yet; seed it once automatically!
          setDoc(docRef, initialPortfolioData)
            .then(() => {
              console.log("Cloud Firestore bootstrapped with initial portfolio profile.");
            })
            .catch((err) => {
              handleFirestoreError(err, OperationType.WRITE, "portfolio/data");
            });
        }
        setIsLoading(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, "portfolio/data");
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

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

  const syncToFirestore = async (updatedData: PortfolioData) => {
    try {
      await setDoc(doc(db, "portfolio", "data"), updatedData);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, "portfolio/data");
    }
  };

  const handleUpdateUserName = async (newName: string) => {
    const updated = {
      ...portfolio,
      userName: newName,
    };
    setPortfolio(updated);
    await syncToFirestore(updated);
  };

  const handleUpdateAboutText = async (newText: string) => {
    const updated = {
      ...portfolio,
      aboutText: newText,
    };
    setPortfolio(updated);
    await syncToFirestore(updated);
  };

  const handleUpdatePortrait = async (newUrl: string) => {
    const updated = {
      ...portfolio,
      portraitImageUrl: newUrl,
    };
    setPortfolio(updated);
    await syncToFirestore(updated);
  };

  const handleAddSkill = async (newSkill: string) => {
    if (portfolio.skills.includes(newSkill)) return;
    const updatedSkills = [...portfolio.skills, newSkill];
    const updated = {
      ...portfolio,
      skills: updatedSkills,
      stats: {
        ...portfolio.stats,
        skillsCount: updatedSkills.length,
      },
    };
    setPortfolio(updated);
    await syncToFirestore(updated);
  };

  const handleRemoveSkill = async (skillToRemove: string) => {
    const filtered = portfolio.skills.filter((s) => s !== skillToRemove);
    const updated = {
      ...portfolio,
      skills: filtered,
      stats: {
        ...portfolio.stats,
        skillsCount: Math.max(0, filtered.length),
      },
    };
    setPortfolio(updated);
    await syncToFirestore(updated);
  };

  const handleAddProject = async (newProject: Project) => {
    const updatedProjects = [newProject, ...portfolio.projects];
    const updated = {
      ...portfolio,
      projects: updatedProjects,
      stats: {
        ...portfolio.stats,
        projectsDone: updatedProjects.length,
      },
    };
    setPortfolio(updated);
    await syncToFirestore(updated);
  };

  const handleDeleteProject = async (projectId: string) => {
    const filtered = portfolio.projects.filter((p) => p.id !== projectId);
    const updated = {
      ...portfolio,
      projects: filtered,
      stats: {
        ...portfolio.stats,
        projectsDone: Math.max(0, filtered.length),
      },
    };
    setPortfolio(updated);
    await syncToFirestore(updated);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center relative select-none">
        <div className="grain-overlay" />
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-10 w-10 flex items-center justify-center rounded-full border-2 border-luxury-sage/20 border-t-luxury-sage animate-spin" />
          <div className="space-y-1">
            <h1 className="font-serif text-lg tracking-wider text-luxury-charcoal">Studio Gateway Connected</h1>
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#B5A585] font-bold">
              Synchronizing Portrait Database...
            </p>
          </div>
        </div>
      </div>
    );
  }

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
        portraitImageUrl={portfolio.portraitImageUrl || profilePortraitImg}
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
