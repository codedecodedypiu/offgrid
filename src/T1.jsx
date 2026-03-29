// App.jsx
// SUPER-ADVANCED NEO-BRUTALIST HACKATHON WEBSITE
// React + Tailwind CSS — Single File Version

import React, { useEffect, useRef, useState } from "react";

export default function T1() {
  return (
    <div className="bg-yellow-200 text-black font-sans cursor-none overflow-x-hidden">
      <Cursor />
      <AnnouncementBar />
      <Layout>
        <Hero />
        <Divider />
        <About />
        <Divider />
        <Timeline />
        <Divider />
        <Tracks />
        <Divider />
        <Organisers />
        <Divider />
        <Footer />
      </Layout>
    </div>
  );
}

/* =========================
   LAYOUT
========================= */
function Layout({ children }) {
  return <main className="max-w-7xl mx-auto px-4 md:px-10">{children}</main>;
}

/* =========================
   ANNOUNCEMENT BAR
========================= */
function AnnouncementBar() {
  return (
    <div className="sticky top-0 z-50 border-b-[4px] border-black bg-red-400 font-bold overflow-hidden">
      <div className="whitespace-nowrap animate-[marquee_12s_linear_infinite] py-2">
        MORE ANNOUNCEMENTS COMING SOON — MORE ANNOUNCEMENTS COMING SOON —
      </div>
    </div>
  );
}

/* =========================
   CUSTOM CURSOR
========================= */
function Cursor() {
  const cursorRef = useRef(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    let x = 0,
      y = 0;
    let targetX = 0,
      targetY = 0;

    const move = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      x += (targetX - x) * 0.15;
      y += (targetY - y) * 0.15;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${x}px, ${y}px) scale(${
          hover ? 1.8 : 1
        })`;
      }
      requestAnimationFrame(animate);
    };

    const addHover = () => setHover(true);
    const removeHover = () => setHover(false);

    window.addEventListener("mousemove", move);
    document.querySelectorAll("button,a,.hover-target").forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    animate();

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, [hover]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-6 h-6 border-[3px] border-black bg-white mix-blend-difference pointer-events-none z-[9999]"
    />
  );
}

/* =========================
   HERO
========================= */
function Hero() {
  return (
    <section className="py-20 relative">
      <div className="absolute w-20 h-20 bg-blue-400 border-[4px] border-black -rotate-12 top-10 right-10 animate-bounce" />
      <h1 className="text-[clamp(3rem,10vw,7rem)] font-black leading-none -rotate-1">
        OPEN VISION
        <br />
        HACKATHON
      </h1>

      <p className="mt-6 text-xl font-bold border-[3px] border-black inline-block px-4 py-2 bg-white rotate-1">
        DYPIU | CODE DECODE CLUB
      </p>

      <div className="mt-6 text-3xl font-extrabold">4–5 APRIL • 24 HOURS</div>

      <button className="hover-target mt-8 border-[5px] border-black bg-yellow-400 px-8 py-4 font-black text-xl shadow-[8px_8px_0_#000] hover:translate-x-1 hover:translate-y-1 transition">
        REGISTER NOW
      </button>
    </section>
  );
}

/* =========================
   ABOUT
========================= */
function About() {
  return (
    <section className="py-16 grid md:grid-cols-2 gap-10 items-center">
      <h2 className="text-6xl font-black rotate-1">OPEN VISION</h2>
      <p className="border-[4px] border-black p-6 bg-white text-lg font-semibold leading-relaxed">
        A 24-hour hardware and software hackathon pushing bold ideas into
        reality. Build experimental projects, collaborate with innovators, and
        bring open vision concepts to life through technology.
      </p>
    </section>
  );
}

/* =========================
   TIMELINE
========================= */
function Timeline() {
  const items = [
    { date: "15–18 March", text: "PPT Submission Window" },
    { date: "4–5 April", text: "Open Vision Hackathon Live" },
  ];

  return (
    <section className="py-16">
      <h2 className="text-5xl font-black mb-10">TIMELINE</h2>
      <div className="space-y-8">
        {items.map((item, i) => (
          <div
            key={i}
            className="hover-target border-[4px] border-black bg-blue-300 p-6 shadow-[10px_10px_0_#000] rotate-[1deg]"
          >
            <h3 className="font-extrabold text-2xl">{item.date}</h3>
            <p className="font-bold">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================
   TRACKS
========================= */
function Tracks() {
  return (
    <section className="py-16">
      <h2 className="text-5xl font-black mb-10">TRACKS</h2>
      <div className="grid md:grid-cols-2 gap-10">
        <TrackCard title="HARDWARE" />
        <TrackCard title="SOFTWARE" />
      </div>
    </section>
  );
}

function TrackCard({ title }) {
  return (
    <div className="hover-target border-[5px] border-black bg-red-300 p-12 text-4xl font-black shadow-[12px_12px_0_#000] hover:-rotate-2 transition">
      {title}
    </div>
  );
}

/* =========================
   ORGANISERS
========================= */
function Organisers() {
  return (
    <section className="py-16 grid md:grid-cols-2 gap-8">
      <div className="border-[4px] border-black bg-white p-8 shadow-[8px_8px_0_#000]">
        <h3 className="text-3xl font-black">CODE DECODE CLUB</h3>
        <p className="font-bold mt-2">Organising Team</p>
      </div>
      <div className="border-[4px] border-black bg-yellow-400 p-8 shadow-[8px_8px_0_#000]">
        <h3 className="text-3xl font-black">
          DYPIU (DY PATIL INTERNATIONAL UNIVERSITY)
        </h3>
      </div>
    </section>
  );
}

/* =========================
   FOOTER
========================= */
function Footer() {
  return (
    <footer className="py-16 border-t-[5px] border-black font-bold text-center">
      <p>© Open Vision Hackathon • DYPIU</p>
      <div className="flex justify-center gap-6 mt-4">
        <a className="hover-target border-[3px] border-black px-4 py-2 bg-white">
          Instagram
        </a>
        <a className="hover-target border-[3px] border-black px-4 py-2 bg-white">
          LinkedIn
        </a>
      </div>
    </footer>
  );
}

/* =========================
   DIVIDER
========================= */
function Divider() {
  return <div className="h-[5px] bg-black my-10 w-full" />;
}