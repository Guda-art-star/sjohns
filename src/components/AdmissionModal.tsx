import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, Award, User, BookOpen, MessageSquare, ArrowRight, ArrowLeft } from "lucide-react";

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdmissionModal({ isOpen, onClose }: AdmissionModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    classApplied: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    previousSchool: "",
    lastAggregate: "",
    specialNeeds: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      firstName: "",
      lastName: "",
      gender: "",
      dob: "",
      classApplied: "",
      parentName: "",
      parentPhone: "",
      parentEmail: "",
      previousSchool: "",
      lastAggregate: "",
      specialNeeds: "",
    });
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl overflow-hidden bg-white rounded-2xl shadow-2xl"
        id="admission-modal-container"
      >
        {/* Decorative header */}
        <div className="bg-emerald-800 px-6 py-5 text-white flex justify-between items-center">
          <div>
            <h3 className="font-serif text-xl font-bold tracking-tight">ST. JOHN'S COLLEGE ADMISSIONS</h3>
            <p className="text-emerald-100 text-xs mt-0.5">Online Application for 2026/2027 Academic Year</p>
          </div>
          <button
            onClick={resetForm}
            className="p-1.5 rounded-full hover:bg-emerald-700/60 transition-colors text-white"
            id="close-admission-modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form area */}
        <div className="p-6 md:p-8 max-h-[75vh] overflow-y-auto">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                <CheckCircle2 className="h-10 w-10 animate-bounce" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-gray-900">Application Submitted!</h4>
              <p className="text-gray-600 max-w-md mx-auto mt-2">
                Thank you, <span className="font-semibold text-emerald-800">{formData.parentName}</span>. 
                We have received the application for <span className="font-semibold text-emerald-800">{formData.firstName} {formData.lastName}</span>.
              </p>
              <div className="mt-6 p-4 bg-emerald-50 rounded-xl text-left border border-emerald-100 max-w-md mx-auto">
                <h5 className="font-semibold text-emerald-900 text-sm mb-1">What happens next?</h5>
                <ul className="text-xs text-emerald-800 space-y-1.5 list-disc pl-4">
                  <li>Our admissions team will review your application within 2-3 business days.</li>
                  <li>We will schedule a brief academic interview/assessment for the candidate.</li>
                  <li>An official admission letter will be sent to <span className="font-semibold">{formData.parentEmail || "your email"}</span>.</li>
                </ul>
              </div>
              <button
                onClick={resetForm}
                className="mt-8 px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-medium rounded-lg shadow-md transition-colors"
              >
                Close Portal
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Progress Bar */}
              <div className="flex items-center justify-between mb-8">
                {[
                  { icon: User, label: "Student" },
                  { icon: Award, label: "Parent/Guardian" },
                  { icon: BookOpen, label: "Academic" },
                  { icon: MessageSquare, label: "Review" },
                ].map((item, idx) => {
                  const IconComp = item.icon;
                  const stepNum = idx + 1;
                  const isActive = step === stepNum;
                  const isCompleted = step > stepNum;

                  return (
                    <div key={idx} className="flex flex-col items-center flex-1 relative">
                      {idx > 0 && (
                        <div
                          className={`absolute right-[50%] left-[-50%] top-4 h-0.5 -z-10 ${
                            step >= stepNum ? "bg-emerald-600" : "bg-gray-200"
                          }`}
                        />
                      )}
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                          isActive
                            ? "bg-emerald-800 border-emerald-800 text-white shadow-md scale-110"
                            : isCompleted
                            ? "bg-emerald-100 border-emerald-600 text-emerald-600"
                            : "bg-white border-gray-300 text-gray-400"
                        }`}
                      >
                        <IconComp className="h-4.5 w-4.5" />
                      </div>
                      <span
                        className={`text-[10px] md:text-xs font-medium mt-1.5 transition-colors duration-300 ${
                          isActive ? "text-emerald-900 font-semibold" : "text-gray-500"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Steps views */}
              <div className="min-h-[220px]">
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="font-serif text-lg font-bold text-gray-800 border-b pb-1.5 border-gray-100">
                      Candidate Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., John"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., Ssenyonga"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Gender *</label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Date of Birth *</label>
                        <input
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Class Applied For *</label>
                        <select
                          name="classApplied"
                          value={formData.classApplied}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                        >
                          <option value="">Select Class</option>
                          <option value="Senior 1 (S.1)">Senior 1 (S.1)</option>
                          <option value="Senior 2 (S.2)">Senior 2 (S.2)</option>
                          <option value="Senior 3 (S.3)">Senior 3 (S.3)</option>
                          <option value="Senior 4 (S.4)">Senior 4 (S.4)</option>
                          <option value="Senior 5 (S.5)">Senior 5 (S.5)</option>
                          <option value="Senior 6 (S.6)">Senior 6 (S.6)</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="font-serif text-lg font-bold text-gray-800 border-b pb-1.5 border-gray-100">
                      Parent / Guardian Details
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          name="parentName"
                          value={formData.parentName}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., Dr. Geoffrey Alexander"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Contact Phone Number *</label>
                          <input
                            type="tel"
                            name="parentPhone"
                            value={formData.parentPhone}
                            onChange={handleInputChange}
                            required
                            placeholder="e.g., +256 772 454459"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
                          <input
                            type="email"
                            name="parentEmail"
                            value={formData.parentEmail}
                            onChange={handleInputChange}
                            required
                            placeholder="e.g., parent@example.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="font-serif text-lg font-bold text-gray-800 border-b pb-1.5 border-gray-100">
                      Academic Background
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Previous School Attended *</label>
                        <input
                          type="text"
                          name="previousSchool"
                          value={formData.previousSchool}
                          onChange={handleInputChange}
                          required
                          placeholder="Name of primary/secondary school"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">PLE Aggregate / Last Term Grade *</label>
                          <input
                            type="text"
                            name="lastAggregate"
                            value={formData.lastAggregate}
                            onChange={handleInputChange}
                            required
                            placeholder="e.g., Div 1 (Agg 6) or B+"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Special Medical/Educational Needs</label>
                          <input
                            type="text"
                            name="specialNeeds"
                            value={formData.specialNeeds}
                            onChange={handleInputChange}
                            placeholder="None or specify"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="font-serif text-lg font-bold text-gray-800 border-b pb-1.5 border-gray-100">
                      Application Summary
                    </h4>
                    <div className="p-4 bg-gray-50 rounded-xl space-y-2.5 text-xs text-gray-700">
                      <div className="grid grid-cols-2 gap-y-2 border-b border-gray-200 pb-2">
                        <div><span className="font-semibold text-gray-500">Student Name:</span></div>
                        <div className="font-medium text-gray-900">{formData.firstName} {formData.lastName}</div>
                        <div><span className="font-semibold text-gray-500">Class applied for:</span></div>
                        <div className="font-medium text-emerald-800 font-semibold">{formData.classApplied}</div>
                        <div><span className="font-semibold text-gray-500">Gender & DOB:</span></div>
                        <div className="font-medium text-gray-900">{formData.gender} ({formData.dob})</div>
                      </div>
                      <div className="grid grid-cols-2 gap-y-2 border-b border-gray-200 pb-2">
                        <div><span className="font-semibold text-gray-500">Parent / Guardian:</span></div>
                        <div className="font-medium text-gray-900">{formData.parentName}</div>
                        <div><span className="font-semibold text-gray-500">Contact details:</span></div>
                        <div className="font-medium text-gray-900">{formData.parentPhone} / {formData.parentEmail}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-y-2">
                        <div><span className="font-semibold text-gray-500">Previous School:</span></div>
                        <div className="font-medium text-gray-900">{formData.previousSchool}</div>
                        <div><span className="font-semibold text-gray-500">Last Grade / Aggregate:</span></div>
                        <div className="font-medium text-gray-900">{formData.lastAggregate}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 mt-2">
                      <input
                        type="checkbox"
                        required
                        id="termsAgree"
                        className="mt-0.5 rounded border-gray-300 text-emerald-800 focus:ring-emerald-700"
                      />
                      <label htmlFor="termsAgree" className="text-xs text-gray-500 leading-normal">
                        I hereby declare that the information provided is correct to the best of my knowledge, and I agree to the school's code of conduct and rules.
                      </label>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={step === 1}
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    step === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-5 py-2 bg-emerald-800 hover:bg-emerald-950 text-white text-sm font-medium rounded-lg shadow transition-colors"
                  >
                    Next <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-6 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-lg shadow-md transition-colors"
                  >
                    Submit Application
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
