import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "RESTAURANT WEBSITE CONCEPT",
    tag: "Web Design",
    color: "from-orange-950 via-orange-900/60 to-orange-950",
    desc: "A modern dining experience website with online booking, menu display, and WhatsApp integration for local restaurants.",
  },
  {
    title: "BEAUTY SALON WEBSITE CONCEPT",
    tag: "Web Design",
    color: "from-pink-950 via-pink-900/60 to-pink-950",
    desc: "Elegant salon website with service catalog, appointment booking, and gallery showcase.",
  },
  {
    title: "LOCAL BUSINESS LANDING PAGE",
    tag: "Landing Page",
    color: "from-emerald-950 via-emerald-900/60 to-emerald-950",
    desc: "High-converting landing page designed to turn visitors into customers for local shops.",
  },
  {
    title: "SOCIAL MEDIA CAMPAIGN",
    tag: "Social Media",
    color: "from-violet-950 via-violet-900/60 to-violet-950",
    desc: "Full social media campaign with content calendar, post designs, and engagement strategy.",
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const title = sectionRef.current.querySelector(".port-title");
    if (title) {
      gsap.fromTo(title, { y: 80, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: title, start: "top 85%" },
      });
    }

    const subtitle = sectionRef.current.querySelector(".port-subtitle");
    if (subtitle) {
      gsap.fromTo(subtitle, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: subtitle, start: "top 85%" },
      });
    }

    const cards = sectionRef.current.querySelectorAll(".port-card");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 120, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
          },
        }
      );

      gsap.to(card, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="py-32 md:py-40 px-6 md:px-10 bg-light relative">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-20">
          <h2 className="port-title text-[clamp(2rem,5vw,4rem)] font-black leading-[1.05] tracking-[-0.03em] uppercase">
            SELECTED<br />WORK
          </h2>
          <p className="port-subtitle text-dark/60 text-base md:text-lg mt-6 max-w-[600px] mx-auto leading-relaxed">
            Award-winning craft, technical reliability. Our work is built to meet the demands of local businesses looking to stand out online.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="port-card group relative rounded-2xl overflow-hidden min-h-[400px] md:min-h-[550px] cursor-pointer">
            <div className={`absolute inset-0 bg-gradient-to-br ${projects[0].color}`} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.06),transparent_60%)]" />
            <div className="relative z-10 p-8 md:p-12 flex flex-col justify-between h-full">
              <div className="flex items-start justify-between">
                <h3 className="text-white text-2xl md:text-4xl font-bold uppercase tracking-wide max-w-[500px]">
                  {projects[0].title}
                </h3>
                <span className="text-white/80 text-xs font-medium border border-white/20 rounded-full px-4 py-1.5 whitespace-nowrap">
                  {projects[0].tag}
                </span>
              </div>
              <div>
                <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-[500px] mb-6">
                  {projects[0].desc}
                </p>
                <div className="flex items-center gap-2 text-white/80 group-hover:text-accent transition-colors duration-300">
                  <span className="text-sm font-medium">View Concept</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-white/5 group-hover:scale-[4] transition-transform duration-700" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {projects.slice(1).map((project, i) => (
              <div
                key={i}
                className="port-card group relative rounded-2xl overflow-hidden min-h-[350px] md:min-h-[420px] cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.05),transparent_60%)]" />
                <div className="relative z-10 p-8 flex flex-col justify-between h-full">
                  <div className="flex items-start justify-between">
                    <h3 className="text-white text-lg md:text-xl font-bold uppercase tracking-wide max-w-[220px]">
                      {project.title}
                    </h3>
                    <span className="text-white/80 text-xs font-medium border border-white/20 rounded-full px-3 py-1 whitespace-nowrap">
                      {project.tag}
                    </span>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm leading-relaxed max-w-[280px] mb-4">
                      {project.desc}
                    </p>
                    <div className="flex items-center gap-2 text-white/80 group-hover:text-accent transition-colors duration-300">
                      <span className="text-sm font-medium">View Concept</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white/5 group-hover:scale-[3] transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
