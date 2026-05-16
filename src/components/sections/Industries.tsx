import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const industries = [
  { name: "Restaurants & Cafés", icon: "🍽️" },
  { name: "Beauty Salons", icon: "💇" },
  { name: "Barbershops", icon: "✂️" },
  { name: "Clinics", icon: "🏥" },
  { name: "Gyms & Fitness", icon: "💪" },
  { name: "Online Stores", icon: "🛒" },
  { name: "Retail Shops", icon: "🏪" },
  { name: "Local Services", icon: "🔧" },
];

export default function Industries() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const title = sectionRef.current.querySelector(".ind-title");
    if (title) {
      gsap.fromTo(title, { y: 80, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: title, start: "top 85%" },
      });
    }

    const subtitle = sectionRef.current.querySelector(".ind-subtitle");
    if (subtitle) {
      gsap.fromTo(subtitle, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: subtitle, start: "top 85%" },
      });
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      if (!trackRef.current || !sectionRef.current) return;

      const track = trackRef.current;
      const scrollWidth = track.scrollWidth - window.innerWidth + 200;

      gsap.to(track, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    });

    mm.add("(max-width: 767px)", () => {
      const cards = trackRef.current?.querySelectorAll(".ind-card");
      if (cards) {
        gsap.fromTo(cards, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: trackRef.current, start: "top 85%" },
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-light relative overflow-hidden">
      <div className="px-6 md:px-10 mb-16">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="ind-title text-[clamp(2rem,5vw,4rem)] font-black leading-[1.05] tracking-[-0.03em] uppercase">
            MARKET<br />EXPERTISE
          </h2>
          <p className="ind-subtitle text-dark/60 text-base md:text-lg mt-6 max-w-[600px] mx-auto leading-relaxed">
            We understand the unique needs of local businesses. From restaurants to retail, we craft digital solutions tailored to each industry.
          </p>
        </div>
      </div>

      <div ref={trackRef} className="flex gap-4 px-6 md:px-10 md:flex-nowrap flex-wrap justify-center md:justify-start">
        {industries.map((ind, i) => (
          <div
            key={i}
            className="ind-card group flex-shrink-0 w-[calc(50%-8px)] md:w-[300px] bg-dark text-white rounded-2xl p-8 flex flex-col justify-between min-h-[220px] hover:bg-dark/90 transition-all duration-500 cursor-default"
          >
            <span className="text-4xl mb-6">{ind.icon}</span>
            <div>
              <h3 className="text-lg font-bold uppercase tracking-wide mb-2">{ind.name}</h3>
              <div className="w-8 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
