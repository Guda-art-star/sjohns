import React, { useState, useMemo } from "react";
import { 
  Search, Award, Download, FileText, ChevronUp, ChevronDown, 
  Sparkles, CheckCircle2, Phone, Calendar, MapPin, Printer
} from "lucide-react";

interface ResultRow {
  indexNo: string;
  sex: "M" | "F";
  name: string;
  score: string;
  points: number;
}

const UNEB_2020_DATA: ResultRow[] = [
  { indexNo: "U2163/501", sex: "M", name: "KAZOORA SILVERIO", score: "GEP-4 HIST-A CRE-A KIS-A CST-4", points: 20 },
  { indexNo: "U2163/503", sex: "F", name: "AMPUMUZA STELLA", score: "GEP-3 MTC-A ECON-C ENT-A CST-3", points: 18 },
  { indexNo: "U2163/505", sex: "M", name: "BYOONA KLAUS", score: "GEP-4 HIST-B CRE-A ART-B CST-2", points: 18 },
  { indexNo: "U2163/507", sex: "M", name: "KABILA FRANCIS EDRIAS", score: "GEP-8 MTC-A ECON-B ENT-A CST-3", points: 18 },
  { indexNo: "U2163/534", sex: "M", name: "BUSABUSA SAMSON", score: "GEP-2 MTC-A CHEM-B BIO-B CST-3", points: 18 },
  { indexNo: "U2163/502", sex: "F", name: "NIMUSIIMA SHINAH", score: "GEP-6 ECON-C HIST-A ENT-A SMA-5", points: 18 },
  { indexNo: "U2163/506", sex: "M", name: "TWINOMUHWEZI MEDARD", score: "GEP-6 ECON-C HIST-A IRE-B SMA-6", points: 17 },
  { indexNo: "U2163/509", sex: "M", name: "LUBEGA SHAFIKI", score: "GEP-4 MTC-A PHY-D ECON-A CST-3", points: 17 },
  { indexNo: "U2163/522", sex: "M", name: "TUMUSIIME NICHOLAS", score: "GEP-3 CRE-A ART-B ENT-C CST-4", points: 17 },
  { indexNo: "U2163/527", sex: "F", name: "NIWARINDA CAROLINE", score: "GEP-8 HIST-A CRE-A ENT-D CST-5", points: 16 },
  { indexNo: "U2163/517", sex: "F", name: "NYAMUKURU JOY", score: "GEP-6 HIST-C CRE-B ART-C CST-6", points: 15 },
  { indexNo: "U2163/530", sex: "F", name: "NIWASIIMA WINNIE", score: "GEP-4 CRE-A ENT-C LIT-D CST-4", points: 15 },
  { indexNo: "U2163/533", sex: "F", name: "NAKAGGWA ALICE", score: "GEP-8 GEO-C ART-B LUG-C CST-6", points: 14 },
  { indexNo: "U2163/504", sex: "F", name: "AKANKUNDA SHIFRAH", score: "GEP-5 HIST-B ART-D IRE-D CST-5", points: 13 },
  { indexNo: "U2163/508", sex: "M", name: "AYEBAZIBWE JUNIOR", score: "GEP-4 MTC-A CHEM-C BIO-O CST-3", points: 13 },
  { indexNo: "U2163/514", sex: "M", name: "KATO KABENGE GONZAGA", score: "GEP-8 MTC-C ECON-D ENT-B CST-4", points: 13 },
  { indexNo: "U2163/510", sex: "M", name: "BUSINGE ROBERT", score: "GEP-2 MTC-D CHEM-D BIO-C CST-3", points: 12 },
  { indexNo: "U2163/512", sex: "F", name: "NSIMENTA BABRA", score: "GEP-6 HIST-C CRE-C ART-E CST-6", points: 12 },
  { indexNo: "U2163/513", sex: "F", name: "NATUMANYA LYNET", score: "GEP-6 ECON-O HIST-B CRE-B SMA-7", points: 12 },
  { indexNo: "U2163/518", sex: "F", name: "ORISHABA IMMACULATE", score: "GEP-3 ECON-O HIST-B CRE-C SMA-5", points: 12 },
  { indexNo: "U2163/515", sex: "M", name: "RWEBANJA COSMAS", score: "GEP-5 ECON-E HIST-C GEOG-D SMA-5", points: 11 },
  { indexNo: "U2163/528", sex: "F", name: "ALOBO JUDITH OJOK", score: "GEP-8 ECON-F CRE-B KIS-A SMA-8", points: 11 },
  { indexNo: "U2163/532", sex: "M", name: "KISAALE MIKE", score: "GEP-6 ECON-O HIST-B ENT-D SMA-4", points: 11 },
  { indexNo: "U2163/511", sex: "M", name: "MUGANGA NUWAGIRA", score: "GEP-8 MTC-C PHY-O ECON-C CST-1", points: 10 },
  { indexNo: "U2163/521", sex: "M", name: "LAKER JORAM", score: "GEP-6 CRE-D ART-D ENT-O CST-5", points: 9 },
  { indexNo: "U2163/523", sex: "M", name: "MUHIRWE GILBERT", score: "GEP-3 HIST-D ECON-F ART-C SMA-5", points: 9 },
  { indexNo: "U2163/531", sex: "F", name: "NAKITO MWATU JULIA", score: "GEP-6 HIST-D CRE-C ENT-O CST-7", points: 9 },
  { indexNo: "U2163/535", sex: "M", name: "AINEMBABAZI IVAN", score: "GEP-6 HIST-D ART-D LUG-O CST-6", points: 9 },
  { indexNo: "U2163/525", sex: "M", name: "WASSWA KASIRYE", score: "GEP-7 ART-C LUG-O ENT-O CST-5", points: 7 },
  { indexNo: "U2163/516", sex: "M", name: "NATWIJUKA GILBERT", score: "GEP-3 CHEM-F BIO-E AGR-E SMA-5", points: 6 },
  { indexNo: "U2163/524", sex: "M", name: "MUSASIZI STALLONE", score: "GEP-5 CRE-O ART-E ENT-O CST-6", points: 6 },
  { indexNo: "U2163/529", sex: "M", name: "ABAASA JUSTIN MUHWEZI", score: "GEP-3 MTC-D CHEM-O BIO-F CST-3", points: 6 },
  { indexNo: "U2163/519", sex: "M", name: "BAGENDA ERIC", score: "GEP-7 GEOG-E ART-O ENT-O CST-5", points: 5 },
  { indexNo: "U2163/526", sex: "F", name: "KEMIGISHA SERENA", score: "GEP-7 CRE-O ART-E ENT-O CST-6", points: 5 },
  { indexNo: "U2163/520", sex: "M", name: "BBOSA FRANK", score: "GEP-9 ART-C LUG-F ENT-F CST-8", points: 4 }
];

export default function UnebResults() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sexFilter, setSexFilter] = useState<"ALL" | "M" | "F">("ALL");
  const [sortField, setSortField] = useState<"points" | "name" | "indexNo">("points");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Filter and sort the table data
  const filteredData = useMemo(() => {
    return UNEB_2020_DATA.filter((row) => {
      const matchesSearch = 
        row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.indexNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.score.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSex = sexFilter === "ALL" || row.sex === sexFilter;

      return matchesSearch && matchesSex;
    }).sort((a, b) => {
      let comparison = 0;
      if (sortField === "points") {
        comparison = a.points - b.points;
      } else if (sortField === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === "indexNo") {
        comparison = a.indexNo.localeCompare(b.indexNo);
      }
      return sortDirection === "desc" ? -comparison : comparison;
    });
  }, [searchTerm, sexFilter, sortField, sortDirection]);

  const handleSort = (field: "points" | "name" | "indexNo") => {
    if (sortField === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const totals = useMemo(() => {
    const totalCount = UNEB_2020_DATA.length;
    const boysCount = UNEB_2020_DATA.filter(r => r.sex === "M").length;
    const girlsCount = UNEB_2020_DATA.filter(r => r.sex === "F").length;
    
    // Points distributions matching the original physical summary:
    // 15 - 20 Points = 12 students
    // 10 - 14 Points = 12 students
    // 04 - 09 Points = 11 students
    const highRange = UNEB_2020_DATA.filter(r => r.points >= 15 && r.points <= 20).length;
    const midRange = UNEB_2020_DATA.filter(r => r.points >= 10 && r.points <= 14).length;
    const lowRange = UNEB_2020_DATA.filter(r => r.points >= 4 && r.points <= 9).length;

    return { totalCount, boysCount, girlsCount, highRange, midRange, lowRange };
  }, []);

  return (
    <div className="space-y-6" id="uneb-results-component">
      
      {/* Dynamic Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="results-summary-cards">
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5 text-center shadow-xs">
          <span className="block text-2xl font-black text-emerald-800 font-serif">100%</span>
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Pass Rate</span>
        </div>
        <div className="bg-sky-50/50 border border-sky-100 rounded-xl p-3.5 text-center shadow-xs">
          <span className="block text-2xl font-black text-sky-800 font-serif">{totals.highRange}</span>
          <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider">15 - 20 Points</span>
        </div>
        <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-3.5 text-center shadow-xs">
          <span className="block text-2xl font-black text-indigo-800 font-serif">{totals.midRange}</span>
          <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">10 - 14 Points</span>
        </div>
        <div className="bg-purple-50/50 border border-purple-100 rounded-xl p-3.5 text-center shadow-xs">
          <span className="block text-2xl font-black text-purple-800 font-serif">{totals.lowRange}</span>
          <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider">04 - 09 Points</span>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200/50" id="results-controls">
        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search candidate name or scores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-700 focus:border-emerald-700 font-medium text-slate-800"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 w-full md:w-auto justify-end">
          {(["ALL", "M", "F"] as const).map((gender) => (
            <button
              key={gender}
              onClick={() => setSexFilter(gender)}
              className={`px-3 py-1.5 text-[10px] font-extrabold rounded-lg tracking-wider uppercase cursor-pointer transition-all ${
                sexFilter === gender
                  ? "bg-emerald-800 text-white shadow-xs"
                  : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
              }`}
            >
              {gender === "ALL" ? "All Students" : gender === "M" ? "Boys" : "Girls"}
            </button>
          ))}
        </div>
      </div>

      {/* UNEB duplication document structure container */}
      <div 
        className="relative bg-sky-50/70 border-4 border-double border-sky-900/40 rounded-2xl p-4 md:p-8 overflow-hidden font-mono shadow-inner text-[#0A2F5C]"
        id="physical-uneb-paper-replica"
        style={{ backgroundImage: "linear-gradient(to bottom, rgba(235, 245, 255, 0.4), rgba(225, 242, 254, 0.5))" }}
      >
        {/* Blue watermark tint/overlay representing duplicating fluid feel */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply bg-radial from-transparent to-sky-900" />

        {/* Paper Document Header */}
        <div className="text-center border-b-2 border-dashed border-sky-900/30 pb-4 mb-6 space-y-2">
          
          {/* Header Branding */}
          <div className="flex justify-center items-center gap-3">
            <svg
              className="h-14 w-14 shrink-0 opacity-90 drop-shadow-sm filter saturate-50"
              viewBox="0 0 500 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 175,130 C 190,135 310,135 325,130 C 340,240 315,310 250,325 C 185,310 160,240 175,130 Z"
                fill="#1E3A8A"
                stroke="#0A2F5C"
                strokeWidth="8"
              />
              <path d="M 210,148 C 210,132 290,132 290,148 Z" fill="#FFFFFF" />
              <path d="M 180,218 C 210,198 290,198 320,218 Z" fill="#FFFFFF" />
            </svg>
            <div className="text-center">
              <h1 className="text-xl md:text-2xl font-black tracking-widest text-[#062449] uppercase">
                ST. JOHN'S COLLEGE MPIGI
              </h1>
              <p className="text-sm font-bold tracking-wider text-sky-800 uppercase mt-0.5">
                2020 UACE RESULTS
              </p>
            </div>
          </div>

          <div className="text-[11px] font-extrabold text-sky-900/80 leading-relaxed max-w-lg mx-auto">
            <div className="border border-sky-900/30 px-3 py-1 bg-white/50 rounded inline-block">
              S.1 & S.5 ADMISSIONS ARE ONGOING.
            </div>
            <div className="mt-1.5 flex flex-wrap justify-center gap-x-3 text-[10px]">
              <span>CONTACT US ON: 0772 555 664</span>
              <span>/</span>
              <span>0702 297 171</span>
              <span>/</span>
              <span>0785 165 504</span>
              <span>/</span>
              <span>0755 646 437</span>
            </div>
          </div>
        </div>

        {/* Table representation */}
        <div className="overflow-x-auto rounded-lg border border-sky-900/30 bg-white/80 shadow-xs" id="physical-table-wrapper">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-sky-900 text-white border-b border-sky-900 font-extrabold select-none">
                <th 
                  onClick={() => handleSort("indexNo")}
                  className="p-2 border-r border-sky-900/30 cursor-pointer hover:bg-sky-950 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>INDEX NO</span>
                    {sortField === "indexNo" && (sortDirection === "desc" ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />)}
                  </div>
                </th>
                <th className="p-2 border-r border-sky-900/30 text-center">SEX</th>
                <th 
                  onClick={() => handleSort("name")}
                  className="p-2 border-r border-sky-900/30 cursor-pointer hover:bg-sky-950 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>STUDENT'S NAME</span>
                    {sortField === "name" && (sortDirection === "desc" ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />)}
                  </div>
                </th>
                <th className="p-2 border-r border-sky-900/30">SCORE</th>
                <th 
                  onClick={() => handleSort("points")}
                  className="p-2 text-center cursor-pointer hover:bg-sky-950 transition-colors"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>POINTS</span>
                    {sortField === "points" && (sortDirection === "desc" ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />)}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-900/20">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-sky-800/60 font-semibold italic">
                    No student results match your search parameters.
                  </td>
                </tr>
              ) : (
                filteredData.map((row, idx) => {
                  const isTopScorer = row.points >= 17;
                  return (
                    <tr 
                      key={row.indexNo} 
                      className={`hover:bg-sky-100/60 transition-colors font-semibold ${
                        isTopScorer ? "bg-emerald-50/30" : idx % 2 === 0 ? "bg-white/40" : "bg-sky-50/20"
                      }`}
                    >
                      <td className="p-2 border-r border-sky-900/20 text-[#092B54] font-bold">
                        {row.indexNo}
                      </td>
                      <td className="p-2 border-r border-sky-900/20 text-center text-[#092B54]">
                        {row.sex}
                      </td>
                      <td className="p-2 border-r border-sky-900/20 text-slate-900 uppercase">
                        <div className="flex items-center gap-1.5">
                          <span>{row.name}</span>
                          {row.points >= 18 && (
                            <Award className="h-3 w-3 text-emerald-700 shrink-0" title="Outstanding Performance" />
                          )}
                        </div>
                      </td>
                      <td className="p-2 border-r border-sky-900/20 text-[#0A3C75] text-[10.5px]">
                        {row.score}
                      </td>
                      <td className={`p-2 text-center font-black text-sm ${
                        isTopScorer ? "text-emerald-800" : "text-[#0A2F5C]"
                      }`}>
                        {row.points}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Paper Congratulations Footer */}
        <div className="mt-6 pt-4 border-t-2 border-dashed border-sky-900/30 space-y-4">
          <p className="text-xs font-bold leading-relaxed text-slate-800 italic text-center max-w-2xl mx-auto">
            "We congratulate the Directors, teachers, students and parents for their tireless effort towards this success."
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 items-end">
            
            {/* Left side: Stamp and Moto */}
            <div className="flex flex-col items-start space-y-3">
              
              {/* Slanted Stamp Design */}
              <div 
                className="relative border-3 border-dotted border-sky-700/80 rounded-full w-40 h-40 flex flex-col items-center justify-center text-center p-3 transform -rotate-6 select-none opacity-85 hover:opacity-100 transition-opacity bg-white/20"
                style={{ outline: "1px solid rgba(3, 105, 161, 0.2)", outlineOffset: "3px" }}
              >
                {/* stamp text top */}
                <span className="text-[8px] font-black tracking-wider text-sky-700 uppercase absolute top-5">
                  ST. JOHN'S COLLEGE
                </span>
                
                {/* Stamp date */}
                <div className="border-t border-b border-sky-700/60 py-1 px-2 my-1 text-center">
                  <span className="block text-[11px] font-black text-sky-800">21 AUG 2021</span>
                  <span className="block text-[8px] font-bold text-sky-600 uppercase tracking-widest">DIRECTOR</span>
                </div>

                {/* stamp text bottom */}
                <span className="text-[8px] font-black tracking-wider text-sky-700 uppercase absolute bottom-5">
                  P.O. BOX 14078, MPIGI
                </span>
              </div>

              {/* Motto quote */}
              <div className="pl-2">
                <span className="text-xs font-bold text-sky-900 uppercase block">SCHOOL MOTTO:</span>
                <p className="text-xs font-black italic text-sky-700 mt-0.5">
                  "Godliness & Hardwork"
                </p>
              </div>

            </div>

            {/* Right side: Summary Stats and Director Signature */}
            <div className="flex flex-col space-y-4 md:items-end">
              
              {/* Point Range Summary List */}
              <div className="border border-sky-900/20 bg-white/60 p-4 rounded-xl text-xs space-y-1 w-full max-w-xs shadow-xs">
                <span className="font-extrabold uppercase text-sky-900 block border-b border-sky-900/20 pb-1 mb-1">
                  Summary Statistics:
                </span>
                <div className="flex justify-between font-bold text-slate-800">
                  <span>1. 15 - 20 Points</span>
                  <span>= 12 Students</span>
                </div>
                <div className="flex justify-between font-bold text-slate-800">
                  <span>2. 10 - 14 Points</span>
                  <span>= 12 Students</span>
                </div>
                <div className="flex justify-between font-bold text-slate-800">
                  <span>3. 04 - 09 Points</span>
                  <span>= 11 Students</span>
                </div>
              </div>

              {/* Director Signoff */}
              <div className="pt-2 md:text-right">
                <div className="h-10 w-28 bg-transparent relative opacity-70 mb-1 ml-auto">
                  {/* Stylized vector handwriting line representing Mugisha Elias sign */}
                  <svg className="w-full h-full" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M10 25 C 20 15, 30 35, 45 10 C 55 12, 60 5, 75 22 C 85 24, 90 20, 95 15" 
                      stroke="#0A3C75" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                    />
                    <path 
                      d="M15 18 L 85 26" 
                      stroke="#0A3C75" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                    />
                  </svg>
                </div>
                <span className="block font-black text-[#062449] text-xs uppercase tracking-wider">
                  MR. MUGISHA ELIAS
                </span>
                <span className="block text-[10px] font-bold text-sky-800 uppercase tracking-widest mt-0.5">
                  DIRECTOR.
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
