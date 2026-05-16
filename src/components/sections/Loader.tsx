import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
          onComplete,
        });
      },
    });

    tl.to(
      {},
      {
        duration: 1.8,
        onUpdate: function () {
          setProgress(Math.round(this.progress() * 100));
        },
        ease: "power2.inOut",
      }
    );

    const starEl = loaderRef.current?.querySelector(".loader-star");
    if (starEl) {
      gsap.to(starEl, {
        rotation: 360,
        duration: 2,
        ease: "power1.inOut",
      });
      gsap.fromTo(
        starEl,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
      );
    }
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[100] bg-light flex flex-col items-center justify-center"
    >
      <p className="text-sm text-dark/40 font-medium absolute top-8 left-8">
        {progress}%
      </p>

      <svg
        className="loader-star w-12 h-12 text-dark/20"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
      </svg>
    </div>
  );
}
