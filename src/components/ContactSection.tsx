/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, Github, Linkedin, Instagram, Send, CheckCircle2, Copy, Check } from "lucide-react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [isEmailRevealed, setIsEmailRevealed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const secureEmail = "ptembhare746@gmail.com";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    // Simulate luxury API handshake
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 1200);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(secureEmail);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section id="connect" className="py-24 md:py-36 bg-luxury-white relative overflow-hidden">
      {/* Decorative floral or organic grid in background */}
      <div className="absolute left-[5%] bottom-[-5%] w-[450px] h-[450px] rounded-full border border-luxury-stone/20 pointer-events-none z-0" />

      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-stretch">
          
          {/* Left panel: Info Block */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
            <div className="space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#566e4a] bg-luxury-sage/20 border border-luxury-sage/30 px-3 py-1 rounded-full inline-block font-medium">
                Inquiry Gateway
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-luxury-charcoal tracking-wide font-light">
                Let's build <br />
                something <span className="italic text-luxury-charcoal/85">extraordinary</span>.
              </h2>
              <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/60 leading-relaxed font-light max-w-sm">
                Have a project idea, seeking a frontend partner, or simply want to chat AI architectures & python scripts? Drop a message.
              </p>
            </div>

            {/* Direct Coordinates with beautiful secure protection */}
            <div className="space-y-6 pt-6 border-t border-luxury-stone/50">
              <div className="space-y-4">
                {/* Secure Email Handler */}
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-luxury-cream text-luxury-charcoal">
                    <Mail size={15} />
                  </div>
                  <div className="space-y-1">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-luxury-charcoal/50 font-medium">
                      Electronic Mail
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <AnimatePresence mode="wait">
                        {!isEmailRevealed ? (
                          <motion.button
                            key="reveal-btn"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsEmailRevealed(true)}
                            className="font-mono text-[10px] uppercase tracking-widest text-[#566e4a] hover:text-[#38492f] underline decoration-dotted underline-offset-4 font-semibold"
                          >
                            Reveal Secure Address
                          </motion.button>
                        ) : (
                          <motion.div
                            key="email-copy"
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            <a
                              href={`mailto:${secureEmail}`}
                              className="font-sans text-sm font-medium text-luxury-charcoal hover:text-luxury-gold transition"
                            >
                              {secureEmail}
                            </a>
                            <button
                              onClick={handleCopyEmail}
                              className="p-1 rounded hover:bg-luxury-cream text-luxury-charcoal/50 hover:text-luxury-charcoal transition"
                              title="Copy to Clipboard"
                            >
                              {isCopied ? <Check size={12} className="text-luxury-sage" /> : <Copy size={12} />}
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-luxury-cream text-luxury-charcoal">
                    <Phone size={15} />
                  </div>
                  <div className="space-y-1">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-luxury-charcoal/50 font-medium">
                      Direct Connection
                    </p>
                    <a
                      href="tel:+919404631699"
                      className="font-sans text-sm font-medium text-luxury-charcoal hover:text-luxury-gold transition"
                    >
                      +91 94046 31699
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Channels Coordinates */}
              <div className="space-y-2 pt-6 border-t border-luxury-stone/30">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-luxury-charcoal/40 font-medium">
                  Digital Coordinates
                </span>
                <div className="flex gap-2">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-luxury-stone hover:border-luxury-charcoal text-luxury-charcoal/60 hover:text-luxury-charcoal transition-all duration-300 transform hover:scale-105"
                  >
                    <Github size={15} />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-luxury-stone hover:border-luxury-charcoal text-luxury-charcoal/60 hover:text-luxury-charcoal transition-all duration-300 transform hover:scale-105"
                  >
                    <Linkedin size={15} />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-luxury-stone hover:border-luxury-charcoal text-luxury-charcoal/60 hover:text-luxury-charcoal transition-all duration-300 transform hover:scale-105"
                  >
                    <Instagram size={15} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: Contact Form */}
          <div className="lg:col-span-7">
            <div className="h-full bg-luxury-cream/25 border border-luxury-stone/70 p-8 md:p-10 rounded-2xl flex flex-col justify-center">
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-luxury-charcoal/60 font-semibold">
                          Your Full Name
                        </label>
                        <input
                          required
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Liam Sterling"
                          className="w-full px-4 py-3 bg-[#FAFAF8] border border-luxury-stone rounded-lg text-xs outline-none focus:border-luxury-charcoal transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-luxury-charcoal/60 font-semibold">
                          Your Electronic Mail
                        </label>
                        <input
                          required
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. user@domain.com"
                          className="w-full px-4 py-3 bg-[#FAFAF8] border border-luxury-stone rounded-lg text-xs outline-none focus:border-luxury-charcoal transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-luxury-charcoal/60 font-semibold">
                        Your Detailed Message
                      </label>
                      <textarea
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        placeholder="Detail your inquiry, conceptual deadlines, or python design guidelines safely..."
                        className="w-full px-4 py-3 bg-[#FAFAF8] border border-luxury-stone rounded-lg text-xs outline-none focus:border-luxury-charcoal transition-all font-sans leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-luxury-charcoal hover:bg-black disabled:bg-luxury-stone text-white text-xs uppercase tracking-widest font-semibold rounded-lg transition-all duration-300 shadow shadow-luxury-charcoal/10 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed group"
                    >
                      <span>{isSubmitting ? "Sychronizing..." : "Transmit Message"}</span>
                      {!isSubmitting && <Send size={11} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-luxury-sage" />}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12 space-y-6 flex flex-col items-center justify-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-luxury-sage/20 text-[#566e4a] animate-bounce">
                      <CheckCircle2 size={32} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-serif text-3xl tracking-wide">Transmission Received</h3>
                      <p className="font-sans text-xs text-luxury-charcoal/60 max-w-sm mx-auto leading-relaxed">
                        Thank you for reaching out. Piyush's portfolio client is active and we will review your parameters shortly.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-5 py-2 border border-luxury-stone/60 text-[10px] uppercase tracking-widest font-mono rounded-lg hover:bg-luxury-cream transition duration-300"
                    >
                      Transmit Anthother Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
