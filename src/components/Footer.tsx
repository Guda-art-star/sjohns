import React, { useState } from "react";
import { 
  Facebook, Instagram, Twitter, Phone, Mail, MapPin, 
  Send, CheckCircle, MessageSquare 
} from "lucide-react";
import Logo from "./Logo";
import { useLanguage } from "../LanguageContext";

interface FooterProps {
  onNavClick: (section: string) => void;
  onOpenAdmission: () => void;
}

export default function Footer({ onNavClick, onOpenAdmission }: FooterProps) {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
    }, 3000);
  };

  return (
    <footer className="bg-emerald-950 text-emerald-100/90 pt-16 pb-8 border-t border-emerald-800/50" id="contact">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-12 border-b border-emerald-800/50">
          
          {/* Col 1: About Logo */}
          <div className="sm:col-span-2 space-y-4">
            <Logo variant="light" size="md" showText={true} className="text-white" />
            <p className="text-xs text-emerald-100/70 leading-relaxed font-medium">
              {t("St. John's College Mpigi is dedicated to nurturing disciplined, innovative, and responsible leaders of tomorrow. Excellence and hard work guide our steps.")}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3.5 pt-2">
              <a href="#" className="p-2 rounded-full bg-emerald-800/40 hover:bg-emerald-800 text-white transition-all">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-emerald-800/40 hover:bg-emerald-800 text-white transition-all">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-emerald-800/40 hover:bg-emerald-800 text-white transition-all">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-emerald-800/40 hover:bg-emerald-800 text-white transition-all">
                <MessageSquare className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Col 2: About Us Nav */}
          <div className="space-y-4">
            <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider border-b border-emerald-800 pb-1.5">
              {t("About Us")}
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#about" onClick={() => onNavClick("about")} className="hover:text-white transition-colors">{t("Our History")}</a></li>
              <li><a href="#about" onClick={() => onNavClick("about")} className="hover:text-white transition-colors">{t("Mission & Vision")}</a></li>
              <li><a href="#about" onClick={() => onNavClick("about")} className="hover:text-white transition-colors">{t("School Management")}</a></li>
              <li><a href="#about" onClick={() => onNavClick("about")} className="hover:text-white transition-colors">{t("Why Choose Us")}</a></li>
              <li><a href="#faq-section" onClick={() => onNavClick("faq-section")} className="hover:text-emerald-300 font-semibold text-sky-400 transition-colors">{t("Parent FAQs")}</a></li>
            </ul>
          </div>

          {/* Col 3: Academics Nav */}
          <div className="space-y-4">
            <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider border-b border-emerald-800 pb-1.5">
              {t("Academics")}
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#about" onClick={() => onNavClick("about")} className="hover:text-white transition-colors">{t("Departments")}</a></li>
              <li><a href="#about" onClick={() => onNavClick("about")} className="hover:text-white transition-colors">{t("Curriculum")}</a></li>
              <li><a href="#about" onClick={() => onNavClick("about")} className="hover:text-white transition-colors">{t("Library Hub")}</a></li>
              <li><a href="#grid-dashboard" onClick={() => onNavClick("grid-dashboard")} className="hover:text-white transition-colors">{t("Exam Results")}</a></li>
            </ul>
          </div>

          {/* Col 4: Life At St. John's Nav */}
          <div className="space-y-4">
            <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider border-b border-emerald-800 pb-1.5">
              {t("Life At St. John's")}
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#about" onClick={() => onNavClick("about")} className="hover:text-white transition-colors">{t("Clubs & Societies")}</a></li>
              <li><a href="#about" onClick={() => onNavClick("about")} className="hover:text-white transition-colors">{t("Sports Grounds")}</a></li>
              <li><a href="#about" onClick={() => onNavClick("about")} className="hover:text-white transition-colors">{t("Guidance & Care")}</a></li>
              <li><a href="#about" onClick={() => onNavClick("about")} className="hover:text-white transition-colors">{t("Health Services")}</a></li>
            </ul>
          </div>

          {/* Col 5: Contact Us & Newsletter */}
          <div className="space-y-4 sm:col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-between">
            <div className="space-y-3">
              <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider border-b border-emerald-800 pb-1.5">
                {t("Contact Us")}
              </h4>
              <ul className="space-y-3 text-xs font-medium">
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-emerald-100/80">{t("Mpigi Town, Central Region, Uganda")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                  <a href="tel:+256772454459" className="hover:text-white transition-colors">+256 772 454459</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                  <a href="mailto:info@stjohnscollegempigi.ac.ug" className="hover:text-white transition-colors text-emerald-100/80 truncate">info@stjohnscollegempigi.ac.ug</a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom bar with Newsletter inline */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Newsletter Box */}
          <div className="w-full md:max-w-md space-y-2">
            <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider">
              {t("Subscribe to Newsletter")}
            </h4>
            {subscribed ? (
              <div className="p-2.5 bg-emerald-800/40 border border-emerald-500 rounded-lg text-xs flex items-center gap-2 text-white font-semibold">
                <CheckCircle className="h-4 w-4 text-emerald-300" />
                <span>{t("Subscribed! Check your inbox for updates.")}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full max-w-sm">
                <input
                  type="email"
                  placeholder={t("Enter your email address")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-3 py-1.5 bg-emerald-950/60 border border-emerald-800 text-white rounded-lg text-xs placeholder:text-emerald-300/50 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-white text-emerald-900 font-bold text-xs rounded-lg uppercase tracking-wider hover:bg-emerald-50 transition-colors cursor-pointer"
                  id="newsletter-subscribe"
                >
                  {t("Subscribe")}
                </button>
              </form>
            )}
          </div>

          {/* Legal and copy */}
          <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
            <span className="text-[11px] text-emerald-200/50">
              © {new Date().getFullYear()} {t("St. John's College Mpigi. All Rights Reserved.")}
            </span>
            <div className="flex gap-4 text-[10px] text-emerald-200/60 font-semibold uppercase tracking-wider">
              <a href="#" className="hover:text-white transition-colors">{t("Privacy Policy")}</a>
              <a href="#" className="hover:text-white transition-colors">{t("Terms & Conditions")}</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
