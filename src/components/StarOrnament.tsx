import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StarOrnament() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    gsap.set(el, { scale: 0, rotation: -180, opacity: 0 });
    gsap.to(el, {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 1.4,
      delay: 2.6,
      ease: "back.out(1.7)",
    });

    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

    gsap.to(el, {
      rotation: 360,
      scale: 0.5,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    const phases = [
      { start: 0, end: 0.15, scale: 1, glow: 0 },
      { start: 0.15, end: 0.35, scale: 0.7, glow: 0 },
      { start: 0.35, end: 0.55, scale: 0.85, glow: 0 },
      { start: 0.55, end: 0.7, scale: 0.6, glow: 1 },
      { start: 0.7, end: 0.85, scale: 0.75, glow: 0 },
      { start: 0.85, end: 1, scale: 0.5, glow: 0 },
    ];

    const glowEl = el.querySelector(".star-glow") as HTMLElement;

    phases.forEach((phase) => {
      gsap.to(el, {
        scale: phase.scale,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: document.body,
          start: () => `top+=${phase.start * totalHeight} top`,
          end: () => `top+=${phase.end * totalHeight} top`,
          scrub: 1,
        },
      });

      if (glowEl && phase.glow > 0) {
        gsap.to(glowEl, {
          opacity: phase.glow,
          scale: 1.8,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: document.body,
            start: () => `top+=${phase.start * totalHeight} top`,
            end: () => `top+=${(phase.start + phase.end) / 2 * totalHeight} top`,
            scrub: 1,
          },
        });
        gsap.to(glowEl, {
          opacity: 0,
          scale: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: document.body,
            start: () => `top+=${(phase.start + phase.end) / 2 * totalHeight} top`,
            end: () => `top+=${phase.end * totalHeight} top`,
            scrub: 1,
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === document.body) st.kill();
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[5]"
      style={{ willChange: "transform" }}
    >
      <div className="star-glow absolute inset-0 bg-accent rounded-full blur-[60px] opacity-0 scale-100" />
      <svg
        width="200"
        height="300"
        viewBox="0 0 200 300"
        fill="none"
        className="opacity-[0.12] md:opacity-[0.15]"
      >
        <defs>
          <linearGradient id="star-grad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#ccc" />
            <stop offset="50%" stopColor="#999" />
            <stop offset="100%" stopColor="#ccc" />
          </linearGradient>
        </defs>
        <path
          d="M100 0 L108 120 L200 150 L108 180 L100 300 L92 180 L0 150 L92 120 Z"
          fill="url(#star-grad)"
        />
        <path
          d="M100 40 L105 125 L170 150 L105 175 L100 260 L95 175 L30 150 L95 125 Z"
          fill="#ddd"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
