import React from "react";
import { useLanguage } from "../LanguageContext";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  showText?: boolean;
}

export default function Logo({
  className = "",
  size = "md",
  variant = "dark",
  showText = true,
}: LogoProps) {
  const { t } = useLanguage();
  const sizeMap = {
    sm: "h-11 w-11",
    md: "h-16 w-16",
    lg: "h-28 w-28",
  };

  const textColorClass = variant === "dark" ? "text-slate-900" : "text-white";
  const subColorClass = variant === "dark" ? "text-red-600" : "text-red-400";

  return (
    <div className={`flex items-center gap-3.5 ${className}`} id="college-logo-container">
      {/* High-Fidelity Crest SVG matching the uploaded logo */}
      <svg
        className={`${sizeMap[size]} shrink-0 drop-shadow-md transition-all duration-300 hover:scale-105`}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        id="college-crest-svg"
      >
        <defs>
          {/* Gradients for a polished, 3D effect */}
          <linearGradient id="shieldBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#0B1530" />
          </linearGradient>
          <linearGradient id="bannerBlue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1D4ED8" />
            <stop offset="50%" stopColor="#1E40AF" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="quillRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#B91C1C" />
          </linearGradient>
          <linearGradient id="quillBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>

        {/* Central Shield Area/Background */}
        <path
          d="M 175,130 C 190,135 310,135 325,130 C 340,240 315,310 250,325 C 185,310 160,240 175,130 Z"
          fill="url(#shieldBlue)"
          stroke="#FFFFFF"
          strokeWidth="3"
        />

        {/* Dark Blue Cloud / Halo above the Red Bird with horizontal light-lines */}
        <path
          d="M 210,148 C 210,132 290,132 290,148 C 290,165 210,165 210,148 Z"
          fill="#111827"
          opacity="0.9"
        />
        {/* Shading/Lines inside the Halo */}
        <line x1="225" y1="145" x2="275" y2="145" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />
        <line x1="235" y1="151" x2="265" y2="151" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />

        {/* Flanking Side Pillars / Wings (Red and White curves) */}
        {/* Left Side Pillar */}
        <path
          d="M 174,138 C 158,160 148,200 162,280 C 168,310 174,320 188,322 C 172,310 176,280 182,230 C 186,190 188,150 174,138 Z"
          fill="#DC2626"
        />
        <path
          d="M 168,145 C 158,165 152,195 165,265 C 170,295 174,310 182,314 C 172,305 174,285 178,245 C 182,205 182,165 168,145 Z"
          fill="#FFFFFF"
        />
        {/* Decorative Outer Red Border */}
        <path
          d="M 148,135 C 170,230 190,305 198,318"
          stroke="#DC2626"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Right Side Pillar (Symmetrical) */}
        <path
          d="M 326,138 C 342,160 352,200 338,280 C 332,310 326,320 312,322 C 328,310 324,280 318,230 C 314,190 312,150 326,138 Z"
          fill="#DC2626"
        />
        <path
          d="M 332,145 C 342,165 348,195 335,265 C 330,295 326,310 318,314 C 328,305 326,285 322,245 C 318,205 318,165 332,145 Z"
          fill="#FFFFFF"
        />
        {/* Decorative Outer Red Border */}
        <path
          d="M 352,135 C 330,230 310,305 302,318"
          stroke="#DC2626"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* The Flying Red Eagle / Dove in top-middle */}
        <path
          d="M 250,178 C 242,170 215,160 192,162 C 218,172 238,182 245,188 C 247,192 249,195 250,198 C 251,195 253,192 255,188 C 262,182 282,172 308,162 C 285,160 258,170 250,178 Z"
          fill="#DC2626"
        />
        <path
          d="M 250,188 C 248,192 246,198 244,204 C 246,201 248,199 250,198 C 252,199 254,201 256,204 C 254,198 252,192 250,188 Z"
          fill="#DC2626"
        />

        {/* Crossing Pens */}
        {/* Left crossing pen: Red Quill */}
        <g id="red-quill-group">
          {/* Nib & Stem */}
          <path
            d="M 145,108 L 222,216"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M 145,108 L 222,216"
            stroke="#DC2626"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Feather/Quill Body */}
          <path
            d="M 145,108 C 160,135 178,170 210,198 C 190,185 168,150 148,118 Z"
            fill="url(#quillRed)"
          />
          {/* Feather Barb lines */}
          <line x1="160" y1="130" x2="152" y2="135" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />
          <line x1="172" y1="148" x2="162" y2="154" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />
          <line x1="184" y1="166" x2="174" y2="172" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />
        </g>

        {/* Right crossing pen: Blue Fountain Pen/Quill */}
        <g id="blue-quill-group">
          {/* Nib & Stem */}
          <path
            d="M 355,108 L 278,216"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M 355,108 L 278,216"
            stroke="#2563EB"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Pen Body / Quill */}
          <path
            d="M 355,108 C 340,135 322,170 290,198 C 310,185 332,150 352,118 Z"
            fill="url(#quillBlue)"
          />
          {/* Pen details / Feather Barb lines */}
          <line x1="340" y1="130" x2="348" y2="135" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />
          <line x1="328" y1="148" x2="338" y2="154" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />
          <line x1="316" y1="166" x2="326" y2="172" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />
        </g>

        {/* Open Book at the bottom center */}
        <g id="open-book-group" transform="translate(180, 218)">
          {/* Blue Book Cover Backdrop */}
          <path
            d="M 5,35 C 35,15 65,22 70,25 C 75,22 105,15 135,35 L 135,78 C 105,58 75,65 70,68 C 65,65 35,58 5,78 Z"
            fill="#1E3A8A"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* White Book Pages */}
          <path
            d="M 8,32 C 35,14 65,20 68,23 L 68,64 C 65,61 35,55 8,73 Z"
            fill="#FFFFFF"
          />
          <path
            d="M 132,32 C 105,14 75,20 72,23 L 72,64 C 75,61 105,55 132,73 Z"
            fill="#F8FAFC"
          />
          {/* Middle Binder Spine */}
          <line x1="70" y1="23" x2="70" y2="67" stroke="#1E3A8A" strokeWidth="3" />
          {/* Text/Script lines in book */}
          <path
            d="M 18,24 L 56,16 M 18,32 L 56,24 M 18,40 L 56,32 M 18,48 L 56,40 M 18,56 L 56,48"
            stroke="#94A3B8"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M 82,16 L 120,24 M 82,24 L 120,32 M 82,32 L 120,40 M 82,40 L 120,48 M 82,48 L 120,56"
            stroke="#94A3B8"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </g>

        {/* Small Red Scroll/Base Rollers at the bottom of the shield */}
        <path
          d="M 182,316 C 178,324 184,332 192,332 C 200,332 204,324 200,316 Z"
          fill="#DC2626"
        />
        <path
          d="M 318,316 C 314,324 320,332 328,332 C 336,332 340,324 336,316 Z"
          fill="#DC2626"
        />

        {/* Royal Blue Arched Banner on Top */}
        <g id="arched-banner-group">
          {/* Background Shadow Ribbon */}
          <path
            d="M 148,118 C 210,65 290,65 352,118"
            stroke="#0B1329"
            strokeWidth="32"
            strokeLinecap="round"
            fill="none"
          />
          {/* Main Blue Ribbon */}
          <path
            id="mainRibbonPath"
            d="M 152,116 C 212,67 288,67 348,116"
            stroke="url(#bannerBlue)"
            strokeWidth="24"
            strokeLinecap="round"
            fill="none"
          />
          {/* Golden/White Trim on Ribbon Edges */}
          <path
            d="M 152,126 C 212,77 288,77 348,126"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            fill="none"
            opacity="0.8"
          />

          {/* Arched text "ST. JOHN'S COLLEGE" inside the ribbon */}
          <text fill="#FFFFFF" fontSize="15.5" fontWeight="900" letterSpacing="1.8" fontFamily="var(--font-serif)">
            <textPath href="#mainRibbonPath" startOffset="50%" textAnchor="middle">
              ST. JOHN'S COLLEGE
            </textPath>
          </text>
        </g>
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-serif text-xl font-black tracking-tight leading-none ${textColorClass}`}>
            ST. JOHN'S COLLEGE MPIGI
          </span>
          <span className={`text-[10px] font-bold tracking-widest uppercase mt-1 italic ${subColorClass}`}>
            {t("Godliness & Hardwork")}
          </span>
        </div>
      )}
    </div>
  );
}

