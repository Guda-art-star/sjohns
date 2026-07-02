import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, Eye, X, ChevronLeft, ChevronRight, 
  Sparkles, Layers, BookOpen, Trophy, School 
} from "lucide-react";

// Import all local images
import gateEntrance from "../assets/images/school_gate_entrance_1782462446101.jpg";
import studentsHero from "../assets/images/students_hero_banner_1782462430116.jpg";
import scienceLab from "../assets/images/science_lab_students_1782476240946.jpg";
import schoolSports from "../assets/images/school_sports_football_1782476254993.jpg";
import computerLab from "../assets/images/computer_lab_students_1782476269336.jpg";
import libraryStudy from "../assets/images/library_study_session_1782476282326.jpg";
import studentsMixedAdmin from "../assets/images/students_mixed_admin_stjohns_1782480359565.jpg";
import studentsGirlsAdmin from "../assets/images/students_girls_admin_stjohns_1782480376617.jpg";

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: "academics" | "facilities" | "sports" | "campus";
  categoryLabel: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "students-mixed-admin",
    src: studentsMixedAdmin,
    title: "Students at the Administration Block",
    category: "campus",
    categoryLabel: "Campus Life",
    description: "Our smart and disciplined students in their maroon and turquoise uniforms posing proudly in front of the main administrative building."
  },
  {
    id: "students-girls-admin",
    src: studentsGirlsAdmin,
    title: "Prefects and Student Leaders",
    category: "campus",
    categoryLabel: "Campus Life",
    description: "Our student leadership team posing in front of the administration building, showcasing smartness and character."
  },
  {
    id: "science-lab",
    src: scienceLab,
    title: "High-Tech Science Laboratory",
    category: "academics",
    categoryLabel: "Academics",
    description: "Students conducting chemistry and biology experiments in our modern, fully-equipped laboratory facilities."
  },
  {
    id: "computer-lab",
    src: computerLab,
    title: "ICT & Computing Center",
    category: "facilities",
    categoryLabel: "Facilities",
    description: "Dynamic digital learning and computer programming classes with modern high-speed individual workstations."
  },
  {
    id: "school-sports",
    src: schoolSports,
    title: "Lush Campus Sports Fields",
    category: "sports",
    categoryLabel: "Sports & Recreation",
    description: "Extensive playing fields hosting competitive football matches, physical training, and outdoor sports events."
  },
  {
    id: "library-study",
    src: libraryStudy,
    title: "Well-Resourced School Library",
    category: "academics",
    categoryLabel: "Academics",
    description: "A peaceful sanctuary housing academic textbooks, literature, and quiet research study zones for all classes."
  },
  {
    id: "gate-entrance",
    src: gateEntrance,
    title: "Main Campus Entrance",
    category: "campus",
    categoryLabel: "Campus Life",
    description: "The secure, gated entrance of our serene campus in Mpigi, ensuring absolute safety for boarding students."
  },
  {
    id: "students-hero",
    src: studentsHero,
    title: "Exemplary Academic Excellence",
    category: "campus",
    categoryLabel: "Campus Life",
    description: "Our determined senior students embodying the core principles of Godliness and Hardwork."
  }
];

const CATEGORIES = [
  { id: "all", label: "All Photos", icon: Layers },
  { id: "academics", label: "Academics", icon: BookOpen },
  { id: "facilities", label: "Facilities", icon: School },
  { id: "sports", label: "Sports", icon: Trophy },
  { id: "campus", label: "Campus Life", icon: Camera }
];

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = selectedCategory === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => {
      if (prev === null) return null;
      return prev === 0 ? filteredItems.length - 1 : prev - 1;
    });
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => {
      if (prev === null) return null;
      return prev === filteredItems.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-t border-b border-slate-100 scroll-mt-12" id="gallery">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-black tracking-widest rounded-full uppercase">
            <Camera className="h-3.5 w-3.5" />
            <span>Campus Gallery</span>
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Take a Visual Tour of Our Campus
          </h2>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
            Explore St. John's College Mpigi through photography. Glimpse our exceptional facilities, rich student learning sessions, and vibrant extracurricular pursuits.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10" id="gallery-filters">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-bold rounded-full flex items-center gap-1.5 transition-all duration-300 uppercase tracking-wider cursor-pointer ${
                  isActive
                    ? "bg-emerald-800 text-white shadow-md shadow-emerald-900/10 scale-102"
                    : "bg-white hover:bg-emerald-50 text-slate-700 border border-slate-200/80 hover:border-emerald-200"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Photos Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          id="gallery-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              // We find the original index of this item in filteredItems to open in lightbox
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/60 transition-all duration-500 flex flex-col h-full"
                  onClick={() => setLightboxIndex(index)}
                >
                  {/* Image wrapper */}
                  <div className="aspect-4/3 overflow-hidden relative bg-slate-900 cursor-pointer">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/95 backdrop-blur-md p-3 rounded-full text-emerald-800 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                        <Eye className="h-5 w-5" />
                      </div>
                    </div>

                    {/* Category pill on image corner */}
                    <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-emerald-400 border border-emerald-500/10 text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded-md shadow-sm">
                      {item.categoryLabel}
                    </span>
                  </div>

                  {/* Context Text Box */}
                  <div className="p-5 flex-grow flex flex-col justify-between space-y-2">
                    <div className="space-y-1">
                      <h3 className="font-serif text-base font-black text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-[11px] font-medium text-slate-500 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    
                    <button className="text-[10px] font-black text-emerald-800 group-hover:text-emerald-900 flex items-center gap-1 uppercase tracking-widest pt-2 mt-auto">
                      <span>View Larger</span>
                      <Sparkles className="h-3 w-3" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal Portal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <div 
              className="fixed inset-0 z-50 flex flex-col justify-between bg-slate-950/95 backdrop-blur-md p-4 md:p-8 select-none"
              id="gallery-lightbox"
              onClick={() => setLightboxIndex(null)}
            >
              {/* Header inside lightbox */}
              <div className="w-full flex items-center justify-between text-white pb-4">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-black text-emerald-400 tracking-widest uppercase">
                    St. John's College Mpigi
                  </span>
                  <p className="font-serif text-sm md:text-base font-bold text-white">
                    {filteredItems[lightboxIndex].title}
                  </p>
                </div>
                
                {/* Close Button */}
                <button 
                  onClick={() => setLightboxIndex(null)}
                  className="p-2 bg-white/10 hover:bg-white/20 text-white hover:text-emerald-300 rounded-full transition-colors cursor-pointer"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Central Viewer */}
              <div className="flex-grow flex items-center justify-center relative my-4 max-h-[70vh]">
                {/* Left navigation arrow */}
                <button
                  onClick={handlePrev}
                  className="absolute left-2 md:left-4 z-10 p-3 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors border border-white/10 hover:border-emerald-400 cursor-pointer"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                {/* Big Image display */}
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="max-w-4xl max-h-[65vh] md:max-h-[70vh] rounded-xl overflow-hidden border border-white/10 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={filteredItems[lightboxIndex].src}
                    alt={filteredItems[lightboxIndex].title}
                    className="w-full h-full max-h-[65vh] md:max-h-[70vh] object-contain"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {/* Right navigation arrow */}
                <button
                  onClick={handleNext}
                  className="absolute right-2 md:right-4 z-10 p-3 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors border border-white/10 hover:border-emerald-400 cursor-pointer"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              {/* Footer info in lightbox */}
              <div className="w-full text-center text-slate-300 max-w-xl mx-auto space-y-2 pt-4">
                <p className="text-xs md:text-sm font-medium leading-relaxed">
                  {filteredItems[lightboxIndex].description}
                </p>
                <div className="inline-flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold text-slate-400">
                  <span>Photo {lightboxIndex + 1} of {filteredItems.length}</span>
                  <span>•</span>
                  <span className="uppercase text-emerald-400 font-extrabold tracking-wider">{filteredItems[lightboxIndex].categoryLabel}</span>
                </div>
              </div>

            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
