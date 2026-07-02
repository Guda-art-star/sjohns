import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, X, ShieldAlert } from "lucide-react";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { sender: "user" | "bot"; text: string; time: string }[]
  >([
    {
      sender: "bot",
      text: "Hello! Welcome to St. John's College Mpigi Admissions & Support Desk. How can we help you today?",
      time: "Just now",
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMsg = message;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Update user message
    const updatedHistory = [
      ...chatHistory,
      { sender: "user", text: userMsg, time: now },
    ];
    setChatHistory(updatedHistory);
    setMessage("");

    // Simulate response
    setTimeout(() => {
      let botResponse = "Thank you for reaching out to us. An admissions officer will review your message shortly. Please feel free to also submit an online application via the 'APPLY NOW' button at the top!";
      
      const lower = userMsg.toLowerCase();
      if (lower.includes("fee") || lower.includes("cost") || lower.includes("structure")) {
        botResponse = "The fees structure for Term II is 1,200,000 UGX for boarding students. For detailed requirements and fee breakdown, click the 'Fees Structure' link under Quick Links or apply online.";
      } else if (lower.includes("admission") || lower.includes("apply") || lower.includes("join")) {
        botResponse = "Admissions are currently open for all classes (Senior 1 to Senior 6). You can instantly fill in the form using the green 'APPLY NOW' button on our homepage!";
      } else if (lower.includes("location") || lower.includes("where")) {
        botResponse = "St. John's College Mpigi is located in Mpigi, Uganda. Our campus provides a serene, safe, and academically stimulating boarding environment for our scholars.";
      } else if (lower.includes("contact") || lower.includes("phone") || lower.includes("email")) {
        botResponse = "You can call us directly on +256 772 454459 or email us at info@stjohnscollegempigi.ac.ug. Our offices are open Monday to Saturday from 8:00 AM to 5:00 PM.";
      }

      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", text: botResponse, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden mb-4 flex flex-col h-[400px]"
            id="whatsapp-chatbox"
          >
            {/* Header */}
            <div className="bg-emerald-800 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-emerald-700 rounded-full flex items-center justify-center font-bold text-white relative">
                  SJ
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-emerald-800 rounded-full"></span>
                </div>
                <div>
                  <h4 className="font-semibold text-xs leading-none">St. John's College Help Desk</h4>
                  <p className="text-[10px] text-emerald-200 mt-1">Online • Typically replies in 1 min</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-emerald-700/60 transition-colors text-emerald-100 hover:text-white"
                id="close-whatsapp"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-3 flex flex-col">
              {chatHistory.map((item, idx) => (
                <div
                  key={idx}
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                    item.sender === "user"
                      ? "bg-emerald-800 text-white rounded-tr-none self-end"
                      : "bg-white text-slate-700 rounded-tl-none self-start shadow-xs border border-slate-100"
                  }`}
                >
                  <p>{item.text}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      item.sender === "user" ? "text-emerald-200" : "text-slate-400 font-medium"
                    }`}
                  >
                    {item.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 bg-white flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 px-3 py-1.5 border border-slate-200 rounded-full text-xs focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
              <button
                type="submit"
                className="p-2 bg-emerald-800 hover:bg-emerald-950 text-white rounded-full transition-colors shrink-0 shadow-sm"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg font-semibold text-xs tracking-wide cursor-pointer select-none transition-all"
        id="whatsapp-floating-button"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
        </span>
        <MessageSquare className="h-4.5 w-4.5" />
        <span>Chat With Us</span>
      </motion.button>
    </div>
  );
}
