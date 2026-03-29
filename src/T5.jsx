import { useState } from "react";

/* ─────────────────────────────────────────────
   DESIGN DIRECTION:
   Editorial newspaper grid × Neo Brutalism
   - Dark base (#0a0a0a) with acid yellow + red
   - Barlow Condensed (heavy display) + Courier Prime (mono editorial)
   - Asymmetric multi-column newspaper layout
   - Oversized section numbers as decorative glyphs
   - Hard ruled borders as structural dividers
   - No rounded corners, no gradients, no softness
───────────────────────────────────────────── */

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,700;0,900;1,900&family=Courier+Prime:wght@400;700&family=Anton&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0a0a0a;
    --paper: #f5f0e8;
    --acid: #d4f700;
    --red: #ff2d2d;
    --blue: #0057ff;
    --rule: 3px solid #0a0a0a;
    --rule-thick: 6px solid #0a0a0a;
  }

  body { background: var(--ink); }

  @keyframes marquee-left {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    49%       { opacity: 1; }
    50%       { opacity: 0; }
    99%       { opacity: 0; }
  }
  @keyframes stamp-drop {
    0%   { transform: rotate(4deg) scale(1.4); opacity: 0; }
    70%  { transform: rotate(4deg) scale(0.95); opacity: 1; }
    100% { transform: rotate(4deg) scale(1); opacity: 1; }
  }
  @keyframes scanline {
    0%   { top: -5%; }
    100% { top: 105%; }
  }
  @keyframes glitch {
    0%   { transform: skewX(0deg); }
    10%  { transform: skewX(-4deg); }
    20%  { transform: skewX(4deg); }
    30%  { transform: skewX(-2deg); }
    40%  { transform: skewX(0deg); }
    100% { transform: skewX(0deg); }
  }

  .marquee-wrap {
    overflow: hidden;
    white-space: nowrap;
    border-top: var(--rule-thick);
    border-bottom: var(--rule-thick);
    background: var(--acid);
    padding: 10px 0;
  }
  .marquee-track {
    display: inline-block;
    animation: marquee-left 22s linear infinite;
  }
  .marquee-txt {
    font-family: 'Courier Prime', monospace;
    font-weight: 700;
    font-size: 0.9rem;
    letter-spacing: 0.12em;
    color: var(--ink);
    text-transform: uppercase;
    padding-right: 4rem;
  }

  .stamp {
    animation: stamp-drop 0.5s cubic-bezier(.36,.07,.19,.97) forwards;
  }

  .scanline {
    position: absolute;
    left: 0; width: 100%; height: 2px;
    background: rgba(212,247,0,0.2);
    pointer-events: none;
    animation: scanline 5s linear infinite;
    z-index: 2;
  }

  .glitch:hover {
    animation: glitch 0.3s steps(1) infinite;
  }

  /* hover states */
  .pill-link {
    display: inline-block;
    font-family: 'Courier Prime', monospace;
    font-weight: 700;
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
    padding: 6px 16px;
    border: var(--rule);
    background: var(--ink);
    color: var(--acid);
    transition: background 0.08s, color 0.08s, transform 0.08s, box-shadow 0.08s;
    box-shadow: 3px 3px 0 var(--acid);
  }
  .pill-link:hover {
    background: var(--acid);
    color: var(--ink);
    transform: translate(-2px,-2px);
    box-shadow: 5px 5px 0 var(--acid);
  }

  .cta-btn {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 1.5rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border: var(--rule-thick);
    padding: 12px 32px;
    cursor: pointer;
    transition: transform 0.08s, box-shadow 0.08s;
  }
  .cta-btn:hover { transform: translate(-3px,-3px); }
  .cta-btn:active { transform: translate(2px,2px); }
  .cta-primary {
    background: var(--acid);
    color: var(--ink);
    box-shadow: 6px 6px 0 var(--acid);
  }
  .cta-primary:hover { box-shadow: 9px 9px 0 var(--acid); }
  .cta-secondary {
    background: var(--red);
    color: #fff;
    box-shadow: 6px 6px 0 var(--red);
  }
  .cta-secondary:hover { box-shadow: 9px 9px 0 var(--red); }

  .info-card {
    border: var(--rule-thick);
    background: var(--paper);
    transition: transform 0.1s, box-shadow 0.1s;
    box-shadow: 5px 5px 0 var(--acid);
  }
  .info-card:hover {
    transform: translate(-3px,-3px);
    box-shadow: 8px 8px 0 var(--acid);
  }

  .track-hw {
    border: 6px solid var(--acid);
    background: var(--ink);
    transition: transform 0.1s, box-shadow 0.1s;
    box-shadow: 6px 6px 0 var(--acid);
  }
  .track-hw:hover { transform: translate(-4px,-4px); box-shadow: 10px 10px 0 var(--acid); }

  .track-sw {
    border: 6px solid var(--red);
    background: var(--paper);
    transition: transform 0.1s, box-shadow 0.1s;
    box-shadow: 6px 6px 0 var(--red);
  }
  .track-sw:hover { transform: translate(-4px,-4px); box-shadow: 10px 10px 0 var(--red); }

  .tl-item {
    border-left: 6px solid var(--acid);
    padding-left: 1.5rem;
    transition: border-color 0.1s;
  }
  .tl-item:hover { border-color: var(--red); }

  .section-label {
    font-family: 'Courier Prime', monospace;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--acid);
  }

  .deco-num {
    font-family: 'Anton', sans-serif;
    font-size: clamp(6rem, 15vw, 10rem);
    line-height: 1;
    opacity: 0.07;
    color: var(--acid);
    pointer-events: none;
    user-select: none;
    position: absolute;
    top: -1rem;
    right: 1rem;
  }

  .rule-h { border: none; border-top: var(--rule-thick); }
  .rule-h-acid { border: none; border-top: 4px solid var(--acid); }

  .blink-cursor { animation: blink 1s step-end infinite; }

  /* Responsive grid helpers */
  @media (max-width: 768px) {
    .hero-grid { flex-direction: column !important; }
    .two-col { flex-direction: column !important; }
    .tracks-grid { flex-direction: column !important; }
  }
`;

/* ── SVG ICONS (square-stroked, brutalist) ───────────────────────────────── */
const Icons = {
  Cal: ({ c = "#0a0a0a", s = 24 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
      <rect x="2" y="4" width="20" height="18"/><line x1="2" y1="10" x2="22" y2="10"/>
      <line x1="7" y1="2" x2="7" y2="6"/><line x1="17" y1="2" x2="17" y2="6"/>
    </svg>
  ),
  Clock: ({ c = "#0a0a0a", s = 24 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="square">
      <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
    </svg>
  ),
  Pin: ({ c = "#0a0a0a", s = 24 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="square">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
      <circle cx="12" cy="9" r="2.5"/>
    </svg>
  ),
  Target: ({ c = "#0a0a0a", s = 24 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="square">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1" fill={c}/>
    </svg>
  ),
  Cpu: ({ c = "#d4f700", s = 40 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="square">
      <rect x="4" y="4" width="16" height="16"/><rect x="8" y="8" width="8" height="8"/>
      <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
      <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
      <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="15" x2="4" y2="15"/>
      <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="15" x2="23" y2="15"/>
    </svg>
  ),
  Term: ({ c = "#0a0a0a", s = 40 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="square">
      <rect x="2" y="3" width="20" height="18"/><polyline points="8,9 12,13 8,17"/><line x1="13" y1="17" x2="21" y2="17"/>
    </svg>
  ),
  Arrow: ({ c = "#0a0a0a", s = 18 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="3" strokeLinecap="square">
      <line x1="4" y1="12" x2="20" y2="12"/><polyline points="13,5 20,12 13,19"/>
    </svg>
  ),
  Flag: ({ c = "#d4f700", s = 20 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="square">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
      <line x1="4" y1="22" x2="4" y2="15"/>
    </svg>
  ),
  Zap: ({ c = "#d4f700", s = 20 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="square">
      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>
    </svg>
  ),
  Trophy: ({ c = "#d4f700", s = 20 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="square">
      <path d="M7 4h10v6a5 5 0 0 1-10 0V4z"/>
      <path d="M7 9H4a3 3 0 0 1-3-3V4h6"/><path d="M17 9h3a3 3 0 0 0 3-3V4h-6"/>
      <line x1="12" y1="14" x2="12" y2="18"/><line x1="8" y1="21" x2="16" y2="21"/>
    </svg>
  ),
  Lock: ({ c = "#444", s = 14 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="square">
      <rect x="3" y="11" width="18" height="11"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Horn: ({ c = "#d4f700", s = 28 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="square">
      <path d="M3 11l19-9-9 19-2-8-8-2z"/>
    </svg>
  ),
};

/* ── MARQUEE ────────────────────────────────────────────────────────────────── */
function Marquee() {
  const t = "/ HARDWARE / SOFTWARE / OPEN VISION / 24 HOURS / BUILD.BREAK.INNOVATE / CODE DECODE CLUB / DYPIU / APRIL 4-5 / ";
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {[t, t, t].map((s, i) => <span key={i} className="marquee-txt">{s}</span>)}
      </div>
    </div>
  );
}

/* ── MAIN ───────────────────────────────────────────────────────────────────── */
export default function T5() {
  const [activeTrack, setActiveTrack] = useState(null);

  const F = { display: "font-family:'Barlow Condensed',sans-serif" };

  const mono = { fontFamily: "'Courier Prime', monospace" };
  const display = { fontFamily: "'Barlow Condensed', sans-serif" };
  const anton = { fontFamily: "'Anton', sans-serif" };

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#f5f0e8" }}>
      <style>{CSS}</style>

      {/* ══ TOP BAR ══════════════════════════════════════════════════════════ */}
      <div style={{ background: "#0a0a0a", borderBottom: "6px solid #d4f700", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        {/* left — logo */}
        <div style={{ ...display, fontWeight: 900, fontSize: "1.5rem", letterSpacing: "0.12em", color: "#d4f700", padding: "14px 0", textTransform: "uppercase" }}>
          CODE DECODE CLUB
        </div>

        {/* center — live rule tag */}
        <div style={{ ...mono, fontSize: "0.65rem", color: "#555", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          DYPIU &mdash; APR 4-5, 2025
        </div>

        {/* right — nav */}
        <nav style={{ display: "flex", gap: "6px" }}>
          {["ABOUT", "TRACKS", "TIMELINE", "REGISTER"].map(n => (
            <a key={n} href={`#${n.toLowerCase()}`} className="pill-link">{n}</a>
          ))}
        </nav>
      </div>

      {/* ══ HERO ═════════════════════════════════════════════════════════════ */}
      <section id="about" style={{ background: "#0a0a0a", borderBottom: "6px solid #d4f700", position: "relative", overflow: "hidden" }}>
        <div className="scanline" />

        {/* ── HERO GRID: left headline | right meta ── */}
        <div className="hero-grid" style={{ display: "flex", minHeight: "88vh" }}>

          {/* LEFT — massive headline */}
          <div style={{ flex: "1 1 60%", padding: "4rem 3rem", borderRight: "6px solid #d4f700", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              {/* edition tag */}
              <div style={{ ...mono, fontSize: "0.7rem", color: "#d4f700", letterSpacing: "0.2em", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ display: "inline-block", width: 8, height: 8, background: "#ff2d2d" }} />
                HACKATHON EDITION — 2025
              </div>

              {/* giant title — stacked italic */}
              <div className="glitch" style={{ ...display, fontWeight: 900, fontStyle: "italic", fontSize: "clamp(5.5rem, 14vw, 12rem)", lineHeight: 0.85, letterSpacing: "-0.02em", color: "#f5f0e8", textTransform: "uppercase" }}>
                CODE<br />
                <span style={{ color: "#d4f700", WebkitTextStroke: "2px #d4f700" }}>DE</span>
                <span style={{ color: "#ff2d2d" }}>CODE</span>
              </div>

              <div style={{ ...display, fontWeight: 900, fontStyle: "italic", fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 1, letterSpacing: "0.02em", color: "#f5f0e8", textTransform: "uppercase", marginTop: "0.5rem" }}>
                HACKATHON
              </div>
            </div>

            {/* bottom strip */}
            <div>
              <hr className="rule-h-acid" style={{ margin: "2rem 0 1.5rem" }} />
              <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                <button className="cta-btn cta-primary">REGISTER NOW <span style={{ marginLeft: 8 }}>→</span></button>
                <button className="cta-btn cta-secondary">SUBMIT PPT <span style={{ marginLeft: 8 }}>→</span></button>
              </div>
              <div style={{ ...mono, fontSize: "0.72rem", color: "#666", marginTop: "1.2rem", letterSpacing: "0.1em" }}>
                HARDWARE × SOFTWARE × OPEN VISION &nbsp;|&nbsp; DY PATIL INTERNATIONAL UNIVERSITY
              </div>
            </div>
          </div>

          {/* RIGHT — editorial meta column */}
          <div style={{ flex: "0 1 38%", padding: "4rem 2.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative" }}>

            {/* STAMP */}
            <div className="stamp" style={{ position: "absolute", top: "2.5rem", right: "2rem", background: "#ff2d2d", border: "5px solid #f5f0e8", padding: "1.2rem 1.5rem", textAlign: "center", transform: "rotate(4deg)", boxShadow: "5px 5px 0 #d4f700", zIndex: 5 }}>
              <div style={{ ...anton, fontSize: "4rem", color: "#fff", lineHeight: 1 }}>24</div>
              <div style={{ ...display, fontWeight: 900, fontSize: "1.4rem", color: "#d4f700", letterSpacing: "0.1em" }}>HRS</div>
              <div style={{ ...mono, fontSize: "0.6rem", color: "#fff", marginTop: "4px", letterSpacing: "0.15em" }}>NON-STOP</div>
            </div>

            {/* stat blocks */}
            <div style={{ marginTop: "14rem" }}>
              {[
                { label: "DATE", val: "APR 4–5, 2025" },
                { label: "VENUE", val: "DYPIU CAMPUS" },
                { label: "TRACKS", val: "HW + SW" },
                { label: "VISION", val: "OPEN" },
              ].map((s, i) => (
                <div key={i} style={{ borderTop: i === 0 ? "3px solid #d4f700" : "1px solid #333", padding: "1rem 0", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ ...mono, fontSize: "0.65rem", color: "#666", letterSpacing: "0.15em" }}>{s.label}</span>
                  <span style={{ ...display, fontWeight: 900, fontSize: "1.3rem", color: "#f5f0e8", letterSpacing: "0.05em" }}>{s.val}</span>
                </div>
              ))}
            </div>

            <div style={{ ...mono, fontSize: "0.65rem", color: "#444", lineHeight: 1.8, borderTop: "1px solid #333", paddingTop: "1rem" }}>
              ORGANIZED BY CODE DECODE CLUB<br />
              UNDER THE AEGIS OF DYPIU<br />
              DY PATIL INTERNATIONAL UNIVERSITY
            </div>
          </div>
        </div>

        <Marquee />
      </section>

      {/* ══ EVENT DETAILS ════════════════════════════════════════════════════ */}
      <section style={{ background: "#f5f0e8", borderBottom: "6px solid #0a0a0a", padding: "5rem 2.5rem", position: "relative", overflow: "hidden" }}>
        <span className="deco-num">01</span>

        <div className="section-label" style={{ color: "#0a0a0a", marginBottom: "1rem" }}>// EVENT DETAILS</div>
        <div style={{ ...display, fontWeight: 900, fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#0a0a0a", lineHeight: 1, textTransform: "uppercase", marginBottom: "3rem", letterSpacing: "-0.01em" }}>
          WHAT, WHEN,<br />& WHERE
        </div>

        {/* 4-col newspaper grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, border: "4px solid #0a0a0a" }}>
          {[
            { Icon: Icons.Cal, label: "DATE", val: "APRIL 4–5\n2025", bg: "#d4f700", fg: "#0a0a0a" },
            { Icon: Icons.Clock, label: "DURATION", val: "24 HOURS\nNON-STOP", bg: "#f5f0e8", fg: "#0a0a0a" },
            { Icon: Icons.Pin, label: "VENUE", val: "DYPIU\nDY PATIL INTL. UNIV.", bg: "#ff2d2d", fg: "#fff" },
            { Icon: Icons.Target, label: "MODE", val: "OPEN VISION\nHW + SW", bg: "#0a0a0a", fg: "#d4f700" },
          ].map((c, i) => (
            <div key={i} style={{ background: c.bg, borderRight: i < 3 ? "4px solid #0a0a0a" : "none", padding: "2rem 1.5rem" }}>
              <c.Icon c={c.fg} s={28} />
              <div style={{ ...mono, fontSize: "0.65rem", fontWeight: 700, color: c.fg === "#fff" ? "rgba(255,255,255,0.6)" : "#888", letterSpacing: "0.15em", marginTop: "1.2rem", marginBottom: "0.5rem" }}>{c.label}</div>
              <div style={{ ...display, fontWeight: 900, fontSize: "1.6rem", color: c.fg, lineHeight: 1.15, textTransform: "uppercase", whiteSpace: "pre-line" }}>{c.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ TRACKS ═══════════════════════════════════════════════════════════ */}
      <section id="tracks" style={{ background: "#0a0a0a", borderBottom: "6px solid #d4f700", padding: "5rem 2.5rem", position: "relative", overflow: "hidden" }}>
        <span className="deco-num">02</span>

        <div className="section-label" style={{ marginBottom: "1rem" }}>// CHOOSE YOUR BATTLEFIELD</div>
        <div style={{ ...display, fontWeight: 900, fontSize: "clamp(2.5rem,6vw,5rem)", color: "#f5f0e8", lineHeight: 1, textTransform: "uppercase", marginBottom: "3rem", letterSpacing: "-0.01em" }}>
          WHAT ARE YOU<br /><span style={{ color: "#d4f700" }}>BUILDING?</span>
        </div>

        <div className="tracks-grid" style={{ display: "flex", gap: "1.5rem" }}>
          {/* HW */}
          <div className="track-hw" style={{ flex: 1, padding: "2.5rem" }}>
            <div style={{ marginBottom: "1.5rem" }}><Icons.Cpu /></div>
            <div style={{ ...display, fontWeight: 900, fontSize: "3.5rem", color: "#d4f700", lineHeight: 1, textTransform: "uppercase", letterSpacing: "0.02em" }}>HARDWARE</div>
            <hr style={{ border: "none", borderTop: "2px solid #d4f700", margin: "1.2rem 0" }} />
            <div style={{ ...mono, fontSize: "0.85rem", color: "#aaa", lineHeight: 1.8 }}>
              Build circuits, embedded systems, IoT devices, robotics, and physical computing solutions. If it has wires, it's yours.
            </div>
            <div style={{ marginTop: "2rem", display: "inline-flex", alignItems: "center", gap: "10px", border: "2px solid #d4f700", padding: "8px 18px", ...display, fontWeight: 900, fontSize: "1rem", color: "#d4f700", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              OPEN VISION <Icons.Arrow c="#d4f700" s={16} />
            </div>
          </div>

          {/* SW */}
          <div className="track-sw" style={{ flex: 1, padding: "2.5rem" }}>
            <div style={{ marginBottom: "1.5rem" }}><Icons.Term c="#0a0a0a" /></div>
            <div style={{ ...display, fontWeight: 900, fontSize: "3.5rem", color: "#0a0a0a", lineHeight: 1, textTransform: "uppercase", letterSpacing: "0.02em" }}>SOFTWARE</div>
            <hr style={{ border: "none", borderTop: "2px solid #0a0a0a", margin: "1.2rem 0" }} />
            <div style={{ ...mono, fontSize: "0.85rem", color: "#444", lineHeight: 1.8 }}>
              Apps, platforms, AI/ML models, web tools — if it runs on a machine without circuits, this is your arena.
            </div>
            <div style={{ marginTop: "2rem", display: "inline-flex", alignItems: "center", gap: "10px", border: "2px solid #0a0a0a", padding: "8px 18px", ...display, fontWeight: 900, fontSize: "1rem", color: "#0a0a0a", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              OPEN VISION <Icons.Arrow c="#0a0a0a" s={16} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ TIMELINE ═════════════════════════════════════════════════════════ */}
      <section id="timeline" style={{ background: "#f5f0e8", borderBottom: "6px solid #0a0a0a", padding: "5rem 2.5rem", position: "relative", overflow: "hidden" }}>
        <span className="deco-num" style={{ color: "#0a0a0a" }}>03</span>

        <div className="section-label" style={{ color: "#0a0a0a", marginBottom: "1rem" }}>// THE ROADMAP</div>
        <div style={{ ...display, fontWeight: 900, fontSize: "clamp(2.5rem,6vw,5rem)", color: "#0a0a0a", lineHeight: 1, textTransform: "uppercase", marginBottom: "3.5rem", letterSpacing: "-0.01em" }}>
          KEY DATES &<br />MILESTONES
        </div>

        <div className="two-col" style={{ display: "flex", gap: "4rem" }}>
          {/* timeline items */}
          <div style={{ flex: "1 1 55%", display: "flex", flexDirection: "column", gap: "2rem" }}>
            {[
              { num: "01", date: "MAR 15–18", event: "PPT SUBMISSION", desc: "Submit your presentation deck. Teams evaluated before the main event.", Icon: Icons.Flag, accent: "#0a0a0a" },
              { num: "02", date: "APR 4",     event: "HACKATHON BEGINS", desc: "Day 1 kicks off. The clock starts. Build, prototype, iterate.", Icon: Icons.Zap, accent: "#0057ff" },
              { num: "03", date: "APR 5",     event: "RESULTS + FINAL", desc: "Day 2 wrap-up. Present your project. Winners announced.", Icon: Icons.Trophy, accent: "#ff2d2d" },
            ].map((item, i) => (
              <div key={i} className="tl-item" style={{ borderColor: item.accent }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.5rem" }}>
                  <item.Icon c={item.accent} s={20} />
                  <span style={{ ...mono, fontSize: "0.7rem", fontWeight: 700, color: item.accent, letterSpacing: "0.15em" }}>{item.date}</span>
                </div>
                <div style={{ ...display, fontWeight: 900, fontSize: "2rem", color: "#0a0a0a", textTransform: "uppercase", lineHeight: 1, letterSpacing: "0.02em" }}>{item.event}</div>
                <div style={{ ...mono, fontSize: "0.82rem", color: "#555", marginTop: "0.5rem", lineHeight: 1.7 }}>{item.desc}</div>
              </div>
            ))}
          </div>

          {/* right — organizer block */}
          <div style={{ flex: "0 1 40%" }}>
            <div style={{ background: "#0a0a0a", border: "5px solid #0a0a0a", padding: "2.5rem", boxShadow: "8px 8px 0 #d4f700" }}>
              <div style={{ ...mono, fontSize: "0.65rem", color: "#d4f700", letterSpacing: "0.2em", marginBottom: "1.5rem" }}>// ORGANIZED BY</div>
              <div className="glitch" style={{ ...display, fontWeight: 900, fontStyle: "italic", fontSize: "2.8rem", color: "#f5f0e8", lineHeight: 1, textTransform: "uppercase", letterSpacing: "0.02em" }}>
                CODE<br />DECODE<br />CLUB
              </div>
              <hr style={{ border: "none", borderTop: "2px solid #d4f700", margin: "1.5rem 0" }} />
              <div style={{ ...mono, fontSize: "0.75rem", color: "#888", lineHeight: 1.8 }}>
                Under the aegis of DYPIU<br />DY Patil International University
              </div>
              <div style={{ marginTop: "1.5rem", display: "flex", gap: "6px" }}>
                <div style={{ width: 12, height: 12, background: "#d4f700" }} />
                <div style={{ width: 12, height: 12, background: "#ff2d2d" }} />
                <div style={{ width: 12, height: 12, background: "#0057ff" }} />
                <div style={{ width: 12, height: 12, background: "#f5f0e8" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ANNOUNCEMENTS ════════════════════════════════════════════════════ */}
      <section id="register" style={{ background: "#0a0a0a", borderBottom: "6px solid #d4f700", padding: "5rem 2.5rem", position: "relative", overflow: "hidden" }}>
        <span className="deco-num">04</span>

        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "1rem" }}>
          <Icons.Horn />
          <div className="section-label">// ANNOUNCEMENTS</div>
        </div>

        <div style={{ ...display, fontWeight: 900, fontSize: "clamp(2.5rem,6vw,5rem)", color: "#f5f0e8", lineHeight: 1, textTransform: "uppercase", marginBottom: "3rem", letterSpacing: "-0.01em" }}>
          BULLETIN<br /><span style={{ color: "#d4f700" }}>BOARD</span>
        </div>

        <div style={{ border: "4px solid #d4f700", maxWidth: "700px", background: "#0f0f0f", boxShadow: "8px 8px 0 #d4f700" }}>
          {/* terminal header */}
          <div style={{ background: "#d4f700", padding: "8px 16px", display: "flex", alignItems: "center", gap: "8px" }}>
            {["#ff5f57", "#febc2e", "#28c840"].map(c => (
              <div key={c} style={{ width: 12, height: 12, background: c, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.2)" }} />
            ))}
            <span style={{ ...mono, fontSize: "0.7rem", color: "#0a0a0a", marginLeft: "8px", letterSpacing: "0.1em", fontWeight: 700 }}>LIVE-FEED.sh</span>
          </div>

          <div style={{ padding: "2rem" }}>
            <div style={{ ...mono, fontSize: "0.7rem", color: "#d4f700", letterSpacing: "0.1em", marginBottom: "1.2rem" }}>
              $ cat announcements.txt
            </div>
            <div style={{ ...mono, fontSize: "0.95rem", color: "#0f0", lineHeight: 2 }}>
              <span style={{ color: "#d4f700" }}>&gt; </span>More announcements coming soon...
              <span className="blink-cursor" style={{ color: "#d4f700" }}>█</span>
            </div>

            <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "8px" }}>
              {[1, 2].map(i => (
                <div key={i} style={{ borderLeft: "3px solid #333", paddingLeft: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Icons.Lock />
                  <span style={{ ...mono, fontSize: "0.78rem", color: "#444", letterSpacing: "0.05em" }}>
                    &gt; ??? _________________________ [LOCKED]
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════════ */}
      <footer style={{ background: "#0a0a0a", borderTop: "6px solid #d4f700", padding: "3rem 2.5rem" }}>
        <div className="two-col" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "2rem" }}>
          <div>
            <div style={{ ...display, fontWeight: 900, fontStyle: "italic", fontSize: "clamp(2rem,5vw,4rem)", color: "#d4f700", lineHeight: 1, textTransform: "uppercase", letterSpacing: "-0.01em" }}>
              CODE DECODE<br />CLUB × DYPIU
            </div>
            <div style={{ ...mono, fontSize: "0.7rem", color: "#555", marginTop: "1rem", letterSpacing: "0.1em" }}>
              HACKATHON — APRIL 4-5, 2025<br />
              24 HOURS | HARDWARE & SOFTWARE | OPEN VISION
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
            {["ABOUT", "TRACKS", "TIMELINE", "REGISTER"].map(n => (
              <a key={n} href={`#${n.toLowerCase()}`} style={{ ...mono, fontSize: "0.7rem", color: "#555", textDecoration: "none", letterSpacing: "0.12em", transition: "color 0.1s" }}
                onMouseEnter={e => e.target.style.color = "#d4f700"}
                onMouseLeave={e => e.target.style.color = "#555"}
              >{n}</a>
            ))}
          </div>
        </div>

        <hr style={{ border: "none", borderTop: "3px solid #d4f700", margin: "2rem 0 1rem" }} />
        <div style={{ ...mono, fontSize: "0.65rem", color: "#333", textAlign: "center", letterSpacing: "0.1em" }}>
          © 2025 CODE DECODE CLUB — DY PATIL INTERNATIONAL UNIVERSITY. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}