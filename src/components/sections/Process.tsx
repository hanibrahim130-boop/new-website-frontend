import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: "01", title: "Discovery", desc: "We learn about your business, goals, competitors, and target audience." },
  { num: "02", title: "Strategy", desc: "We build a clear digital strategy tailored to your market and objectives." },
  { num: "03", title: "Design", desc: "We create stunning visuals and layouts that reflect your brand identity." },
  { num: "04", title: "Build", desc: "We develop your website, content, and campaigns with precision." },
  { num: "05", title: "Launch", desc: "We launch everything and make sure it works perfectly across all platforms." },
  { num: "06", title: "Growth", desc: "We optimize, track performance, and scale what works to grow your business." },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const title = sectionRef.current.querySelector(".process-title");
    if (title) {
      gsap.fromTo(title, { y: 100, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: title, start: "top 85%" },
      });
    }

    const subtitle = sectionRef.current.querySelector(".process-subtitle");
    if (subtitle) {
      gsap.fromTo(subtitle, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: subtitle, start: "top 85%" },
      });
    }

    if (bgTextRef.current) {
      gsap.fromTo(bgTextRef.current, { x: "-10%" }, {
        x: "15%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    const items = sectionRef.current.querySelectorAll(".process-item");
    items.forEach((item) => {
      gsap.fromTo(
        item,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
          },
        }
      );
    });

    const line = sectionRef.current.querySelector(".process-line");
    if (line) {
      gsap.fromTo(line, { scaleY: 0 }, {
        scaleY: 1, ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current.querySelector(".process-grid"),
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        },
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-40 md:py-48 px-6 md:px-10 bg-dark text-white relative overflow-hidden">
      <div
        ref={bgTextRef}
        className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap text-[clamp(6rem,18vw,16rem)] font-black uppercase leading-none tracking-[-0.04em] text-white/[0.02] select-none pointer-events-none"
      >
        OUR PROCESS
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="process-title text-[clamp(2rem,5vw,4rem)] font-black leading-[1.05] tracking-[-0.03em] uppercase">
            OUR PROCESS
          </h2>
          <p className="process-subtitle text-white/50 text-base md:text-lg mt-6 max-w-[600px] mx-auto leading-relaxed">
            A clear, structured approach designed for flexibility — allowing us to adapt each project to your business needs and goals.
          </p>
        </div>

        <div className="process-grid relative max-w-[900px] mx-auto">
          <div className="process-line absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 origin-top hidden md:block" />

          <div className="flex flex-col gap-16">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`process-item flex items-start gap-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 border border-white/5">
                    <span className="text-accent text-sm font-bold">{step.num}</span>
                    <h3 className="text-xl font-bold uppercase tracking-wide mt-2 mb-3">{step.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-accent text-dark font-bold text-sm flex-shrink-0 relative z-10">
                  {step.num}
                </div>

                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
