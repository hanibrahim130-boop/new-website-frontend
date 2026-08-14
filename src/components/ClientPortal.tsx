import { useState } from "react";
import { ArrowUpRight, Bell, CalendarDays, Check, ChevronRight, CircleHelp, FileText, FolderKanban, LayoutDashboard, MessageSquare, MoreHorizontal, Plus, Search, Sparkles } from "lucide-react";

type ProjectKey = "Velocity platform" | "Relay agent layer";

const projectData: Record<ProjectKey, { phase: string; progress: number; due: string; accent: string; deliverables: Array<{ name: string; type: string; status: string }> }> = {
  "Velocity platform": {
    phase: "Experience architecture",
    progress: 68,
    due: "Design review · Thu 14 Aug",
    accent: "#d9ff3f",
    deliverables: [
      { name: "Product north star", type: "Notion brief", status: "Approved" },
      { name: "Operator dashboard v1", type: "Figma prototype", status: "In review" },
      { name: "Design system foundations", type: "Component library", status: "In progress" },
    ],
  },
  "Relay agent layer": {
    phase: "Agent orchestration",
    progress: 42,
    due: "Workflow walkthrough · Tue 19 Aug",
    accent: "#6c7dff",
    deliverables: [
      { name: "Intent map", type: "Systems diagram", status: "Approved" },
      { name: "Qualification agent", type: "Conversation flow", status: "In review" },
      { name: "CRM handoff spec", type: "Integration brief", status: "In progress" },
    ],
  },
};

export function ClientPortal() {
  const [project, setProject] = useState<ProjectKey>("Velocity platform");
  const [showUpdate, setShowUpdate] = useState(false);
  const details = projectData[project];

  return (
    <div className="portal-page">
      <aside className="portal-sidebar">
        <a className="portal-logo" href="/">qvo<span>.</span>tech <small>CLIENT SPACE</small></a>
        <div className="portal-workspace"><span>WORKSPACE</span><button type="button">Northstar Group <ChevronRight size={15} /></button></div>
        <nav aria-label="Client portal navigation"><a className="is-active" href="#overview"><LayoutDashboard size={17} /> Overview</a><a href="#deliverables"><FolderKanban size={17} /> Deliverables <b>3</b></a><a href="#timeline"><CalendarDays size={17} /> Timeline</a><a href="#messages"><MessageSquare size={17} /> Messages <b>2</b></a><a href="#files"><FileText size={17} /> Shared files</a></nav>
        <div className="portal-sidebar-bottom"><a href="/#contact"><CircleHelp size={17} /> Need a hand?</a><a href="/"><ArrowUpRight size={17} /> Back to Qvo.tech</a></div>
      </aside>

      <main className="portal-main" id="overview">
        <header className="portal-topbar"><div><span className="portal-demo-label"><Sparkles size={14} /> Portal interface preview</span><p>This preview uses fictional project data and is not a secure client workspace.</p></div><div className="portal-top-actions"><button type="button" aria-label="Search workspace"><Search size={18} /></button><button type="button" aria-label="Notifications"><Bell size={18} /><i /></button><span className="portal-avatar">NG</span></div></header>

        <div className="portal-content">
          <section className="portal-welcome"><div><span>GOOD MORNING, NORTHSTAR</span><h1>Build the next<br /><em>clear thing.</em></h1><p>Everything moving across your Qvo engagement, in one considered view.</p></div><button type="button" className="portal-update-button" onClick={() => setShowUpdate((visible) => !visible)}><Plus size={17} /> Request an update</button></section>
          {showUpdate && <div className="portal-update-note"><Check size={16} /> Your project lead will receive an update request in this demo interface.</div>}

          <section className="portal-project-switcher" aria-label="Choose a project">{(Object.keys(projectData) as ProjectKey[]).map((item) => <button key={item} type="button" className={item === project ? "portal-project-card is-selected" : "portal-project-card"} onClick={() => setProject(item)}><span><i style={{ background: projectData[item].accent }} /> {item === "Velocity platform" ? "V/01" : "A/24"}</span><b>{item}</b><small>{projectData[item].phase}</small><ChevronRight size={17} /></button>)}</section>

          <section className="portal-overview-grid">
            <article className="portal-status-card"><div className="portal-card-heading"><span>ACTIVE PROJECT</span><MoreHorizontal size={18} /></div><h2>{project}</h2><p>{details.phase}</p><div className="portal-progress"><div><span>Project momentum</span><b>{details.progress}%</b></div><i><em style={{ width: `${details.progress}%`, background: details.accent }} /></i><small>{details.due}</small></div><div className="portal-team"><span>Qvo core team</span><div><i>RS</i><i>AN</i><i>JB</i><b>+2</b></div></div></article>
            <article className="portal-next-card"><div className="portal-card-heading"><span>UP NEXT</span><CalendarDays size={18} /></div><span className="portal-date">14<span>AUG</span></span><h3>Design review<br />and decision room.</h3><p>60 min · Video room · Qvo + Northstar core team</p><button type="button">Open calendar <ArrowUpRight size={16} /></button></article>
          </section>

          <section className="portal-deliverables" id="deliverables"><div className="portal-section-heading"><div><span>DELIVERABLES</span><h2>Made to move.</h2></div><button type="button">View all <ArrowUpRight size={16} /></button></div><div className="portal-deliverable-list">{details.deliverables.map((deliverable, index) => <article key={deliverable.name}><span>0{index + 1}</span><div><b>{deliverable.name}</b><small>{deliverable.type}</small></div><em className={deliverable.status === "Approved" ? "status-approved" : deliverable.status === "In review" ? "status-review" : "status-progress"}>{deliverable.status}</em><button type="button" aria-label={`Open ${deliverable.name}`}><ArrowUpRight size={17} /></button></article>)}</div></section>

          <section className="portal-bottom-grid"><article className="portal-activity" id="timeline"><div className="portal-section-heading"><div><span>LIVE ACTIVITY</span><h2>The work is moving.</h2></div><button type="button">View timeline <ArrowUpRight size={16} /></button></div><div className="activity-list"><div><i className="activity-dot activity-dot--lime" /><span><b>Qvo added a new Figma prototype</b><small>Operator dashboard v1 · 18 min ago</small></span></div><div><i className="activity-dot activity-dot--blue" /><span><b>Northstar approved the product north star</b><small>Direction locked · Yesterday</small></span></div><div><i className="activity-dot" /><span><b>Weekly project note was shared</b><small>Read time: 3 min · Tuesday</small></span></div></div></article><article className="portal-message" id="messages"><div><span>YOUR QVO LEAD</span><i>RS</i></div><h3>“The next review is where we turn the prototype into a buildable system.”</h3><button type="button">Message Rowan <MessageSquare size={16} /></button></article></section>
        </div>
      </main>
    </div>
  );
}
