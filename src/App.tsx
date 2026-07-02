import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import KeyPillars from "./components/KeyPillars";
import AboutSection from "./components/AboutSection";
import GallerySection from "./components/GallerySection";
import GridSection from "./components/GridSection";
import Footer from "./components/Footer";
import AdmissionModal from "./components/AdmissionModal";
import StudentPortalModal from "./components/StudentPortalModal";
import WhatsAppButton from "./components/WhatsAppButton";

export default function App() {
  const [admissionModalOpen, setAdmissionModalOpen] = useState(false);
  const [portalModalOpen, setPortalModalOpen] = useState(false);

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
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans" id="main-application-viewport">
      {/* Navigation Header */}
      <Navbar 
        onOpenAdmission={() => setAdmissionModalOpen(true)}
        onOpenPortal={() => setPortalModalOpen(true)}
        onNavClick={handleNavClick}
      />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* Hero Section Banner */}
        <Hero 
          onOpenAdmission={() => setAdmissionModalOpen(true)}
          onOpenPortal={() => setPortalModalOpen(true)}
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

        {/* 4-column Announcements / Events / QuickLinks / StudentPortal Section */}
        <GridSection 
          onOpenPortal={() => setPortalModalOpen(true)}
          onOpenAdmission={() => setAdmissionModalOpen(true)}
        />
      </main>

      {/* Footer Sitemap and Contacts */}
      <Footer 
        onNavClick={handleNavClick}
        onOpenAdmission={() => setAdmissionModalOpen(true)}
        onOpenPortal={() => setPortalModalOpen(true)}
      />

      {/* Floating interactive WhatsApp Chat Desk */}
      <WhatsAppButton />

      {/* Online Admission Application Modal Portal */}
      <AdmissionModal 
        isOpen={admissionModalOpen} 
        onClose={() => setAdmissionModalOpen(false)} 
      />

      {/* Student Portal Dashboard Access Modal */}
      <StudentPortalModal 
        isOpen={portalModalOpen} 
        onClose={() => setPortalModalOpen(false)} 
      />
    </div>
  );
}
