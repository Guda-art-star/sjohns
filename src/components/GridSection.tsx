import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Bell, Calendar, Link2, GraduationCap, ChevronRight, 
  X, BookOpen, Clock, MapPin, DollarSign, ListTodo, ShieldAlert 
} from "lucide-react";
import { Announcement, SchoolEvent } from "../types";
import UnebResults from "./UnebResults";

interface GridSectionProps {
  onOpenPortal: () => void;
  onOpenAdmission: () => void;
}

export default function GridSection({ onOpenPortal, onOpenAdmission }: GridSectionProps) {
  const [activeAnnouncement, setActiveAnnouncement] = useState<Announcement | null>(null);
  const [activeEvent, setActiveEvent] = useState<SchoolEvent | null>(null);
  const [showAllAnnouncements, setShowAllAnnouncements] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [selectedQuickLink, setSelectedQuickLink] = useState<string | null>(null);

  // Mock Announcements
  const announcements: Announcement[] = [
    {
      id: "1",
      title: "2nd Term Begins",
      date: "June 16, 2026",
      excerpt: "School reopens for Term II. All students are expected to report by 7:00 AM.",
      content: "We are excited to welcome back all scholars for Term II, 2026. Please ensure all boarding requirements (including bedsheets, bucket, mosquito net, and personal hygiene items) are fully prepared. Students must clear any pending library book returns on reporting day. Roll-call will be conducted strictly at 8:00 AM on Monday, 16th June."
    },
    {
      id: "2",
      title: "Annual Open Day 2026",
      date: "June 14, 2026",
      excerpt: "Join us for our annual Open Day. All parents and guardians are welcome!",
      content: "Our annual Open Day will feature science laboratory presentations, music performances, and visual art exhibitions by our students. Parents will have a dedicated interactive session with class teachers to review Term I academic reports and discuss character development pathways."
    },
    {
      id: "3",
      title: "UNEB Center Clearance",
      date: "May 28, 2026",
      excerpt: "UCE & UACE examination registration and biological data verification.",
      content: "All Senior 4 and Senior 6 candidates are requested to verify their biological data and selected subject combinations with the director of studies. Please bring original birth certificates or previous class assessment sheets."
    }
  ];

  // Mock Upcoming Events
  const events: SchoolEvent[] = [
    {
      id: "1",
      title: "Science Exhibition",
      date: "May 20, 2026",
      time: "09:00 AM - 04:00 PM",
      location: "Main Science Hall",
      description: "Annual STEM exhibition featuring youth innovation, electronics, and agricultural science projects designed entirely by our senior science students."
    },
    {
      id: "2",
      title: "Careers Day",
      date: "June 10, 2026",
      time: "10:00 AM - 01:00 PM",
      location: "Assembly Grounds",
      description: "Mentorship sessions with leading Ugandan professionals in Medicine, Engineering, ICT, Business Administration, Law, and creative arts."
    },
    {
      id: "3",
      title: "Inter-House Sports Festival",
      date: "July 12, 2026",
      time: "08:30 AM - 06:00 PM",
      location: "School Sports Complex",
      description: "Vibrant track and field events, football, basketball, and netball matches. Four main houses compete for the coveted St. John's Jubilee Trophy."
    }
  ];

  return (
    <section className="py-12 bg-slate-50 border-t border-b border-slate-100 scroll-mt-12" id="grid-dashboard">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Announcements */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center gap-2 text-slate-800">
                  <Bell className="h-4.5 w-4.5 text-emerald-800 shrink-0" />
                  <h3 className="font-serif text-sm font-bold uppercase tracking-wide">Announcements</h3>
                </div>
                <button
                  onClick={() => setShowAllAnnouncements(true)}
                  className="text-[10px] font-bold text-emerald-800 hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {announcements.slice(0, 2).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveAnnouncement(item)}
                    className="group cursor-pointer hover:bg-slate-50/50 p-2.5 rounded-lg border border-transparent hover:border-slate-100 transition-all space-y-1.5"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="inline-block px-1.5 py-0.5 bg-rose-50 text-rose-700 rounded text-[9px] font-bold uppercase">
                        Notice
                      </span>
                      <span className="text-[9px] font-bold text-slate-400">{item.date}</span>
                    </div>
                    <h4 className="font-sans text-xs font-bold text-slate-800 group-hover:text-emerald-800 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-50">
              <span className="text-[10px] text-slate-400 font-medium">Daily bulletin updated weekly.</span>
            </div>
          </div>

          {/* Column 2: Upcoming Events */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center gap-2 text-slate-800">
                  <Calendar className="h-4.5 w-4.5 text-emerald-800 shrink-0" />
                  <h3 className="font-serif text-sm font-bold uppercase tracking-wide">Upcoming Events</h3>
                </div>
                <button
                  onClick={() => setShowAllEvents(true)}
                  className="text-[10px] font-bold text-emerald-800 hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {events.slice(0, 2).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveEvent(item)}
                    className="group cursor-pointer hover:bg-slate-50/50 p-2.5 rounded-lg border border-transparent hover:border-slate-100 transition-all space-y-1.5"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="inline-block px-1.5 py-0.5 bg-emerald-50 text-emerald-800 rounded text-[9px] font-bold uppercase">
                        Event
                      </span>
                      <span className="text-[9px] font-bold text-slate-400">{item.date}</span>
                    </div>
                    <h4 className="font-sans text-xs font-bold text-slate-800 group-hover:text-emerald-800 transition-colors">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                      <Clock className="h-3 w-3" />
                      <span>{item.time || "All Day"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-50">
              <span className="text-[10px] text-slate-400 font-medium">Calendar subject to change.</span>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center gap-2 text-slate-800">
                  <Link2 className="h-4.5 w-4.5 text-emerald-800 shrink-0" />
                  <h3 className="font-serif text-sm font-bold uppercase tracking-wide">Quick Links</h3>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                {[
                  { name: "Fees Structure", tag: "fees" },
                  { name: "Admission Requirements", tag: "requirements" },
                  { name: "School Calendar", tag: "calendar" },
                  { name: "Exam Results", tag: "results" }
                ].map((link, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedQuickLink(link.tag)}
                    className="flex items-center justify-between p-2.5 hover:bg-emerald-50/40 border border-slate-100 hover:border-emerald-100 rounded-lg text-left text-xs font-semibold text-slate-700 hover:text-emerald-800 transition-all cursor-pointer group"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-1 group-hover:text-emerald-800 transition-all" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-50">
              <button 
                onClick={onOpenAdmission}
                className="text-[11px] font-bold text-rose-600 hover:underline text-left uppercase tracking-wider"
              >
                Inquire For Admissions →
              </button>
            </div>
          </div>

          {/* Column 4: Student Portal */}
          <div className="bg-emerald-900 text-white p-6 rounded-2xl border border-emerald-800 shadow-lg flex flex-col justify-between relative overflow-hidden group">
            {/* Design circle */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-800/60 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500" />
            
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-2 border-b border-emerald-800/80 pb-3 mb-4">
                <GraduationCap className="h-5 w-5 text-emerald-300 shrink-0" />
                <h3 className="font-serif text-sm font-bold uppercase tracking-wide">Student Portal</h3>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-emerald-100 font-medium leading-relaxed">
                  Access your portal for academic resources, report cards, fees statement, and more.
                </p>
                <div className="flex items-center gap-2 p-2.5 bg-emerald-950/40 rounded-lg border border-emerald-800">
                  <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-[10px] font-semibold text-emerald-200">Term II End Report card is ready!</span>
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <button
                onClick={onOpenPortal}
                className="w-full py-3 bg-white text-emerald-900 font-bold text-xs uppercase tracking-wider rounded-lg shadow-md hover:bg-emerald-50 transition-colors cursor-pointer text-center block"
                id="portal-login-button"
              >
                Login Now
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 1. Announcement Detail Modal */}
      <AnimatePresence>
        {activeAnnouncement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full relative border border-slate-100"
            >
              <button
                onClick={() => setActiveAnnouncement(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors"
                id="close-announcement-modal"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="border-b border-slate-100 pb-3 mb-4 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="inline-block px-1.5 py-0.5 bg-rose-100 text-rose-800 text-[9px] font-black tracking-wider uppercase rounded">
                    Official Notice
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">{activeAnnouncement.date}</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-slate-900 leading-tight">
                  {activeAnnouncement.title}
                </h4>
              </div>

              <p className="text-xs text-slate-600 font-medium leading-relaxed whitespace-pre-line">
                {activeAnnouncement.content}
              </p>

              <button
                onClick={() => setActiveAnnouncement(null)}
                className="mt-6 w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors text-center"
              >
                Back to Dashboard
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Event Detail Modal */}
      <AnimatePresence>
        {activeEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full relative border border-slate-100"
            >
              <button
                onClick={() => setActiveEvent(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors"
                id="close-event-modal"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="border-b border-slate-100 pb-3 mb-4 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="inline-block px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-black tracking-wider uppercase rounded">
                    Calendar Event
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">{activeEvent.date}</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-slate-900 leading-tight">
                  {activeEvent.title}
                </h4>
              </div>

              <div className="space-y-3.5 text-xs text-slate-600 font-medium">
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div>
                    <span className="block text-[9px] text-slate-400 font-bold uppercase">Time Block</span>
                    <span className="text-slate-800 font-semibold">{activeEvent.time || "All Day"}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-400 font-bold uppercase">Location</span>
                    <span className="text-slate-800 font-semibold">{activeEvent.location || "Campus Ground"}</span>
                  </div>
                </div>

                <p className="leading-relaxed whitespace-pre-line">
                  {activeEvent.description}
                </p>
              </div>

              <button
                onClick={() => setActiveEvent(null)}
                className="mt-6 w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors text-center"
              >
                Back to Dashboard
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. All Announcements View Modal */}
      <AnimatePresence>
        {showAllAnnouncements && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-lg w-full relative border border-slate-100 max-h-[80vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowAllAnnouncements(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors"
                id="close-all-announcements"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="border-b border-slate-100 pb-3 mb-4">
                <h3 className="font-serif text-lg font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <Bell className="h-4.5 w-4.5 text-emerald-800" />
                  <span>St. John's College Announcements</span>
                </h3>
              </div>

              <div className="space-y-4 divide-y divide-slate-100">
                {announcements.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setShowAllAnnouncements(false);
                      setActiveAnnouncement(item);
                    }}
                    className={`cursor-pointer hover:bg-slate-50/50 p-3 rounded-lg transition-all space-y-1.5 ${idx > 0 ? "pt-4" : ""}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold text-slate-400">{item.date}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 hover:text-emerald-800">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowAllAnnouncements(false)}
                className="mt-6 w-full py-2.5 bg-slate-950 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Close List
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. All Events View Modal */}
      <AnimatePresence>
        {showAllEvents && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-lg w-full relative border border-slate-100 max-h-[80vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowAllEvents(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors"
                id="close-all-events"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="border-b border-slate-100 pb-3 mb-4">
                <h3 className="font-serif text-lg font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <Calendar className="h-4.5 w-4.5 text-emerald-800" />
                  <span>St. John's College Event Calendar</span>
                </h3>
              </div>

              <div className="space-y-4 divide-y divide-slate-100">
                {events.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setShowAllEvents(false);
                      setActiveEvent(item);
                    }}
                    className={`cursor-pointer hover:bg-slate-50/50 p-3 rounded-lg transition-all space-y-1.5 ${idx > 0 ? "pt-4" : ""}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold text-slate-400">{item.date}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 hover:text-emerald-800">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowAllEvents(false)}
                className="mt-6 w-full py-2.5 bg-slate-950 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Close Calendar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. Quick Links Information Modal */}
      <AnimatePresence>
        {selectedQuickLink && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`bg-white rounded-2xl shadow-2xl p-6 md:p-8 relative border border-slate-100 max-h-[90vh] overflow-y-auto transition-all duration-300 w-full ${
                selectedQuickLink === "results" ? "max-w-4xl" : "max-w-md"
              }`}
            >
              <button
                onClick={() => setSelectedQuickLink(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors"
                id="close-quicklink-modal"
              >
                <X className="h-5 w-5" />
              </button>

              {selectedQuickLink === "fees" && (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-emerald-800" />
                    <h4 className="font-serif text-lg font-bold text-slate-900">Academic Fees Structure</h4>
                  </div>
                  <div className="text-xs text-slate-600 font-medium space-y-3">
                    <p>St. John's College Mpigi maintains highly affordable fee standards with zero hidden charges. Below is the approved schedule for Term II, 2026:</p>
                    
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-2">
                      <div className="flex justify-between font-bold border-b border-slate-200 pb-1.5 text-slate-800">
                        <span>Class Level</span>
                        <span>Termly Base Fees</span>
                      </div>
                      <div className="flex justify-between">
                        <span>S.1 - S.2 (O-Level)</span>
                        <span className="font-bold text-slate-800">1,150,000 UGX</span>
                      </div>
                      <div className="flex justify-between">
                        <span>S.3 - S.4 (O-Level)</span>
                        <span className="font-bold text-slate-800">1,200,000 UGX</span>
                      </div>
                      <div className="flex justify-between">
                        <span>S.5 - S.6 (A-Level Arts/Sci)</span>
                        <span className="font-bold text-slate-800">1,280,000 UGX</span>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-50 rounded-lg text-emerald-800 space-y-1.5">
                      <span className="font-bold text-[10px] uppercase block">Includes:</span>
                      <p className="text-[11px] leading-relaxed">Full boarding facilities, standard meals, educational software, library access, and basic dispensary health services.</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedQuickLink === "requirements" && (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                    <ListTodo className="h-5 w-5 text-emerald-800" />
                    <h4 className="font-serif text-lg font-bold text-slate-900">Admission Requirements</h4>
                  </div>
                  <div className="text-xs text-slate-600 font-medium space-y-3">
                    <p>To join St. John's College Mpigi, candidates must submit and satisfy the following educational requirements:</p>
                    <ul className="space-y-2 list-disc pl-4 text-slate-700">
                      <li><span className="font-bold text-slate-900">PLE Result Slip:</span> Photocopy of original PLE results from UNEB.</li>
                      <li><span className="font-bold text-slate-900">Recommendation Letter:</span> Clean conduct report from the previous primary/secondary school.</li>
                      <li><span className="font-bold text-slate-900">Passport Photos:</span> Three recent color passport photos of the candidate.</li>
                      <li><span className="font-bold text-slate-900">Admission Assessment:</span> Brief diagnostic interview in Mathematics and English.</li>
                    </ul>
                    <button
                      onClick={() => {
                        setSelectedQuickLink(null);
                        onOpenAdmission();
                      }}
                      className="mt-2 w-full py-2 bg-emerald-800 hover:bg-emerald-950 text-white text-xs font-bold rounded-lg text-center uppercase tracking-wider transition-colors shadow"
                    >
                      Apply Now Online
                    </button>
                  </div>
                </div>
              )}

              {selectedQuickLink === "calendar" && (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-emerald-800" />
                    <h4 className="font-serif text-lg font-bold text-slate-900">Term II, 2026 School Calendar</h4>
                  </div>
                  <div className="text-xs text-slate-600 font-medium space-y-3.5">
                    <div className="space-y-2.5">
                      <div className="flex justify-between border-b border-slate-100 pb-1.5">
                        <span className="font-bold text-slate-800">16th June, 2026</span>
                        <span className="text-emerald-800 font-semibold">Reporting Day / Term II Starts</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 pb-1.5">
                        <span className="font-bold text-slate-800 font-medium">6th - 11th July</span>
                        <span className="text-slate-700">O & A Level Mid-Term Assessments</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 pb-1.5">
                        <span className="font-bold text-slate-800 font-medium">2nd August, 2026</span>
                        <span className="text-slate-700 font-semibold">Visitation Day & Class meetings</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 pb-1.5">
                        <span className="font-bold text-slate-800 font-medium">4th September, 2026</span>
                        <span className="text-rose-700 font-bold">Term II Closes</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}              {selectedQuickLink === "results" && (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-emerald-800" />
                    <h4 className="font-serif text-lg font-bold text-slate-900">UNEB National Exam Records</h4>
                  </div>
                  
                  {/* Digital exact replica of the physical flyer */}
                  <UnebResults />
                </div>
              )}

              <button
                onClick={() => setSelectedQuickLink(null)}
                className="mt-6 w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors text-center"
              >
                Close Quick Link
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
