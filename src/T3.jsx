import { useState, useEffect } from "react";

const FONT_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;700&family=Space+Grotesk:wght@400;700;900&display=swap');

  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  @keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(2px, -2px); }
    60% { transform: translate(-1px, 1px); }
    80% { transform: translate(1px, -1px); }
    100% { transform: translate(0); }
  }
  @keyframes stamp {
    0% { transform: rotate(-3deg) scale(0.8); opacity: 0; }
    60% { transform: rotate(-3deg) scale(1.1); opacity: 1; }
    100% { transform: rotate(-3deg) scale(1); opacity: 1; }
  }
  @keyframes scanline {
    0% { top: -10%; }
    100% { top: 110%; }
  }

  .stamp-anim { animation: stamp 0.4s ease forwards; }
  .glitch-text:hover { animation: glitch 0.2s infinite; }

  .card-hover {
    transition: transform 0.1s ease, box-shadow 0.1s ease;
  }
  .card-hover:hover {
    transform: translate(-3px, -3px);
    box-shadow: 7px 7px 0px 0px #000 !important;
  }

  .btn-hover {
    transition: transform 0.1s ease, box-shadow 0.1s ease;
  }
  .btn-hover:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0px 0px #000 !important;
  }
  .btn-hover:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px 0px #000 !important;
  }

  .scanline-effect {
    position: absolute;
    width: 100%;
    height: 3px;
    background: rgba(255,230,0,0.15);
    animation: scanline 4s linear infinite;
    pointer-events: none;
    z-index: 1;
  }
`;

// ── SVG ICONS ────────────────────────────────────────────────────────────────
const Icon = {
  Calendar: ({ size = 28, color = "#000" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="square">
      <rect x="3" y="4" width="18" height="18" rx="0" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Clock: ({ size = 28, color = "#000" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="square">
      <circle cx="12" cy="12" r="9" /><polyline points="12,7 12,12 16,14" />
    </svg>
  ),
  MapPin: ({ size = 28, color = "#000" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="square">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Target: ({ size = 28, color = "#000" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="square">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Cpu: ({ size = 36, color = "#FFE600" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="square">
      <rect x="4" y="4" width="16" height="16" /><rect x="8" y="8" width="8" height="8" />
      <line x1="9" y1="1" x2="9" y2="4" /><line x1="12" y1="1" x2="12" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" /><line x1="12" y1="20" x2="12" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
      <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="12" x2="4" y2="12" /><line x1="1" y1="15" x2="4" y2="15" />
      <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="12" x2="23" y2="12" /><line x1="20" y1="15" x2="23" y2="15" />
    </svg>
  ),
  Terminal: ({ size = 36, color = "#000" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="square">
      <polyline points="4,17 10,11 4,5" /><line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  Megaphone: ({ size = 32, color = "#FFE600" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="square">
      <path d="M3 11l19-9-9 19-2-8-8-2z" />
    </svg>
  ),
  ArrowRight: ({ size = 18, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="square">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
    </svg>
  ),
  Flag: ({ size = 22, color = "#000" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="square">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  ),
  Zap: ({ size = 22, color = "#000" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="square">
      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
    </svg>
  ),
  Trophy: ({ size = 22, color = "#000" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="square">
      <polyline points="8,21 12,21 16,21" /><line x1="12" y1="17" x2="12" y2="21" />
      <path d="M7 4h10v6a5 5 0 0 1-10 0V4z" /><path d="M7 9H4a3 3 0 0 1-3-3V4h6" /><path d="M17 9h3a3 3 0 0 0 3-3V4h-6" />
    </svg>
  ),
  Code: ({ size = 22, color = "#000" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="square">
      <polyline points="16,18 22,12 16,6" /><polyline points="8,6 2,12 8,18" />
    </svg>
  ),
  Lock: ({ size = 16, color = "#555" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="square">
      <rect x="3" y="11" width="18" height="11" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
};

// ── MARQUEE ──────────────────────────────────────────────────────────────────
function Marquee() {
  const text = "★ HARDWARE ★ SOFTWARE ★ OPEN VISION ★ 24 HOURS ★ BUILD. BREAK. INNOVATE. ★ CODE DECODE CLUB ★ DYPIU ★ APRIL 4-5 ★ ";
  return (
    <div className="overflow-hidden border-t-4 border-b-4 border-black bg-black py-3">
      <div style={{ display: "flex", animation: "marquee 18s linear infinite", width: "max-content" }}>
        {[text, text].map((t, i) => (
          <span key={i} style={{ fontFamily: "IBM Plex Mono", fontWeight: 700, color: "#FFE600", fontSize: "1rem", whiteSpace: "nowrap", paddingRight: "2rem", letterSpacing: "0.05em" }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function T3() {

  return (
    <div style={{ fontFamily: "Space Grotesk, sans-serif", background: "#fff", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{FONT_STYLE}</style>

      {/* ── NAV ── */}
      <nav style={{ background: "#FFE600", borderBottom: "4px solid #000", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 1000 }}>
        <div style={{ fontFamily: "Bebas Neue", fontSize: "1.6rem", letterSpacing: "0.1em", color: "#000" }}>
          CODE DECODE CLUB
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          {["ABOUT", "TRACKS", "TIMELINE", "REGISTER"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="btn-hover" style={{ fontFamily: "IBM Plex Mono", fontWeight: 700, fontSize: "0.8rem", color: "#000", textDecoration: "none", background: "#000", color: "#FFE600", padding: "6px 14px", border: "3px solid #000", boxShadow: "3px 3px 0 #000", display: "inline-block" }}>
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="about" style={{ background: "#FFE600", borderBottom: "4px solid #000", padding: "5rem 2rem 0", position: "relative", overflow: "hidden" }}>
        <div className="scanline-effect" />

        {/* DYPIU tag */}
        <div style={{ fontFamily: "IBM Plex Mono", fontSize: "0.9rem", fontWeight: 700, color: "#000", border: "3px solid #000", display: "inline-block", padding: "4px 14px", marginBottom: "1.5rem", background: "#fff", position: "relative", zIndex: 1 }}>
          DY PATIL INTERNATIONAL UNIVERSITY
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem" }}>
          <div>
            {["CODE", "DECODE", "HACKATHON"].map((word, i) => (
              <div key={word} className="glitch-text" style={{ fontFamily: "Bebas Neue", fontSize: "clamp(5rem, 14vw, 11rem)", lineHeight: 0.9, color: i === 1 ? "#FF3F3F" : "#000", display: "block", letterSpacing: "-0.01em" }}>
                {word}
              </div>
            ))}

            <div style={{ marginTop: "1.5rem", fontFamily: "IBM Plex Mono", fontSize: "1.1rem", fontWeight: 700, color: "#000", letterSpacing: "0.1em" }}>
              HARDWARE × SOFTWARE × OPEN VISION
            </div>

            <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <button className="btn-hover" style={{ fontFamily: "Bebas Neue", fontSize: "1.4rem", letterSpacing: "0.1em", background: "#000", color: "#FFE600", border: "4px solid #000", padding: "10px 28px", boxShadow: "5px 5px 0 #FF3F3F", display: "flex", alignItems: "center", gap: "10px" }}>
                [ REGISTER NOW ]
                <Icon.ArrowRight size={20} color="#FFE600" />
              </button>
              <button className="btn-hover" style={{ fontFamily: "Bebas Neue", fontSize: "1.4rem", letterSpacing: "0.1em", background: "#FF3F3F", color: "#fff", border: "4px solid #000", padding: "10px 28px", boxShadow: "5px 5px 0 #000", display: "flex", alignItems: "center", gap: "10px" }}>
                [ SUBMIT PPT ]
                <Icon.ArrowRight size={20} color="#fff" />
              </button>
            </div>
          </div>

          {/* STAMP */}
          <div className="stamp-anim" style={{ background: "#FF3F3F", border: "5px solid #000", padding: "1.5rem", transform: "rotate(-3deg)", boxShadow: "6px 6px 0 #000", textAlign: "center", flexShrink: 0, marginTop: "2rem" }}>
            <div style={{ fontFamily: "Bebas Neue", fontSize: "5rem", color: "#fff", lineHeight: 1 }}>24</div>
            <div style={{ fontFamily: "Bebas Neue", fontSize: "2rem", color: "#FFE600", lineHeight: 1 }}>HRS</div>
            <div style={{ fontFamily: "IBM Plex Mono", fontSize: "0.7rem", color: "#fff", marginTop: "0.5rem", fontWeight: 700 }}>NON-STOP</div>
          </div>
        </div>

        <div style={{ marginTop: "3rem" }}>
          <Marquee />
        </div>
      </section>

      {/* ── INFO CARDS ── */}
      <section style={{ padding: "4rem 2rem", background: "#fff", borderBottom: "4px solid #000" }}>
        <div style={{ fontFamily: "Bebas Neue", fontSize: "3rem", letterSpacing: "0.05em", marginBottom: "2rem", color: "#000" }}>
          EVENT DETAILS
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {[
            { Icon: Icon.Calendar, label: "DATE", value: "APRIL 4–5, 2025", bg: "#FFE600" },
            { Icon: Icon.Clock, label: "DURATION", value: "24 HOURS\nNON-STOP", bg: "#fff" },
            { Icon: Icon.MapPin, label: "VENUE", value: "DYPIU\nDY PATIL INTERNATIONAL UNIVERSITY", bg: "#FF3F3F" },
            { Icon: Icon.Target, label: "MODE", value: "OPEN VISION\nHARDWARE + SOFTWARE", bg: "#00BFFF" },
          ].map((card) => (
            <div key={card.label} className="card-hover" style={{ background: card.bg, border: "4px solid #000", padding: "1.5rem", boxShadow: "5px 5px 0 #000" }}>
              <div style={{ marginBottom: "0.75rem" }}>
                <card.Icon size={28} color="#000" />
              </div>
              <div style={{ fontFamily: "IBM Plex Mono", fontSize: "0.75rem", fontWeight: 700, color: "#000", marginBottom: "0.5rem", letterSpacing: "0.1em" }}>{card.label}</div>
              <div style={{ fontFamily: "Bebas Neue", fontSize: "1.5rem", color: "#000", lineHeight: 1.2, whiteSpace: "pre-line" }}>{card.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRACKS ── */}
      <section id="tracks" style={{ padding: "4rem 2rem", background: "#000", borderBottom: "4px solid #000" }}>
        <div style={{ fontFamily: "Bebas Neue", fontSize: "3rem", letterSpacing: "0.05em", color: "#FFE600", marginBottom: "0.5rem" }}>
          WHAT ARE YOU BUILDING?
        </div>
        <div style={{ fontFamily: "IBM Plex Mono", fontSize: "0.85rem", color: "#888", marginBottom: "2.5rem" }}>// choose your battlefield</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {[
            {
              IconComp: Icon.Cpu,
              track: "HARDWARE",
              desc: "Build circuits, embedded systems, IoT devices, robotics, and physical computing solutions. If it has wires, it's yours.",
              bg: "#000",
              fg: "#FFE600",
              border: "#FFE600",
              shadow: "#FFE600",
              iconColor: "#FFE600",
            },
            {
              IconComp: Icon.Terminal,
              track: "SOFTWARE",
              desc: "Apps, platforms, AI/ML models, web tools — if it runs on a machine (without circuits), this is your arena.",
              bg: "#FFE600",
              fg: "#000",
              border: "#000",
              shadow: "#FF3F3F",
              iconColor: "#000",
            },
          ].map((t) => (
            <div key={t.track} className="card-hover" style={{ background: t.bg, border: `4px solid ${t.border}`, padding: "2rem", boxShadow: `6px 6px 0 ${t.shadow}` }}>
              <div style={{ marginBottom: "1rem" }}>
                <t.IconComp size={42} color={t.iconColor} />
              </div>
              <div style={{ fontFamily: "Bebas Neue", fontSize: "3rem", color: t.fg, letterSpacing: "0.05em", lineHeight: 1 }}>{t.track}</div>
              <div style={{ fontFamily: "IBM Plex Mono", fontSize: "0.85rem", color: t.fg === "#000" ? "#333" : "#aaa", marginTop: "1rem", lineHeight: 1.6 }}>{t.desc}</div>
              <div style={{ marginTop: "1.5rem", border: `2px solid ${t.border}`, padding: "8px 16px", display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "Bebas Neue", fontSize: "1.1rem", color: t.fg, letterSpacing: "0.1em" }}>
                OPEN VISION
                <Icon.ArrowRight size={16} color={t.fg} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section id="timeline" style={{ padding: "4rem 2rem", background: "#fff", borderBottom: "4px solid #000" }}>
        <div style={{ fontFamily: "Bebas Neue", fontSize: "3rem", letterSpacing: "0.05em", color: "#000", marginBottom: "3rem" }}>
          THE ROADMAP
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {[
            { date: "MAR 15–18", event: "PPT SUBMISSION WINDOW", desc: "Submit your presentation deck. Teams will be evaluated before the main event.", color: "#FFE600", dot: "#000", Icon: Icon.Flag },
            { date: "APR 4", event: "HACKATHON BEGINS", desc: "Day 1 kicks off. The clock starts. Build, prototype, iterate.", color: "#00BFFF", dot: "#000", Icon: Icon.Zap },
            { date: "APR 5", event: "FINAL SUBMISSIONS + RESULTS", desc: "Day 2 wrap-up. Present your project. Winners announced.", color: "#FF3F3F", dot: "#000", Icon: Icon.Trophy },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "1.5rem", alignItems: "stretch" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div style={{ width: 24, height: 24, background: item.color, border: "4px solid #000", flexShrink: 0, marginTop: 4 }} />
                {i < 2 && <div className="timeline-line" style={{ width: 4, background: "#000", flex: 1, minHeight: 40 }} />}
              </div>
              <div className="card-hover" style={{ background: item.color, border: "4px solid #000", padding: "1.2rem 1.5rem", boxShadow: "5px 5px 0 #000", marginBottom: "1.5rem", flex: 1, display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                <div style={{ flexShrink: 0, marginTop: "2px" }}>
                  <item.Icon size={22} color="#000" />
                </div>
                <div>
                  <div style={{ fontFamily: "IBM Plex Mono", fontSize: "0.8rem", fontWeight: 700, color: "#000", marginBottom: "0.3rem" }}>{item.date}</div>
                  <div style={{ fontFamily: "Bebas Neue", fontSize: "1.8rem", color: "#000", letterSpacing: "0.05em" }}>{item.event}</div>
                  <div style={{ fontFamily: "IBM Plex Mono", fontSize: "0.8rem", color: "#333", marginTop: "0.4rem" }}>{item.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ORGANIZER ── */}
      <section style={{ padding: "4rem 2rem", background: "#FFE600", borderBottom: "4px solid #000", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: "2rem", top: "2rem", transform: "rotate(12deg)", border: "5px solid #000", padding: "1rem", background: "#FF3F3F", boxShadow: "4px 4px 0 #000" }}>
          <div style={{ fontFamily: "IBM Plex Mono", fontSize: "0.6rem", fontWeight: 700, color: "#fff", textAlign: "center", letterSpacing: "0.15em" }}>
            OFFICIAL<br />★ DYPIU ★<br />ORGANIZER
          </div>
        </div>
        <div style={{ fontFamily: "IBM Plex Mono", fontSize: "0.9rem", fontWeight: 700, color: "#000", letterSpacing: "0.2em", marginBottom: "1rem" }}>
          ORGANIZED BY
        </div>
        <div className="glitch-text" style={{ fontFamily: "Bebas Neue", fontSize: "clamp(3rem, 8vw, 6rem)", color: "#000", letterSpacing: "0.05em", lineHeight: 1 }}>
          CODE DECODE CLUB
        </div>
        <div style={{ height: "6px", background: "#000", margin: "1rem auto", maxWidth: "500px" }} />
        <div style={{ fontFamily: "IBM Plex Mono", fontSize: "0.9rem", color: "#000", fontWeight: 700 }}>
          Under the aegis of DYPIU — DY Patil International University
        </div>
      </section>

      {/* ── ANNOUNCEMENTS ── */}
      <section style={{ padding: "4rem 2rem", background: "#111", borderBottom: "4px solid #000" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
          <Icon.Megaphone size={32} color="#FFE600" />
          <div style={{ fontFamily: "Bebas Neue", fontSize: "3rem", color: "#FFE600", letterSpacing: "0.05em" }}>
            ANNOUNCEMENTS
          </div>
        </div>
        <div style={{ border: "4px solid #FFE600", padding: "2rem", maxWidth: "700px", boxShadow: "6px 6px 0 #FFE600", background: "#000" }}>
          <div style={{ fontFamily: "IBM Plex Mono", fontSize: "0.75rem", color: "#FFE600", marginBottom: "1rem", letterSpacing: "0.1em" }}>
            // BULLETIN BOARD — LIVE FEED
          </div>
          <div style={{ fontFamily: "IBM Plex Mono", fontSize: "0.95rem", color: "#0f0", lineHeight: 2 }}>
            <span style={{ color: "#FFE600" }}>&gt;</span> More announcements coming soon...
            <span style={{ animation: "blink 1s step-end infinite", color: "#FFE600" }}>█</span>
          </div>
          <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {["???", "???"].map((item, i) => (
              <div key={i} style={{ border: "2px dashed #333", padding: "0.6rem 1rem", fontFamily: "IBM Plex Mono", fontSize: "0.8rem", color: "#555", display: "flex", alignItems: "center", gap: "8px" }}>
                <Icon.Lock size={14} color="#555" />
                &gt; {item} _____________________ [LOCKED]
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#000", padding: "2.5rem 2rem", borderTop: "4px solid #FFE600" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Icon.Code size={22} color="#FFE600" />
            <div style={{ fontFamily: "Bebas Neue", fontSize: "1.8rem", color: "#FFE600", letterSpacing: "0.1em" }}>
              CODE DECODE CLUB × DYPIU
            </div>
          </div>
          <div style={{ fontFamily: "IBM Plex Mono", fontSize: "0.75rem", color: "#555", letterSpacing: "0.05em" }}>
            HACKATHON — APRIL 4-5, 2025<br />
            24 HOURS | HARDWARE & SOFTWARE | OPEN VISION
          </div>
        </div>
        <div style={{ marginTop: "1.5rem", height: "4px", background: "#FFE600" }} />
        <div style={{ marginTop: "1rem", fontFamily: "IBM Plex Mono", fontSize: "0.7rem", color: "#444", textAlign: "center" }}>
          © 2025 CODE DECODE CLUB — DY PATIL INTERNATIONAL UNIVERSITY. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}