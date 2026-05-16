import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    title: "WEBSITES & DIGITAL EXPERIENCES",
    desc: "Modern responsive websites, landing pages, booking pages, menus, contact forms, WhatsApp buttons — built to convert visitors into customers.",
    gradient: "from-emerald-950 via-emerald-900/80 to-black",
    tags: ["Landing Page", "Booking Site", "Portfolio", "Online Menu"],
  },
  {
    num: "02",
    title: "SOCIAL MEDIA MANAGEMENT",
    desc: "Instagram, Facebook, TikTok management, captions, posting schedules, profile optimization, and engagement strategy.",
    gradient: "from-blue-950 via-blue-900/80 to-black",
    tags: ["Instagram", "TikTok", "Facebook", "Scheduling"],
  },
  {
    num: "03",
    title: "CONTENT CREATION",
    desc: "Post designs, reels ideas, stories, promotional visuals, service posts, product posts — content that captures attention.",
    gradient: "from-purple-950 via-purple-900/80 to-black",
    tags: ["Reels", "Stories", "Post Design", "Visuals"],
  },
  {
    num: "04",
    title: "DIGITAL MARKETING & PAID ADS",
    desc: "Campaign planning, paid ads strategy, local business marketing, audience targeting, offers and promotions.",
    gradient: "from-orange-950 via-orange-900/80 to-black",
    tags: ["Google Ads", "Meta Ads", "Targeting", "Analytics"],
  },
  {
    num: "05",
    title: "BRANDING & ONLINE IDENTITY",
    desc: "Visual identity, brand style, colors, messaging, tone of voice, professional online appearance.",
    gradient: "from-rose-950 via-rose-900/80 to-black",
    tags: ["Logo", "Brand Guide", "Visual Identity", "Messaging"],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current.querySelectorAll(".services-line"),
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
        }
      );
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      if (!sectionRef.current || !cardsContainerRef.current) return;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${cardsContainerRef.current!.scrollHeight}`,
        pin: true,
        pinSpacing: true,
      });

      const cards = cardsContainerRef.current.querySelectorAll(".service-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current!,
              start: () => `top+=${i * 150} top`,
              end: () => `top+=${i * 150 + 250} top`,
              scrub: 1,
            },
          }
        );
      });
    });

    mm.add("(max-width: 767px)", () => {
      const cards = cardsContainerRef.current?.querySelectorAll(".service-card");
      if (cards) {
        gsap.fromTo(cards, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: cardsContainerRef.current, start: "top 85%" },
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="min-h-screen py-32 px-6 md:px-10 bg-light relative">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-16">
          <div ref={titleRef} className="md:sticky md:top-32 md:self-start">
            <div className="overflow-hidden">
              <h2 className="services-line text-[clamp(2rem,5vw,4rem)] font-black leading-[1.05] tracking-[-0.03em] uppercase">
                WHAT
              </h2>
            </div>
            <div className="overflow-hidden">
              <h2 className="services-line text-[clamp(2rem,5vw,4rem)] font-black leading-[1.05] tracking-[-0.03em] uppercase">
                WE BUILD
              </h2>
            </div>
            <p className="services-line text-dark/60 text-base md:text-lg leading-relaxed mt-6 max-w-[400px]">
              We focus on the intersection of smart design and digital strategy — where our approach creates the most value for local businesses.
            </p>
            <button
              className="services-line group flex items-center gap-3 bg-dark text-white px-7 py-3.5 rounded-full text-sm font-semibold mt-8 hover:bg-dark/80 transition-all"
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore Services
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent text-dark group-hover:translate-x-1 transition-transform">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>

          <div ref={cardsContainerRef} className="flex flex-col gap-5">
            {services.map((service) => (
              <div
                key={service.num}
                className="service-card group relative rounded-2xl overflow-hidden min-h-[280px] md:min-h-[320px] cursor-default transition-transform duration-500 hover:scale-[1.02]"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient}`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.06),transparent_60%)]" />

                <div className="relative z-10 p-8 md:p-10 flex flex-col justify-between h-full text-white">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg md:text-xl font-bold uppercase tracking-wide max-w-[300px]">
                      {service.title}
                    </h3>
                    <span className="text-white/10 text-[4rem] font-black leading-none group-hover:text-accent/20 transition-colors duration-500">
                      {service.num}
                    </span>
                  </div>

                  <div>
                    <p className="text-white/50 text-sm leading-relaxed max-w-[400px] mb-6">
                      {service.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium text-white/60 border border-white/15 rounded-full px-4 py-1.5 hover:border-white/30 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
