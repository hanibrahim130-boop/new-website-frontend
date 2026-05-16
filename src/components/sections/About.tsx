import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    const title = section.querySelector(".about-title");
    if (title) {
      gsap.fromTo(title, { y: 80, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: title, start: "top 85%" },
      });
    }

    const text = section.querySelector(".about-text");
    if (text) {
      gsap.fromTo(text, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: text, start: "top 85%" },
      });
    }

    const photo = section.querySelector(".about-photo");
    if (photo) {
      gsap.fromTo(photo, { scale: 0.8, opacity: 0, y: 60 }, {
        scale: 1, opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: photo, start: "top 85%" },
      });
    }

    const gridItems = section.querySelectorAll(".about-grid-item");
    gsap.fromTo(gridItems, { y: 60, opacity: 0, scale: 0.95 }, {
      y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: "power3.out",
      scrollTrigger: { trigger: section.querySelector(".about-grid"), start: "top 80%" },
    });
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-32 px-6 md:px-10 bg-light relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="about-title text-[clamp(2rem,5vw,4rem)] font-black leading-[1.05] tracking-[-0.03em] uppercase mb-8">
              HELPING<br />BUSINESSES<br />LOOK<br />PROFESSIONAL<br />ONLINE
            </h2>
            <p className="about-text text-dark/60 text-base md:text-lg leading-relaxed max-w-[500px]">
              I help local businesses create a strong online presence through modern web design, social media management, content creation, branding, and marketing strategies that attract attention and turn visitors into customers.
            </p>
          </div>

          <div className="about-photo relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-[400px] ml-auto">
              <img
                src="/hany-brahim.jpg"
                alt="Hany Brahim — Sales & Client Consultant at NorthBeat Media"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white font-bold text-lg">Hany Brahim</p>
                <p className="text-white/70 text-sm">Sales & Client Consultant</p>
              </div>
            </div>
          </div>
        </div>

        <div className="about-grid grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="about-grid-item bg-dark text-white rounded-2xl p-8 flex flex-col justify-between min-h-[200px]">
            <span className="text-[clamp(2rem,4vw,3.5rem)] font-black">50+</span>
            <span className="text-white/60 text-sm">projects<br />delivered</span>
          </div>
          <div className="about-grid-item bg-accent rounded-2xl p-8 flex flex-col justify-between min-h-[200px]">
            <span className="text-[clamp(2rem,4vw,3.5rem)] font-black text-dark">8+</span>
            <span className="text-dark/60 text-sm">industries<br />served</span>
          </div>
          <div className="about-grid-item bg-dark text-white rounded-2xl p-8 flex flex-col justify-between min-h-[200px]">
            <span className="text-[clamp(2rem,4vw,3.5rem)] font-black">5+</span>
            <span className="text-white/60 text-sm">years of<br />experience</span>
          </div>
          <div className="about-grid-item bg-accent rounded-2xl p-8 flex flex-col justify-between min-h-[200px]">
            <span className="text-[clamp(2rem,4vw,3.5rem)] font-black text-dark">100%</span>
            <span className="text-dark/60 text-sm">client<br />satisfaction</span>
          </div>
        </div>
      </div>
    </section>
  );
}
