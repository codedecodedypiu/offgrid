import React, { useState, useEffect, useRef } from 'react';

// --- Neo-Brutalism Design Constants ---
const neoBorder = "border-4 border-black";
const neoShadow = "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]";
const neoShadowHover = "hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px]";
const bgColors = {
  main: "bg-[#f0f0f0]",
  accentYellow: "bg-[#facc15]",
  accentPink: "bg-[#ff80bf]",
  accentBlue: "bg-[#5d9cec]",
  accentGreen: "bg-[#69db7c]",
  white: "bg-white",
  black: "bg-black"
};

// --- Inline SVG Icons (No external dependencies) ---
const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-6 h-6">
    <polyline points="16,18 22,12 16,6" />
    <polyline points="8,6 2,12 8,18" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-16 h-16">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const CpuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-12 h-12">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="14" x2="4" y2="14" />
  </svg>
);

const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-10 h-10">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-12 h-12">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// --- Custom Cursor Component ---
const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 border-4 border-black bg-[#facc15] pointer-events-none z-[9999] hidden md:block"
      style={{ transform: 'translate3d(-100px, -100px, 0)', transition: 'transform 0.05s linear' }}
    />
  );
};

// --- Reusable Neo-Button ---
const NeoButton = ({ children, onClick, color = "bg-white" }) => (
  <button
    onClick={onClick}
    className={`${color} ${neoBorder} ${neoShadow} ${neoShadowHover} px-8 py-3 font-bold text-black uppercase tracking-wider transition-all duration-200`}
  >
    {children}
  </button>
);

// --- Reusable Card ---
const NeoCard = ({ children, color = "bg-white", className = "" }) => (
  <div className={`${color} ${neoBorder} ${neoShadow} p-6 ${className}`}>
    {children}
  </div>
);

// --- Main Application ---
export default function HackathonSite() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className={`min-h-screen ${bgColors.main} font-mono text-black selection:bg-black selection:text-white overflow-x-hidden`}>
      <CustomCursor />
      
      {/* --- Navbar --- */}
      <nav className={`${bgColors.white} ${neoBorder} border-t-0 border-x-0 p-4 sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 ${bgColors.accentPink} ${neoBorder} flex items-center justify-center`}>
              <CodeIcon />
            </div>
            <div>
              <h1 className="font-bold text-xl leading-none">CODE DECODE</h1>
              <p className="text-xs font-bold">CLUB</p>
            </div>
          </div>
          <div className="hidden md:flex gap-4">
            <span className="font-bold bg-black text-white px-2 py-1">DYPIU</span>
            <span className="font-bold">EST. 2024</span>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <header className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className={`inline-block ${bgColors.accentGreen} ${neoBorder} px-4 py-1 font-bold text-sm ${neoShadow}`}>
              🚀 MORE ANNOUNCEMENTS COMING SOON
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter">
              OPEN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600" style={{ WebkitTextStroke: '2px black', textShadow: '2px 2px 0 black' }}>VISION</span> <br />
              HACK
            </h1>
            <p className="text-xl font-bold max-w-md border-l-4 border-black pl-4">
              24 Hours of Pure Innovation. Hardware & Software. No Limits.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <NeoButton color={bgColors.accentYellow}>Register Now</NeoButton>
              <NeoButton color={bgColors.white}>View Rules</NeoButton>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className={`absolute inset-0 ${bgColors.accentBlue} ${neoBorder} ${neoShadow} translate-x-4 translate-y-4`}></div>
            <div className={`relative ${bgColors.white} ${neoBorder} p-8 h-full flex flex-col justify-center items-center text-center`}>
              <CalendarIcon />
              <h3 className="text-4xl font-black mt-4">APRIL 4-5</h3>
              <p className="text-xl font-bold mt-2">24 HOURS NON-STOP</p>
              <div className="mt-6 w-full h-4 bg-black relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-[#facc15] w-2/3 animate-pulse"></div>
              </div>
              <p className="text-xs mt-2 font-bold">LOADING ENERGY...</p>
            </div>
          </div>
        </div>
      </header>

      {/* --- Marquee --- */}
      <div className={`${bgColors.accentPink} ${neoBorder} border-x-0 py-4 overflow-hidden whitespace-nowrap`}>
        <div className="animate-marquee inline-block font-black text-2xl uppercase">
          Hardware • Software • Open Vision • 24 Hours • DYPIU • Code Decode Club • Hardware • Software • Open Vision • 24 Hours • DYPIU • Code Decode Club • 
        </div>
      </div>

      {/* --- Details Grid --- */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-black mb-12 uppercase text-center">Mission Parameters</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <NeoCard color={bgColors.accentBlue} className="transform rotate-1">
            <CpuIcon />
            <h3 className="text-2xl font-black mb-2 mt-4">HARDWARE</h3>
            <p className="font-bold">Build physical prototypes. IoT, Robotics, Embedded Systems.</p>
          </NeoCard>

          <NeoCard color={bgColors.accentYellow} className="transform -rotate-1">
            <CodeIcon />
            <h3 className="text-2xl font-black mb-2 mt-4">SOFTWARE</h3>
            <p className="font-bold">Web, App, AI/ML. Solve real-world problems with code.</p>
          </NeoCard>

          <NeoCard color={bgColors.accentGreen} className="transform rotate-1">
            <PinIcon />
            <h3 className="text-2xl font-black mb-2 mt-4">LOCATION</h3>
            <p className="font-bold">DY Patil International University (DYPIU). Offline Event.</p>
          </NeoCard>
        </div>
      </section>

      {/* --- Critical Deadline Section --- */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className={`${bgColors.white} ${neoBorder} ${neoShadow} p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8`}>
          <div className="flex items-center gap-4">
            <div className={`p-4 ${bgColors.accentPink} ${neoBorder}`}>
              <AlertIcon />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-black uppercase">PPT Submission</h2>
              <p className="font-bold text-lg">Initial Idea Pitch Deck</p>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <div className="text-5xl font-black bg-black text-white inline-block px-4 py-2">
              15-18 MARCH
            </div>
            <p className="mt-2 font-bold uppercase">Deadline Strict</p>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className={`${bgColors.black} text-white ${neoBorder} border-t-0 border-x-0 border-b-0 mt-12`}>
        <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-black mb-4">DYPIU</h2>
            <p className="font-mono opacity-80">DY Patil International University</p>
            <p className="font-mono opacity-80">Pune, India</p>
          </div>
          <div className="flex flex-col items-start md:items-end justify-center">
            <h3 className="text-xl font-bold mb-2">ORGANIZED BY</h3>
            <div className={`px-6 py-3 ${bgColors.accentYellow} text-black ${neoBorder} font-black text-xl`}>
              CODE DECODE CLUB
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 p-4 text-center font-mono text-sm">
          © 2024 OPEN VISION HACKATHON. ALL RIGHTS RESERVED.
        </div>
      </footer>

      {/* --- Tailwind Custom Animation Style --- */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}