import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import Logo from "./Logo";

interface PreloaderProps {
  onComplete: () => void;
  key?: React.Key;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const titleText = "ST. JOHN'S COLLEGE MPIGI";
  const mottoText = "GODLINESS & HARDWORK";

  const [typedTitle, setTypedTitle] = useState("");
  const [typedMotto, setTypedMotto] = useState("");
  const [titleDone, setTitleDone] = useState(false);
  const [mottoDone, setMottoDone] = useState(false);

  // Typewriter for Title
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < titleText.length) {
        setTypedTitle((prev) => prev + titleText.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setTitleDone(true);
      }
    }, 75); // 75ms per character: smooth, readable typing
    return () => clearInterval(interval);
  }, []);

  // Typewriter for Motto
  useEffect(() => {
    if (!titleDone) return;
    
    // Brief pause before starting the motto
    const startTimeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < mottoText.length) {
          setTypedMotto((prev) => prev + mottoText.charAt(index));
          index++;
        } else {
          clearInterval(interval);
          setMottoDone(true);
        }
      }, 60); // 60ms per character for motto
      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(startTimeout);
  }, [titleDone]);

  // Handle completion delay
  useEffect(() => {
    if (mottoDone) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 1500); // Show completed text for 1.5s before transitioning
      return () => clearTimeout(timeout);
    }
  }, [mottoDone, onComplete]);

  return (
    <div 
      className="fixed inset-0 bg-slate-950 z-50 flex flex-col items-center justify-center overflow-hidden font-sans select-none"
      id="website-preloader-viewport"
    >
      {/* Dynamic ambient radial gradients for an immersive atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.12)_0%,transparent_60%)] animate-pulse duration-[6000ms] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="relative flex flex-col items-center max-w-lg px-6 text-center z-10">
        {/* Animated school crest container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-8"
        >
          {/* Logo variant light with text hidden so we type it ourselves */}
          <Logo variant="light" size="lg" showText={false} />
        </motion.div>

        {/* School Name Typing Area */}
        <div className="min-h-[44px] flex items-center justify-center mb-3">
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-white tracking-widest leading-none drop-shadow-md flex items-center">
            <span className="bg-gradient-to-r from-sky-200 via-white to-amber-200 bg-clip-text text-transparent">
              {typedTitle}
            </span>
            {!titleDone && (
              <span className="inline-block w-1 h-7 ml-1 bg-sky-400 animate-pulse font-sans">|</span>
            )}
          </h1>
        </div>

        {/* School Motto Typing Area */}
        <div className="min-h-[24px] flex items-center justify-center">
          {titleDone && (
            <h2 className="text-xs sm:text-sm font-bold tracking-[0.25em] text-amber-400 uppercase italic flex items-center">
              <span>{typedMotto}</span>
              {titleDone && !mottoDone && (
                <span className="inline-block w-[3px] h-4 ml-1 bg-amber-400 animate-pulse"></span>
              )}
            </h2>
          )}
        </div>

        {/* Loading progress glow bar */}
        <div className="w-48 h-[2px] bg-slate-900 rounded-full mt-10 overflow-hidden relative border border-slate-800">
          <motion.div 
            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-sky-500 to-amber-400"
            initial={{ width: "0%" }}
            animate={{ width: mottoDone ? "100%" : titleDone ? "70%" : "35%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Exquisite skip button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        whileHover={{ opacity: 0.9, scale: 1.05 }}
        onClick={onComplete}
        className="absolute bottom-8 text-[11px] font-bold text-slate-400 tracking-widest uppercase py-1.5 px-4 border border-slate-800 rounded-full bg-slate-900/40 backdrop-blur-sm transition-all hover:bg-slate-900/80 hover:border-slate-700 cursor-pointer"
      >
        Skip Intro
      </motion.button>
    </div>
  );
}
