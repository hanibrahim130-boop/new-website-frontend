import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const packages = [
  {
    name: "Starter Presence",
    features: [
      "One-page responsive website",
      "Social media profile setup",
      "Basic brand guidelines",
      "Contact form & WhatsApp button",
      "Mobile-optimized design",
    ],
    highlight: false,
  },
  {
    name: "Growth Package",
    features: [
      "Multi-page website with CMS",
      "Social media management (30 days)",
      "Content creation (15 posts)",
      "SEO optimization",
      "Monthly performance report",
      "Paid ads setup & strategy",
    ],
    highlight: true,
  },
  {
    name: "Premium Digital Package",
    features: [
      "Full website with booking system",
      "Social media management (60 days)",
      "Content creation (30 posts + reels)",
      "Full branding & visual identity",
      "Digital marketing strategy",
      "Paid ads management",
      "Priority support & consulting",
    ],
    highlight: false,
  },
];

export default function Packages() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const title = sectionRef.current.querySelector(".pkg-title");
    if (title) {
      gsap.fromTo(title, { y: 80, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: title, start: "top 85%" },
      });
    }

    const cards = sectionRef.current.querySelectorAll(".pkg-card");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%" },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 md:px-10 bg-dark text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="pkg-title text-[clamp(2rem,5vw,4rem)] font-black leading-[1.05] tracking-[-0.03em] uppercase">
            ENGAGEMENT<br />MODELS
          </h2>
          <p className="pkg-title text-white/50 text-base md:text-lg mt-6 max-w-[600px] mx-auto leading-relaxed">
            Our packages are designed for flexibility, allowing us to adapt each partnership to your business needs and budget.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className={`pkg-card group rounded-2xl p-8 flex flex-col justify-between min-h-[420px] transition-all duration-500 ${
                pkg.highlight
                  ? "bg-accent text-dark"
                  : "bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              <div>
                <span className={`text-sm font-bold uppercase tracking-wider ${pkg.highlight ? "text-dark/60" : "text-white/40"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl font-bold uppercase tracking-wide mt-4 mb-8">
                  {pkg.name}
                </h3>
                <ul className="space-y-3">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className={`mt-0.5 flex-shrink-0 ${pkg.highlight ? "text-dark" : "text-accent"}`}
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className={pkg.highlight ? "text-dark/80" : "text-white/70"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`mt-8 w-full py-4 rounded-full text-sm font-semibold transition-all duration-300 ${
                  pkg.highlight
                    ? "bg-dark text-white hover:bg-dark/80"
                    : "bg-white/10 text-white hover:bg-accent hover:text-dark"
                }`}
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Request Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
