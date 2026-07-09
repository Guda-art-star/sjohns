import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import KeyPillars from "./components/KeyPillars";
import AboutSection from "./components/AboutSection";
import GallerySection from "./components/GallerySection";
import GridSection from "./components/GridSection";
import AlumniSection from "./components/AlumniSection";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";
import AdmissionModal from "./components/AdmissionModal";
import WhatsAppButton from "./components/WhatsAppButton";
import Preloader from "./components/Preloader";

export default function App() {
  const [admissionModalOpen, setAdmissionModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleNavClick = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToAbout = () => {
    handleNavClick("about");
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="min-h-screen bg-slate-50 flex flex-col font-sans"
            id="main-application-viewport"
          >
            {/* Navigation Header */}
            <Navbar 
              onOpenAdmission={() => setAdmissionModalOpen(true)}
              onNavClick={handleNavClick}
            />

            {/* Main Sections */}
            <main className="flex-grow">
              {/* Hero Section Banner */}
              <Hero 
                onOpenAdmission={() => setAdmissionModalOpen(true)}
                onScrollToAbout={handleScrollToAbout}
              />

              {/* Floating Key Pillars cards */}
              <KeyPillars />

              {/* Detailed About section with stats and full profile */}
              <AboutSection 
                onOpenAdmission={() => setAdmissionModalOpen(true)}
              />

              {/* Gallery tour section */}
              <GallerySection />

              {/* 3-column Announcements / Events / QuickLinks Section */}
              <GridSection 
                onOpenAdmission={() => setAdmissionModalOpen(true)}
              />

              {/* Dynamic Alumni Association section with interactive Registry & Memories Board */}
              <AlumniSection />

              {/* Interactive FAQ Accordion Section */}
              <FAQSection />
            </main>

            {/* Footer Sitemap and Contacts */}
            <Footer 
              onNavClick={handleNavClick}
              onOpenAdmission={() => setAdmissionModalOpen(true)}
            />

            {/* Floating interactive WhatsApp Chat Desk */}
            <WhatsAppButton />

            {/* Online Admission Application Modal Portal */}
            <AdmissionModal 
              isOpen={admissionModalOpen} 
              onClose={() => setAdmissionModalOpen(false)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
