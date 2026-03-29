import { motion } from "framer-motion";
import { Github, Twitter, Mail, Calendar, FileText } from "lucide-react";

export default function T4() {
  return (
    <div className="min-h-screen relative">
      {/* Background grid – brutalist classic */}
      <div className="fixed inset-0 pointer-events-none opacity-10 z-0">
        <div className="w-full h-full bg-[linear-gradient(to_right,#222222_1px,transparent_1px),linear-gradient(to_bottom,#222222_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <main className="relative z-10">
        {/* HERO */}
        <section className="min-h-screen flex items-center justify-center px-5 sm:px-8 py-20 md:py-32 border-b-[8px] border-brutal-pink">
          <div className="max-w-7xl w-full">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="text-6xl sm:text-8xl md:text-9xl lg:text-[14rem] xl:text-[16rem] font-black leading-[0.9] mb-10 md:mb-16 text-center md:text-left tracking-tighter"
            >
              HACK
              <span className="text-brutal-neon">/</span>
              DECODE
            </motion.h1>

            <div className="max-w-4xl">
              <p className="text-3xl sm:text-4xl md:text-6xl font-black mb-10 md:mb-14 leading-tight">
                24-HOUR HACKATHON
                <br />
                <span className="text-brutal-pink">APRIL 4–5, 2026</span>
              </p>

              <div className="flex flex-wrap gap-5 sm:gap-8 mb-12 md:mb-20">
                <a
                  href="#register"
                  className="btn-brutal text-xl sm:text-2xl uppercase tracking-wider"
                >
                  Submit PPT Now
                </a>
                <a
                  href="#about"
                  className="px-7 sm:px-10 py-4 sm:py-5 text-xl sm:text-2xl font-black border-[6px] border-brutal-neon bg-transparent hover:bg-brutal-neon hover:text-brutal-black transition-all duration-300 shadow-brutal-neon hover:shadow-brutal-neon active:translate-y-2 active:translate-x-2"
                >
                  MORE INFO
                </a>
              </div>

              <p className="text-2xl sm:text-3xl font-bold">
                PPT Submission Window:{" "}
                <span className="text-brutal-yellow">March 15 – 18, 2026</span>
              </p>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          className="py-24 md:py-40 px-5 sm:px-8 border-b-[8px] border-brutal-neon"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="section-title">WHAT IS HACK/DECODE</h2>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 text-xl sm:text-2xl leading-relaxed font-bold">
              <div className="space-y-8 md:space-y-12">
                <p>
                  24-hour no-rules hackathon powered by{" "}
                  <span className="text-brutal-pink">Code Decode Club</span>{" "}
                  at{" "}
                  <span className="text-brutal-neon">
                    DY Patil International University (DYPIU)
                  </span>
                  , Akurdi, Pune.
                </p>
                <p>
                  Build crazy stuff. Hardware, software, AI weirdness, physical
                  installations — anything goes.
                  <br />
                  Maximum chaos, zero boring corporate vibes.
                </p>
              </div>

              <div className="space-y-10 md:space-y-12">
                <div className="border-[6px] border-brutal-yellow p-6 sm:p-10 shadow-brutal">
                  <h3 className="text-4xl sm:text-5xl mb-6">WHEN</h3>
                  <p className="text-3xl sm:text-4xl">April 4–5, 2026</p>
                  <p className="text-xl sm:text-2xl opacity-80 mt-2">
                    24 hours. Non-stop. Bring Red Bull.
                  </p>
                </div>

                <div className="border-[6px] border-brutal-pink p-6 sm:p-10 shadow-brutal">
                  <h3 className="text-4xl sm:text-5xl mb-6">
                    PPT DEADLINE
                  </h3>
                  <p className="text-3xl sm:text-4xl">
                    March 15 – 18, 2026
                  </p>
                  <p className="text-xl opacity-80 mt-2">
                    Submit early — judges hate last-minute PPTs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ANNOUNCEMENTS */}
        <section className="py-24 md:py-40 px-5 sm:px-8 bg-brutal-gray border-b-[8px] border-brutal-yellow">
          <div className="max-w-7xl mx-auto">
            <h2 className="section-title text-brutal-yellow">
              ANNOUNCEMENTS
            </h2>

            <div className="text-2xl sm:text-3xl md:text-4xl font-black space-y-12 md:space-y-20 max-w-5xl mx-auto text-center">
              <div className="py-12 md:py-20 px-6 md:px-12 border-[8px] border-brutal-neon bg-brutal-black">
                <p>Judges & problem statements dropping soon...</p>
              </div>

              <div className="py-12 md:py-20 px-6 md:px-12 border-[8px] border-brutal-pink bg-brutal-black">
                <p>Prizes — serious. Swag — obscene. Chaos — guaranteed.</p>
              </div>

              <p className="text-4xl md:text-5xl">Stay locked in.</p>
            </div>
          </div>
        </section>

        {/* CTA / FOOTER */}
        <section id="register" className="py-24 md:py-40 px-5 sm:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black mb-12 md:mb-20 leading-none">
              READY TO
              <br />
              BUILD?
            </h2>

            <a
              href="https://forms.gle/YOUR_REAL_FORM_ID_HERE"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brutal text-3xl sm:text-4xl md:text-5xl uppercase tracking-widest mx-auto block w-fit px-10 sm:px-16 py-6 sm:py-8"
            >
              SUBMIT YOUR IDEA (PPT)
            </a>

            <div className="mt-16 md:mt-24 flex justify-center gap-10 sm:gap-16 text-4xl sm:text-5xl">
              <a
                href="https://twitter.com/codedecodedypiu"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brutal-pink transition-colors"
              >
                <Twitter size={52} />
              </a>
              <a
                href="https://github.com/CodeDecode-DYPIU"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brutal-neon transition-colors"
              >
                <Github size={52} />
              </a>
              <a
                href="mailto:codedecode@dypiu.ac.in"
                className="hover:text-brutal-yellow transition-colors"
              >
                <Mail size={52} />
              </a>
            </div>

            <p className="mt-16 text-xl sm:text-2xl opacity-70">
              DY Patil International University • Code Decode Club • 2026
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}