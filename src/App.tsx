import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  ChevronRight,
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
import { QvoIndex } from "./components/QvoIndex";
import { ChapterHandoff } from "./components/ChapterHandoff";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    number: "01",
    icon: <Sparkles size={20} strokeWidth={1.7} />,
    title: "Web that performs",
    text: "Flagship brand sites and conversion systems that make your value impossible to ignore.",
    tags: ["Strategy", "Design systems", "Commerce"],
  },
  {
    number: "02",
    icon: <Code2 size={20} strokeWidth={1.7} />,
    title: "Products people use",
    text: "Useful applications that turn complex operations into an advantage your team can feel.",
    tags: ["Web apps", "MVPs", "Dashboards"],
  },
  {
    number: "03",
    icon: <Bot size={20} strokeWidth={1.7} />,
    title: "Agents that work",
    text: "Practical AI agents that qualify, support, report, and move work forward around the clock.",
    tags: ["Automation", "AI agents", "Integrations"],
  },
];

const projects = [
  {
    type: "Product platform",
    title: "Velocity, without the drag.",
    body: "An operating platform that turns scattered activity into a single decision layer.",
    className: "project-card--velocity",
    label: "V/01",
  },
  {
    type: "AI workforce",
    title: "Service that never sleeps.",
    body: "An always-on agent system built to qualify enquiries and create momentum.",
    className: "project-card--agent",
    label: "A/24",
  },
];

const process = [
  ["01", "Align", "We isolate the commercial opportunity worth building around."],
  ["02", "Architect", "We design the experience, data, and automation as one system."],
  ["03", "Accelerate", "We launch fast, learn from behaviour, then compound the gains."],
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
        .from(".site-nav", { y: -28, opacity: 0, duration: 0.9 })
        .from(".hero-eyebrow", { y: 24, opacity: 0, duration: 0.7 }, "-=0.45")
        .from(".hero-title .line", { yPercent: 112, duration: 1.1, stagger: 0.1 }, "-=0.35")
        .from(".hero-copy, .hero-actions", { y: 20, opacity: 0, duration: 0.7, stagger: 0.12 }, "-=0.55")
        .from(".qvo-index", { scale: 0.82, opacity: 0, duration: 1.25 }, "<0.1")
        .from(".hero-meta", { y: 16, opacity: 0, duration: 0.65 }, "-=0.4");

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 42, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      gsap.to(".qvo-index__object", { rotationY: 360, duration: 28, repeat: -1, ease: "none" });
      gsap.to(".qvo-index__orbit--large", { rotation: 360, duration: 22, repeat: -1, ease: "none" });
      gsap.to(".qvo-index__orbit--small", { rotation: -360, duration: 15, repeat: -1, ease: "none" });

      gsap.utils.toArray<HTMLElement>("[data-handoff]").forEach((handoff) => {
        const planes = handoff.querySelectorAll(".chapter-handoff__plane");
        const line = handoff.querySelector(".chapter-handoff__line");
        gsap.fromTo(planes, { scaleX: 0, transformOrigin: "left center" }, {
          scaleX: 1,
          duration: 1.05,
          stagger: 0.12,
          ease: "power3.inOut",
          scrollTrigger: { trigger: handoff, start: "top 86%", once: true },
        });
        gsap.fromTo(line, { y: 22, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: { trigger: handoff, start: "top 75%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".parallax-shape").forEach((shape, index) => {
        gsap.to(shape, {
          yPercent: index % 2 ? -18 : 15,
          ease: "none",
          scrollTrigger: {
            trigger: shape.closest("section") ?? shape,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });

      gsap.to(".work-heading", {
        xPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: ".work-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, root);

    const updateCursor = (event: PointerEvent) => {
      root.style.setProperty("--cursor-x", `${event.clientX}px`);
      root.style.setProperty("--cursor-y", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", updateCursor, { passive: true });
    return () => {
      window.removeEventListener("pointermove", updateCursor);
      ctx.revert();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";

  if (pathname === "/portal") return <ClientPortal />;
  if (pathname.startsWith("/case-studies/")) return <CaseStudyPage slug={pathname.split("/").pop() ?? ""} />;
  if (pathname !== "/") return <CaseStudyPage slug="" />;

  return (
    <div className="qvo-app" ref={appRef}>
      <div className="cursor-glow" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <header className="site-nav">
        <a className="wordmark" href="#home" onClick={closeMenu} aria-label="Qvo.tech home">
          qvo<span>.</span>tech
        </a>
        <nav className={menuOpen ? "nav-links nav-links--open" : "nav-links"} aria-label="Primary navigation">
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#capabilities" onClick={closeMenu}>Capabilities</a>
          <a href="#agents" onClick={closeMenu}>AI systems</a>
          <a href="#playground" onClick={closeMenu}>Playground</a>
          <a href="#approach" onClick={closeMenu}>Approach</a>
          <a href="/portal">Portal</a>
        </nav>
        <a className="nav-cta" href="#contact">
          Start a project <ArrowUpRight size={16} />
        </a>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={21} /> : <Menu size={22} />}
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-glow hero-glow--one" aria-hidden="true" />
          <div className="hero-glow hero-glow--two" aria-hidden="true" />
          <div className="hero-content">
            <div className="hero-eyebrow"><span className="status-dot" /> Independent product &amp; technology studio</div>
            <h1 className="hero-title">
              <span className="line">Make the next</span>
              <span className="line line--accent">move feel inevitable.</span>
            </h1>
            <div className="hero-bottom">
              <p className="hero-copy">Qvo turns business complexity into decisive digital products, useful tools, and systems your people can actually use.</p>
              <div className="hero-actions">
                <a className="button button--lime" href="#contact">Build with Qvo <MoveRight size={18} /></a>
                <a className="text-link" href="#work">See what we make <ArrowDownRight size={18} /></a>
              </div>
            </div>
          </div>

          <QvoIndex />

          <div className="hero-meta">
            <span>Independent technology studio</span>
            <span>Global reach — deliberate focus</span>
            <span className="scroll-cue">Scroll to explore <ArrowDownRight size={16} /></span>
          </div>
        </section>

        <section className="signal-bar" aria-label="Qvo capabilities">
          <div className="signal-track">
            <span>WEB EXPERIENCES</span><b>✳</b><span>PRODUCT APPLICATIONS</span><b>✳</b><span>AI AGENTS</span><b>✳</b><span>WORKFLOW AUTOMATION</span><b>✳</b>
            <span>WEB EXPERIENCES</span><b>✳</b><span>PRODUCT APPLICATIONS</span><b>✳</b><span>AI AGENTS</span><b>✳</b><span>WORKFLOW AUTOMATION</span><b>✳</b>
          </div>
        </section>

        <ChapterHandoff number="01 / 05" label="A clearer system" tone="paper" />

        <section className="intro-section section-shell chapter chapter--paper" id="capabilities">
          <div className="section-marker" data-reveal><span>( 01 )</span><span>What we build</span></div>
          <div className="intro-grid">
            <h2 data-reveal>Technology should feel <em>inevitable.</em></h2>
            <p className="intro-copy" data-reveal>We make the visible layer your customers remember and the operating layer your business depends on. Strategy, design, and engineering stay in the same room until the work holds together.</p>
          </div>
          <div className="capability-grid">
            {capabilities.map((capability) => (
              <article className="capability-card" data-reveal key={capability.number}>
                <div className="capability-top"><span>{capability.number}</span><div className="capability-icon">{capability.icon}</div></div>
                <h3>{capability.title}</h3>
                <p>{capability.text}</p>
                <div className="tag-row">{capability.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <span className="card-arrow"><ArrowUpRight size={20} /></span>
              </article>
            ))}
          </div>
        </section>

        <ChapterHandoff number="02 / 05" label="Proof, not polish" tone="ink" />

        <section className="work-section chapter chapter--ink" id="work">
          <div className="work-heading" aria-hidden="true">Selected <span>leverage</span></div>
          <div className="work-intro section-shell">
            <div className="section-marker" data-reveal><span>( 02 )</span><span>Designed for traction</span></div>
            <p data-reveal>We do not create digital decoration. We design decisive interfaces and operational tools for businesses with something at stake.</p>
          </div>
          <div className="project-grid section-shell">
            {projects.map((project) => (
              <article className={`project-card ${project.className}`} data-reveal key={project.label}>
                <div className="project-top"><span>{project.type}</span><span>{project.label}</span></div>
                <div className="project-visual" aria-hidden="true">
                  {project.label === "V/01" ? <VelocityVisual /> : <AgentVisual />}
                </div>
                <div className="project-copy"><h3>{project.title}</h3><p>{project.body}</p></div>
                <a className="project-footer" href={project.label === "V/01" ? "/case-studies/velocity" : "/case-studies/relay"}><span>Explore case study</span><ArrowUpRight size={20} /></a>
              </article>
            ))}
          </div>
        </section>

        <ChapterHandoff number="03 / 05" label="Systems in motion" tone="blue" />

        <section className="agent-section chapter chapter--blue" id="agents">
          <div className="parallax-shape agent-shape" aria-hidden="true" />
          <div className="section-shell agent-layout">
            <div className="agent-copy-block">
              <div className="section-marker section-marker--light" data-reveal><span>( 03 )</span><span>AI systems</span></div>
              <h2 data-reveal>Let the routine <em>run itself.</em></h2>
              <p data-reveal>We apply intelligent automation where it earns its place: clearing repetitive work, making handoffs cleaner, and giving people more time for judgment, relationships, and decisions.</p>
              <a className="text-link text-link--light" href="#contact" data-reveal>Design your agent layer <ArrowUpRight size={18} /></a>
            </div>
            <div className="agent-console" data-reveal>
              <div className="console-bar"><span className="console-brand"><Cpu size={15} /> QVO/CORE</span><span className="console-live"><i /> live</span></div>
              <div className="console-body">
                <div className="console-left">
                  <p>ORCHESTRATION LAYER</p>
                  <div className="node node--active"><Bot size={16} /><span>Lead agent</span><b>98%</b></div>
                  <div className="node"><Network size={16} /><span>CRM sync</span><b>live</b></div>
                  <div className="node"><Zap size={16} /><span>Follow-up flow</span><b>+24</b></div>
                </div>
                <div className="console-main">
                  <div className="console-ring"><span>24/7</span><small>ACTIVE</small></div>
                  <div className="console-stats"><div><span>1,248</span><small>tasks cleared</small></div><div><span>03:42</span><small>response time</small></div></div>
                </div>
              </div>
              <div className="console-log"><span><i /> intent detected</span><span>routed to sales agent</span><span>opportunity qualified</span></div>
            </div>
          </div>
        </section>

        <ChapterHandoff number="04 / 05" label="Try the system" tone="paper" />

        <AgentPlayground />

        <section className="proof-section section-shell">
          <div className="proof-copy" data-reveal>
            <span className="eyebrow">Made for the team on the other side of the ambition</span>
            <h2>Serious work.<br /><em>Human energy.</em></h2>
          </div>
          <div className="proof-list" data-reveal>
            <div><span>01</span><p>Strategy, design, and technology in the same room.</p></div>
            <div><span>02</span><p>Senior attention from first conversation to launch.</p></div>
            <div><span>03</span><p>Built to evolve with your business, not expire on delivery.</p></div>
          </div>
        </section>

        <ChapterHandoff number="05 / 05" label="The way in" tone="ink" />

        <section className="process-section chapter chapter--paper" id="approach">
          <div className="section-shell">
            <div className="section-marker" data-reveal><span>( 05 )</span><span>Our way in</span></div>
            <div className="process-head" data-reveal><h2>Enough process<br />to move <em>fast.</em></h2><p>Clarity is the fastest route to remarkable work. We keep the path visible, the decisions honest, and the focus where it pays.</p></div>
            <div className="process-grid">
              {process.map(([number, title, text]) => (
                <article data-reveal key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p><ChevronRight size={19} /></article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-glow" aria-hidden="true" />
          <div className="section-shell contact-inner">
            <span className="eyebrow" data-reveal>Make the next move count</span>
            <h2 data-reveal>Let&apos;s make<br /><em>something inevitable.</em></h2>
            <div className="contact-bottom" data-reveal>
              <p>Tell us the shift you are trying to create. We will bring the systems thinking to make it real.</p>
              <a className="button button--dark" href="mailto:hello@qvo.tech">hello@qvo.tech <ArrowUpRight size={19} /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark" href="#home">qvo<span>.</span>tech</a>
        <p>Digital leverage for businesses in motion.</p>
        <div><span>© 2026 Qvo.tech</span><a href="#home">Back to top <ArrowUpRight size={14} /></a></div>
      </footer>
    </div>
  );
}

function VelocityVisual() {
  return (
    <div className="velocity-ui">
      <div className="velocity-sidebar"><span /><span /><span className="is-active" /><span /></div>
      <div className="velocity-content">
        <div className="velocity-header"><i /><i /><i /></div>
        <div className="velocity-kpi"><span>Growth signal</span><b>+82.4%</b><small>Compared to last period <ArrowUpRight size={12} /></small></div>
        <div className="velocity-chart"><svg viewBox="0 0 290 100" preserveAspectRatio="none"><path d="M0,86 C22,78 26,62 48,71 S78,80 99,53 S124,36 144,53 S167,84 190,53 S216,10 238,32 S267,43 290,6" fill="none" stroke="currentColor" strokeWidth="3" /><path d="M0,86 C22,78 26,62 48,71 S78,80 99,53 S124,36 144,53 S167,84 190,53 S216,10 238,32 S267,43 290,6 V100 H0Z" fill="url(#velocityGradient)" /><defs><linearGradient id="velocityGradient" x1="0" x2="0" y1="0" y2="1"><stop stopColor="currentColor" stopOpacity=".23" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></linearGradient></defs></svg></div>
        <div className="velocity-cards"><span /><span /><span /></div>
      </div>
    </div>
  );
}

function AgentVisual() {
  return (
    <div className="agent-visual">
      <div className="agent-visual-grid" />
      <div className="agent-visual-orbit agent-visual-orbit--one" /><div className="agent-visual-orbit agent-visual-orbit--two" />
      <div className="agent-visual-core"><Bot size={31} /></div>
      <div className="agent-chip agent-chip--one">inbox <b>12</b></div>
      <div className="agent-chip agent-chip--two">qualified</div>
      <div className="agent-chip agent-chip--three">CRM <i /></div>
    </div>
  );
}

export default App;
