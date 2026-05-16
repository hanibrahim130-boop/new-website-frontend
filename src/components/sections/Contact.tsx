import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    businessType: "",
    phone: "",
    service: "",
    message: "",
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    const title = sectionRef.current.querySelector(".contact-title");
    if (title) {
      gsap.fromTo(
        title,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: title, start: "top 85%" },
        }
      );
    }

    const bigText = sectionRef.current.querySelector(".contact-big");
    if (bigText) {
      gsap.fromTo(
        bigText,
        { y: 100, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: bigText, start: "top 85%" },
        }
      );
    }

    const formEls = sectionRef.current.querySelectorAll(".contact-form-el");
    gsap.fromTo(
      formEls,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current.querySelector(".contact-form"),
          start: "top 85%",
        },
      }
    );

    const footerEls = sectionRef.current.querySelectorAll(".contact-footer-el");
    gsap.fromTo(
      footerEls,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current.querySelector(".contact-footer"),
          start: "top 90%",
        },
      }
    );

    if (bgTextRef.current) {
      gsap.fromTo(bgTextRef.current, { x: "-5%" }, {
        x: "10%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi, I'm ${formData.name} from ${formData.businessName}. I'm interested in ${formData.service}. ${formData.message}`;
    window.open(`https://wa.me/+96176171003?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section ref={sectionRef} id="contact" className="bg-dark text-white relative overflow-hidden">
      <div
        ref={bgTextRef}
        className="absolute top-1/3 left-0 whitespace-nowrap text-[clamp(6rem,18vw,16rem)] font-black uppercase leading-none tracking-[-0.04em] text-white/[0.02] select-none pointer-events-none"
      >
        LET'S TALK
      </div>
      <div className="py-40 md:py-48 px-6 md:px-10 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <p className="contact-title text-accent text-sm font-bold uppercase tracking-[0.2em] mb-4">
              WANT TO COLLABORATE?
            </p>
            <h2 className="contact-big text-[clamp(3rem,10vw,8rem)] font-black leading-[0.9] tracking-[-0.04em] uppercase">
              LET&apos;S TALK
            </h2>
          </div>

          <div className="max-w-[700px] mx-auto">
            <form onSubmit={handleSubmit} className="contact-form space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <input
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="contact-form-el w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/30 transition-colors"
                  required
                />
                <input
                  name="businessName"
                  placeholder="Business Name"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="contact-form-el w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/30 transition-colors"
                  required
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className="contact-form-el w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/30 transition-colors appearance-none"
                  required
                >
                  <option value="" disabled className="text-dark">Business Type</option>
                  <option value="restaurant" className="text-dark">Restaurant / Café</option>
                  <option value="salon" className="text-dark">Beauty Salon</option>
                  <option value="barbershop" className="text-dark">Barbershop</option>
                  <option value="clinic" className="text-dark">Clinic</option>
                  <option value="gym" className="text-dark">Gym / Fitness</option>
                  <option value="retail" className="text-dark">Retail Shop</option>
                  <option value="online" className="text-dark">Online Store</option>
                  <option value="other" className="text-dark">Other</option>
                </select>
                <input
                  name="phone"
                  placeholder="Phone / WhatsApp"
                  value={formData.phone}
                  onChange={handleChange}
                  className="contact-form-el w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/30 transition-colors"
                />
              </div>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="contact-form-el w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/30 transition-colors appearance-none"
                required
              >
                <option value="" disabled className="text-dark">Service Needed</option>
                <option value="website" className="text-dark">Website Design</option>
                <option value="social" className="text-dark">Social Media Management</option>
                <option value="content" className="text-dark">Content Creation</option>
                <option value="marketing" className="text-dark">Digital Marketing</option>
                <option value="branding" className="text-dark">Branding & Online Identity</option>
                <option value="full" className="text-dark">Full Digital Package</option>
              </select>
              <textarea
                name="message"
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="contact-form-el w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/30 transition-colors resize-none"
              />

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  type="submit"
                  className="contact-form-el group flex items-center justify-center gap-3 bg-accent text-dark px-8 py-4 rounded-full text-sm font-semibold hover:bg-accent/90 transition-all duration-300"
                >
                  Contact form
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-dark text-accent group-hover:translate-x-1 transition-transform">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
                <a
                  href="https://wa.me/+96176171003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-form-el flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 rounded-full text-sm font-semibold hover:border-accent hover:text-accent transition-all duration-300"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </form>
          </div>

          <div className="contact-footer mt-24 grid md:grid-cols-3 gap-12 border-t border-white/10 pt-12">
            <div className="contact-footer-el">
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">WANT TO ASK SOMETHING?</p>
              <p className="text-white font-medium">hello@northbeatmedia.com</p>
            </div>
            <div className="contact-footer-el">
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">CONTACT PERSON</p>
              <p className="text-white font-medium">Hany Brahim</p>
              <p className="text-white/60 text-sm">Sales & Client Consultant</p>
            </div>
            <div className="contact-footer-el">
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">STAY IN THE LOOP</p>
              <div className="flex gap-3">
                {["instagram", "linkedin", "twitter"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-dark transition-all duration-300"
                  >
                    <span className="text-xs font-bold uppercase">
                      {social[0].toUpperCase()}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
