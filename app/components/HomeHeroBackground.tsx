"use client";

import { useEffect, useState } from "react";
import ParticleNetworkBackground from "./ParticleNetworkBackground";

export default function HomeHeroBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <ParticleNetworkBackground
        particleColor="#888"
        interactive={true}
        speed="medium"
        density={isMobile ? "low" : "high"}
        className="absolute inset-0 size-full"
      />
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-25" />
    </div>
  );
}
