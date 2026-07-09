import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, Award, Calendar, Heart, Send, BookOpen, 
  MapPin, Briefcase, Plus, MessageSquare, Star, CheckCircle, 
  Search, ShieldCheck, Milestone, Landmark, ShieldAlert
} from "lucide-react";
import { useLanguage } from "../LanguageContext";

interface Alumnus {
  id: string;
  name: string;
  gradYear: number;
  profession: string;
  company?: string;
  location: string;
  isMentor: boolean;
  isRegisteredUser?: boolean;
}

interface SchoolProject {
  id: string;
  title: string;
  description: string;
  goal: string;
  pledged: number;
}

interface AlumniMemory {
  id: string;
  name: string;
  gradYear: number;
  memory: string;
  colorClass: string;
  timestamp: string;
}

export default function AlumniSection() {
  const { t } = useLanguage();

  // ---------------- STATE ----------------

  // Search and filter
  const [searchQuery, setSearchQuery] = useState("");
  const [filterYear, setFilterYear] = useState<string>("All");

  // Interactive Tab within the Right Side Panel
  const [activeTab, setActiveTab] = useState<"register" | "give" | "memories">("register");

  // Registration Form State
  const [regName, setRegName] = useState("");
  const [regYear, setRegYear] = useState("2020");
  const [regProfession, setRegProfession] = useState("");
  const [regLocation, setRegLocation] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regIsMentor, setRegIsMentor] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);

  // Pledge Form State
  const [selectedProject, setSelectedProject] = useState("proj-1");
  const [pledgeAmount, setPledgeAmount] = useState("");
  const [pledgerName, setPledgerName] = useState("");
  const [pledgerYear, setPledgerYear] = useState("2020");
  const [pledgeSuccess, setPledgeSuccess] = useState(false);

  // Memories Form State
  const [memName, setMemName] = useState("");
  const [memYear, setMemYear] = useState("2020");
  const [memText, setMemText] = useState("");
  const [memColor, setMemColor] = useState("bg-emerald-50 border-emerald-200 text-emerald-900");
  const [memSuccess, setMemSuccess] = useState(false);

  // Error Messages
  const [formError, setFormError] = useState("");

  // Default Alumni Directory
  const defaultAlumni: Alumnus[] = [
    {
      id: "1",
      name: "Florence Nakato",
      gradYear: 2018,
      profession: "Medical Officer",
      company: "Mulago National Referral Hospital",
      location: "Kampala, Uganda",
      isMentor: true
    },
    {
      id: "2",
      name: "Gerald Mukasa",
      gradYear: 2019,
      profession: "Software Engineer",
      company: "Airtel Uganda",
      location: "Kampala, Uganda",
      isMentor: true
    },
    {
      id: "3",
      name: "Ssubi Patricia",
      gradYear: 2017,
      profession: "Financial Analyst",
      company: "Centenary Bank",
      location: "Masaka, Uganda",
      isMentor: false
    },
    {
      id: "4",
      name: "Daniel Okech",
      gradYear: 2020,
      profession: "Civil Engineer",
      company: "Roko Construction",
      location: "Entebbe, Uganda",
      isMentor: true
    },
    {
      id: "5",
      name: "Kato Joseph",
      gradYear: 2018,
      profession: "Agricultural Scientist",
      company: "NARO Uganda",
      location: "Mbarara, Uganda",
      isMentor: false
    },
    {
      id: "6",
      name: "Lydia Namubiru",
      gradYear: 2021,
      profession: "Law Student",
      company: "Makerere University",
      location: "Kampala, Uganda",
      isMentor: true
    }
  ];

  // Default School Development Projects
  const defaultProjects: SchoolProject[] = [
    {
      id: "proj-1",
      title: "Science & Chemistry Lab Upgrade",
      description: "Equipping the laboratories with modern burners, microscopes, and advanced reagents to strengthen hands-on STEM education.",
      goal: "5,000,000 UGX",
      pledged: 3450000
    },
    {
      id: "proj-2",
      title: "E-Library & Digital Resource Center",
      description: "Acquiring tablets and digital servers to give students online access to UNEB past papers and global scholastic textbooks.",
      goal: "4,000,000 UGX",
      pledged: 1800000
    },
    {
      id: "proj-3",
      title: "Needy Scholar & Sports Sponsorships",
      description: "Providing full boarding tuition and uniforms to exceptionally talented young athletes and scholars from under-privileged backgrounds.",
      goal: "3,000,000 UGX",
      pledged: 2500000
    }
  ];

  // Default Alumni Memories
  const defaultMemories: AlumniMemory[] = [
    {
      id: "mem-1",
      name: "Florence Nakato",
      gradYear: 2018,
      memory: "I will never forget the intense preparation before the National Science Fair. St. John's teachers stayed up late in the lab with us. That's what made me want to become a medical practitioner!",
      colorClass: "bg-emerald-50/70 border-emerald-100 text-emerald-950",
      timestamp: "2 hours ago"
    },
    {
      id: "mem-2",
      name: "Alex Ssewankambo",
      gradYear: 2016,
      memory: "Friday evening debates and our inter-house sports competitions! Running for Crane House and winning the 800m track title is my fondest school memory.",
      colorClass: "bg-amber-50/70 border-amber-100 text-amber-950",
      timestamp: "Yesterday"
    },
    {
      id: "mem-3",
      name: "Shifah Namuganza",
      gradYear: 2020,
      memory: "Ms. Nabakooza's literature classes and the delicious Sunday lunch porridge. The discipline, morning runs, and chapel hymns really built my moral values.",
      colorClass: "bg-sky-50/70 border-sky-100 text-sky-950",
      timestamp: "3 days ago"
    }
  ];

  // Load from LocalStorage
  const [alumni, setAlumni] = useState<Alumnus[]>([]);
  const [projects, setProjects] = useState<SchoolProject[]>([]);
  const [memories, setMemories] = useState<AlumniMemory[]>([]);

  useEffect(() => {
    const savedAlumni = localStorage.getItem("sjc_alumni");
    const savedProjects = localStorage.getItem("sjc_projects");
    const savedMemories = localStorage.getItem("sjc_memories");

    if (savedAlumni) {
      setAlumni(JSON.parse(savedAlumni));
    } else {
      setAlumni(defaultAlumni);
    }

    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      setProjects(defaultProjects);
    }

    if (savedMemories) {
      setMemories(JSON.parse(savedMemories));
    } else {
      setMemories(defaultMemories);
    }
  }, []);

  // Save utility helpers
  const saveAlumni = (list: Alumnus[]) => {
    setAlumni(list);
    localStorage.setItem("sjc_alumni", JSON.stringify(list));
  };

  const saveProjects = (list: SchoolProject[]) => {
    setProjects(list);
    localStorage.setItem("sjc_projects", JSON.stringify(list));
  };

  const saveMemories = (list: AlumniMemory[]) => {
    setMemories(list);
    localStorage.setItem("sjc_memories", JSON.stringify(list));
  };

  // ---------------- HANDLERS ----------------

  // Handle Register Alumnus
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!regName.trim() || !regProfession.trim() || !regLocation.trim() || !regEmail.trim()) {
      setFormError("Please fill in all registration fields.");
      return;
    }

    const newAlumnus: Alumnus = {
      id: "user-" + Date.now(),
      name: regName,
      gradYear: parseInt(regYear),
      profession: regProfession,
      location: regLocation,
      isMentor: regIsMentor,
      isRegisteredUser: true
    };

    const updated = [newAlumnus, ...alumni];
    saveAlumni(updated);

    // Also auto-add a basic memory welcome post
    const welcomeMemory: AlumniMemory = {
      id: "auto-mem-" + Date.now(),
      name: regName,
      gradYear: parseInt(regYear),
      memory: `I just joined the official St. John's College Alumni Registry! Glad to connect with old friends. Let's make Mpigi proud.`,
      colorClass: "bg-emerald-50 border-emerald-100 text-emerald-950",
      timestamp: "Just now"
    };
    saveMemories([welcomeMemory, ...memories]);

    setRegSuccess(true);
    // Reset fields
    setRegName("");
    setRegProfession("");
    setRegLocation("");
    setRegEmail("");
    setRegIsMentor(false);

    setTimeout(() => {
      setRegSuccess(false);
    }, 5000);
  };

  // Handle School Project Pledge
  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!pledgerName.trim() || !pledgeAmount.trim()) {
      setFormError("Please enter your name and pledge amount.");
      return;
    }

    const numericAmount = parseInt(pledgeAmount.replace(/[^0-9]/g, ""));
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setFormError("Please enter a valid positive pledge amount.");
      return;
    }

    const updatedProjects = projects.map(proj => {
      if (proj.id === selectedProject) {
        return {
          ...proj,
          pledged: proj.pledged + numericAmount
        };
      }
      return proj;
    });

    saveProjects(updatedProjects);

    // Add custom memory about the support
    const supportMemory: AlumniMemory = {
      id: "pledge-mem-" + Date.now(),
      name: pledgerName,
      gradYear: parseInt(pledgerYear),
      memory: `I pledged ${parseInt(pledgeAmount).toLocaleString()} UGX to support the '${projects.find(p => p.id === selectedProject)?.title}' project. Proud to support our alma mater!`,
      colorClass: "bg-yellow-50/70 border-yellow-100 text-slate-950",
      timestamp: "Just now"
    };
    saveMemories([supportMemory, ...memories]);

    setPledgeSuccess(true);
    setPledgerName("");
    setPledgeAmount("");

    setTimeout(() => {
      setPledgeSuccess(false);
    }, 5000);
  };

  // Handle memory submit
  const handleMemorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!memName.trim() || !memText.trim()) {
      setFormError("Please provide your name and share a memory.");
      return;
    }

    const newMem: AlumniMemory = {
      id: "mem-" + Date.now(),
      name: memName,
      gradYear: parseInt(memYear),
      memory: memText,
      colorClass: memColor,
      timestamp: "Just now"
    };

    saveMemories([newMem, ...memories]);
    setMemSuccess(true);
    setMemName("");
    setMemText("");

    setTimeout(() => {
      setMemSuccess(false);
    }, 4000);
  };

  // Filter & Search Logics
  const filteredAlumni = alumni.filter(al => {
    const matchesSearch = 
      al.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      al.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
      al.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (al.company && al.company.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesYear = filterYear === "All" || al.gradYear.toString() === filterYear;

    return matchesSearch && matchesYear;
  });

  // Get unique graduation years for filter dropdown
  const gradYearsList = Array.from(new Set(alumni.map(a => a.gradYear))).sort((a: number, b: number) => b - a);

  const colors = [
    { class: "bg-emerald-50/70 border-emerald-150 text-emerald-950 hover:bg-emerald-100/40", label: "Emerald Gate" },
    { class: "bg-amber-50/70 border-amber-150 text-amber-950 hover:bg-amber-100/40", label: "Amber Sun" },
    { class: "bg-sky-50/70 border-sky-150 text-sky-950 hover:bg-sky-100/40", label: "Sky Crane" },
    { class: "bg-purple-50/70 border-purple-150 text-purple-950 hover:bg-purple-100/40", label: "Orchard" }
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200 scroll-mt-12" id="alumni">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-black uppercase tracking-wider mb-4 border border-emerald-200 shadow-2xs">
            <Users className="h-3.5 w-3.5" />
            {t("ST. JOHN'S COLLEGE ALUMNI ASSOCIATION")}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
            {t("Connecting Our Legacy")}
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-4 leading-relaxed font-medium">
            {t("Our graduates have gone on to serve and lead in Uganda and across the globe. Join the network of St. John's College Mpigi alumni to reconnect, give back, and mentor the next generation of leaders.")}
          </p>
        </div>

        {/* Association Key Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Active Members", val: `${alumni.length + 240}+`, desc: "Registered globally", color: "text-emerald-800", bg: "bg-white" },
            { label: "Mentorship Matches", val: "48+", desc: "Students paired with alumni", color: "text-indigo-800", bg: "bg-white" },
            { label: "Pledges Received", val: "7.7M UGX", desc: "For lab & library funds", color: "text-amber-800", bg: "bg-white" },
            { label: "Homecoming Reunion", val: "Sept 12", desc: "Upcoming school gala", color: "text-sky-800", bg: "bg-white" }
          ].map((st, i) => (
            <div key={i} className={`${st.bg} border border-slate-200 p-5 rounded-xl shadow-xs transition-transform hover:-translate-y-0.5 duration-300`}>
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t(st.label)}</span>
              <span className={`block font-serif text-2xl md:text-3xl font-black ${st.color} mt-1`}>{st.val}</span>
              <span className="block text-xs text-slate-500 font-medium mt-1">{t(st.desc)}</span>
            </div>
          ))}
        </div>

        {/* 2-Column Desktop Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Directory Search & Explorer (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">{t("Alumni Registry Directory")}</h3>
                <p className="text-xs text-slate-500 font-medium mt-1">{t("Explore professional careers and locations of St. John's graduates")}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                {filteredAlumni.length} {t("Graduates found")}
              </span>
            </div>

            {/* Filter / Search Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 relative">
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder={t("Search by name, job, or location...")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-700 transition-all placeholder-slate-400"
                />
              </div>

              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-700 cursor-pointer"
              >
                <option value="All">{t("All Years")}</option>
                {gradYearsList.map(y => (
                  <option key={y} value={y.toString()}>{y}</option>
                ))}
              </select>
            </div>

            {/* Directory Cards Grid */}
            <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredAlumni.length > 0 ? (
                filteredAlumni.map((al) => (
                  <motion.div
                    key={al.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`p-4 rounded-xl border transition-all flex justify-between items-center ${
                      al.isRegisteredUser 
                        ? "bg-emerald-50/40 border-emerald-100 hover:border-emerald-200" 
                        : "bg-slate-50/30 border-slate-100 hover:border-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Avatar initials with elegant gradient */}
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-700 to-slate-800 text-white flex items-center justify-center font-bold font-serif text-sm shadow-xs shrink-0">
                        {al.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="font-bold text-xs text-slate-900">{al.name}</h4>
                          <span className="text-[10px] font-black bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded-md border border-slate-200">
                            Class of {al.gradYear}
                          </span>
                          {al.isMentor && (
                            <span className="inline-flex items-center gap-0.5 text-[9px] font-bold bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-md border border-amber-200">
                              <Star className="h-2.5 w-2.5 fill-amber-500 stroke-amber-600" />
                              Mentor
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3.5 mt-1.5 text-slate-500 font-medium text-[11px] flex-wrap">
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3 text-slate-400" />
                            {al.profession} {al.company && `at ${al.company}`}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-slate-400" />
                            {al.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0">
                      {al.isRegisteredUser ? (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" /> Just Joined
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          SJC Alum
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 space-y-3">
                  <div className="inline-flex items-center justify-center p-3.5 bg-slate-100 rounded-full text-slate-400">
                    <Search className="h-6 w-6" />
                  </div>
                  <h5 className="font-serif font-bold text-slate-700">{t("No graduates found")}</h5>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    {t("Try refining your search text or changing the class year filter.")}
                  </p>
                </div>
              )}
            </div>

            {/* Upcoming Alumni Reunions */}
            <div className="border-t border-slate-100 pt-6 space-y-4">
              <h4 className="font-serif text-sm font-bold text-slate-800 uppercase tracking-wider">{t("Upcoming Association Events")}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-r from-emerald-800 to-teal-850 rounded-xl text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full translate-x-4 -translate-y-4 blur-xl transition-all group-hover:scale-125" />
                  <span className="text-[9px] font-black tracking-widest text-emerald-300 uppercase block">{t("11th Annual Homecoming")}</span>
                  <h5 className="font-serif text-sm font-bold mt-1">{t("Grand Alumni General Meeting & Dinner")}</h5>
                  <p className="text-[10px] text-emerald-100/80 mt-1">{t("Catch up with old classmates, hold elections, and enjoy the school brass band.")}</p>
                  <div className="flex items-center gap-3.5 text-[10px] text-white/90 font-bold mt-4 pt-3 border-t border-white/10">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Sept 12, 2026</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Mpigi Campus</span>
                  </div>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2.5 hover:border-emerald-800/20 transition-all">
                  <span className="text-[9px] font-black tracking-widest text-emerald-800 uppercase block">{t("Empowerment Hour")}</span>
                  <h5 className="font-serif text-sm font-bold text-slate-800">{t("Career Guidance & Student Mentorship Day")}</h5>
                  <p className="text-[10px] text-slate-500 leading-relaxed">{t("Successful alumni speak directly to Senior 4 candidates, offering revision tips and career pathways.")}</p>
                  <div className="flex items-center gap-3.5 text-[10px] text-slate-400 font-semibold pt-2">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Oct 24, 2026</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Main Dining Hall</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Hub (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden sticky top-24">
            
            {/* Interactive Tab Switcher Header */}
            <div className="flex bg-slate-50 border-b border-slate-200 p-1.5">
              {[
                { id: "register", label: "Register Profile", icon: Users },
                { id: "give", label: "Give Back Fund", icon: Heart },
                { id: "memories", label: "Memories Wall", icon: MessageSquare }
              ].map((tb) => {
                const Icon = tb.icon;
                const isSelected = activeTab === tb.id;
                return (
                  <button
                    key={tb.id}
                    onClick={() => {
                      setActiveTab(tb.id as any);
                      setFormError("");
                    }}
                    className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-1.5 text-xs font-black rounded-lg transition-all cursor-pointer ${
                      isSelected 
                        ? "bg-white text-emerald-800 shadow-xs border border-slate-200/50" 
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{t(tb.label)}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT AREA */}
            <div className="p-6">
              
              {/* Form Global Validation Error */}
              {formError && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 mb-5 animate-shake">
                  <ShieldAlert className="h-4 w-4 shrink-0" />
                  <span>{t(formError)}</span>
                </div>
              )}

              <AnimatePresence mode="wait">
                
                {/* 1. REGISTER PROFILE TAB */}
                {activeTab === "register" && (
                  <motion.div
                    key="register-tab"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                    <div className="space-y-1">
                      <h4 className="font-serif text-base font-bold text-slate-900">{t("Join the St. John's Registry")}</h4>
                      <p className="text-xs text-slate-500 font-medium">{t("Fill your professional profile to reconnect with your alumni chapters.")}</p>
                    </div>

                    {regSuccess ? (
                      <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }} 
                        animate={{ scale: 1, opacity: 1 }} 
                        className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 text-center space-y-3"
                      >
                        <div className="inline-flex p-3 bg-emerald-100 rounded-full text-emerald-800">
                          <CheckCircle className="h-6 w-6 animate-bounce" />
                        </div>
                        <h5 className="font-serif text-sm font-bold text-emerald-900">{t("Registration Successful!")}</h5>
                        <p className="text-xs text-emerald-700 leading-relaxed">
                          {t("Thank you! You have been added to the dynamic St. John's College registry and a celebratory announcement was posted to the memories wall.")}
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleRegisterSubmit} className="space-y-3">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">{t("Full Name")}</label>
                          <input
                            type="text"
                            placeholder="e.g., Kato Joseph"
                            value={regName}
                            onChange={(e) => setRegName(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-700 transition-all placeholder-slate-400"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">{t("Graduation Year")}</label>
                            <select
                              value={regYear}
                              onChange={(e) => setRegYear(e.target.value)}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-700 cursor-pointer"
                            >
                              {["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014"].map(y => (
                                <option key={y} value={y}>{y}</option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">{t("Current Location")}</label>
                            <input
                              type="text"
                              placeholder="e.g., Kampala, Masaka"
                              value={regLocation}
                              onChange={(e) => setRegLocation(e.target.value)}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-700 transition-all placeholder-slate-400"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">{t("Current Profession & Company")}</label>
                          <input
                            type="text"
                            placeholder="e.g., Banking Officer at Centenary Bank"
                            value={regProfession}
                            onChange={(e) => setRegProfession(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-700 transition-all placeholder-slate-400"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">{t("Email Address")}</label>
                          <input
                            type="email"
                            placeholder="e.g., name@example.com"
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-700 transition-all placeholder-slate-400"
                          />
                        </div>

                        <div className="flex items-center gap-2 py-2 border-y border-slate-100 my-3">
                          <input
                            type="checkbox"
                            id="reg-mentor-check"
                            checked={regIsMentor}
                            onChange={(e) => setRegIsMentor(e.target.checked)}
                            className="h-4 w-4 text-emerald-800 focus:ring-emerald-700 border-slate-300 rounded cursor-pointer"
                          />
                          <label htmlFor="reg-mentor-check" className="text-[11px] font-semibold text-slate-600 leading-tight cursor-pointer">
                            {t("Yes, I would like to mentor current St. John's College scholars and assist with career guidance.")}
                          </label>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                        >
                          {t("Submit Profile")}
                        </button>
                      </form>
                    )}
                  </motion.div>
                )}

                {/* 2. GIVE BACK TAB */}
                {activeTab === "give" && (
                  <motion.div
                    key="give-tab"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                    <div className="space-y-1">
                      <h4 className="font-serif text-base font-bold text-slate-900">{t("Support School Initiatives")}</h4>
                      <p className="text-xs text-slate-500 font-medium">{t("Help us fund ongoing development projects to upgrade academic standards.")}</p>
                    </div>

                    {pledgeSuccess ? (
                      <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }} 
                        animate={{ scale: 1, opacity: 1 }} 
                        className="bg-amber-50 border border-amber-100 rounded-xl p-5 text-center space-y-3"
                      >
                        <div className="inline-flex p-3 bg-amber-100 rounded-full text-amber-800">
                          <Heart className="h-6 w-6 animate-pulse fill-amber-500 stroke-amber-700" />
                        </div>
                        <h5 className="font-serif text-sm font-bold text-amber-900">{t("Thank You For Your Pledge!")}</h5>
                        <p className="text-xs text-amber-700 leading-relaxed">
                          {t("Your support has been logged, and the development fund metrics have updated. A celebration memory was posted on the wall.")}
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handlePledgeSubmit} className="space-y-4">
                        
                        {/* Selected Project */}
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">{t("Choose School Development Project")}</label>
                          <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                            {projects.map((p) => {
                              const isSel = selectedProject === p.id;
                              const pct = Math.min(100, Math.round((p.pledged / parseInt(p.goal.replace(/[^0-9]/g, ""))) * 100));
                              return (
                                <button
                                  type="button"
                                  key={p.id}
                                  onClick={() => setSelectedProject(p.id)}
                                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                                    isSel 
                                      ? "bg-slate-900 text-white border-slate-900 shadow-sm" 
                                      : "bg-slate-50 hover:bg-slate-100/50 border-slate-200 text-slate-800"
                                  }`}
                                >
                                  <div className="flex justify-between items-start">
                                    <h5 className="text-[11px] font-extrabold font-serif leading-none">{p.title}</h5>
                                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${isSel ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"}`}>
                                      {pct}% {t("Raised")}
                                    </span>
                                  </div>
                                  <p className={`text-[10px] mt-1 leading-relaxed ${isSel ? "text-slate-300" : "text-slate-500"}`}>{p.description}</p>
                                  <div className="mt-2.5 flex justify-between items-center text-[10px] font-bold">
                                    <span className={isSel ? "text-emerald-400" : "text-emerald-700"}>Pledged: {p.pledged.toLocaleString()} UGX</span>
                                    <span className={isSel ? "text-slate-400" : "text-slate-400"}>Goal: {p.goal}</span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Pledger Name */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">{t("Your Name")}</label>
                            <input
                              type="text"
                              placeholder="Kato Joseph"
                              value={pledgerName}
                              onChange={(e) => setPledgerName(e.target.value)}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-700 transition-all placeholder-slate-400"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">{t("Class Year")}</label>
                            <select
                              value={pledgerYear}
                              onChange={(e) => setPledgerYear(e.target.value)}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-700 cursor-pointer"
                            >
                              {["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"].map(y => (
                                <option key={y} value={y}>{y}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Pledge amount */}
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">{t("Pledge Amount (UGX)")}</label>
                          <div className="relative">
                            <input
                              type="number"
                              placeholder="e.g., 200000"
                              value={pledgeAmount}
                              onChange={(e) => setPledgeAmount(e.target.value)}
                              className="w-full pl-3 pr-14 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-700 transition-all placeholder-slate-400"
                            />
                            <span className="absolute right-3.5 top-2.5 text-[10px] text-slate-400 font-bold uppercase">UGX</span>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-black uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                        >
                          {t("Submit Development Pledge")}
                        </button>
                      </form>
                    )}
                  </motion.div>
                )}

                {/* 3. MEMORIES WALL TAB */}
                {activeTab === "memories" && (
                  <motion.div
                    key="memories-tab"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                    <div className="space-y-1">
                      <h4 className="font-serif text-base font-bold text-slate-900">{t("Share Your SJC Memories")}</h4>
                      <p className="text-xs text-slate-500 font-medium">{t("Post a short message or note of encouragement, reminiscing on your school days.")}</p>
                    </div>

                    {memSuccess ? (
                      <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }} 
                        animate={{ scale: 1, opacity: 1 }} 
                        className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 text-center space-y-3"
                      >
                        <div className="inline-flex p-3 bg-emerald-100 rounded-full text-emerald-800">
                          <MessageSquare className="h-6 w-6 animate-bounce" />
                        </div>
                        <h5 className="font-serif text-sm font-bold text-emerald-900">{t("Memory Posted!")}</h5>
                        <p className="text-xs text-emerald-700 leading-relaxed">
                          {t("Your lovely memory card has been pinned to the board below for all alumni and current students to read.")}
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleMemorySubmit} className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">{t("Your Name")}</label>
                            <input
                              type="text"
                              placeholder="Florence N."
                              value={memName}
                              onChange={(e) => setMemName(e.target.value)}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-700 transition-all placeholder-slate-400"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">{t("Class Of")}</label>
                            <select
                              value={memYear}
                              onChange={(e) => setMemYear(e.target.value)}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-700 cursor-pointer"
                            >
                              {["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"].map(y => (
                                <option key={y} value={y}>{y}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Card style selection */}
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">{t("Select Card Style Accent")}</label>
                          <div className="flex gap-2">
                            {colors.map((c, idx) => (
                              <button
                                type="button"
                                key={idx}
                                onClick={() => setMemColor(c.class)}
                                className={`flex-1 py-1 px-1 border rounded-lg text-[10px] font-bold text-center capitalize cursor-pointer transition-all ${
                                  memColor === c.class 
                                    ? "bg-slate-900 border-slate-900 text-white shadow-xs" 
                                    : "bg-slate-50 hover:bg-slate-100/50 border-slate-200 text-slate-700"
                                }`}
                              >
                                {c.label.split(" ")[0]}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Memory Message */}
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">{t("Your Memory / Encouragement")}</label>
                          <textarea
                            rows={3}
                            placeholder={t("e.g., The delicious Sunday lunch porridge, and singing in the school choir. Keep studying hard, current scholars!")}
                            value={memText}
                            onChange={(e) => setMemText(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-700 transition-all placeholder-slate-400 resize-none leading-relaxed"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                        >
                          {t("Pin To Memories Board")}
                        </button>
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* MEMORIES WALL GRID: Render below directories dynamically */}
        <div className="mt-16 border-t border-slate-200 pt-12">
          <div className="flex justify-between items-center mb-8 flex-wrap gap-2">
            <div>
              <h3 className="font-serif text-xl font-bold text-slate-900">{t("Alumni Memories & Board Messages")}</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">{t("A cozy noticeboard where St. John's graduates reminisce about their campus years")}</p>
            </div>
            <button 
              onClick={() => {
                setActiveTab("memories");
                // Scroll right column into view if on mobile
                document.getElementById("alumni")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:border-emerald-800/20 text-slate-700 bg-white hover:bg-slate-50 rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5 text-emerald-800" />
              {t("Post a memory")}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatePresence initial={false}>
              {memories.slice(0, 6).map((m, idx) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`p-5 rounded-2xl border flex flex-col justify-between shadow-xs transition-transform hover:-translate-y-1 duration-300 ${m.colorClass}`}
                >
                  <p className="text-xs leading-relaxed font-semibold italic">
                    "{m.memory}"
                  </p>
                  
                  <div className="mt-6 pt-4 border-t border-slate-950/5 flex items-center justify-between text-[10px] font-bold">
                    <div>
                      <span className="block text-slate-800 font-extrabold">{m.name}</span>
                      <span className="block text-slate-400 font-medium mt-0.5">Class of {m.gradYear}</span>
                    </div>
                    <span className="text-slate-400 font-medium font-mono shrink-0 uppercase">
                      {m.timestamp}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
