import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, ShieldAlert, Sparkles, BookOpen, Heart, Trophy, X } from "lucide-react";

export default function KeyPillars() {
  const [selectedPillar, setSelectedPillar] = useState<{
    title: string;
    description: string;
    details: string[];
    icon: any;
    color: string;
  } | null>(null);

  const pillars = [
    {
      title: "Academic Excellence",
      description: "Top performance in academics and beyond.",
      icon: BookOpen,
      color: "bg-emerald-800 text-emerald-100",
      details: [
        "Highly-qualified and dedicated teachers providing personalized attention.",
        "Equipped state-of-the-art laboratory facilities for Science and ICT practicals.",
        "UNEB national examination center with consistent Division 1 records.",
        "Weekly evaluation tests, discussion groups, and career guidance seminars."
      ]
    },
    {
      title: "Discipline & Integrity",
      description: "Building character for lifelong success.",
      icon: Heart,
      color: "bg-rose-700 text-rose-100",
      details: [
        "Strong focus on moral uprightness, respect, and spiritual growth.",
        "Consistent mentoring programs to cultivate high personal standards.",
        "Safe, well-governed, and distraction-free boarding environment.",
        "Partnership with parents to nurture well-behaved, responsible leaders."
      ]
    },
    {
      title: "Holistic Development",
      description: "Nurturing talents and leadership.",
      icon: Trophy,
      color: "bg-amber-600 text-amber-100",
      details: [
        "Vibrant clubs including Debating Society, Science Club, Drama and Music.",
        "Competitive sports leagues in football, basketball, netball, and athletics.",
        "Student leadership bodies and prefect councils cultivating governance skills.",
        "Community outreach programs to instill civic duty and global empathy."
      ]
    }
  ];

  return (
    <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 -mt-12 md:-mt-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((pillar, idx) => {
          const IconComp = pillar.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setSelectedPillar(pillar)}
              className="bg-white p-6 rounded-xl shadow-xl border border-slate-100 cursor-pointer flex flex-col md:flex-row items-center md:items-start gap-4 transition-all duration-300"
            >
              {/* Icon */}
              <div className={`p-3.5 rounded-full ${pillar.color} shrink-0 shadow-md`}>
                <IconComp className="h-6 w-6" />
              </div>

              {/* Text */}
              <div className="text-center md:text-left space-y-1">
                <h3 className="font-serif text-lg font-bold text-slate-800">{pillar.title}</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{pillar.description}</p>
                <span className="inline-flex items-center text-[10px] font-bold text-emerald-800 hover:underline mt-1.5 uppercase tracking-wider">
                  Read Core values →
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pillar Details Modal */}
      <AnimatePresence>
        {selectedPillar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full relative border border-slate-100"
            >
              <button
                onClick={() => setSelectedPillar(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors"
                id="close-pillar-modal"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-3.5 border-b border-slate-100 pb-4 mb-4">
                <div className={`p-3 rounded-full ${selectedPillar.color}`}>
                  <selectedPillar.icon className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-emerald-800 tracking-wider uppercase">Our Pillars</span>
                  <h4 className="font-serif text-xl font-bold text-slate-900 leading-none mt-1">
                    {selectedPillar.title}
                  </h4>
                </div>
              </div>

              <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">
                Here is how St. John's College Mpigi implements and guarantees this foundational pillar of education:
              </p>

              <ul className="space-y-3">
                {selectedPillar.details.map((item, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-xs text-slate-700 leading-relaxed font-medium">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-600 shrink-0 mt-1.5"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedPillar(null)}
                className="mt-6 w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors text-center"
              >
                Okay, I understand
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
