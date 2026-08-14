import { useEffect, useRef } from "react";

export function QvoIndex() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const setRestingTilt = () => {
      scene.style.setProperty("--tilt-x", "-7deg");
      scene.style.setProperty("--tilt-y", "12deg");
    };

    setRestingTilt();
    return () => setRestingTilt();
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--tilt-x", `${-7 - y * 16}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${12 + x * 22}deg`);
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--tilt-x", "-7deg");
    event.currentTarget.style.setProperty("--tilt-y", "12deg");
  };

  return (
    <div
      className="qvo-index"
      ref={sceneRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-label="Interactive three-dimensional Qvo Index artwork"
      role="img"
    >
      <div className="qvo-index__measure qvo-index__measure--top"><span>01 / INDEX</span><i /></div>
      <div className="qvo-index__measure qvo-index__measure--right"><span>MOVE</span><i /></div>
      <div className="qvo-index__tilt">
        <div className="qvo-index__orbit qvo-index__orbit--large" />
        <div className="qvo-index__orbit qvo-index__orbit--small" />
        <div className="qvo-index__object">
          <div className="qvo-index__axis" />
          <div className="qvo-index__ring qvo-index__ring--one" />
          <div className="qvo-index__ring qvo-index__ring--two" />
          <div className="qvo-index__cube">
            <span className="qvo-index__face qvo-index__face--front" />
            <span className="qvo-index__face qvo-index__face--back" />
            <span className="qvo-index__face qvo-index__face--right" />
            <span className="qvo-index__face qvo-index__face--left" />
            <span className="qvo-index__face qvo-index__face--top" />
            <span className="qvo-index__face qvo-index__face--bottom" />
          </div>
          <div className="qvo-index__slab qvo-index__slab--one" />
          <div className="qvo-index__slab qvo-index__slab--two" />
          <span className="qvo-index__point qvo-index__point--one" />
          <span className="qvo-index__point qvo-index__point--two" />
        </div>
      </div>
      <div className="qvo-index__floor" />
      <div className="qvo-index__caption"><span>THE QVO INDEX</span><b>01</b></div>
    </div>
  );
}
