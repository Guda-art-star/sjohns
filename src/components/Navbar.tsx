import React, { useState } from "react";
import { 
  Facebook, Instagram, Twitter, Phone, Mail, MapPin, 
  Search, Menu, X, ChevronDown, MessageSquare
} from "lucide-react";
import Logo from "./Logo";
import { NavigationItem } from "../types";
import { useLanguage } from "../LanguageContext";

interface NavbarProps {
  onOpenAdmission: () => void;
  onNavClick: (section: string) => void;
}

export default function Navbar({ onOpenAdmission, onNavClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { t } = useLanguage();

  const navigationItems: NavigationItem[] = [
    { name: "Home", href: "#home" },
    { 
      name: "School Info", 
      href: "#about",
      hasDropdown: true,
      dropdownItems: [
        { name: "Our History", description: "Our foundation and key achievements" },
        { name: "Mission & Vision", description: "What drives our educational standards" },
        { name: "School Management", description: "The administrative leadership body" },
        { name: "Why Choose Us", description: "What makes St. John's unique" },
        { name: "FAQs", description: "Frequently asked questions by parents" }
      ]
    },
    { 
      name: "Academics", 
      href: "#academics",
      hasDropdown: true,
      dropdownItems: [
        { name: "Departments", description: "Subject groupings and faculties" },
        { name: "Curriculum", description: "O-level and A-level courses" },
        { name: "Library", description: "Research materials and study space" },
        { name: "Exam Results", description: "Outstanding national UNEB records" }
      ]
    },
    { 
      name: "Life At St. John's", 
      href: "#life",
      hasDropdown: true,
      dropdownItems: [
        { name: "Clubs & Societies", description: "Debate, drama, science clubs and more" },
        { name: "Sports", description: "Athletics, football, and indoor games" },
        { name: "Guidance & Counseling", description: "Empowering mental and academic wellness" },
        { name: "Health Services", description: "Equipped sickbay and medical care" }
      ]
    },
    { name: "Alumni", href: "#alumni" },
    { name: "Gallery", href: "#gallery" },
    { name: "News", href: "#news" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <header className="w-full sticky top-0 z-40 shadow-xl" id="site-header">
      {/* 1. Dark Top Bar */}
      <div className="bg-sky-950 text-sky-100 text-[11px] py-2 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-2 border-b border-sky-900/55 font-sans">
        {/* Social Icons */}
        <div className="flex items-center gap-3.5">
          <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">{t("Follow Us")}:</span>
          <a href="#" className="hover:text-amber-300 transition-colors"><Facebook className="h-3.5 w-3.5" /></a>
          <a href="#" className="hover:text-amber-300 transition-colors"><Instagram className="h-3.5 w-3.5" /></a>
          <a href="#" className="hover:text-amber-300 transition-colors"><Twitter className="h-3.5 w-3.5" /></a>
          <a href="#" className="hover:text-amber-300 transition-colors"><MessageSquare className="h-3.5 w-3.5" /></a>
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-center">
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <MapPin className="h-3.5 w-3.5 text-amber-300 shrink-0" />
            <span>Mpigi Town, Central Region - Uganda</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Mail className="h-3.5 w-3.5 text-sky-300 shrink-0" />
            <a href="mailto:info@stjohnscollegempigi.ac.ug">info@stjohnscollegempigi.ac.ug</a>
          </div>
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone className="h-3.5 w-3.5 text-sky-300 shrink-0" />
            <a href="tel:+256772454459">+256 772 454459</a>
          </div>
        </div>
      </div>

      {/* 2. Main Premium Sky Navigation Bar */}
      <div className="bg-sky-500 border-b border-sky-400/80 py-3 px-4 md:px-8 flex justify-between items-center text-white transition-all duration-300">
        {/* Logo and Crest */}
        <a href="#home" onClick={() => onNavClick("home")} className="flex-shrink-0 transition-transform duration-300 hover:scale-102">
          <Logo variant="light" size="md" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-7" id="desktop-nav">
          {navigationItems.map((item, idx) => (
            <div 
              key={idx} 
              className="relative"
              onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href={item.href}
                onClick={(e) => {
                  if (item.hasDropdown) e.preventDefault();
                  onNavClick(item.href.replace("#", ""));
                }}
                className="flex items-center gap-1 text-[13px] font-bold text-white hover:text-amber-200 transition-colors uppercase py-2 tracking-wider"
              >
                <span>{t(item.name)}</span>
                {item.hasDropdown && <ChevronDown className="h-3.5 w-3.5 shrink-0 text-sky-100 group-hover:text-amber-200 transition-transform" />}
              </a>

              {/* Mega/Normal Dropdown */}
              {item.hasDropdown && activeDropdown === item.name && (
                <div className="absolute left-0 mt-0 w-64 bg-sky-950 border border-sky-800 rounded-xl shadow-2xl py-3 px-1.5 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  {item.dropdownItems?.map((dropItem, dropIdx) => (
                    <a
                      key={dropIdx}
                      href={dropItem.name === "FAQs" ? "#faq-section" : `#${dropItem.name.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (dropItem.name === "FAQs") {
                          onNavClick("faq-section");
                        } else {
                          onNavClick("about");
                        }
                      }}
                      className="block px-4 py-2.5 hover:bg-sky-800/60 rounded-lg group transition-colors"
                    >
                      <span className="block text-xs font-bold text-white group-hover:text-amber-300 uppercase tracking-wide">
                        {t(dropItem.name)}
                      </span>
                      <span className="block text-[10px] text-sky-200/70 mt-0.5 leading-normal group-hover:text-white transition-colors">
                        {t(dropItem.description)}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Search trigger */}
          <button className="p-2 hover:bg-sky-600 rounded-full text-sky-100 hover:text-white transition-all cursor-pointer" aria-label="Search site">
            <Search className="h-4.5 w-4.5" />
          </button>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3.5">
          <button
            onClick={onOpenAdmission}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-sky-950 text-xs font-extrabold rounded-lg shadow-lg hover:shadow-amber-500/10 scale-100 hover:scale-[1.03] transition-all shrink-0 flex items-center gap-1.5 uppercase tracking-wider cursor-pointer"
            id="apply-now-navbar"
          >
            <span className="inline-block w-1.5 h-1.5 bg-rose-600 rounded-full animate-ping"></span>
            {t("Apply Now")}
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex xl:hidden items-center gap-2.5">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-sky-600 rounded-lg text-white"
            id="mobile-menu-trigger"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-sky-950 border-b border-sky-900 shadow-2xl z-50 p-4 block xl:hidden animate-in slide-in-from-top duration-300 max-h-[75vh] overflow-y-auto">
          <nav className="flex flex-col gap-1.5">
            {navigationItems.map((item, idx) => (
              <div key={idx} className="border-b border-sky-900/65 last:border-b-0 py-2">
                <a
                  href={item.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavClick(item.href.replace("#", ""));
                  }}
                  className="flex items-center justify-between text-xs font-bold text-sky-100 hover:text-amber-300 uppercase tracking-wide py-1"
                >
                  <span>{t(item.name)}</span>
                </a>
                {item.hasDropdown && (
                  <div className="pl-3 mt-1.5 grid grid-cols-2 gap-2">
                    {item.dropdownItems?.map((dropItem, dropIdx) => (
                      <a
                        key={dropIdx}
                        href="#"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          if (dropItem.name === "FAQs") {
                            onNavClick("faq-section");
                          } else {
                            onNavClick("about");
                          }
                        }}
                        className="text-[10px] text-sky-300/80 font-semibold hover:text-amber-300 transition-colors uppercase py-1 tracking-wider"
                      >
                        • {t(dropItem.name)}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-sky-900 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmission();
                }}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-sky-950 text-xs font-extrabold rounded-lg shadow text-center uppercase tracking-wider"
              >
                {t("Apply Now")}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
