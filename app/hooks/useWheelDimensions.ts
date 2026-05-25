"use client";

import { useEffect, useState } from "react";

const BASE = 520;
const BASE_INNER = 72;
const BASE_OUTER = 238;

export type WheelDimensions = {
  size: number;
  cx: number;
  cy: number;
  innerR: number;
  outerR: number;
  isCompact: boolean;
  isMobile: boolean;
};

function computeSize(width: number): number {
  const pad = width < 400 ? 24 : width < 640 ? 32 : 48;
  const maxByViewport = width - pad;

  if (width < 380) return Math.min(280, maxByViewport);
  if (width < 640) return Math.min(320, maxByViewport);
  if (width < 768) return Math.min(380, maxByViewport);
  if (width < 1024) return Math.min(440, maxByViewport);
  return Math.min(BASE, maxByViewport);
}

export function getWheelDimensions(width: number): WheelDimensions {
  const size = Math.round(computeSize(width));
  const scale = size / BASE;
  const innerR = Math.round(BASE_INNER * scale);
  const outerR = Math.round(BASE_OUTER * scale);

  return {
    size,
    cx: size / 2,
    cy: size / 2,
    innerR,
    outerR,
    isCompact: size < 360,
    isMobile: width < 768,
  };
}

export function useWheelDimensions(): WheelDimensions {
  const [dims, setDims] = useState<WheelDimensions>(() =>
    typeof window !== "undefined"
      ? getWheelDimensions(window.innerWidth)
      : getWheelDimensions(1024),
  );

  useEffect(() => {
    const update = () => setDims(getWheelDimensions(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return dims;
}
