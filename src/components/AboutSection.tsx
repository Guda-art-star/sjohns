import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, Award, Calendar, Home, ArrowRight, X, 
  Sparkles, ShieldCheck, Heart, Flag 
} from "lucide-react";
import { useLanguage } from "../LanguageContext";

// Image generated earlier
import gateEntrance from "../assets/images/school_gate_entrance_1782462446101.jpg";

interface AboutSectionProps {
  onOpenAdmission: () => void;
}

export default function AboutSection({ onOpenAdmission }: AboutSectionProps) {
  const [showFullHistory, setShowFullHistory] = useState(false);
  const { t } = useLanguage();

  const stats = [
    { value: "300+", label: t("Students"), icon: Users, desc: t("Diverse student body") },
    { value: "25+", label: t("Qualified Teachers"), icon: Award, desc: t("Dedicated educators") },
    { value: "6+", label: t("Years of Excellence"), icon: Calendar, desc: t("Built on hard work") },
    { value: "100%", label: t("Boarding School"), icon: Home, desc: t("Safe residential halls") }
  ];

  return (
    <section className="py-16 md:py-24 bg-white scroll-mt-12" id="about">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: School Gate Image */}
          <div className="lg:col-span-5 relative group">
            {/* Background design elements */}
            <div className="absolute -inset-4 bg-emerald-50 rounded-2xl -z-10 transform -rotate-2 scale-98 transition-transform group-hover:rotate-0" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl -z-10" />
            
            {/* The photo itself */}
            <div className="overflow-hidden rounded-2xl shadow-xl border-4 border-white aspect-4/3 relative">
              <img
                src={gateEntrance}
                alt="St. John's College Mpigi Entrance Gate"
                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Badge overlay on the image */}
              <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-white border border-white/10">
                <p className="text-[9px] font-black tracking-widest text-emerald-400 uppercase">Est. 2004</p>
                <p className="text-[11px] font-serif font-bold text-white mt-0.5">Secure Main Campus Gateway</p>
              </div>
            </div>
          </div>

          {/* Right Column: About Details */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-black tracking-widest rounded-full uppercase">
                {t("About Us")}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                {t("St. John's College Mpigi")}
              </h2>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
                {t("Operating under Mugisha Elias Ndemire since 2020, St. John's College Mpigi is a leading secondary school committed to providing quality education that empowers students to excel academically, spiritually, and socially. We nurture future leaders with integrity, innovation, and a strong sense of purpose.")}
              </p>
            </div>

            {/* Statistics grid with icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              {stats.map((stat, idx) => {
                const IconComp = stat.icon;
                return (
                  <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-emerald-50/40 hover:border-emerald-100 transition-all text-center space-y-1">
                    <div className="inline-flex p-2 bg-white rounded-full text-emerald-800 shadow-sm mb-1">
                      <IconComp className="h-4.5 w-4.5" />
                    </div>
                    <span className="block font-serif text-lg md:text-xl font-extrabold text-emerald-800 leading-none">
                      {stat.value}
                    </span>
                    <span className="block text-[11px] font-bold text-slate-800 leading-none">
                      {stat.label}
                    </span>
                    <span className="block text-[9px] text-slate-400 font-medium">
                      {stat.desc}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Read More Button */}
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => setShowFullHistory(true)}
                className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg shadow-md hover:shadow-lg flex items-center gap-1.5 transition-all uppercase tracking-wider cursor-pointer"
              >
                <span>{t("Read More About St. John's")}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Expanded History Modal */}
      <AnimatePresence>
        {showFullHistory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-2xl w-full relative border border-slate-100 max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowFullHistory(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors"
                id="close-history-modal"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="border-b border-slate-100 pb-4 mb-6">
                <span className="text-[10px] font-black text-emerald-800 tracking-wider uppercase">{t("Institutional Profile")}</span>
                <h3 className="font-serif text-2xl font-black text-slate-900 mt-1 leading-none">
                  {t("St. John's College Mpigi")}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 italic">"{t("Godliness & Hardwork")}"</p>
              </div>

              {/* Mission, Vision, and Values Block */}
              <div className="space-y-6 text-xs text-slate-700 leading-relaxed font-medium">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100/50 space-y-1.5">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold uppercase tracking-wider text-[10px]">
                      <Flag className="h-4 w-4" />
                      <span>{t("Our Mission")}</span>
                    </div>
                    <p className="text-slate-600">
                      {t("To provide quality, inclusive secondary education that equips students with outstanding academic knowledge, moral integrity, and practical skills for global leadership.")}
                    </p>
                  </div>
                  <div className="p-4 bg-rose-50/50 rounded-xl border border-rose-100/50 space-y-1.5">
                    <div className="flex items-center gap-2 text-rose-800 font-bold uppercase tracking-wider text-[10px]">
                      <Sparkles className="h-4 w-4" />
                      <span>{t("Our Vision")}</span>
                    </div>
                    <p className="text-slate-600">
                      {t("To be a premier center of holistic academic excellence and character-building in East Africa, producing highly competent, godly, and innovative citizens.")}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-serif text-sm font-bold text-slate-900 border-b border-slate-100 pb-1">
                    {t("Our Historic Journey & Foundations")}
                  </h4>
                  <p>
                    {t("Established over two decades ago, St. John's College Mpigi was founded on a deep spiritual conviction that true knowledge must go hand in hand with discipline, self-reliance, and outstanding moral integrity.")}
                  </p>
                  <p>
                    {t("Since 2020, the school has been operating under the visionary leadership of <strong>Mugisha Elias Ndemire</strong>. Under his stewardship, the college has undergone significant modern upgrades, enhancing academic rigor, computer and science laboratories, campus security, and student residential facilities.")}
                  </p>
                  <p>
                    {t("From humble beginnings, the college has grown into a highly recognized private boarding school under UNEB, serving hundreds of bright boys and girls from all parts of Uganda and neighboring countries. The serene environment offers a sanctuary for rigorous, uninterrupted learning away from city distractions.")}
                  </p>
                  <p>
                    {t("Today, the school boasts excellent dormitories, multi-purpose assembly halls, fully equipped biology/chemistry/physics laboratories, and standard playfields. We maintain high discipline and academic standards, which is why our candidates continuously score top Division One marks in both UCE and UACE examinations.")}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-200/60">
                  <h4 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-700" />
                    <span>{t("School Core Values")}</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-800">
                    <div>✔ {t("Academic Rigor & Merit")}</div>
                    <div>✔ {t("God-Centered Ethics")}</div>
                    <div>✔ {t("Strict Self-Discipline")}</div>
                    <div>✔ {t("Innovative Practice")}</div>
                    <div>✔ Mutual Respect</div>
                    <div>✔ Personal Integrity</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                  onClick={() => {
                    setShowFullHistory(false);
                    onOpenAdmission();
                  }}
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-colors uppercase tracking-wider"
                >
                  Join Us Today
                </button>
                <button
                  onClick={() => setShowFullHistory(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
                >
                  Close Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
