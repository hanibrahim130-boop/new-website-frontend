import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "RESTAURANT WEBSITE CONCEPT",
    tag: "Web Design",
    color: "from-orange-900/80 to-orange-950/90",
    desc: "A modern dining experience website with online booking, menu display, and WhatsApp integration.",
  },
  {
    title: "BEAUTY SALON WEBSITE CONCEPT",
    tag: "Web Design",
    color: "from-pink-900/80 to-pink-950/90",
    desc: "Elegant salon website with service catalog, appointment booking, and gallery showcase.",
  },
  {
    title: "LOCAL BUSINESS LANDING PAGE",
    tag: "Landing Page",
    color: "from-emerald-900/80 to-emerald-950/90",
    desc: "High-converting landing page designed to turn visitors into customers for local shops.",
  },
  {
    title: "SOCIAL MEDIA CAMPAIGN",
    tag: "Social Media",
    color: "from-violet-900/80 to-violet-950/90",
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
        { y: 100, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
        }
      );

      gsap.to(card, {
        y: -20,
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
    <section ref={sectionRef} id="portfolio" className="py-32 px-6 md:px-10 bg-light relative">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="port-title text-[clamp(2rem,5vw,4rem)] font-black leading-[1.05] tracking-[-0.03em] uppercase">
            WORK
          </h2>
          <p className="port-subtitle text-dark/60 text-base md:text-lg mt-6 max-w-[600px] mx-auto leading-relaxed">
            Award-winning craft, technical reliability. Our work is built to meet the demands of local businesses looking to stand out online.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div
              key={i}
              className="port-card group relative rounded-2xl overflow-hidden min-h-[350px] md:min-h-[450px] cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.05),transparent_60%)]" />

              <div className="relative z-10 p-8 flex flex-col justify-between h-full">
                <div className="flex items-start justify-between">
                  <h3 className="text-white text-xl md:text-2xl font-bold uppercase tracking-wide max-w-[280px]">
                    {project.title}
                  </h3>
                  <span className="text-white/80 text-xs font-medium border border-white/20 rounded-full px-4 py-1.5 whitespace-nowrap">
                    {project.tag}
                  </span>
                </div>

                <div>
                  <p className="text-white/60 text-sm leading-relaxed max-w-[350px] mb-4">
                    {project.desc}
                  </p>
                  <div className="flex items-center gap-2 text-white/80 group-hover:text-accent transition-colors duration-300">
                    <span className="text-sm font-medium">View Concept</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="group-hover:translate-x-1 transition-transform"
                    >
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
    </section>
  );
}
