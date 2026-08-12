import { ArrowDownRight, ArrowLeft, ArrowUpRight, Check, Command, MoveRight, Sparkles } from "lucide-react";

type CaseStudy = {
  eyebrow: string;
  title: string;
  accent: string;
  summary: string;
  client: string;
  category: string;
  duration: string;
  problem: string;
  approach: string;
  outcomes: Array<{ value: string; label: string }>;
  systems: string[];
  quote: string;
};

const studies: Record<string, CaseStudy> = {
  velocity: {
    eyebrow: "V/01 · Product platform",
    title: "Velocity, without the drag.",
    accent: "A decision layer for a business moving at full speed.",
    summary: "We turned scattered reporting, handoffs, and operating signals into one calm product experience built for sharper decisions.",
    client: "Velocity Group",
    category: "Product strategy + application",
    duration: "12 weeks",
    problem: "Teams were managing momentum through a patchwork of spreadsheets, updates, and disconnected reports. The signal was there, but no one could see it in time to act.",
    approach: "We mapped the decisions that mattered most, designed a unified operating view, and built a modular product language that could expand with the business.",
    outcomes: [{ value: "+82.4%", label: "decision signal" }, { value: "1 view", label: "operating layer" }, { value: "12 wks", label: "to launch" }],
    systems: ["Product strategy", "Design system", "Analytics UX", "Operator dashboard"],
    quote: "The new platform did not just make reporting easier. It changed the quality and speed of the conversations we could have.",
  },
  relay: {
    eyebrow: "A/24 · AI workforce",
    title: "Service that never sleeps.",
    accent: "An AI operating layer that turns incoming demand into forward motion.",
    summary: "We designed a multi-agent service system that qualifies, responds, enriches, and routes opportunities before a human has to chase the inbox.",
    client: "Relay Service Co.",
    category: "AI agents + workflow automation",
    duration: "10 weeks",
    problem: "A fast-growing service business was losing time to repetitive inbox work and inconsistent handoffs. Good opportunities were waiting for humans who were already busy elsewhere.",
    approach: "We established a clear intent model, connected the essential workflow moments, and gave each agent a defined job, escalation path, and human handoff.",
    outcomes: [{ value: "24/7", label: "first response" }, { value: "98%", label: "intent accuracy" }, { value: "+24", label: "weekly follow-ups" }],
    systems: ["Agent architecture", "CRM workflow", "Intent model", "Human handoff design"],
    quote: "The system gives our people time back without making the service feel less personal. That was the line we refused to cross.",
  },
};

function CaseVisual({ slug }: { slug: string }) {
  if (slug === "relay") {
    return <div className="case-visual case-visual--relay" aria-hidden="true"><div className="case-agent-orbit case-agent-orbit--one" /><div className="case-agent-orbit case-agent-orbit--two" /><div className="case-agent-core"><Command size={31} /></div><span className="case-agent-label case-agent-label--one">INTENT</span><span className="case-agent-label case-agent-label--two">ROUTE</span><span className="case-agent-label case-agent-label--three">QUALIFY</span></div>;
  }
  return <div className="case-visual case-visual--velocity" aria-hidden="true"><div className="case-window"><div className="case-window-bar"><i /><i /><i /><span>VELOCITY / OPERATING VIEW</span></div><div className="case-window-layout"><aside><span /><span /><span className="is-active" /><span /></aside><div><p>NET MOMENTUM</p><strong>+82.4%</strong><small>COMPARED TO LAST PERIOD</small><svg viewBox="0 0 400 160" preserveAspectRatio="none"><path d="M0,126 C34,112 49,94 76,105 S117,130 153,92 S196,48 224,68 S258,127 291,73 S334,22 364,43 S387,38 400,8" fill="none" stroke="currentColor" strokeWidth="4" /></svg><div className="case-window-cards"><span /><span /><span /></div></div></div></div></div>;
}

export function CaseStudyPage({ slug }: { slug: string }) {
  const study = studies[slug];

  if (!study) {
    return <main className="route-fallback"><a className="wordmark" href="/">qvo<span>.</span>tech</a><p>404 / SIGNAL NOT FOUND</p><h1>That case study<br />is not in this <em>system.</em></h1><a className="button button--lime" href="/"><ArrowLeft size={18} /> Back to Qvo.tech</a></main>;
  }

  return (
    <div className="case-page">
      <header className="case-nav"><a className="wordmark" href="/">qvo<span>.</span>tech</a><div><a href="/#work">All work</a><a href="/portal">Client portal <ArrowUpRight size={15} /></a></div></header>
      <main>
        <section className="case-hero">
          <div className="section-shell">
            <a className="case-back" href="/#work"><ArrowLeft size={16} /> Selected work</a>
            <div className="case-hero-grid">
              <div><span className="eyebrow">{study.eyebrow}</span><h1>{study.title}</h1><p>{study.accent}</p></div>
              <CaseVisual slug={slug} />
            </div>
            <div className="case-meta"><div><span>Client</span><b>{study.client}</b></div><div><span>Engagement</span><b>{study.category}</b></div><div><span>Timeline</span><b>{study.duration}</b></div><a href="/#contact">Start a similar project <ArrowUpRight size={17} /></a></div>
          </div>
        </section>

        <section className="case-summary section-shell"><p>{study.summary}</p></section>

        <section className="case-story section-shell"><div className="case-story-label"><span>( 01 )</span><span>What was at stake</span></div><div><h2>From friction<br />to <em>momentum.</em></h2><p>{study.problem}</p><p>{study.approach}</p></div></section>

        <section className="case-outcomes"><div className="section-shell"><div className="section-marker section-marker--light"><span>( 02 )</span><span>The new signal</span></div><div className="case-outcome-grid">{study.outcomes.map((outcome) => <div key={outcome.label}><strong>{outcome.value}</strong><span>{outcome.label}</span></div>)}</div></div></section>

        <section className="case-build section-shell"><div><span className="eyebrow">( 03 ) Built as a system</span><h2>Designed for<br /><em>the next move.</em></h2></div><div className="case-system-list">{study.systems.map((item, index) => <div key={item}><span>0{index + 1}</span><b>{item}</b><Check size={16} /></div>)}</div></section>

        <section className="case-quote"><div className="section-shell"><Sparkles size={21} /><blockquote>“{study.quote}”</blockquote><span>{study.client} / PROJECT TEAM</span></div></section>

        <section className="case-cta section-shell"><span className="eyebrow">Your next system</span><h2>Make the work<br /><em>move itself forward.</em></h2><a className="button button--lime" href="/#contact">Start a conversation <MoveRight size={18} /></a></section>
      </main>
      <footer className="site-footer"><a className="wordmark" href="/">qvo<span>.</span>tech</a><p>Digital leverage for businesses in motion.</p><div><span>© 2026 Qvo.tech</span><a href="/">Home <ArrowDownRight size={14} /></a></div></footer>
    </div>
  );
}
