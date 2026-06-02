/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, Eye, EyeOff, X, Sparkles, LogOut, Check } from "lucide-react";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  isAdmin: boolean;
  onLogout: () => void;
}

export default function AdminModal({
  isOpen,
  onClose,
  onLoginSuccess,
  isAdmin,
  onLogout,
}: AdminModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Clear inputs and error on open/close
  useEffect(() => {
    if (isOpen) {
      setPassword("");
      setError(false);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "TP3169") {
      onLoginSuccess();
      setError(false);
      onClose();
    } else {
      setError(true);
      // Soft vibration effect
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999]">
          {/* Blur backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-luxury-charcoal/30 backdrop-blur-md"
          />

          {/* Luxury Modal container */}
          <div className="absolute inset-x-4 top-[15%] mx-auto max-w-md md:top-[25%]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 30, stiffness: 350 }}
              className="relative overflow-hidden rounded-2xl border border-luxury-stone bg-[#FAFAF8] p-8 shadow-2xl shadow-luxury-charcoal/10"
            >
              {/* Top ambient luxury gold line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-luxury-sage via-luxury-gold to-luxury-stone" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 text-luxury-charcoal/60 hover:text-luxury-charcoal hover:rotate-90 transition-all duration-300 p-1 rounded-full hover:bg-luxury-cream"
              >
                <X size={18} />
              </button>

              {isAdmin ? (
                // ADMIN LOGOUT/STATUS VIEW
                <div className="space-y-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-luxury-sage/20 text-luxury-charcoal">
                    <Sparkles size={22} className="text-luxury-gold animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl tracking-wide">Studio Engaged</h3>
                    <p className="mt-1 font-sans text-sm text-luxury-charcoal/60">
                      Welcome back, Piyush. Edit modes are fully unlocked.
                    </p>
                  </div>

                  <div className="rounded-lg bg-luxury-cream/50 p-4 text-left border border-luxury-stone/30">
                    <h4 className="text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5 mb-2 text-luxury-charcoal/80">
                      <span className="w-1.5 h-1.5 bg-luxury-gold rounded-full inline-block animate-ping"></span>
                      Active Controls:
                    </h4>
                    <ul className="text-xs text-luxury-charcoal/70 space-y-1.5 font-sans list-disc list-inside">
                      <li>Double-click your name block on the hero screen to customize.</li>
                      <li>Hover and double-click about text to modify bio inline.</li>
                      <li>Click tags in the skill cloud to instantly eject, or add new tags.</li>
                      <li>Register or delete custom websites and projects using the portal editor.</li>
                    </ul>
                  </div>

                  <div className="flex gap-3 justify-center pt-2">
                    <button
                      onClick={onClose}
                      className="flex-1 py-2.5 px-4 text-xs tracking-wider uppercase font-medium border border-luxury-stone rounded-lg hover:bg-luxury-cream transition-all duration-300"
                    >
                      Close Window
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        onClose();
                      }}
                      className="flex-1 py-2.5 px-4 text-xs tracking-wider uppercase font-medium bg-luxury-charcoal text-white rounded-lg hover:bg-luxury-charcoal/95 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <LogOut size={13} />
                      Lock Studio
                    </button>
                  </div>
                </div>
              ) : (
                // PASSWORD LOGIN VIEW
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-1.5 text-center">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-luxury-cream text-luxury-charcoal mb-2">
                      <Lock size={18} />
                    </div>
                    <h3 className="font-serif text-2xl tracking-wide text-luxury-charcoal">
                      Developer Studio Access
                    </h3>
                    <p className="font-sans text-xs uppercase tracking-widest text-luxury-charcoal/50">
                      Verify Signature
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-widest text-luxury-charcoal/60 font-medium">
                      Administrative PIN
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setError(false);
                        }}
                        placeholder="••••••••"
                        className={`w-full px-4 py-3 bg-luxury-cream/40 border ${
                          error ? "border-red-500 bg-red-500/5 focus:ring-red-300" : "border-luxury-stone focus:border-luxury-charcoal"
                        } rounded-lg text-sm text-luxury-charcoal outline-none transition-all duration-300 pr-12 font-mono`}
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 px-3.5 flex items-center text-luxury-charcoal/50 hover:text-luxury-charcoal"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 tracking-wide mt-1"
                      >
                        Signature rejected. Please verify code.
                      </motion.p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-luxury-charcoal hover:bg-[#1a1a1a] text-white text-xs uppercase tracking-widest font-medium rounded-lg transition-all duration-300 shadow-xl shadow-luxury-charcoal/10 flex items-center justify-center gap-2 mt-4 hover:translate-y-[-1px]"
                  >
                    Authenticate Studio
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
