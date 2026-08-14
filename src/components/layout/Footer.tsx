import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll("[data-reveal]");
    gsap.fromTo(
      els,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      }
    );
  }, []);

  return (
    <footer ref={ref} className="bg-dark text-white py-8 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p data-reveal className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} NorthBeat Media. All rights reserved.
          </p>
          <div data-reveal className="flex items-center gap-6">
            <a href="#home" className="text-sm text-white/50 hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#home" className="text-sm text-white/50 hover:text-accent transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
