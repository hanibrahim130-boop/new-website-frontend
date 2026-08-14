import { useRef, type PointerEvent } from "react";

/**
 * A bespoke, editorial Qvo signature object. It deliberately avoids a generic
 * CSS/WebGL demo in favour of a dependable identity gesture with subtle direct
 * manipulation: the composition responds to a visitor's pointer without ever
 * overpowering the hero message.
 */
export function QvoSculpture() {
  const sculptureRef = useRef<HTMLDivElement>(null);

  const setRestingPosition = () => {
    sculptureRef.current?.style.setProperty("--qvo-shift-x", "0px");
    sculptureRef.current?.style.setProperty("--qvo-shift-y", "0px");
    sculptureRef.current?.style.setProperty("--qvo-rotation", "0deg");
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const frame = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - frame.left) / frame.width - 0.5;
    const y = (event.clientY - frame.top) / frame.height - 0.5;

    sculptureRef.current?.style.setProperty("--qvo-shift-x", `${x * 17}px`);
    sculptureRef.current?.style.setProperty("--qvo-shift-y", `${y * 17}px`);
    sculptureRef.current?.style.setProperty("--qvo-rotation", `${x * 4}deg`);
  };

  return (
    <div
      className="qvo-sculpture"
      ref={sculptureRef}
      aria-label="Qvo signature object"
      role="img"
      onPointerMove={handlePointerMove}
      onPointerLeave={setRestingPosition}
    >
      <div className="qvo-sculpture__halo" aria-hidden="true" />
      <svg className="qvo-sculpture__fallback" viewBox="0 0 800 800" aria-hidden="true">
        <defs>
          <linearGradient id="qvoRing" x1="180" y1="150" x2="585" y2="615" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f3e7d7" />
            <stop offset=".42" stopColor="#e47958" />
            <stop offset="1" stopColor="#bb513e" />
          </linearGradient>
          <linearGradient id="qvoTail" x1="470" y1="430" x2="625" y2="660" gradientUnits="userSpaceOnUse">
            <stop stopColor="#b0afe9" />
            <stop offset="1" stopColor="#7574c6" />
          </linearGradient>
          <radialGradient id="qvoGlow" cx="0" cy="0" r="1" gradientTransform="translate(391 386) rotate(90) scale(270)">
            <stop stopColor="#df7358" stopOpacity=".28" />
            <stop offset="1" stopColor="#df7358" stopOpacity="0" />
          </radialGradient>
          <filter id="qvoShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="22" dy="30" stdDeviation="22" floodColor="#090909" floodOpacity=".38" />
          </filter>
        </defs>
        <circle cx="400" cy="400" r="302" fill="none" stroke="#f4efe8" strokeOpacity=".16" />
        <ellipse cx="400" cy="400" rx="282" ry="252" fill="url(#qvoGlow)" />
        <g className="qvo-sculpture__mark" filter="url(#qvoShadow)">
          <circle cx="380" cy="379" r="168" fill="none" stroke="url(#qvoRing)" strokeWidth="54" />
          <rect x="493" y="465" width="53" height="204" rx="20" fill="url(#qvoTail)" transform="rotate(-44 493 465)" />
          <circle cx="222" cy="247" r="28" fill="#f3e7d7" />
          <circle cx="222" cy="247" r="14" fill="#e47958" />
        </g>
        <path d="M178 570C260 650 492 707 646 526" fill="none" stroke="#f4efe8" strokeOpacity=".3" strokeWidth="1.5" />
        <circle cx="650" cy="525" r="8" fill="#f3e7d7" />
        <circle cx="624" cy="158" r="5" fill="#e47958" />
      </svg>
      <div className="qvo-sculpture__caption"><span>QVO / STUDIO INDEX</span><i /><span>MOVE TO SHIFT</span></div>
    </div>
  );
}

export default QvoSculpture;
