import { useState, useEffect, useRef } from "react";

const COL = {
  main:   "#f0f0f0",
  yellow: "#facc15",
  pink:   "#ff80bf",
  blue:   "#5d9cec",
  green:  "#69db7c",
  white:  "#ffffff",
  black:  "#000000",
};

/* ─── ICONS ─── */
const CodeIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="16,18 22,12 16,6" /><polyline points="8,6 2,12 8,18" />
  </svg>
);
const CalIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="square">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const ClockIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="square">
    <circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" />
  </svg>
);
const PinIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="square">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);
const CpuIcon = ({ size = 40, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="square">
    <rect x="4" y="4" width="16" height="16" /><rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
  </svg>
);
const TermIcon = ({ size = 40, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="square">
    <rect x="2" y="3" width="20" height="18" />
    <polyline points="8,9 12,13 8,17" /><line x1="13" y1="17" x2="21" y2="17" />
  </svg>
);
const FlagIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="square">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" y1="22" x2="4" y2="15" />
  </svg>
);
const ZapIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="square">
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" />
  </svg>
);
const TrophyIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="square">
    <path d="M7 4h10v6a5 5 0 0 1-10 0V4z" />
    <path d="M7 9H4a3 3 0 0 1-3-3V4h6" /><path d="M17 9h3a3 3 0 0 0 3-3V4h-6" />
    <line x1="12" y1="14" x2="12" y2="18" /><line x1="8" y1="21" x2="16" y2="21" />
  </svg>
);
const HornIcon = ({ size = 28, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="square">
    <path d="M3 11l19-9-9 19-2-8-8-2z" />
  </svg>
);
const LockIcon = ({ size = 14, color = "#aaa" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="square">
    <rect x="3" y="11" width="18" height="11" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const TargetIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="square">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1" fill={color} />
  </svg>
);
const ChevronIcon = ({ size = 20, color = "currentColor", open }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="square"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .2s", flexShrink: 0 }}>
    <polyline points="6,9 12,15 18,9" />
  </svg>
);

/* ─── CUSTOM CURSOR ─── */
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const trailRef  = useRef(null);
  const [clicking, setClicking] = useState(false);
  useEffect(() => {
    let trailX = 0, trailY = 0, raf;
    const move = (e) => {
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${e.clientX-6}px,${e.clientY-6}px)`;
      const animate = () => {
        trailX += (e.clientX - trailX) * 0.15;
        trailY += (e.clientY - trailY) * 0.15;
        if (trailRef.current) trailRef.current.style.transform = `translate(${trailX-4}px,${trailY-4}px)`;
        raf = requestAnimationFrame(animate);
      };
      animate();
    };
    const down = () => setClicking(true);
    const up   = () => setClicking(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <>
      <div ref={cursorRef} style={{ position:"fixed",top:0,left:0,width:12,height:12,borderRadius:"50%",border:"2px solid black",background:clicking?"black":"white",pointerEvents:"none",zIndex:9999,transform:"translate(-200px,-200px)",transition:"background .1s" }} />
      <div ref={trailRef}  style={{ position:"fixed",top:0,left:0,width:8,height:8,borderRadius:"50%",background:COL.yellow,border:"1px solid black",pointerEvents:"none",zIndex:9998,transform:"translate(-200px,-200px)",opacity:0.8 }} />
    </>
  );
};

/* ─── MARQUEE ─── */
const Marquee = () => {
  const txt = "OFFGRID 1.0   CODE DECODE CLUB   DY PATIL INTERNATIONAL UNIVERSITY   HARDWARE   SOFTWARE   REGISTER NOW   APRIL 2026   AKURDI PUNE   ";
  return (
    <div style={{ background:COL.pink, borderTop:"4px solid black", borderBottom:"4px solid black", padding:"12px 0", overflow:"hidden", whiteSpace:"nowrap" }}>
      <div style={{ display:"inline-block", animation:"marquee 28s linear infinite" }}>
        {[txt,txt,txt].map((s,i) => (
          <span key={i} style={{ fontFamily:"'Courier Prime',monospace", fontWeight:700, fontSize:"0.9rem", letterSpacing:"0.12em", color:"black", textTransform:"uppercase", paddingRight:"4rem" }}>{s}</span>
        ))}
      </div>
    </div>
  );
};

/* ─── NEO BUTTON ─── */
const NeoBtn = ({ children, bg = COL.white, href, onClick }) => {
  const s = { background:bg, border:"4px solid black", boxShadow:"8px 8px 0 black", fontFamily:"'Courier Prime',monospace", fontWeight:700, fontSize:"0.85rem", letterSpacing:"0.12em", textTransform:"uppercase", padding:"12px 28px", cursor:"pointer", transition:"all .15s", color:"black", textDecoration:"none", display:"inline-block" };
  const enter = (e) => { e.currentTarget.style.boxShadow="4px 4px 0 black"; e.currentTarget.style.transform="translate(4px,4px)"; };
  const leave = (e) => { e.currentTarget.style.boxShadow="8px 8px 0 black"; e.currentTarget.style.transform="translate(0,0)"; };
  if (href) return <a href={href} target="_blank" rel="noreferrer" style={s} onMouseEnter={enter} onMouseLeave={leave}>{children}</a>;
  return <button onClick={onClick} style={s} onMouseEnter={enter} onMouseLeave={leave}>{children}</button>;
};

/* ─── NEO CARD ─── */
const NeoCard = ({ children, bg = COL.white, rotate = "0deg", style = {} }) => (
  <div style={{ background:bg, border:"4px solid black", boxShadow:"8px 8px 0 black", padding:"1.5rem", transform:`rotate(${rotate})`, transition:"all .15s", ...style }}
    onMouseEnter={e=>{ e.currentTarget.style.boxShadow="4px 4px 0 black"; e.currentTarget.style.transform=`rotate(${rotate}) translate(4px,4px)`; }}
    onMouseLeave={e=>{ e.currentTarget.style.boxShadow="8px 8px 0 black"; e.currentTarget.style.transform=`rotate(${rotate})`; }}>
    {children}
  </div>
);

/* ─── DECO NUMBER ─── */
const DecoNum = ({ n }) => (
  <div style={{ position:"absolute", top:"-1rem", right:"1rem", fontFamily:"'Courier Prime',monospace", fontWeight:700, fontSize:"clamp(5rem,12vw,9rem)", color:"black", opacity:0.05, userSelect:"none", pointerEvents:"none", lineHeight:1 }}>{n}</div>
);

/* ─── DEADLINE BAR ─── */
const DeadlineBar = () => {
  const mono = { fontFamily:"'Courier Prime',monospace" };
  const steps = [
    { date:"APR 7",  label:"PPT Submission\n& Registration", color:COL.blue },
    { date:"APR 9",  label:"Online\nEvaluation",             color:COL.pink },
    { date:"APR 18", label:"Offline\nFinal Round",           color:COL.green },
  ];
  return (
    <div style={{ ...mono, marginTop:"2.5rem" }}>
      <div style={{ fontWeight:700, fontSize:"0.72rem", letterSpacing:"0.15em", color:"#666", marginBottom:"1.2rem", textTransform:"uppercase" }}>// Important Dates</div>
      <div style={{ display:"flex", alignItems:"flex-start" }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display:"flex", alignItems:"flex-start", flex:1 }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flex:1 }}>
              {/* connector row */}
              <div style={{ display:"flex", alignItems:"center", width:"100%" }}>
                {i > 0 && (
                  <div style={{ flex:1, height:3, backgroundImage:"repeating-linear-gradient(90deg, black 0, black 6px, transparent 6px, transparent 12px)" }} />
                )}
                <div style={{ width:18, height:18, background:s.color, border:"4px solid black", flexShrink:0, boxShadow:"2px 2px 0 black" }} />
                {i < steps.length-1 && (
                  <div style={{ flex:1, height:3, backgroundImage:"repeating-linear-gradient(90deg, black 0, black 6px, transparent 6px, transparent 12px)" }} />
                )}
              </div>
              {/* label */}
              <div style={{ textAlign:"center", marginTop:"0.6rem", paddingRight: i < steps.length-1 ? "8px" : 0, paddingLeft: i > 0 ? "8px" : 0 }}>
                <div style={{ fontWeight:700, fontSize:"0.85rem", background:s.color, border:"3px solid black", padding:"1px 8px", display:"inline-block", boxShadow:"2px 2px 0 black" }}>{s.date}</div>
                <div style={{ fontSize:"0.68rem", color:"#555", marginTop:"0.3rem", lineHeight:1.4, whiteSpace:"pre-line" }}>{s.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── FAQ ─── */
const FAQ = () => {
  const mono = { fontFamily:"'Courier Prime',monospace" };
  const [open, setOpen] = useState(null);
  const faqs = [
    { q:"Who can participate in OFFGRID 1.0?",
      a:"OFFGRID 1.0 is open to undergraduate students from all colleges and universities. Inter-college teams are allowed. Each team must have 2 to 5 members." },
    { q:"What is the format of the hackathon?",
      a:"The event runs across 3 rounds: Round 1 is an online Idea Submission (PPT/PDF via Unstop). Round 2 is an Online Evaluation via video conferencing (10 min pitch + 5 min Q&A). Round 3 is an Offline Final at DYPIU Campus on 18 April 2026." },
    { q:"What should our PPT submission include?",
      a:"Your pitch deck (max 10 slides, PDF) must use the official template from the Unstop attachments section and cover: Problem Statement & Relevance, Technology Used & Integration, Sustainability & Long-Term Impact, Live Demo of Prototype, Scalability & Future Roadmap, and Business Potential & Real-World Application. Not following the template may lead to disqualification." },
    { q:"What domains or themes can we work on?",
      a:"You can build solutions under Artificial Intelligence & Emerging Technologies, Smart Cities & Urban Innovation, Sustainability & Environment, Education & Digital Learning, Healthcare & Well-being, and Blockchain, IoT & Data Science — among others. Both hardware and software projects are welcome." },
    { q:"What are the prizes?",
      a:"Cash prizes worth ₹20,000 total for the top 3 teams — 1st place ₹5,000, 2nd place ₹3,000, 3rd place ₹2,000 — along with Hardware & Software rewards. All participants receive a Participation Certificate. Prizes are released within 15 days after the event." },
    { q:"What are the key rules I should know?",
      a:"All submissions must be original — plagiarism and pre-built or copied solutions lead to disqualification. All team members must actively participate. Teams must adhere to all deadlines. Maintain professional conduct throughout the event. Organizers' decisions are final and binding." },
    { q:"What happens on the offline round day (April 18)?",
      a:"Report at DYPIU, Akurdi by 9:30 AM sharp. The day includes inauguration, general evaluation with mentor guidance, a final pitch to industry mentors at 2:00 PM (5 min pitch + 5 min Q&A), Hi-Tea & Networking at 3:30 PM, and Closing Ceremony at 4:30 PM. Results are declared on 25 April 2026." },
    { q:"What if I lose my ID card at the offline event?",
      a:"ID cards are distributed at the 9:30 AM reporting time. There is no replacement issued for lost ID cards, and loss of ID may lead to disqualification from the offline round." },
  ];
  return (
    <section id="faq" style={{ background:COL.white, borderBottom:"4px solid black", padding:"5rem 2.5rem", position:"relative", overflow:"hidden" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <DecoNum n="06" />
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:"1rem" }}>
          <div style={{ width:32, height:32, background:COL.yellow, border:"4px solid black", display:"flex", alignItems:"center", justifyContent:"center", ...mono, fontWeight:700, fontSize:"1.1rem", flexShrink:0, boxShadow:"3px 3px 0 black" }}>?</div>
          <div style={{ ...mono, fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#555" }}>// FAQ</div>
        </div>
        <div style={{ ...mono, fontWeight:700, fontSize:"clamp(2rem,5vw,4rem)", lineHeight:1, textTransform:"uppercase", marginBottom:"3rem" }}>
          FREQUENTLY<br /><span style={{ background:COL.yellow, padding:"0 8px" }}>ASKED</span>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:"1rem", maxWidth:820 }}>
          {faqs.map((f, i) => (
            <div key={i}
              style={{ border:"4px solid black", background: open===i ? COL.yellow : COL.main, boxShadow: open===i ? "4px 4px 0 black" : "6px 6px 0 black", transition:"all .15s", cursor:"pointer" }}
              onClick={() => setOpen(open===i ? null : i)}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1rem 1.25rem", gap:"1rem" }}>
                <div style={{ ...mono, fontWeight:700, fontSize:"0.92rem", lineHeight:1.4 }}>{f.q}</div>
                <ChevronIcon size={20} color="black" open={open===i} />
              </div>
              {open===i && (
                <div style={{ borderTop:"3px solid black", padding:"1rem 1.25rem", ...mono, fontSize:"0.88rem", lineHeight:1.8, color:"#333", background:COL.white }}>
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ════════════════ MAIN ════════════════ */
export default function OFFGRID() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const mono = { fontFamily:"'Courier Prime',monospace" };

  return (
    <div style={{ minHeight:"100vh", background:COL.main, fontFamily:"'Courier Prime',monospace", color:"black", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap');
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-33.33%)} }
        @keyframes blink { 0%,49%,100%{opacity:1} 50%,99%{opacity:0} }
        @keyframes pulse-bar { 0%,100%{width:40%} 50%{width:75%} }
        * { box-sizing: border-box; }
        ::selection { background:black; color:white; }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-right { border-right: none !important; border-bottom: 4px solid black !important; }
          .details-grid { grid-template-columns: repeat(2,1fr) !important; }
          .details-grid > div:nth-child(2n) { border-right: none !important; }
          .details-grid > div:nth-child(n+3) { border-top: 4px solid black; }
          .tracks-grid { grid-template-columns: 1fr !important; }
          .tl-grid { grid-template-columns: 1fr !important; }
          .prize-grid { grid-template-columns: 1fr !important; }
          .prize-grid > div { border-right: none !important; border-bottom: 4px solid #facc15; }
          .prize-grid > div:last-child { border-bottom: none !important; }
          .nav-links { display: none !important; }
        }
      `}</style>

      <CustomCursor />

      {/* ══ NAVBAR ══ */}
      <nav style={{ background:COL.white, borderBottom:"4px solid black", padding:"0 1.5rem", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 0" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:40, height:40, background:COL.pink, border:"4px solid black", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <CodeIcon size={20} />
            </div>
            <div>
              <div style={{ ...mono, fontWeight:700, fontSize:"1rem", lineHeight:1, textTransform:"uppercase" }}>CODE DECODE</div>
              <div style={{ ...mono, fontWeight:700, fontSize:"0.65rem", letterSpacing:"0.1em", textTransform:"uppercase" }}>CLUB · DYPIU</div>
            </div>
          </div>
          <nav className="nav-links" style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {["ABOUT","TRACKS","TIMELINE","FAQ","REGISTER"].map(n => (
              <a key={n} href={`#${n.toLowerCase()}`}
                style={{ ...mono, fontWeight:700, fontSize:"0.7rem", letterSpacing:"0.12em", textTransform:"uppercase", textDecoration:"none", padding:"6px 14px", border:"3px solid black", background:COL.white, boxShadow:"3px 3px 0 black", color:"black", transition:"all .1s" }}
                onMouseEnter={e=>{ e.currentTarget.style.background=COL.yellow; e.currentTarget.style.transform="translate(-2px,-2px)"; e.currentTarget.style.boxShadow="5px 5px 0 black"; }}
                onMouseLeave={e=>{ e.currentTarget.style.background=COL.white; e.currentTarget.style.transform="translate(0,0)"; e.currentTarget.style.boxShadow="3px 3px 0 black"; }}>
                {n}
              </a>
            ))}
          </nav>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <header id="about" style={{ borderBottom:"4px solid black" }}>
        <div className="hero-grid" style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", minHeight:"88vh" }}>

          {/* LEFT */}
          <div className="hero-right" style={{ padding:"3.5rem 2.5rem", borderRight:"4px solid black", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
            <div>
              <div style={{ display:"inline-block", background:COL.green, border:"4px solid black", boxShadow:"5px 5px 0 black", padding:"4px 16px", ...mono, fontWeight:700, fontSize:"0.72rem", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:"2rem" }}>
                🚀 REGISTRATIONS OPEN — DEADLINE APR 7
              </div>
              <div style={{ lineHeight:0.85, letterSpacing:"-0.02em", textTransform:"uppercase", marginBottom:"1.5rem" }}>
                <div style={{ ...mono, fontWeight:700, fontSize:"clamp(5rem,11vw,8.5rem)", display:"block" }}>OFF</div>
                <div style={{ ...mono, fontWeight:700, fontSize:"clamp(5rem,11vw,8.5rem)", display:"block", color:COL.yellow, textShadow:"3px 3px 0 black", WebkitTextStroke:"2px black" }}>GRID</div>
                <div style={{ ...mono, fontWeight:700, fontSize:"clamp(2.5rem,5.5vw,4.5rem)", display:"block" }}>1.0</div>
              </div>
              <div style={{ borderLeft:"5px solid black", paddingLeft:"1.2rem", ...mono, fontWeight:700, fontSize:"1rem", lineHeight:1.6 }}>
                Innovation-driven hackathon by CodeDecode Club.<br />Hardware. Software. No Limits.
              </div>
             
            </div>

            <div>
              <div style={{ borderTop:"4px solid black", margin:"2.5rem 0 1.5rem" }} />
              <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
                <NeoBtn bg={COL.yellow} href="https://unstop.com/p/offgrid-10-codedecode-dypiu-1666935">Register Now →</NeoBtn>
                <NeoBtn bg={COL.white} href="#timeline">View Timeline →</NeoBtn>
              </div>
              <div style={{ ...mono, fontSize:"0.7rem", color:"#555", marginTop:"1.2rem", letterSpacing:"0.08em" }}>
                CODE DECODE CLUB × SCHOOL OF CSE & APPLICATIONS · DY PATIL INTERNATIONAL UNIVERSITY
              </div>
            </div>
          </div>

        {/* RIGHT */}
<div style={{
  padding: "3rem 2.5rem", // slightly reduced
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "relative",
  gap: "1.5rem" // 🔥 add gap between sections
}}>

  {/* Floating badge */}
  <div style={{
    position: "absolute",
    top: "2rem",
    right: "2rem",
    background: "#ff4d4d",
    border: "5px solid black",
    padding: "1.2rem 1.5rem",
    textAlign: "center",
    transform: "rotate(4deg)",
    boxShadow: `5px 5px 0 ${COL.yellow}`,
    zIndex: 5
  }}>
    <div style={{ ...mono, fontWeight: 700, fontSize: "3.5rem", color: "white", lineHeight: 1 }}>3</div>
    <div style={{ ...mono, fontWeight: 700, fontSize: "1.2rem", color: COL.yellow }}>STAGES</div>
    <div style={{ ...mono, fontSize: "0.6rem", color: "white", marginTop: 4 }}>MULTI-ROUND</div>
  </div>

  {/* Info Section */}
  <div style={{ marginTop: "11rem" }}> {/* reduced from 13rem */}
    {[
      { label: "DEADLINE", val: "APR 7, 2026" },
      { label: "VENUE", val: "DY PATIL INTERNATIONAL UNIVERSITY AKURDI" },
      { label: "TEAM SIZE", val: "2 – 5 MEMBERS" },
      { label: "TRACKS", val: "HARDWARE & SOFTWARE" },
    ].map((s, i) => (
      <div key={i} style={{
        borderTop: i === 0 ? "4px solid black" : "1px solid #ccc",
        padding: "0.9rem 0", // slightly tighter
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline"
      }}>
        <span style={{ ...mono, fontSize: "0.65rem", color: "#666", letterSpacing: "0.15em" }}>
          {s.label}
        </span>
        <span style={{ ...mono, fontWeight: 700, fontSize: "1rem" }}>
          {s.val}
        </span>
      </div>
    ))}
  </div>

  {/* Timeline + Loading */}
  <div style={{
    ...mono,
    fontSize: "0.65rem",
    color: "#555",
    letterSpacing: "0.1em",
    marginTop: "1rem"
  }}>
    
    {/* Timeline spacing fix */}
    <div style={{ marginBottom: "1.5rem" }}>
      <DeadlineBar />
    </div>

    {/* Loading */}
    <div style={{ marginTop: "0.5rem" }}>
      <div style={{ marginBottom: 6 }}>
        INNOVATION ENERGY LOADING...
      </div>

      <div style={{
        width: "100%",
        height: 12,
        background: "white",
        border: "3px solid black",
        overflow: "hidden"
      }}>
        <div style={{
          height: "100%",
          background: COL.yellow,
          animation: "pulse-bar 2s ease-in-out infinite"
        }} />
      </div>
    </div>

  </div>
</div>
        </div>
      </header>

      {/* ══ MARQUEE ══ */}
      <Marquee />

      {/* ══ EVENT DETAILS ══ */}
      <section style={{ background:COL.white, borderBottom:"4px solid black", padding:"5rem 2.5rem", position:"relative", overflow:"hidden" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <DecoNum n="01" />
          <div style={{ ...mono, fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"1rem", color:"#555" }}>// EVENT DETAILS</div>
          <div style={{ ...mono, fontWeight:700, fontSize:"clamp(2rem,5vw,4rem)", lineHeight:1, textTransform:"uppercase", marginBottom:"3rem" }}>
            WHAT, WHEN<br />& WHERE
          </div>
          <div className="details-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", border:"4px solid black" }}>
            {[
              { Icon:CalIcon,    label:"DATES",   val:"APR 7 – APR 25\n2026",              bg:COL.yellow, fg:"black" },
              { Icon:ClockIcon,  label:"STAGES",  val:"3 ROUNDS\nIDEA → ONLINE → OFFLINE", bg:COL.white,  fg:"black" },
              { Icon:PinIcon,    label:"VENUE",   val:"DY PATIL INTL.\nAKURDI, PUNE",      bg:"#ff4d4d",  fg:"white" },
              { Icon:TargetIcon, label:"MODE",    val:"HARDWARE &\nSOFTWARE",              bg:"black",    fg:COL.yellow },
            ].map((c, i) => (
              <div key={i} style={{ background:c.bg, borderRight: i<3 ? "4px solid black" : "none", padding:"2rem 1.5rem" }}>
                <c.Icon size={28} color={c.fg} />
                <div style={{ ...mono, fontSize:"0.65rem", fontWeight:700, color: c.fg==="white" ? "rgba(255,255,255,0.6)" : "#888", letterSpacing:"0.15em", marginTop:"1.2rem", marginBottom:"0.5rem", textTransform:"uppercase" }}>{c.label}</div>
                <div style={{ ...mono, fontWeight:700, fontSize:"1.15rem", color:c.fg, lineHeight:1.25, textTransform:"uppercase", whiteSpace:"pre-line" }}>{c.val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TRACKS ══ */}
      <section id="tracks" style={{ background:COL.main, borderBottom:"4px solid black", padding:"5rem 2.5rem", position:"relative", overflow:"hidden" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <DecoNum n="02" />
          <div style={{ ...mono, fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"1rem", color:"#555" }}>// MISSION PARAMETERS</div>
          <div style={{ ...mono, fontWeight:700, fontSize:"clamp(2rem,5vw,4rem)", lineHeight:1, textTransform:"uppercase", marginBottom:"3rem" }}>
            WHAT ARE YOU<br /><span style={{ color:COL.yellow, WebkitTextStroke:"1.5px black", textShadow:"3px 3px 0 black" }}>BUILDING?</span>
          </div>
          <div className="tracks-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2rem" }}>
            <NeoCard bg={COL.blue} rotate="1deg">
              <CpuIcon size={44} color="black" />
              <div style={{ ...mono, fontWeight:700, fontSize:"2rem", textTransform:"uppercase", marginTop:"1rem", marginBottom:"0.5rem" }}>HARDWARE</div>
              <div style={{ borderTop:"3px solid black", paddingTop:"0.8rem", ...mono, fontSize:"0.85rem", lineHeight:1.7 }}>
                Circuits, embedded systems, IoT devices, robotics, and physical computing solutions. If it has wires and a heartbeat, it belongs here.
              </div>
            </NeoCard>
            <NeoCard bg={COL.yellow} rotate="-1deg">
              <TermIcon size={44} color="black" />
              <div style={{ ...mono, fontWeight:700, fontSize:"2rem", textTransform:"uppercase", marginTop:"1rem", marginBottom:"0.5rem" }}>SOFTWARE</div>
              <div style={{ borderTop:"3px solid black", paddingTop:"0.8rem", ...mono, fontSize:"0.85rem", lineHeight:1.7 }}>
                Web, mobile apps, AI/ML models, data science platforms, blockchain solutions. Code that runs and solves real problems at scale.
              </div>
            </NeoCard>
          </div>
        </div>
      </section>

      {/* ══ PRIZE POOL ══ */}
      <section style={{ background:"black", borderBottom:"4px solid black", padding:"5rem 2.5rem", position:"relative", overflow:"hidden" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <DecoNum n="03" />
          <div style={{ ...mono, fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"1rem", color:COL.yellow }}>// REWARDS</div>
          <div style={{ ...mono, fontWeight:700, fontSize:"clamp(2rem,5vw,4rem)", lineHeight:1, textTransform:"uppercase", marginBottom:"3rem", color:"white" }}>
            PRIZE<br /><span style={{ color:COL.yellow }}>POOL</span>
          </div>
          {/* Big total */}
          <div style={{ border:`6px solid ${COL.yellow}`, padding:"3rem 2rem", textAlign:"center", boxShadow:`12px 12px 0 ${COL.yellow}`, marginBottom:"2.5rem", background:"#0a0a0a" }}>
            <div style={{ ...mono, fontSize:"0.75rem", color:"#555", letterSpacing:"0.2em", marginBottom:"0.5rem", textTransform:"uppercase" }}>TOTAL CASH PRIZE POOL</div>
            <div style={{ ...mono, fontWeight:700, fontSize:"clamp(4.5rem,14vw,10rem)", color:COL.yellow, lineHeight:1, letterSpacing:"-0.02em" }}>₹20,000</div>
            <div style={{ ...mono, fontSize:"0.85rem", color:"#888", marginTop:"0.5rem", letterSpacing:"0.1em" }}>FOR THE TOP 3 TEAMS + HARDWARE & SOFTWARE REWARDS</div>
          </div>
          {/* Breakdown */}
          <div className="prize-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", border:`4px solid ${COL.yellow}` }}>
            {[
              { place:"1ST",  amt:"₹5,000", color:COL.yellow, bg:"#1a1a00" },
              { place:"2ND",  amt:"₹3,000", color:"#d4d4d4",  bg:"#111" },
              { place:"3RD",  amt:"₹2,000", color:"#cd7f32",  bg:"#0f0a00" },
            ].map((p, i) => (
              <div key={i} style={{ padding:"2.5rem 1.5rem", textAlign:"center", background:p.bg, borderRight: i<2 ? `4px solid ${COL.yellow}` : "none" }}>
                <div style={{ ...mono, fontSize:"0.7rem", color:"#666", letterSpacing:"0.2em", marginBottom:"0.75rem" }}>{p.place} PLACE</div>
                <div style={{ ...mono, fontWeight:700, fontSize:"clamp(2rem,5vw,3.5rem)", color:p.color, lineHeight:1 }}>{p.amt}</div>
                <div style={{ ...mono, fontSize:"0.7rem", color:"#666", marginTop:"0.75rem", letterSpacing:"0.1em" }}>CASH + HW/SW GOODIES</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:"2rem", display:"flex", flexWrap:"wrap", gap:"1.5rem", alignItems:"center" }}>
            <div style={{ ...mono, fontSize:"0.8rem", color:"#888", flex:1, lineHeight:1.9 }}>
              🏆 All participants receive a Participation Certificate.<br />
              💡 Prizes released within 15 days after the event.
            </div>
            <NeoBtn bg={COL.yellow} href="https://unstop.com/p/offgrid-10-codedecode-dypiu-1666935">Register Now →</NeoBtn>
          </div>
        </div>
      </section>

      {/* ══ TIMELINE ══ */}
      <section id="timeline" style={{ background:COL.white, borderBottom:"4px solid black", padding:"5rem 2.5rem", position:"relative", overflow:"hidden" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <DecoNum n="04" />
          <div style={{ ...mono, fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"1rem", color:"#555" }}>// THE ROADMAP</div>
          <div style={{ ...mono, fontWeight:700, fontSize:"clamp(2rem,5vw,4rem)", lineHeight:1, textTransform:"uppercase", marginBottom:"3.5rem" }}>
            KEY DATES &<br />MILESTONES
          </div>
          <div className="tl-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem" }}>
            <div style={{ display:"flex", flexDirection:"column", gap:"2rem" }}>
              {[
                { Icon:FlagIcon,   date:"MAR 30 – APR 7", accent:COL.blue,  event:"IDEA PPT SUBMISSION",  desc:"Submit your idea presentation (PPT/PDF) via Unstop using the official template. Shortlist announced on 8th April." },
                { Icon:ZapIcon,    date:"APR 9 – APR 12", accent:"#ff4d4d", event:"ONLINE EVALUATION",    desc:"10 min pitch + 5 min Q&A via video conferencing. All members must attend their assigned time slot. Shortlist announced on 13th April." },
                { Icon:TrophyIcon, date:"APR 18",          accent:COL.green, event:"OFFLINE FINAL ROUND", desc:"DY Patil International University, Akurdi. 9:30 AM sharp. Mentor sessions, final pitch to industry experts, hi-tea, and closing ceremony." },
              ].map((item, i) => (
                <div key={i} style={{ borderLeft:`6px solid ${item.accent}`, paddingLeft:"1.5rem", transition:"border-color .15s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "black"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = item.accent}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:"0.5rem" }}>
                    <item.Icon size={20} color={item.accent} />
                    <span style={{ ...mono, fontSize:"0.7rem", fontWeight:700, color:item.accent, letterSpacing:"0.15em" }}>{item.date}</span>
                  </div>
                  <div style={{ ...mono, fontWeight:700, fontSize:"1.4rem", textTransform:"uppercase", lineHeight:1, letterSpacing:"0.02em", marginBottom:"0.4rem" }}>{item.event}</div>
                  <div style={{ ...mono, fontSize:"0.82rem", color:"#555", lineHeight:1.7 }}>{item.desc}</div>
                </div>
              ))}
            </div>
            <div>
              <NeoCard bg="black" style={{ height:"fit-content" }}>
                <div style={{ ...mono, fontSize:"0.65rem", color:COL.yellow, letterSpacing:"0.2em", marginBottom:"1.5rem", textTransform:"uppercase" }}>// Organized By</div>
                <div style={{ ...mono, fontWeight:700, fontSize:"2.2rem", color:"white", lineHeight:1, textTransform:"uppercase", marginBottom:"1rem" }}>
                  CODE<br />DECODE<br />CLUB
                </div>
                <div style={{ borderTop:`2px solid ${COL.yellow}`, margin:"1.5rem 0 1rem" }} />
                <div style={{ ...mono, fontSize:"0.75rem", color:"#888", lineHeight:1.8 }}>
                  School of CSE & Applications<br />
                  DY Patil International University<br />
                  Akurdi, Pune, Maharashtra
                </div>
                <div style={{ marginTop:"1.5rem", display:"flex", gap:8 }}>
                  {[COL.yellow, "#ff4d4d", COL.blue, COL.green].map(c => (
                    <div key={c} style={{ width:14, height:14, background:c, border:"2px solid white" }} />
                  ))}
                </div>
                <div style={{ marginTop:"1.5rem", borderTop:"1px solid #333", paddingTop:"1rem" }}>
                  <div style={{ ...mono, fontSize:"0.65rem", color:"#555", marginBottom:"0.5rem" }}>PRIZES UP FOR GRABS</div>
                  <div style={{ ...mono, fontWeight:700, fontSize:"1.6rem", color:COL.yellow }}>₹20,000</div>
                  <div style={{ ...mono, fontSize:"0.7rem", color:"#888" }}>TOP 3 TEAMS + CERTIFICATES</div>
                </div>
              </NeoCard>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ANNOUNCEMENTS ══ */}
      <section id="register" style={{ background:COL.main, borderBottom:"4px solid black", padding:"5rem 2.5rem", position:"relative", overflow:"hidden" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <DecoNum n="05" />
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:"1rem" }}>
            <HornIcon size={28} color="black" />
            <div style={{ ...mono, fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#555" }}>// ANNOUNCEMENTS</div>
          </div>
          <div style={{ ...mono, fontWeight:700, fontSize:"clamp(2rem,5vw,4rem)", lineHeight:1, textTransform:"uppercase", marginBottom:"3rem" }}>
            BULLETIN<br /><span style={{ background:COL.pink, padding:"0 8px" }}>BOARD</span>
          </div>
          <div style={{ border:"4px solid black", maxWidth:700, background:"black", boxShadow:"8px 8px 0 black" }}>
            <div style={{ background:COL.yellow, padding:"8px 16px", display:"flex", alignItems:"center", gap:8, borderBottom:"3px solid black" }}>
              {["#ff5f57","#febc2e","#28c840"].map(c => (
                <div key={c} style={{ width:12, height:12, background:c, borderRadius:"50%", border:"1px solid rgba(0,0,0,.2)" }} />
              ))}
              <span style={{ ...mono, fontWeight:700, fontSize:"0.7rem", color:"black", marginLeft:8, letterSpacing:"0.1em" }}>LIVE-FEED.sh — OFFGRID 1.0</span>
            </div>
            <div style={{ padding:"2rem" }}>
              <div style={{ ...mono, fontSize:"0.7rem", color:COL.yellow, letterSpacing:"0.1em", marginBottom:"1.2rem" }}>$ cat announcements.txt</div>
              <div style={{ ...mono, fontSize:"0.95rem", color:"#0f0", lineHeight:2 }}>
                <span style={{ color:COL.yellow }}>&gt; </span>Results declaration: 25 April 2026<br />
                <span style={{ color:COL.yellow }}>&gt; </span>Offline venue: DY Patil Intl. University, Akurdi, Pune<br />
                <span style={{ color:COL.yellow }}>&gt; </span>More announcements coming soon...
                <span style={{ animation:"blink 1s step-end infinite", color:COL.yellow }}>█</span>
              </div>
              <div style={{ marginTop:"1.5rem", display:"flex", flexDirection:"column", gap:8 }}>
                {[1,2].map(i => (
                  <div key={i} style={{ borderLeft:"3px solid #333", paddingLeft:"1rem", display:"flex", alignItems:"center", gap:8 }}>
                    <LockIcon size={14} color="#555" />
                    <span style={{ ...mono, fontSize:"0.78rem", color:"#444", letterSpacing:"0.05em" }}>
                      &gt; ??? _________________________ [LOCKED]
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <FAQ />

      {/* ══ FOOTER ══ */}
      <footer style={{ background:"black", borderTop:"4px solid black", padding:"4rem 2.5rem" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"flex-end", gap:"2rem", marginBottom:"2rem" }}>
            <div>
              <div style={{ ...mono, fontWeight:700, fontSize:"clamp(1.8rem,4vw,3.5rem)", color:COL.yellow, textTransform:"uppercase", lineHeight:1 }}>
                OFFGRID 1.0
              </div>
              <div style={{ ...mono, fontSize:"0.7rem", color:"#555", marginTop:"1rem", letterSpacing:"0.1em", lineHeight:1.8 }}>
                HACKATHON 2026 —  CODE DECODE CLUB<br />
                DY PATIL INTERNATIONAL UNIVERSITY · AKURDI, PUNE
              </div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6 }}>
              {["ABOUT","TRACKS","TIMELINE","FAQ","REGISTER"].map(n => (
                <a key={n} href={`#${n.toLowerCase()}`}
                  style={{ ...mono, fontSize:"0.7rem", color:"#555", textDecoration:"none", letterSpacing:"0.12em", textTransform:"uppercase", transition:"color .1s" }}
                  onMouseEnter={e => e.currentTarget.style.color = COL.yellow}
                  onMouseLeave={e => e.currentTarget.style.color = "#555"}>
                  {n}
                </a>
              ))}
            </div>
          </div>
          <div style={{ borderTop:`3px solid ${COL.yellow}`, paddingTop:"1.5rem", display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:"1rem" }}>
            <div style={{ ...mono, fontSize:"0.65rem", color:"#333", letterSpacing:"0.1em" }}>
              © 2026 CODE DECODE CLUB — DY PATIL INTERNATIONAL UNIVERSITY. ALL RIGHTS RESERVED.
            </div>
            <div style={{ display:"flex", gap:12 }}>
              {[COL.yellow, "#ff4d4d", COL.blue, COL.green, COL.pink].map(c => (
                <div key={c} style={{ width:10, height:10, background:c, border:"2px solid #333" }} />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}