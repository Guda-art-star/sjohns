import React, { useState } from "react";
import { 
  Facebook, Instagram, Twitter, Phone, Mail, MapPin, 
  Search, Menu, X, ChevronDown, MessageSquare 
} from "lucide-react";
import Logo from "./Logo";
import { NavigationItem } from "../types";

interface NavbarProps {
  onOpenAdmission: () => void;
  onOpenPortal: () => void;
  onNavClick: (section: string) => void;
}

export default function Navbar({ onOpenAdmission, onOpenPortal, onNavClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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
        { name: "Why Choose Us", description: "What makes St. John's unique" }
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
    <header className="w-full relative z-30" id="site-header">
      {/* 1. Green Top Bar */}
      <div className="bg-emerald-800 text-emerald-50 text-[11px] py-2 px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 border-b border-emerald-900 font-sans">
        {/* Social Icons */}
        <div className="flex items-center gap-3.5">
          <span className="text-[10px] uppercase font-bold tracking-wider opacity-85">Follow Us:</span>
          <a href="#" className="hover:text-white transition-colors"><Facebook className="h-3.5 w-3.5" /></a>
          <a href="#" className="hover:text-white transition-colors"><Instagram className="h-3.5 w-3.5" /></a>
          <a href="#" className="hover:text-white transition-colors"><Twitter className="h-3.5 w-3.5" /></a>
          <a href="#" className="hover:text-white transition-colors"><MessageSquare className="h-3.5 w-3.5" /></a>
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-center">
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <MapPin className="h-3.5 w-3.5 text-sky-400 shrink-0" />
            <span>Mpigi Town, Central Region - Uganda</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Mail className="h-3.5 w-3.5 text-emerald-300 shrink-0" />
            <a href="mailto:info@stjohnscollegempigi.ac.ug">info@stjohnscollegempigi.ac.ug</a>
          </div>
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone className="h-3.5 w-3.5 text-emerald-300 shrink-0" />
            <a href="tel:+256772454459">+256 772 454459</a>
          </div>
        </div>
      </div>

      {/* 2. Main White Navigation Bar */}
      <div className="bg-white shadow-md border-b border-gray-100 py-3.5 px-4 md:px-8 flex justify-between items-center">
        {/* Logo and Crest */}
        <a href="#home" onClick={() => onNavClick("home")} className="flex-shrink-0">
          <Logo variant="dark" size="md" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6" id="desktop-nav">
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
                className="flex items-center gap-1 text-[13px] font-bold text-slate-800 hover:text-emerald-800 transition-colors uppercase py-2 tracking-wide"
              >
                <span>{item.name}</span>
                {item.hasDropdown && <ChevronDown className="h-3 w-3 shrink-0" />}
              </a>

              {/* Mega/Normal Dropdown */}
              {item.hasDropdown && activeDropdown === item.name && (
                <div className="absolute left-0 mt-0 w-64 bg-white border border-slate-100 rounded-xl shadow-xl py-3 px-1 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  {item.dropdownItems?.map((dropItem, dropIdx) => (
                    <a
                      key={dropIdx}
                      href={`#${dropItem.name.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`}
                      onClick={() => onNavClick("about")}
                      className="block px-4 py-2.5 hover:bg-emerald-50/70 rounded-lg group transition-colors"
                    >
                      <span className="block text-xs font-bold text-slate-800 group-hover:text-emerald-800 uppercase tracking-wide">
                        {dropItem.name}
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-0.5 leading-normal">
                        {dropItem.description}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Search trigger */}
          <button className="p-1.5 hover:bg-slate-50 rounded-full text-slate-600 transition-all cursor-pointer" aria-label="Search site">
            <Search className="h-4.5 w-4.5" />
          </button>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onOpenPortal}
            className="px-4 py-2 text-xs font-bold border border-emerald-800 text-emerald-800 rounded-lg hover:bg-emerald-50 transition-colors shrink-0 uppercase tracking-wider"
          >
            Student Portal
          </button>
          <button
            onClick={onOpenAdmission}
            className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg shadow-md transition-colors shrink-0 flex items-center gap-1.5 uppercase tracking-wider"
            id="apply-now-navbar"
          >
            <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
            Apply Now
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex xl:hidden items-center gap-3">
          <button
            onClick={onOpenPortal}
            className="px-3 py-1.5 text-[11px] font-bold border border-emerald-800 text-emerald-800 rounded-md hover:bg-emerald-50 transition-all uppercase tracking-wide"
          >
            Portal
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-slate-50 rounded-lg text-slate-800"
            id="mobile-menu-trigger"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl z-50 p-4 block xl:hidden animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-1.5">
            {navigationItems.map((item, idx) => (
              <div key={idx} className="border-b border-slate-50 last:border-b-0 py-1.5">
                <a
                  href={item.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavClick(item.href.replace("#", ""));
                  }}
                  className="flex items-center justify-between text-xs font-bold text-slate-800 hover:text-emerald-800 uppercase tracking-wide py-1"
                >
                  <span>{item.name}</span>
                </a>
                {item.hasDropdown && (
                  <div className="pl-3 mt-1.5 grid grid-cols-2 gap-2">
                    {item.dropdownItems?.map((dropItem, dropIdx) => (
                      <a
                        key={dropIdx}
                        href="#"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onNavClick("about");
                        }}
                        className="text-[10px] text-slate-500 font-semibold hover:text-emerald-800 transition-colors uppercase py-1 tracking-wider"
                      >
                        • {dropItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmission();
                }}
                className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg shadow text-center uppercase tracking-wider"
              >
                Apply Now
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
