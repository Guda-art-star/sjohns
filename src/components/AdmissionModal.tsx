import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, Award, User, BookOpen, MessageSquare, ArrowRight, ArrowLeft, UploadCloud, FileText, Trash2, CreditCard, Copy, Loader2, ShieldCheck, Check, QrCode } from "lucide-react";
import { useLanguage } from "../LanguageContext";

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdmissionModal({ isOpen, onClose }: AdmissionModalProps) {
  const { t } = useLanguage();
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
    resultsFileName: "",
    recommendationFileName: "",
  });

  const [dragOverResults, setDragOverResults] = useState(false);
  const [dragOverRec, setDragOverRec] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [paymentPhone, setPaymentPhone] = useState<string>("");
  const [isCreatingPaymentAccount, setIsCreatingPaymentAccount] = useState(false);
  const [paymentAccountCreated, setPaymentAccountCreated] = useState(false);
  const [generatedAccountNo, setGeneratedAccountNo] = useState("");
  const [generatedAccountName, setGeneratedAccountName] = useState("");
  const [generatedRef, setGeneratedRef] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "processing" | "paid">("pending");
  const [isSimulatingPayment, setIsSimulatingPayment] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const [uploadError, setUploadError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: "resultsFileName" | "recommendationFileName") => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [fieldName]: file.name }));
      setUploadError("");
    }
  };

  const handleRemoveFile = (fieldName: "resultsFileName" | "recommendationFileName") => {
    setFormData(prev => ({ ...prev, [fieldName]: "" }));
  };

  const handleDragOver = (e: React.DragEvent, setDrag: (val: boolean) => void) => {
    e.preventDefault();
    setDrag(true);
  };

  const handleDragLeave = (e: React.DragEvent, setDrag: (val: boolean) => void) => {
    e.preventDefault();
    setDrag(false);
  };

  const handleDrop = (e: React.DragEvent, fieldName: "resultsFileName" | "recommendationFileName", setDrag: (val: boolean) => void) => {
    e.preventDefault();
    setDrag(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [fieldName]: file.name }));
      setUploadError("");
    }
  };

  const handleNext = () => {
    setUploadError("");
    if (step === 3) {
      if (!formData.resultsFileName || !formData.recommendationFileName) {
        setUploadError(t("Please upload both your previous school results and the recommendation letter before proceeding."));
        return;
      }
    }
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    setUploadError("");
    if (step > 1) setStep(step - 1);
  };

  // Helper to trigger virtual payment account creation
  const handleCreatePaymentAccount = () => {
    if (!paymentMethod) {
      setUploadError(t("Please select a payment method."));
      return;
    }
    if ((paymentMethod === "mtn" || paymentMethod === "airtel") && !paymentPhone) {
      setUploadError(t("Please provide a phone number for Mobile Money payment."));
      return;
    }

    setUploadError("");
    setIsCreatingPaymentAccount(true);

    setTimeout(() => {
      // Simulate account details generation
      const randRef = `STJ-APP-${Math.floor(100000 + Math.random() * 900000)}`;
      let accNo = "";
      let accName = "";

      if (paymentMethod === "mtn") {
        accNo = "*165*4*4# (Merchant Code: 620459)";
        accName = "St. John's College - Application Escrow";
      } else if (paymentMethod === "airtel") {
        accNo = "*185*9# (Biller ID: 1120492)";
        accName = "St. John's College Mpigi Collection";
      } else if (paymentMethod === "centenary") {
        accNo = "310004928104 (Centenary Bank)";
        accName = "ST. JOHNS COLLEGE MPIGI - FEES";
      } else {
        accNo = "903001859204 (Stanbic Bank)";
        accName = "ST. JOHNS COLLEGE MPIGI MAIN";
      }

      setGeneratedAccountNo(accNo);
      setGeneratedAccountName(accName);
      setGeneratedRef(randRef);
      setPaymentAccountCreated(true);
      setIsCreatingPaymentAccount(false);
    }, 1800);
  };

  // Simulate executing payment transaction
  const handleSimulatePayment = () => {
    setIsSimulatingPayment(true);
    setPaymentStatus("processing");
    setTimeout(() => {
      setIsSimulatingPayment(false);
      setPaymentStatus("paid");
    }, 2500);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentStatus !== "paid") {
      setUploadError(t("Please complete and confirm the application fee payment before submitting."));
      return;
    }
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
      resultsFileName: "",
      recommendationFileName: "",
    });
    setPaymentMethod("");
    setPaymentPhone("");
    setPaymentAccountCreated(false);
    setGeneratedAccountNo("");
    setGeneratedAccountName("");
    setGeneratedRef("");
    setPaymentStatus("pending");
    setSubmitted(false);
    setUploadError("");
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
            <h3 className="font-serif text-xl font-bold tracking-tight">{t("ST. JOHN'S COLLEGE ADMISSIONS")}</h3>
            <p className="text-emerald-100 text-xs mt-0.5">{t("Online Application for 2026/2027 Academic Year")}</p>
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
              <h4 className="font-serif text-2xl font-bold text-gray-900">{t("Application Submitted!")}</h4>
              <p className="text-gray-600 max-w-md mx-auto mt-2">
                {t("Thank you,")} <span className="font-semibold text-emerald-800">{formData.parentName}</span>. 
                {t("We have received the application for")} <span className="font-semibold text-emerald-800">{formData.firstName} {formData.lastName}</span>.
              </p>
              <div className="mt-6 p-4 bg-emerald-50 rounded-xl text-left border border-emerald-100 max-w-md mx-auto">
                <h5 className="font-semibold text-emerald-900 text-sm mb-1">{t("What happens next?")}</h5>
                <ul className="text-xs text-emerald-800 space-y-1.5 list-disc pl-4">
                  <li>{t("Our admissions team will review your application within 2-3 business days.")}</li>
                  <li>{t("We will schedule a brief academic interview/assessment for the candidate.")}</li>
                  <li>{t("An official admission letter will be sent to")} <span className="font-semibold">{formData.parentEmail || t("your email")}</span>.</li>
                </ul>
              </div>
              <button
                onClick={resetForm}
                className="mt-8 px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-medium rounded-lg shadow-md transition-colors"
              >
                {t("Close Portal")}
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Progress Bar */}
              <div className="flex items-center justify-between mb-8">
                {[
                  { icon: User, label: "Student" },
                  { icon: Award, label: "Parent" },
                  { icon: BookOpen, label: "Academic" },
                  { icon: MessageSquare, label: "Review" },
                  { icon: CreditCard, label: "Payment" },
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
                        {t(item.label)}
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
                      {t("Candidate Information")}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">{t("First Name *")}</label>
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
                        <label className="block text-xs font-semibold text-gray-700 mb-1">{t("Last Name *")}</label>
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
                        <label className="block text-xs font-semibold text-gray-700 mb-1">{t("Gender *")}</label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                        >
                          <option value="">{t("Select Gender")}</option>
                          <option value="Male">{t("Male")}</option>
                          <option value="Female">{t("Female")}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">{t("Date of Birth *")}</label>
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
                        <label className="block text-xs font-semibold text-gray-700 mb-1">{t("Class Applied For *")}</label>
                        <select
                          name="classApplied"
                          value={formData.classApplied}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                        >
                          <option value="">{t("Select Class")}</option>
                          <option value="Senior 1 (S.1)">{t("Senior 1 (S.1)")}</option>
                          <option value="Senior 2 (S.2)">{t("Senior 2 (S.2)")}</option>
                          <option value="Senior 3 (S.3)">{t("Senior 3 (S.3)")}</option>
                          <option value="Senior 4 (S.4)">{t("Senior 4 (S.4)")}</option>
                          <option value="Senior 5 (S.5)">{t("Senior 5 (S.5)")}</option>
                          <option value="Senior 6 (S.6)">{t("Senior 6 (S.6)")}</option>
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
                      {t("Parent / Guardian Details")}
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">{t("Full Name *")}</label>
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
                          <label className="block text-xs font-semibold text-gray-700 mb-1">{t("Contact Phone Number *")}</label>
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
                          <label className="block text-xs font-semibold text-gray-700 mb-1">{t("Email Address *")}</label>
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
                      {t("Academic Background & Document Upload")}
                    </h4>
                    <div className="space-y-4">
                      {uploadError && (
                        <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 animate-shake">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></span>
                          <span>{t(uploadError)}</span>
                        </div>
                      )}
                      
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">{t("Previous School Attended *")}</label>
                        <input
                          type="text"
                          name="previousSchool"
                          value={formData.previousSchool}
                          onChange={handleInputChange}
                          required
                          placeholder={t("Name of primary/secondary school")}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">{t("PLE Aggregate / Last Term Grade *")}</label>
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
                          <label className="block text-xs font-semibold text-gray-700 mb-1">{t("Special Medical/Educational Needs")}</label>
                          <input
                            type="text"
                            name="specialNeeds"
                            value={formData.specialNeeds}
                            onChange={handleInputChange}
                            placeholder={t("None or specify")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                          />
                        </div>
                      </div>

                      {/* Document uploads */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        {/* Results Upload */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-gray-700">{t("Previous School Results *")}</label>
                          <div
                            onDragOver={(e) => handleDragOver(e, setDragOverResults)}
                            onDragLeave={(e) => handleDragLeave(e, setDragOverResults)}
                            onDrop={(e) => handleDrop(e, "resultsFileName", setDragOverResults)}
                            className={`border-2 border-dashed rounded-xl p-4 text-center transition-all ${
                              formData.resultsFileName 
                                ? "bg-emerald-50/50 border-emerald-350" 
                                : dragOverResults 
                                ? "bg-slate-100 border-emerald-700" 
                                : "bg-slate-50 hover:bg-slate-100/50 border-gray-300"
                            }`}
                          >
                            {formData.resultsFileName ? (
                              <div className="flex flex-col items-center">
                                <FileText className="h-8 w-8 text-emerald-700 mb-1.5 animate-bounce" />
                                <span className="block text-xs font-bold text-slate-800 max-w-[180px] truncate">{formData.resultsFileName}</span>
                                <span className="block text-[10px] text-emerald-700 font-bold mt-0.5">{t("Ready for submission")}</span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveFile("resultsFileName")}
                                  className="mt-2 text-[10px] text-red-600 font-bold flex items-center gap-1 hover:text-red-800 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                  <span>{t("Remove file")}</span>
                                </button>
                              </div>
                            ) : (
                              <label className="cursor-pointer block">
                                <UploadCloud className="h-8 w-8 text-gray-400 mx-auto mb-1.5" />
                                <span className="block text-xs font-semibold text-slate-700">{t("Drag & drop results file")}</span>
                                <span className="block text-[10px] text-slate-400 mt-0.5">{t("or click to select (PDF, JPG)")}</span>
                                <input
                                  type="file"
                                  accept=".pdf,.png,.jpg,.jpeg"
                                  onChange={(e) => handleFileChange(e, "resultsFileName")}
                                  className="hidden"
                                />
                              </label>
                            )}
                          </div>
                        </div>

                        {/* Recommendation Upload */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-gray-700">{t("Recommendation Letter *")}</label>
                          <div
                            onDragOver={(e) => handleDragOver(e, setDragOverRec)}
                            onDragLeave={(e) => handleDragLeave(e, setDragOverRec)}
                            onDrop={(e) => handleDrop(e, "recommendationFileName", setDragOverRec)}
                            className={`border-2 border-dashed rounded-xl p-4 text-center transition-all ${
                              formData.recommendationFileName 
                                ? "bg-emerald-50/50 border-emerald-350" 
                                : dragOverRec 
                                ? "bg-slate-100 border-emerald-700" 
                                : "bg-slate-50 hover:bg-slate-100/50 border-gray-300"
                            }`}
                          >
                            {formData.recommendationFileName ? (
                              <div className="flex flex-col items-center">
                                <FileText className="h-8 w-8 text-emerald-700 mb-1.5 animate-bounce" />
                                <span className="block text-xs font-bold text-slate-800 max-w-[180px] truncate">{formData.recommendationFileName}</span>
                                <span className="block text-[10px] text-emerald-700 font-bold mt-0.5">{t("Ready for submission")}</span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveFile("recommendationFileName")}
                                  className="mt-2 text-[10px] text-red-600 font-bold flex items-center gap-1 hover:text-red-800 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                  <span>{t("Remove file")}</span>
                                </button>
                              </div>
                            ) : (
                              <label className="cursor-pointer block">
                                <UploadCloud className="h-8 w-8 text-gray-400 mx-auto mb-1.5" />
                                <span className="block text-xs font-semibold text-slate-700">{t("Drag & drop letter")}</span>
                                <span className="block text-[10px] text-slate-400 mt-0.5">{t("or click to select (PDF, Doc)")}</span>
                                <input
                                  type="file"
                                  accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                                  onChange={(e) => handleFileChange(e, "recommendationFileName")}
                                  className="hidden"
                                />
                              </label>
                            )}
                          </div>
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
                      {t("Application Summary")}
                    </h4>
                    <div className="p-4 bg-gray-50 rounded-xl space-y-2.5 text-xs text-gray-700">
                      <div className="grid grid-cols-2 gap-y-2 border-b border-gray-200 pb-2">
                        <div><span className="font-semibold text-gray-500">{t("Student Name:")}</span></div>
                        <div className="font-medium text-gray-900">{formData.firstName} {formData.lastName}</div>
                        <div><span className="font-semibold text-gray-500">{t("Class applied for:")}</span></div>
                        <div className="font-medium text-emerald-800 font-semibold">{t(formData.classApplied)}</div>
                        <div><span className="font-semibold text-gray-500">{t("Gender & DOB:")}</span></div>
                        <div className="font-medium text-gray-900">{t(formData.gender)} ({formData.dob})</div>
                      </div>
                      <div className="grid grid-cols-2 gap-y-2 border-b border-gray-200 pb-2">
                        <div><span className="font-semibold text-gray-500">{t("Parent / Guardian:")}</span></div>
                        <div className="font-medium text-gray-900">{formData.parentName}</div>
                        <div><span className="font-semibold text-gray-500">{t("Contact details:")}</span></div>
                        <div className="font-medium text-gray-900">{formData.parentPhone} / {formData.parentEmail}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-y-2 border-b border-gray-200 pb-2">
                        <div><span className="font-semibold text-gray-500">{t("Previous School:")}</span></div>
                        <div className="font-medium text-gray-900">{formData.previousSchool}</div>
                        <div><span className="font-semibold text-gray-500">{t("Last Grade / Aggregate:")}</span></div>
                        <div className="font-medium text-gray-900">{formData.lastAggregate}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-y-2">
                        <div><span className="font-semibold text-gray-500">{t("School Results File:")}</span></div>
                        <div className="font-medium text-emerald-800 font-bold truncate flex items-center gap-1">
                          <FileText className="h-3.5 w-3.5 shrink-0 text-emerald-700" />
                          <span className="truncate">{formData.resultsFileName || t("Not uploaded")}</span>
                        </div>
                        <div><span className="font-semibold text-gray-500">{t("Recommendation Letter:")}</span></div>
                        <div className="font-medium text-emerald-800 font-bold truncate flex items-center gap-1">
                          <FileText className="h-3.5 w-3.5 shrink-0 text-emerald-700" />
                          <span className="truncate">{formData.recommendationFileName || t("Not uploaded")}</span>
                        </div>
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
                        {t("I hereby declare that the information provided is correct to the best of my knowledge, and I agree to the school's code of conduct and rules.")}
                      </label>
                    </div>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4 font-sans"
                  >
                    <div className="flex items-center justify-between border-b pb-2.5 border-gray-100">
                      <h4 className="font-serif text-lg font-bold text-gray-800">
                        {t("Application Fee Payment")}
                      </h4>
                      <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full uppercase tracking-wider shrink-0">
                        {t("Required Fee: 50,000 UGX")}
                      </span>
                    </div>

                    {uploadError && (
                      <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 animate-shake">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></span>
                        <span>{uploadError}</span>
                      </div>
                    )}

                    {!paymentAccountCreated ? (
                      <div className="space-y-4">
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {t("To process the application for")} <span className="font-bold text-slate-800">{formData.firstName} {formData.lastName}</span>, 
                          {t(" a non-refundable application fee of 50,000 UGX is required. Please select a payment method below to provision your custom payment account and reference number.")}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { id: "mtn", label: "MTN Mobile Money", desc: "Instantly via MoMo Pay / USSD", color: "hover:border-amber-400 hover:bg-amber-50/30", logoBg: "bg-amber-400" },
                            { id: "airtel", label: "Airtel Money", desc: "Instantly via Airtel Pay / USSD", color: "hover:border-red-400 hover:bg-red-50/30", logoBg: "bg-red-500" },
                            { id: "centenary", label: "Centenary Bank", desc: "Bank Transfer or Agent", color: "hover:border-blue-400 hover:bg-blue-50/30", logoBg: "bg-blue-600" },
                            { id: "stanbic", label: "Stanbic Bank", desc: "Bank Transfer or Agent", color: "hover:border-sky-800 hover:bg-sky-50/30", logoBg: "bg-sky-900" },
                          ].map((pm) => (
                            <button
                              key={pm.id}
                              type="button"
                              onClick={() => {
                                setPaymentMethod(pm.id);
                                if (!paymentPhone) setPaymentPhone(formData.parentPhone);
                              }}
                              className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between h-20 ${
                                paymentMethod === pm.id
                                  ? "border-emerald-600 bg-emerald-50/30 ring-2 ring-emerald-600/20"
                                  : "border-gray-200 bg-white"
                              } ${pm.color}`}
                            >
                              <div className="flex items-center gap-2">
                                <div className={`w-3.5 h-3.5 rounded-full ${pm.logoBg} flex-shrink-0 flex items-center justify-center`}>
                                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                </div>
                                <span className="text-xs font-bold text-gray-800 leading-tight">{t(pm.label)}</span>
                              </div>
                              <span className="text-[10px] text-gray-400 mt-1 block leading-normal">{t(pm.desc)}</span>
                            </button>
                          ))}
                        </div>

                        {(paymentMethod === "mtn" || paymentMethod === "airtel") && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2"
                          >
                            <label className="block text-xs font-bold text-gray-700">
                              {paymentMethod === "mtn" ? t("MTN MoMo Number *") : t("Airtel Money Number *")}
                            </label>
                            <input
                              type="tel"
                              value={paymentPhone}
                              onChange={(e) => setPaymentPhone(e.target.value)}
                              placeholder="e.g., +256 772 454459"
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                            />
                            <p className="text-[10px] text-gray-400">
                              {t("A secure push prompt will be initiated or USSD instructions will be generated for this phone number.")}
                            </p>
                          </motion.div>
                        )}

                        <button
                          type="button"
                          onClick={handleCreatePaymentAccount}
                          disabled={isCreatingPaymentAccount || !paymentMethod}
                          className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                            paymentMethod
                              ? "bg-emerald-800 text-white hover:bg-emerald-950 shadow-md cursor-pointer"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          {isCreatingPaymentAccount ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin text-white" />
                              <span>{t("Creating Payment Account & Reference...")}</span>
                            </>
                          ) : (
                            <>
                              <ShieldCheck className="h-4 w-4" />
                              <span>{t("Generate Secure Payment Account")}</span>
                            </>
                          )}
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* payment account generated details */}
                        <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-lg space-y-3.5">
                          <div className="flex justify-between items-start border-b border-slate-800 pb-2.5">
                            <div>
                              <span className="text-[10px] text-sky-300 font-bold uppercase tracking-widest">{t("Admission Fee Escrow")}</span>
                              <h5 className="font-semibold text-xs text-white mt-0.5">{generatedAccountName}</h5>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] text-slate-400 block">{t("Fee Amount")}</span>
                              <span className="text-sm font-black text-amber-400">50,000 UGX</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div className="space-y-1">
                              <span className="text-slate-400 block text-[9px] uppercase tracking-wider">{t("Payment Channel / Code")}</span>
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-white text-[11px] font-bold bg-slate-800 px-2 py-1 rounded border border-slate-700/60 break-all">{generatedAccountNo}</span>
                                <button
                                  type="button"
                                  onClick={() => handleCopy(generatedAccountNo)}
                                  className="p-1 hover:bg-slate-800 rounded text-slate-300 transition-colors shrink-0"
                                  title={t("Copy Account No")}
                                >
                                  {copiedText ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                                </button>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <span className="text-slate-400 block text-[9px] uppercase tracking-wider">{t("Required Payment Reference")}</span>
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-amber-400 text-[11px] font-bold bg-slate-800 px-2 py-1 rounded border border-slate-700/60">{generatedRef}</span>
                                <button
                                  type="button"
                                  onClick={() => handleCopy(generatedRef)}
                                  className="p-1 hover:bg-slate-800 rounded text-slate-300 transition-colors shrink-0"
                                  title={t("Copy Reference")}
                                >
                                  {copiedText ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-[10px] text-slate-300 leading-relaxed">
                            <span className="font-bold text-amber-300 block mb-0.5">⚠️ {t("Important Transfer Instructions:")}</span>
                            {paymentMethod === "mtn" || paymentMethod === "airtel" ? (
                              <span>{t("Dial the code listed above, select Pay Merchant/Bill, enter the corresponding Code/ID, input EXACTLY 50,000 UGX, and use reference ")}<span className="font-mono font-bold text-white bg-slate-800 px-1 py-0.5 rounded">{generatedRef}</span>{t(". Confirm with your PIN.")}</span>
                            ) : (
                              <span>{t("Initiate bank transfer or deposit cash to the Account Number above. Ensure to include the reference ")}<span className="font-mono font-bold text-white bg-slate-800 px-1 py-0.5 rounded">{generatedRef}</span>{t(" on your transfer slip/narrative so we can verify automatically.")}</span>
                            )}
                          </div>
                        </div>

                        {/* Interactive Verification & Simulation area */}
                        <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-3">
                          <div className="space-y-0.5 flex-1 text-center sm:text-left">
                            <span className="text-[11px] font-bold text-emerald-900 block uppercase tracking-wide">
                              {t("Virtual Payment Simulator")}
                            </span>
                            <p className="text-[10px] text-emerald-800 leading-normal">
                              {t("For preview demonstration, you can simulate/authorize the transfer instantly to verify the payment account status.")}
                            </p>
                          </div>
                          
                          {paymentStatus === "paid" ? (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-lg font-bold text-[11px] border border-emerald-200">
                              <Check className="h-3.5 w-3.5 shrink-0 stroke-[3]" />
                              <span>{t("Verified & Paid")}</span>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={handleSimulatePayment}
                              disabled={isSimulatingPayment}
                              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-[10px] rounded-lg shadow transition-all hover:scale-[1.02] flex items-center gap-1.5 uppercase tracking-wide cursor-pointer flex-shrink-0"
                            >
                              {isSimulatingPayment ? (
                                <>
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                  <span>{t("Verifying...")}</span>
                                </>
                              ) : (
                                <>
                                  <QrCode className="h-3 w-3" />
                                  <span>{t("Simulate Instant Transfer")}</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>

                        {paymentStatus === "paid" && (
                          <motion.div
                            initial={{ scale: 0.98, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="p-3 bg-emerald-100/75 border border-emerald-200 rounded-xl text-center space-y-0.5"
                          >
                            <span className="text-[11px] font-black text-emerald-900 uppercase block tracking-wide">✨ {t("Payment Gateway Cleared!")}</span>
                            <p className="text-[10px] text-emerald-800">
                              {t("Your application escrow has received the 50,000 UGX fee. You are now authorized to submit the admission application.")}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    )}
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
                  <ArrowLeft className="h-4 w-4" /> {t("Back")}
                </button>

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-5 py-2 bg-emerald-800 hover:bg-emerald-950 text-white text-sm font-medium rounded-lg shadow transition-colors"
                  >
                    {t("Next")} <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={paymentStatus !== "paid"}
                    className={`flex items-center gap-1.5 px-6 py-2 text-white text-sm font-semibold rounded-lg shadow-md transition-colors ${
                      paymentStatus === "paid"
                        ? "bg-rose-600 hover:bg-rose-700 cursor-pointer"
                        : "bg-gray-400 cursor-not-allowed opacity-60"
                    }`}
                  >
                    {t("Submit Application")}
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
