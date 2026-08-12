import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  Circle,
  Code2,
  Cpu,
  Menu,
  MoveRight,
  Network,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { useLenis } from "./hooks/useLenis";
import { AgentPlayground } from "./components/AgentPlayground";
import { CaseStudyPage } from "./components/CaseStudyPage";
import { ClientPortal } from "./components/ClientPortal";

gsap.registerPlugin(ScrollTrigger);

const systems = [
  {
    index: "01",
    title: "Web experiences",
    detail: "Flagship websites that make a business feel inevitable before the first sales call.",
    label: "Brand / conversion / commerce",
    icon: <Sparkles size={19} strokeWidth={1.5} />,
    accent: "coral",
  },
  {
    index: "02",
    title: "Product applications",
    detail: "Purpose-built tools that turn scattered operations into one clear interface.",
    label: "Product / workflow / data",
    icon: <Code2 size={19} strokeWidth={1.5} />,
    accent: "ivory",
  },
  {
    index: "03",
    title: "Intelligent agents",
    detail: "Practical AI systems that handle the routine and surface the work that deserves people.",
    label: "Agents / automation / integrations",
    icon: <Bot size={19} strokeWidth={1.5} />,
    accent: "violet",
  },
];

const projects = [
  {
    number: "01",
    category: "OPERATING PLATFORM",
    title: "Velocity, without the drag.",
    detail: "A decision layer that turns scattered activity into visible momentum.",
    href: "/case-studies/velocity",
    type: "velocity",
  },
  {
    number: "02",
    category: "AI WORKFORCE",
    title: "Service that never sleeps.",
    detail: "An always-on agent system that makes every worthy enquiry go somewhere useful.",
    href: "/case-studies/relay",
    type: "relay",
  },
];

const process = [
  ["01", "Find the signal", "We define the commercial shift that will make the rest of the work matter."],
  ["02", "Design the field", "We unite the brand surface, product flow, and operating logic in one coherent system."],
  ["03", "Set it in motion", "We ship, learn from real behaviour, and improve the parts that compound."],
];

function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  useLenis();

  useEffect(() => {
    const root = appRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .from(".orbit-nav", { y: -24, opacity: 0, duration: 0.8 })
        .from(".orbit-hero__eyebrow", { y: 18, opacity: 0, duration: 0.7 }, "-=0.38")
        .from(".orbit-hero__title .line", { yPercent: 104, duration: 1.02, stagger: 0.11 }, "-=0.34")
        .from(".orbit-hero__summary, .orbit-hero__actions", { y: 18, opacity: 0, duration: 0.64, stagger: 0.1 }, "-=0.58")
        .from(".signal-field", { scale: 0.9, opacity: 0, duration: 1.5, ease: "power3.out" }, "<0.05")
        .from(".orbit-hero__meta", { y: 14, opacity: 0, duration: 0.55 }, "-=0.6");

      gsap.utils.toArray<HTMLElement>("[data-orbit-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.82,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          },
        );
      });

      const media = gsap.matchMedia();
      media.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".orbit-system-card");
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".orbit-systems",
            start: "top top",
            end: "+=1700",
            scrub: 0.85,
            pin: true,
            anticipatePin: 1,
          },
        });
        timeline
          .fromTo(".orbit-systems__title", { yPercent: 0 }, { yPercent: -30, duration: 0.24 }, 0)
          .fromTo(cards[0], { yPercent: 58, rotate: -7 }, { yPercent: 0, rotate: 0, duration: 0.25 }, 0.05)
          .fromTo(cards[1], { yPercent: 80, rotate: 5 }, { yPercent: 0, rotate: 0, duration: 0.25 }, 0.28)
          .fromTo(cards[2], { yPercent: 98, rotate: -3 }, { yPercent: 0, rotate: 0, duration: 0.25 }, 0.51)
          .to(".orbit-system-stack", { yPercent: -7, duration: 0.18 }, 0.78);

        gsap.to(".orbit-project-title", {
          xPercent: -10,
          ease: "none",
          scrollTrigger: { trigger: ".orbit-projects", start: "top bottom", end: "bottom top", scrub: 1 },
        });
      });

      gsap.utils.toArray<HTMLElement>(".orbit-project-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 76, opacity: 0, rotate: index ? 3 : -3 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 84%", once: true },
          },
        );
      });

      const onPointerMove = (event: PointerEvent) => {
        const rect = root.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        root.style.setProperty("--signal-pointer-x", `${x * 18}px`);
        root.style.setProperty("--signal-pointer-y", `${y * 18}px`);
      };

      window.addEventListener("pointermove", onPointerMove, { passive: true });
      return () => {
        window.removeEventListener("pointermove", onPointerMove);
        media.revert();
      };
    }, root);

    return () => ctx.revert();
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";

  if (pathname === "/portal") return <ClientPortal />;
  if (pathname.startsWith("/case-studies/")) return <CaseStudyPage slug={pathname.split("/").pop() ?? ""} />;
  if (pathname !== "/") return <CaseStudyPage slug="" />;

  return (
    <div className="qvo-app orbit-app" ref={appRef}>
      <div className="orbit-grain" aria-hidden="true" />
      <header className="orbit-nav">
        <a className="orbit-wordmark" href="#home" onClick={closeMenu} aria-label="Qvo.tech home">qvo<span>.</span>tech</a>
        <nav className="orbit-nav__links" aria-label="Primary navigation">
          <a href="#systems">Systems</a>
          <a href="#work">Work</a>
          <a href="#playground">Signal Lab</a>
          <a href="#approach">Approach</a>
        </nav>
        <a className="orbit-nav__cta" href="#contact">Start a project <ArrowUpRight size={15} /></a>
        <button className="orbit-menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>
          {menuOpen ? <X size={21} /> : <Menu size={22} />}
        </button>
      </header>

      <aside className={menuOpen ? "orbit-menu orbit-menu--open" : "orbit-menu"} aria-hidden={!menuOpen}>
        <div className="orbit-menu__eyebrow"><Circle size={9} fill="currentColor" /> Navigation / 00</div>
        <div className="orbit-menu__links">
          <a href="#systems" onClick={closeMenu}>What we make <ArrowDownRight size={20} /></a>
          <a href="#work" onClick={closeMenu}>Selected work <ArrowDownRight size={20} /></a>
          <a href="#playground" onClick={closeMenu}>Qvo Signal Lab <ArrowDownRight size={20} /></a>
          <a href="#approach" onClick={closeMenu}>How we work <ArrowDownRight size={20} /></a>
          <a href="/portal">Client portal <ArrowUpRight size={20} /></a>
        </div>
        <p>Independent technology studio<br />Working globally from the point of view of the work.</p>
      </aside>

      <main>
        <section className="orbit-hero" id="home">
          <div className="orbit-hero__grid" aria-hidden="true" />
          <div className="orbit-hero__content">
            <div className="orbit-hero__eyebrow"><i /> Independent product &amp; technology studio</div>
            <h1 className="orbit-hero__title">
              <span className="line">From the noise,</span>
              <span className="line line--italic">a next move.</span>
            </h1>
            <div className="orbit-hero__lower">
              <p className="orbit-hero__summary">Qvo gives ambitious businesses the websites, product tools, and intelligent systems that make growth feel less accidental.</p>
              <div className="orbit-hero__actions">
                <a className="orbit-button orbit-button--coral" href="#contact">Build with Qvo <MoveRight size={18} /></a>
                <a className="orbit-arrow-link" href="#systems">Enter the field <ArrowDown size={17} /></a>
              </div>
            </div>
          </div>
          <div className="orbit-hero__scene" aria-hidden="true"><QvoSignalField /></div>
          <div className="orbit-hero__meta"><span>Field notes / 2026</span><span>Web / Products / Agents</span><span>Scroll to resolve <ArrowDownRight size={15} /></span></div>
        </section>

        <section className="orbit-statement" id="systems">
          <div className="orbit-statement__marker">01 — SIGNAL / RESOLUTION</div>
          <div className="orbit-statement__body" data-orbit-reveal>
            <p>Most businesses do not need more digital surface area.</p>
            <h2>They need a <em>clearer field</em><br />to move through.</h2>
          </div>
          <div className="orbit-statement__foot" data-orbit-reveal><span>Qvo finds the leverage in a business, then makes it visible, usable, and repeatable.</span><i /></div>
        </section>

        <section className="orbit-systems" aria-label="Qvo systems">
          <div className="orbit-systems__header section-shell">
            <span className="orbit-kicker">02 / WHAT WE BUILD</span>
            <h2 className="orbit-systems__title">One studio.<br /><em>Three ways forward.</em></h2>
          </div>
          <div className="orbit-system-stack section-shell">
            {systems.map((system) => (
              <article className={`orbit-system-card orbit-system-card--${system.accent}`} key={system.index}>
                <div className="orbit-system-card__top"><span>{system.index}</span><span>{system.label}</span><span className="orbit-system-card__icon">{system.icon}</span></div>
                <div className="orbit-system-card__middle"><h3>{system.title}</h3><p>{system.detail}</p></div>
                <div className="orbit-system-card__visual" aria-hidden="true"><i /><b /><em /></div>
                <span className="orbit-system-card__arrow"><ArrowUpRight size={22} /></span>
              </article>
            ))}
          </div>
        </section>

        <section className="orbit-projects" id="work">
          <div className="orbit-project-title" aria-hidden="true">Selected <em>momentum</em></div>
          <div className="section-shell orbit-projects__intro" data-orbit-reveal>
            <span className="orbit-kicker">03 / WORK WITH WEIGHT</span>
            <p>Designed for the place where strategy ends and useful work begins.</p>
          </div>
          <div className="section-shell orbit-project-grid">
            {projects.map((project) => (
              <a className={`orbit-project-card orbit-project-card--${project.type}`} href={project.href} key={project.number}>
                <div className="orbit-project-card__top"><span>{project.category}</span><span>{project.number} / 02</span></div>
                <ProjectPlane type={project.type} />
                <div className="orbit-project-card__copy"><h3>{project.title}</h3><p>{project.detail}</p></div>
                <div className="orbit-project-card__footer"><span>Explore case study</span><ArrowUpRight size={19} /></div>
              </a>
            ))}
          </div>
        </section>

        <section className="orbit-agent-intro">
          <div className="orbit-agent-intro__field" aria-hidden="true"><span /><span /><span /></div>
          <div className="section-shell orbit-agent-intro__content">
            <span className="orbit-kicker" data-orbit-reveal>04 / INTELLIGENT OPERATIONS</span>
            <h2 data-orbit-reveal>The routine is <em>not</em><br />the reason you hired people.</h2>
            <div className="orbit-agent-intro__bottom" data-orbit-reveal>
              <p>Qvo builds AI systems where they earn their place: routing requests, preparing context, connecting tools, and returning time to human judgement.</p>
              <div className="orbit-agent-intro__nodes"><span><Bot size={16} /> Lead layer</span><i /><span><Network size={16} /> Operating data</span><i /><span><Zap size={16} /> Action</span></div>
            </div>
          </div>
        </section>

        <div className="orbit-lab-wrap"><AgentPlayground /></div>

        <section className="orbit-approach" id="approach">
          <div className="section-shell">
            <div className="orbit-approach__head" data-orbit-reveal><span className="orbit-kicker">05 / THE TRAJECTORY</span><h2>Senior thinking.<br /><em>Visible momentum.</em></h2></div>
            <div className="orbit-approach__grid">
              {process.map(([number, title, text]) => <article data-orbit-reveal key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p><ChevronMark /></article>)}
            </div>
          </div>
        </section>

        <section className="orbit-contact" id="contact">
          <div className="orbit-contact__field" aria-hidden="true"><i /><i /><i /></div>
          <div className="section-shell orbit-contact__content">
            <span className="orbit-kicker" data-orbit-reveal>06 / START HERE</span>
            <h2 data-orbit-reveal>Bring the<br /><em>complexity.</em></h2>
            <div className="orbit-contact__bottom" data-orbit-reveal><p>Tell us about the change you want to create. We will bring the systems thinking to make it tangible.</p><a className="orbit-button orbit-button--paper" href="mailto:hello@qvo.tech">hello@qvo.tech <ArrowUpRight size={19} /></a></div>
          </div>
        </section>
      </main>

      <footer className="orbit-footer"><a className="orbit-wordmark" href="#home">qvo<span>.</span>tech</a><p>Digital systems for businesses in motion.</p><div><span>© 2026 Qvo.tech</span><a href="/portal">Client portal <ArrowUpRight size={14} /></a></div></footer>
    </div>
  );
}

function QvoSignalField() {
  return (
    <div className="signal-field">
      <svg viewBox="0 0 760 760" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="signalCoral" x1="188" y1="159" x2="593" y2="578" gradientUnits="userSpaceOnUse"><stop stopColor="#F5A48D" /><stop offset="1" stopColor="#E76E52" /></linearGradient>
          <linearGradient id="signalViolet" x1="263" y1="119" x2="560" y2="617" gradientUnits="userSpaceOnUse"><stop stopColor="#A5A2E5" /><stop offset="1" stopColor="#524FAE" /></linearGradient>
          <radialGradient id="signalGlow" cx="0" cy="0" r="1" gradientTransform="translate(380 380) rotate(90) scale(248)"><stop stopColor="#E76E52" stopOpacity=".35" /><stop offset=".53" stopColor="#5753B7" stopOpacity=".18" /><stop offset="1" stopColor="#09090F" stopOpacity="0" /></radialGradient>
          <filter id="signalBlur"><feGaussianBlur stdDeviation="18" /></filter>
        </defs>
        <circle className="signal-field__glow" cx="380" cy="380" r="252" fill="url(#signalGlow)" />
        <circle className="signal-field__ghost-ring" cx="380" cy="380" r="284" stroke="#F4EFE8" strokeOpacity=".12" />
        <circle className="signal-field__ghost-ring signal-field__ghost-ring--inner" cx="380" cy="380" r="178" stroke="#F4EFE8" strokeOpacity=".2" />
        <ellipse className="signal-field__orbit signal-field__orbit--a" cx="380" cy="380" rx="291" ry="158" stroke="#f28b72" strokeWidth="1.5" />
        <ellipse className="signal-field__orbit signal-field__orbit--b" cx="380" cy="380" rx="210" ry="310" stroke="#a3a0e2" strokeOpacity=".9" strokeWidth="1.25" />
        <path className="signal-field__trajectory" d="M163 514C250 535 269 617 394 591C504 568 474 423 594 272" stroke="#F4EFE8" strokeOpacity=".52" strokeWidth="1.2" strokeDasharray="5 9" />
        <path className="signal-field__q" d="M493.5 380C493.5 442.684 442.684 493.5 380 493.5C317.316 493.5 266.5 442.684 266.5 380C266.5 317.316 317.316 266.5 380 266.5C442.684 266.5 493.5 317.316 493.5 380Z" stroke="#ff5038" strokeWidth="34" />
        <path className="signal-field__q-tail" d="M454 455L588 589" stroke="#aaa7ff" strokeWidth="34" strokeLinecap="round" />
        <circle className="signal-field__core" cx="380" cy="380" r="10" fill="#F4EFE8" />
        <circle className="signal-field__core-pulse" cx="380" cy="380" r="24" stroke="#F4EFE8" strokeOpacity=".65" />
        <circle className="signal-field__marker signal-field__marker--one" cx="163" cy="514" r="7" fill="#E76E52" />
        <circle className="signal-field__marker signal-field__marker--two" cx="594" cy="272" r="6" fill="#9A98D8" />
        <path d="M121 618H263" stroke="#F4EFE8" strokeOpacity=".35" /><path d="M497 151H639" stroke="#F4EFE8" strokeOpacity=".35" />
      </svg>
      <div className="signal-field__caption signal-field__caption--one">COORDINATE / 27.422°</div>
      <div className="signal-field__caption signal-field__caption--two">QVO SIGNAL / ACTIVE</div>
    </div>
  );
}

function ProjectPlane({ type }: { type: string }) {
  if (type === "velocity") {
    return <div className="project-plane project-plane--velocity" aria-hidden="true"><div className="project-plane__side"><i /><i /><i /><i /></div><div className="project-plane__canvas"><div className="project-plane__bar"><span /><span /><span /></div><div className="project-plane__metric"><small>Growth signal</small><b>+82.4%</b><em>Trending with intent</em></div><svg viewBox="0 0 420 140" preserveAspectRatio="none"><path d="M0 124C47 119 39 77 84 85C130 94 128 105 167 68C203 35 223 78 254 72C296 64 320 12 363 40C391 58 396 34 420 14" fill="none" stroke="currentColor" strokeWidth="4" /></svg></div></div>;
  }
  return <div className="project-plane project-plane--relay" aria-hidden="true"><div className="project-plane__orbit" /><div className="project-plane__orbit project-plane__orbit--two" /><div className="project-plane__core"><Cpu size={30} /></div><div className="project-plane__node project-plane__node--one">INBOX <b>12</b></div><div className="project-plane__node project-plane__node--two">QUALIFIED</div><div className="project-plane__node project-plane__node--three">CRM <i /></div></div>;
}

function ChevronMark() { return <span className="orbit-chevron" aria-hidden="true">↗</span>; }

export default App;
