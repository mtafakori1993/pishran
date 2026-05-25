"use client";

import { useEffect, useRef } from "react";
import { ParticleNetwork } from "@/lib/particle-network";

type ParticleNetworkBackgroundProps = {
  particleColor?: string;
  interactive?: boolean;
  speed?: "fast" | "slow" | "medium" | "none";
  density?: "high" | "low" | number;
  className?: string;
};

export default function ParticleNetworkBackground({
  particleColor = "#fff",
  interactive = true,
  speed = "fast",
  density = "high",
  className = "",
}: ParticleNetworkBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<ParticleNetwork | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let observer: ResizeObserver | null = null;

    const mount = () => {
      if (el.offsetWidth < 1 || el.offsetHeight < 1) return false;
      if (networkRef.current) return true;

      networkRef.current = new ParticleNetwork(el, {
        particleColor,
        interactive,
        speed,
        density,
      });
      return true;
    };

    if (!mount()) {
      observer = new ResizeObserver(() => {
        mount();
      });
      observer.observe(el);
    }

    return () => {
      observer?.disconnect();
      networkRef.current?.destroy();
      networkRef.current = null;
    };
  }, [particleColor, interactive, speed, density]);

  return (
    <div
      ref={containerRef}
      id="particle-canvas"
      className={`particle-network-host ${className}`.trim()}
      aria-hidden
    />
  );
}
