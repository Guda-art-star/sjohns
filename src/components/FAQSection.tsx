import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, Search, ChevronDown, BookOpen, UserCheck, ShieldCheck, Landmark, MessageSquare, Send, Sparkles } from "lucide-react";
import { useLanguage } from "../LanguageContext";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "admissions" | "fees" | "academics" | "campus" | "general";
  icon: React.ComponentType<any>;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: "admission-process",
    question: "What is the admission procedure and requirements for new students?",
    answer: "We welcome applications for Senior One (S.1) to Senior Five (S.5). Parents can apply online using our digital portal or pick up admission packs from our campus in Mpigi. Key requirements include the student's PLE or UCE UNEB result slip, report cards from the previous school, a birth certificate copy, and a recommendation letter.",
    category: "admissions",
    icon: UserCheck
  },
  {
    id: "school-fees",
    question: "What are the school fees rates, and do you offer installment payment plans?",
    answer: "Our fees are exceptionally structured to provide premium quality boarding, feeding, and teaching. To assist our families, St. John's College Mpigi permits flexible payment plans where parents can settle school fees in three structured installments per term. Detailed fees circulars can be requested via our administrative contacts or WhatsApp desk.",
    category: "fees",
    icon: Landmark
  },
  {
    id: "curriculum-stem",
    question: "What curriculum does St. John's follow, and how are sciences supported?",
    answer: "We offer the official UNEB curriculum for both O-Level and A-Level. As part of our commitment to STEM education, we have fully equipped science laboratories and a state-of-the-art computer lab where practical learning is integrated into the daily timetable. Our outstanding national UNEB results are a testament to our quality instruction.",
    category: "academics",
    icon: BookOpen
  },
  {
    id: "boarding-security",
    question: "What boarding facilities and safety protocols are established?",
    answer: "We offer spacious, well-aerated boarding dormitories with single-deck beds for maximum safety. The campus maintains 24/7 security with armed personnel, strict visitor gate control, resident nurses at our school sanatorium, and dedicated wardens and matrons who supervise students' welfare and spiritual development.",
    category: "campus",
    icon: ShieldCheck
  },
  {
    id: "extracurricular",
    question: "How does the school nurture sports, music, and student talents?",
    answer: "Aligned with our motto 'Godliness & Hardwork', extra-curriculars are integral. We have a standard football field where our teams train, alongside active clubs for Music, Dance, & Drama (MDD), Debate, and Scripture Union. Talented students often qualify for sports and academic merit-based bursaries.",
    category: "campus",
    icon: Sparkles
  },
  {
    id: "uniforms-supplies",
    question: "What is the uniform policy, and what are the colors of the school?",
    answer: "Our official school uniform features elegant maroon/burgundy blazers, white collared shirts, dark navy blue trousers for boys, and crisp white shirts with bright turquoise blue pleated skirts and turquoise neckties for girls. The complete uniform pack is issued upon successful admission and registration.",
    category: "general",
    icon: HelpCircle
  }
];

const CATEGORIES = [
  { id: "all", label: "All Questions" },
  { id: "admissions", label: "Admissions" },
  { id: "fees", label: "Fees & Plans" },
  { id: "academics", label: "Academics" },
  { id: "campus", label: "Campus & Welfare" },
  { id: "general", label: "General" }
];

export default function FAQSection() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>("admission-process");
  
  // Custom user query form
  const [customQuestion, setCustomQuestion] = useState("");
  const [parentName, setParentName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((faq) => {
      const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
      const translatedQ = t(faq.question).toLowerCase();
      const translatedA = t(faq.answer).toLowerCase();
      const search = searchQuery.toLowerCase();
      const matchesSearch = translatedQ.includes(search) || translatedA.includes(search);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory, t]);

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion || !parentName || !contactInfo) return;
    
    // Simulate API storage / alert response
    setSubmittedMessage(true);
    setTimeout(() => {
      setCustomQuestion("");
      setParentName("");
      setContactInfo("");
      setSubmittedMessage(false);
    }, 5000);
  };

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/60" id="faq-section">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14" id="faq-header-container">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-black tracking-widest rounded-full uppercase">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>{t("Prospective Parents")}</span>
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-black text-slate-900 leading-tight">
            {t("Frequently Asked Questions")}
          </h2>
          <p className="text-xs md:text-sm font-medium text-slate-600 leading-relaxed">
            {t("Find immediate answers to questions regarding admission, student life, fees payments, and academic standards at St. John's College Mpigi.")}
          </p>
        </div>

        {/* Search and Category Filter Toolbar */}
        <div className="mb-10 space-y-4" id="faq-toolbar-container">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start w-full md:w-auto">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      // Reset open state to first visible question if any
                      setExpandedId(null);
                    }}
                    className={`px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 uppercase tracking-wider cursor-pointer ${
                      isActive
                        ? "bg-emerald-800 text-white shadow-md shadow-emerald-900/10"
                        : "bg-white hover:bg-emerald-50 text-slate-700 border border-slate-200/85 hover:border-emerald-200"
                    }`}
                  >
                    {t(cat.label)}
                  </button>
                );
              })}
            </div>

            {/* Live Search Input Box */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder={t("Search queries...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Main Grid Layout: Left FAQs, Right Quick Question Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Accordion-Based FAQ list */}
          <div className="lg:col-span-8 space-y-4" id="faq-accordion-list">
            <AnimatePresence initial={false}>
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq) => {
                  const isExpanded = expandedId === faq.id;
                  const IconComponent = faq.icon;
                  
                  return (
                    <div
                      key={faq.id}
                      className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 ${
                        isExpanded 
                          ? "border-emerald-800/30 shadow-md shadow-slate-100" 
                          : "border-slate-200/85 hover:border-emerald-800/20 shadow-xs"
                      }`}
                      id={`faq-item-${faq.id}`}
                    >
                      {/* Accordion Trigger Header */}
                      <button
                        onClick={() => handleToggle(faq.id)}
                        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className={`p-2.5 rounded-lg shrink-0 transition-all ${
                            isExpanded ? "bg-emerald-50 text-emerald-800" : "bg-slate-50 text-slate-500"
                          }`}>
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <h3 className={`text-sm md:text-base font-bold transition-colors ${
                            isExpanded ? "text-emerald-800" : "text-slate-900"
                          }`}>
                            {t(faq.question)}
                          </h3>
                        </div>
                        <ChevronDown className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                          isExpanded ? "rotate-180 text-emerald-800" : ""
                        }`} />
                      </button>

                      {/* Animated Expandable Content Box */}
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-50">
                            <p className="bg-slate-50/70 p-4 rounded-lg border border-slate-100/60 font-medium">
                              {t(faq.answer)}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 bg-white border border-slate-200/85 rounded-xl space-y-3">
                  <p className="text-sm font-semibold text-slate-500">{t("No matching questions found.")}</p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                    }}
                    className="text-xs font-black text-emerald-800 hover:underline uppercase tracking-wider"
                  >
                    {t("Clear Search Filters")}
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Interactive Quick Inquiry Question Card */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-slate-200/85 rounded-2xl p-6 md:p-8 shadow-xs sticky top-28 space-y-6" id="faq-inquiry-box">
              <div className="space-y-2">
                <div className="inline-flex p-2 bg-sky-50 rounded-lg text-sky-600 shadow-xs">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-lg font-black text-slate-900">
                  {t("Still have questions?")}
                </h3>
                <p className="text-xs font-medium text-slate-500 leading-relaxed">
                  {t("Submit your custom query below. Our Admissions Office at Mpigi will respond to you via email or phone within 24 working hours.")}
                </p>
              </div>

              {submittedMessage ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50 border border-emerald-100 p-5 rounded-xl text-center space-y-3"
                >
                  <Sparkles className="h-8 w-8 text-emerald-700 mx-auto animate-bounce" />
                  <h4 className="text-sm font-black text-emerald-800">{t("Inquiry Received Successfully!")}</h4>
                  <p className="text-[11px] font-bold text-emerald-700/85 leading-relaxed">
                    {t("Thank you, {parentName}. Your request has been queued in our registry system. We will contact you at {contactInfo} soon.", { parentName, contactInfo })}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleCustomSubmit} className="space-y-4">
                  {/* Parent Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">{t("Your Full Name")}</label>
                    <input
                      type="text"
                      required
                      placeholder={t("e.g. John Okello")}
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-800/10 focus:border-emerald-800 transition-all"
                    />
                  </div>

                  {/* Email/Phone */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">{t("Contact Info (Phone / Email)")}</label>
                    <input
                      type="text"
                      required
                      placeholder={t("e.g. parents@example.com")}
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-800/10 focus:border-emerald-800 transition-all"
                    />
                  </div>

                  {/* Inquiry Question Textarea */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">{t("Your Question / Inquiry")}</label>
                    <textarea
                      required
                      rows={3}
                      placeholder={t("Ask about boarding guidelines, sports bursaries, UNEB requirements, etc...")}
                      value={customQuestion}
                      onChange={(e) => setCustomQuestion(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-800/10 focus:border-emerald-800 transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-800 hover:bg-emerald-950 text-white text-xs font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
                  >
                    <span>{t("Send Inquiry")}</span>
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
