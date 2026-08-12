type ChapterHandoffProps = {
  number: string;
  label: string;
  tone?: "ink" | "paper" | "blue";
};

export function ChapterHandoff({ number, label, tone = "ink" }: ChapterHandoffProps) {
  return (
    <div className={`chapter-handoff chapter-handoff--${tone}`} data-handoff aria-hidden="true">
      <div className="chapter-handoff__plane chapter-handoff__plane--a" />
      <div className="chapter-handoff__plane chapter-handoff__plane--b" />
      <div className="chapter-handoff__line"><span>{number}</span><i /><span>{label}</span></div>
      <div className="chapter-handoff__marker">QVO</div>
    </div>
  );
}
