import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  X, GraduationCap, DollarSign, Calendar, BookOpen, 
  User, ShieldAlert, CheckCircle, FileText, Download 
} from "lucide-react";

interface StudentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StudentPortalModal({ isOpen, onClose }: StudentPortalModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock student details
  const student = {
    name: "Mukasa Jordan",
    regNo: "SJC/2024/048",
    class: "Senior 4 (S.4 Green)",
    house: "Lwanga House",
    term: "Term II, 2026",
    fees: {
      total: "1,200,000 UGX",
      paid: "1,200,000 UGX",
      balance: "0 UGX",
      status: "Fully Paid",
    },
    grades: [
      { subject: "Mathematics", score: "88%", grade: "D1", remarks: "Excellent" },
      { subject: "English Language", score: "82%", grade: "D1", remarks: "Very Good" },
      { subject: "Physics", score: "78%", grade: "D2", remarks: "Good effort" },
      { subject: "Chemistry", score: "74%", grade: "C3", remarks: "Steady progress" },
      { subject: "Biology", score: "80%", grade: "D2", remarks: "Active participant" },
      { subject: "History", score: "85%", grade: "D1", remarks: "Superb analytical skills" },
      { subject: "Geography", score: "79%", grade: "D2", remarks: "Good grasp of concepts" },
      { subject: "Agriculture", score: "91%", grade: "D1", remarks: "Outstanding practical skills" },
    ],
    announcements: [
      { id: "1", date: "June 25, 2026", text: "Mock examinations for S.4 and S.6 commence on Monday, 6th July." },
      { id: "2", date: "June 20, 2026", text: "Please ensure your scientific calculators and geometrical sets are ready." },
    ],
    timetable: [
      { time: "08:00 AM - 09:30 AM", monday: "Mathematics", tuesday: "English", wednesday: "Physics", thursday: "Chemistry", friday: "History" },
      { time: "09:30 AM - 11:00 AM", monday: "Physics", tuesday: "Biology", wednesday: "Mathematics", thursday: "English", friday: "Geography" },
      { time: "11:30 AM - 01:00 PM", monday: "Chemistry", tuesday: "History", wednesday: "Geography", thursday: "Biology", friday: "Agriculture" },
      { time: "02:00 PM - 03:30 PM", monday: "Agriculture", tuesday: "Commerce", wednesday: "Fine Art", thursday: "CRE", friday: "Games & Sports" },
    ]
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }
    // Simple demo password bypass
    setIsLoggedIn(true);
    setError("");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setActiveTab("dashboard");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl overflow-hidden bg-slate-50 rounded-2xl shadow-2xl flex flex-col h-[85vh]"
        id="student-portal-container"
      >
        {/* Portal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="h-6 w-6 text-emerald-400" />
            <div>
              <h3 className="font-serif font-bold text-lg leading-none">ST. JOHN'S COLLEGE STUDENT PORTAL</h3>
              <p className="text-slate-400 text-[10px] mt-0.5">Academic Progress & Management System</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
            id="close-portal-modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Portal Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {!isLoggedIn ? (
            /* Login Form */
            <div className="flex-1 flex items-center justify-center p-6 bg-white">
              <div className="w-full max-w-sm space-y-6">
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center p-3.5 bg-emerald-50 rounded-full text-emerald-700">
                    <GraduationCap className="h-8 w-8" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-slate-900">Sign in to Student Portal</h4>
                  <p className="text-xs text-slate-500">
                    Enter your Registration Number and Password to access your records
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-red-100">
                      <ShieldAlert className="h-4 w-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700">Registration Number</label>
                    <input
                      type="text"
                      placeholder="e.g., SJC/2024/048"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <label className="block text-xs font-semibold text-slate-700">Password</label>
                      <a href="#" className="text-xs text-emerald-800 hover:underline">Forgot password?</a>
                    </div>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-semibold rounded-lg shadow-md transition-colors"
                  >
                    Log In
                  </button>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600 text-center">
                    <span className="font-semibold text-emerald-800">Demo Mode:</span> You can type anything or use <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800 font-mono">SJC/2024/048</code> and password to enter instantly.
                  </div>
                </form>
              </div>
            </div>
          ) : (
            /* Logged in Dashboard Layout */
            <>
              {/* Sidebar */}
              <div className="w-full md:w-56 bg-slate-900 text-white flex flex-col shrink-0 border-r border-slate-800">
                {/* User info */}
                <div className="p-4 border-b border-slate-800 flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    MJ
                  </div>
                  <div className="overflow-hidden">
                    <h5 className="font-semibold text-sm truncate text-white">{student.name}</h5>
                    <p className="text-[10px] text-slate-400 truncate">{student.regNo}</p>
                  </div>
                </div>

                {/* Sidebar Navigation */}
                <nav className="flex-1 p-2 space-y-1">
                  {[
                    { id: "dashboard", label: "Dashboard", icon: User },
                    { id: "grades", label: "Report Card", icon: BookOpen },
                    { id: "fees", label: "Fees Statement", icon: DollarSign },
                    { id: "timetable", label: "Class Timetable", icon: Calendar },
                  ].map((item) => {
                    const IconComp = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-semibold rounded-lg transition-colors ${
                          isActive
                            ? "bg-emerald-800 text-white font-bold"
                            : "text-slate-400 hover:text-white hover:bg-slate-800"
                        }`}
                      >
                        <IconComp className="h-4.5 w-4.5 shrink-0" />
                        {item.label}
                      </button>
                    );
                  })}
                </nav>

                {/* Log Out button */}
                <div className="p-3 border-t border-slate-800">
                  <button
                    onClick={handleLogout}
                    className="w-full px-3 py-2 text-xs font-semibold text-center text-red-400 hover:text-white bg-red-950/20 hover:bg-red-900/40 rounded-lg transition-all border border-red-900/30"
                  >
                    Log Out Portal
                  </button>
                </div>
              </div>

              {/* Main panel */}
              <div className="flex-1 p-6 md:p-8 overflow-y-auto bg-slate-50">
                {activeTab === "dashboard" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    {/* Welcome Banner */}
                    <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-xl p-5 shadow-sm">
                      <h4 className="font-serif text-lg md:text-xl font-bold">Welcome back, {student.name}!</h4>
                      <p className="text-xs text-emerald-100 mt-1">
                        You are logged into the St. John's College Academic Portal. You have no pending school fees. Keep up the hard work!
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
                        <span className="bg-emerald-700/60 px-2.5 py-1 rounded-md">{student.class}</span>
                        <span className="bg-emerald-700/60 px-2.5 py-1 rounded-md">{student.house}</span>
                        <span className="bg-emerald-700/60 px-2.5 py-1 rounded-md">{student.term}</span>
                      </div>
                    </div>

                    {/* Portal Widgets */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Fees Quick Widget */}
                      <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 shadow-xs">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                          <h5 className="font-serif text-sm font-bold text-slate-800">Fees Status</h5>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100">
                            <CheckCircle className="h-3.5 w-3.5" /> Fully Paid
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center py-1">
                          <div className="p-2 bg-slate-50 rounded-lg">
                            <span className="block text-[10px] text-slate-500 font-semibold uppercase">Billed</span>
                            <span className="text-xs font-bold text-slate-800">{student.fees.total.split(" ")[0]}</span>
                          </div>
                          <div className="p-2 bg-emerald-50/50 rounded-lg">
                            <span className="block text-[10px] text-emerald-600 font-semibold uppercase">Paid</span>
                            <span className="text-xs font-bold text-emerald-700">{student.fees.paid.split(" ")[0]}</span>
                          </div>
                          <div className="p-2 bg-slate-50 rounded-lg">
                            <span className="block text-[10px] text-slate-500 font-semibold uppercase">Balance</span>
                            <span className="text-xs font-bold text-slate-800">{student.fees.balance.split(" ")[0]}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => setActiveTab("fees")}
                          className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-md transition-colors text-center"
                        >
                          View Fees Statement
                        </button>
                      </div>

                      {/* Portal Announcements */}
                      <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 shadow-xs">
                        <h5 className="font-serif text-sm font-bold text-slate-800 border-b border-slate-100 pb-2.5">
                          Portal Announcements
                        </h5>
                        <div className="space-y-3">
                          {student.announcements.map((item) => (
                            <div key={item.id} className="border-l-2 border-emerald-600 pl-3 space-y-0.5">
                              <span className="block text-[9px] font-bold text-slate-400">{item.date}</span>
                              <p className="text-xs text-slate-600 font-medium leading-relaxed">{item.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "grades" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-serif text-lg font-bold text-slate-800">Term II End of Term Report</h4>
                        <p className="text-xs text-slate-500">Student: {student.name} | Registration No: {student.regNo}</p>
                      </div>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-800 text-white text-xs font-semibold rounded-lg hover:bg-emerald-950 transition-colors shadow-sm">
                        <Download className="h-3.5 w-3.5" /> Download PDF
                      </button>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-slate-600 font-bold uppercase border-b border-slate-200">
                            <th className="p-3">Subject</th>
                            <th className="p-3 text-center">Score</th>
                            <th className="p-3 text-center">Grade</th>
                            <th className="p-3">Teacher Remarks</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          {student.grades.map((item, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50">
                              <td className="p-3 font-semibold text-slate-800">{item.subject}</td>
                              <td className="p-3 text-center font-mono font-medium">{item.score}</td>
                              <td className="p-3 text-center">
                                <span className={`inline-block font-mono font-bold px-2 py-0.5 rounded text-[10px] ${
                                  item.grade.startsWith("D") 
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                                    : "bg-amber-50 text-amber-700 border border-amber-100"
                                }`}>
                                  {item.grade}
                                </span>
                              </td>
                              <td className="p-3 text-slate-600 italic">{item.remarks}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Class teacher summary */}
                    <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="block text-[10px] text-emerald-600 font-bold uppercase">Class Teacher's Comment</span>
                        <p className="text-slate-700 mt-1 italic font-medium">"Jordan is an exemplary, hard-working student. He participates actively in class discussions and has maintained excellent performance in Mathematics and Science."</p>
                      </div>
                      <div>
                        <span className="block text-[10px] text-emerald-600 font-bold uppercase">Head Teacher's Comment</span>
                        <p className="text-slate-700 mt-1 italic font-medium">"An outstanding result. Continue to seek excellence and maintain your disciplined focus."</p>
                      </div>
                      <div className="flex flex-col justify-center items-center bg-white p-3 rounded-lg border border-emerald-100 text-center">
                        <span className="block text-[10px] text-slate-500 font-bold uppercase">Average Grade</span>
                        <span className="text-2xl font-serif font-black text-emerald-800 mt-0.5">D1</span>
                        <span className="text-[10px] text-slate-400 font-medium">Ranked: 4th out of 98 students</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "fees" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-slate-800">Fees Account Statement</h4>
                      <p className="text-xs text-slate-500">Track invoices, ledger posts, and clearance certificates</p>
                    </div>

                    {/* Summary card */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <span className="block text-[9px] text-slate-400 font-bold uppercase">Term Base Fees</span>
                        <span className="text-sm font-bold text-slate-800">{student.fees.total}</span>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <span className="block text-[9px] text-slate-400 font-bold uppercase">Surcharges / Dev Fund</span>
                        <span className="text-sm font-bold text-slate-800">0 UGX</span>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <span className="block text-[9px] text-slate-400 font-bold uppercase">Amount Paid</span>
                        <span className="text-sm font-bold text-emerald-700">{student.fees.paid}</span>
                      </div>
                      <div className="bg-emerald-800 text-white p-4 rounded-xl">
                        <span className="block text-[9px] text-emerald-200 font-bold uppercase">Outstanding Bal</span>
                        <span className="text-sm font-bold text-white">{student.fees.balance}</span>
                      </div>
                    </div>

                    {/* Ledger */}
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                      <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                        <span className="font-serif text-xs font-bold text-slate-800">Transaction History</span>
                        <span className="text-[10px] text-slate-400 font-medium font-mono">ID: SJC-LEDGER-48</span>
                      </div>
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="bg-slate-100/50 text-slate-500 font-bold border-b border-slate-100 uppercase text-[10px]">
                            <th className="p-3">Date</th>
                            <th className="p-3">Reference</th>
                            <th className="p-3">Type</th>
                            <th className="p-3 text-right">Debit</th>
                            <th className="p-3 text-right">Credit</th>
                            <th className="p-3 text-right">Balance</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                          <tr className="hover:bg-slate-50/50">
                            <td className="p-3 font-mono text-[11px]">22/05/2026</td>
                            <td className="p-3">School Fees Billing (Term II)</td>
                            <td className="p-3 font-bold text-slate-700">Invoice</td>
                            <td className="p-3 text-right font-mono">1,200,000</td>
                            <td className="p-3 text-right font-mono">-</td>
                            <td className="p-3 text-right font-mono">1,200,000</td>
                          </tr>
                          <tr className="hover:bg-slate-50/50">
                            <td className="p-3 font-mono text-[11px]">25/05/2026</td>
                            <td className="p-3">Centenary Bank EFT - Rec 9831</td>
                            <td className="p-3 font-bold text-emerald-700">Receipt</td>
                            <td className="p-3 text-right font-mono">-</td>
                            <td className="p-3 text-right font-mono text-emerald-600">1,200,000</td>
                            <td className="p-3 text-right font-mono text-emerald-700">0</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl flex items-center gap-3">
                      <FileText className="h-5 w-5 shrink-0" />
                      <div className="text-xs">
                        <span className="font-bold block">Fees Clearance Certificate Ready</span>
                        <p className="mt-0.5">Jordan has fully paid all outstanding dues for Term II. Download the stamp-verified clearance card for examination entry.</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "timetable" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-slate-800">Class Weekly Timetable</h4>
                      <p className="text-xs text-slate-500">Regular schedule for Senior 4 Green - Room 12</p>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                            <th className="p-3">Time Block</th>
                            <th className="p-3">Mon</th>
                            <th className="p-3">Tue</th>
                            <th className="p-3">Wed</th>
                            <th className="p-3">Thu</th>
                            <th className="p-3">Fri</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                          {student.timetable.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50">
                              <td className="p-3 font-mono text-slate-500 font-semibold">{row.time}</td>
                              <td className="p-3"><span className="text-emerald-900 font-semibold">{row.monday}</span></td>
                              <td className="p-3"><span className="text-slate-800 font-semibold">{row.tuesday}</span></td>
                              <td className="p-3"><span className="text-indigo-900 font-semibold">{row.wednesday}</span></td>
                              <td className="p-3"><span className="text-rose-900 font-semibold">{row.thursday}</span></td>
                              <td className="p-3"><span className="text-amber-900 font-semibold">{row.friday}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="p-3 bg-slate-100 rounded-lg text-center text-[11px] text-slate-500 font-semibold">
                      Note: Evening prep is daily from 07:00 PM to 09:30 PM (Compulsory for boarding scholars).
                    </div>
                  </motion.div>
                )}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
