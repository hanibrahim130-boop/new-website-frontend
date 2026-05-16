import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ornamentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.4 });

    if (headlineRef.current) {
      const lines = headlineRef.current.querySelectorAll(".hero-line");
      gsap.set(lines, { y: 120, opacity: 0, rotateX: -20 });
      tl.to(lines, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
      });
    }

    if (subRef.current) {
      gsap.set(subRef.current, { y: 40, opacity: 0 });
      tl.to(subRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5");
    }

    if (ctaRef.current) {
      gsap.set(ctaRef.current, { y: 30, opacity: 0 });
      tl.to(ctaRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.3");
    }

    if (ornamentRef.current) {
      gsap.fromTo(
        ornamentRef.current,
        { scale: 0, rotation: -180, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1.2, delay: 2.6, ease: "back.out(1.7)" }
      );

      gsap.to(ornamentRef.current, {
        y: -100,
        scale: 0.6,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    if (headlineRef.current) {
      gsap.to(headlineRef.current, {
        y: -80,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
  }, []);

  const scrollToServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-light"
    >
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div ref={ornamentRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        <svg width="120" height="180" viewBox="0 0 120 180" fill="none" className="opacity-20">
          <path d="M60 0 L65 70 L120 90 L65 110 L60 180 L55 110 L0 90 L55 70 Z" fill="#bbb" />
        </svg>
      </div>

      <div className="relative z-10 text-center max-w-[1100px] mx-auto">
        <div ref={headlineRef} className="mb-8" style={{ perspective: "1000px" }}>
          <div className="hero-line overflow-hidden">
            <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.9] tracking-[-0.04em] uppercase">
              DIGITAL
            </h1>
          </div>
          <div className="hero-line overflow-hidden">
            <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.9] tracking-[-0.04em] uppercase">
              PRESENCE.
            </h1>
          </div>
        </div>

        <div ref={subRef} className="max-w-[600px] mx-auto mb-10">
          <p className="text-base md:text-lg text-dark/60 leading-relaxed">
            I design modern websites, manage social media, create content, and build digital marketing strategies for restaurants, salons, clinics, shops, and local businesses.
          </p>
        </div>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToServices}
            className="group flex items-center gap-3 bg-dark text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-dark/80 transition-all duration-300"
          >
            View Services
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent text-dark group-hover:translate-x-1 transition-transform">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </button>
          <button
            onClick={scrollToContact}
            className="text-sm font-semibold text-dark/70 hover:text-dark transition-colors border border-dark/20 px-8 py-4 rounded-full hover:border-dark/40"
          >
            Get a Free Consultation
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-dark/30">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </div>
    </section>
  );
}
