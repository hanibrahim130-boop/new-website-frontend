import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionDividerProps {
  text: string;
  direction?: "left" | "right";
}

export default function SectionDivider({ text, direction = "left" }: SectionDividerProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    const xStart = direction === "left" ? "20%" : "-20%";
    const xEnd = direction === "left" ? "-30%" : "30%";

    gsap.fromTo(
      textRef.current,
      { x: xStart },
      {
        x: xEnd,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );

    const currentSection = sectionRef.current;
    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === currentSection) st.kill();
      });
    };
  }, [direction]);

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden py-16 md:py-24 bg-light"
    >
      <div
        ref={textRef}
        className="whitespace-nowrap text-[clamp(5rem,15vw,14rem)] font-black uppercase leading-none tracking-[-0.04em] text-dark/[0.04] select-none pointer-events-none"
      >
        {text}
      </div>
    </div>
  );
}
