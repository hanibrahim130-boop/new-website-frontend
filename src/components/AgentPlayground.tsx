import { useMemo, useState } from "react";
import { ArrowUpRight, Bot, Check, LoaderCircle, ShieldCheck, Sparkles } from "lucide-react";

type AgentRole = "Lead qualifier" | "Client success" | "Operations analyst";
type RunState = "idle" | "running" | "complete";

const roleDetails: Record<AgentRole, { label: string; description: string; response: string; actions: string[] }> = {
  "Lead qualifier": {
    label: "Revenue / inbound",
    description: "Turn an enquiry into a focused next action.",
    response: "The opportunity is a high-fit prospect. The agent has isolated the commercial need, surfaced the buying signal, and prepared a concise handoff for the sales team.",
    actions: ["Enrichment complete", "Fit scored: 92/100", "Call brief created"],
  },
  "Client success": {
    label: "Service / retention",
    description: "Resolve the routine, preserve the relationship.",
    response: "The request has been classified as time-sensitive but straightforward. The agent drafted a helpful reply, logged the account context, and scheduled a human follow-up only where value is at stake.",
    actions: ["Intent recognised", "Response drafted", "Context logged"],
  },
  "Operations analyst": {
    label: "Ops / intelligence",
    description: "Turn scattered signals into a decisive brief.",
    response: "The agent has condensed the operating signal into an actionable summary, flagged the exception worth attention, and assigned the next best action to the appropriate owner.",
    actions: ["Inputs connected", "Pattern surfaced", "Owner notified"],
  },
};

export function AgentPlayground() {
  const [role, setRole] = useState<AgentRole>("Lead qualifier");
  const [brief, setBrief] = useState("A prospective client has asked about an AI-enabled service portal for their growing team.");
  const [runState, setRunState] = useState<RunState>("idle");

  const details = useMemo(() => roleDetails[role], [role]);

  const runAgent = () => {
    setRunState("running");
    window.setTimeout(() => setRunState("complete"), 1050);
  };

  const statusCopy = runState === "idle" ? "Ready for a scenario" : runState === "running" ? "Mapping the moment" : "Action plan prepared";

  return (
    <section className="playground-section" id="playground">
      <div className="section-shell playground-shell">
        <div className="playground-heading" data-reveal>
          <div className="section-marker"><span>( 04 )</span><span>Qvo Signal Lab</span></div>
          <div className="playground-heading-grid">
            <h2>Meet the agent<br />before you <em>build it.</em></h2>
            <div>
              <p>Pick the role, describe the moment, then watch a simulated Qvo agent transform the noise into a next move.</p>
              <span className="demo-label"><ShieldCheck size={14} /> Demo mode — no data leaves this page</span>
            </div>
          </div>
        </div>

        <div className="playground" data-reveal>
          <div className="playground-controls">
            <div className="playground-control-head"><span className="eyebrow">Configure a role</span><span>01 / 02</span></div>
            <div className="role-selector" role="radiogroup" aria-label="Choose an agent role">
              {(Object.keys(roleDetails) as AgentRole[]).map((option) => (
                <button
                  className={option === role ? "role-option role-option--active" : "role-option"}
                  type="button"
                  key={option}
                  role="radio"
                  aria-checked={option === role}
                  onClick={() => { setRole(option); setRunState("idle"); }}
                >
                  <span className="role-index">0{(Object.keys(roleDetails) as AgentRole[]).indexOf(option) + 1}</span>
                  <span><b>{option}</b><small>{roleDetails[option].description}</small></span>
                  <Bot size={18} />
                </button>
              ))}
            </div>

            <label className="scenario-field">
              <span className="eyebrow">Give the agent a moment</span>
              <textarea value={brief} onChange={(event) => setBrief(event.target.value)} maxLength={220} aria-label="Agent scenario" />
              <small>{brief.length}/220</small>
            </label>
            <button className="run-agent-button" type="button" onClick={runAgent} disabled={runState === "running"}>
              {runState === "running" ? <LoaderCircle className="spin" size={17} /> : <Sparkles size={17} />}
              {runState === "running" ? "Running signal" : "Run the scenario"}
              <ArrowUpRight size={17} />
            </button>
          </div>

          <div className="playground-output" aria-live="polite">
            <div className="output-topline"><span className="console-brand"><Bot size={15} /> {role.toUpperCase()}</span><span className={runState === "running" ? "output-status output-status--working" : "output-status"}><i /> {statusCopy}</span></div>
            <div className="output-stage">
              <div className={runState === "running" ? "signal-orb signal-orb--working" : "signal-orb"} aria-hidden="true"><div><Bot size={29} /></div></div>
              <div className="output-copy">
                <span>{details.label}</span>
                <h3>{runState === "idle" ? "A sharper next move, in view." : runState === "running" ? "Connecting the signal…" : "This is where momentum starts."}</h3>
                <p>{runState === "idle" ? "The lab is ready. Use the scenario above to see how an agent can make the ordinary work move itself forward." : runState === "running" ? "Reading the brief, matching the workflow, and preparing the operational handoff." : details.response}</p>
              </div>
            </div>
            <div className="output-steps">
              {details.actions.map((action, index) => (
                <div className={runState === "complete" ? "output-step output-step--done" : "output-step"} key={action}>
                  <span>{runState === "complete" ? <Check size={14} /> : `0${index + 1}`}</span>{action}
                </div>
              ))}
            </div>
            <div className="output-footer"><span><i /> simulated Qvo agent output</span><a href="#contact">Design a real agent <ArrowUpRight size={15} /></a></div>
          </div>
        </div>
      </div>
    </section>
  );
}
