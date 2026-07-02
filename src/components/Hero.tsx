import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck } from "lucide-react";

// Images
import heroBanner from "../assets/images/students_hero_banner_1782462430116.jpg";
import studentsMixedAdmin from "../assets/images/students_mixed_admin_stjohns_1782480359565.jpg";
import studentsGirlsAdmin from "../assets/images/students_girls_admin_stjohns_1782480376617.jpg";

interface HeroProps {
  onOpenAdmission: () => void;
  onOpenPortal: () => void;
  onScrollToAbout: () => void;
}

export default function Hero({ onOpenAdmission, onOpenPortal, onScrollToAbout }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Shaping Tomorrow's Leaders Today",
      sub: "Excellence in academics, discipline, and character building.",
      label: "ST. JOHN'S COLLEGE MPIGI",
      image: studentsMixedAdmin,
    },
    {
      title: "Godliness and Hardwork Since 2004",
      sub: "Providing high-standard secondary education that empowers children to excel globally.",
      label: "ACADEMIC DISTINCTION",
      image: heroBanner,
    },
    {
      title: "Holistic Student Development",
      sub: "Nurturing talents in sports, debate, drama, and technology-driven programs.",
      label: "CHARACTER & INTEGRITY",
      image: studentsGirlsAdmin,
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full h-[550px] md:h-[650px] overflow-hidden bg-slate-950" id="home">
      {/* Animated Slide Progress Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 h-1 bg-white/10 overflow-hidden">
        <motion.div
          key={currentSlide}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
          className="h-full bg-sky-500"
        />
      </div>

      {/* Background Image Carousel Container */}
      <div className="absolute inset-0 w-full h-full">
        {/* We have the beautiful custom student banner. To add nice fade transitions, we can overlay a dark radial and linear gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-900/40 z-10" />
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentSlide}
            src={slides[currentSlide].image}
            alt="St. John's College Mpigi Students"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-95"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
      </div>

      {/* Slide Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center px-4 md:px-8 text-center max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 md:space-y-6"
          >
            {/* Top gold badge label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full">
              <ShieldCheck className="h-4 w-4 text-yellow-500" />
              <span className="text-[10px] md:text-xs font-black tracking-widest text-yellow-500 uppercase">
                {slides[currentSlide].label}
              </span>
            </div>

            {/* Large Bold Heading */}
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-md">
              {slides[currentSlide].title}
            </h1>

            {/* Subtitle */}
            <p className="text-sm md:text-lg text-slate-200 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
              {slides[currentSlide].sub}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
              <button
                onClick={onScrollToAbout}
                className="px-6 py-3.5 bg-sky-500 hover:bg-sky-600 text-white text-xs md:text-sm font-bold rounded-lg shadow-lg flex items-center gap-2 group transition-all uppercase tracking-wider cursor-pointer"
              >
                <span>Discover More</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
              <button
                onClick={onOpenAdmission}
                className="px-6 py-3.5 border-2 border-white hover:bg-white hover:text-slate-900 text-white text-xs md:text-sm font-bold rounded-lg transition-all uppercase tracking-wider cursor-pointer"
              >
                Apply Now
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Manual Navigation Controls (Arrows) */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all focus:outline-none border border-white/10"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all focus:outline-none border border-white/10"
        aria-label="Next Slide"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 transition-all rounded-full ${
              currentSlide === idx ? "w-8 bg-sky-500" : "w-2 bg-white/40"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
