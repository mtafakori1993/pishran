"use client";

import { getSegmentIcon } from "@/lib/segment-icons";

export default function SegmentVisual({
  segmentId,
  active,
  compact = false,
}: {
  segmentId: string;
  active: boolean;
  compact?: boolean;
}) {
  const Icon = getSegmentIcon(segmentId);

  return (
    <Icon
      className={[
        "shrink-0 transition-all duration-300",
        compact ? "h-5 w-5" : "h-7 w-7",
        active ? "icon-glow scale-110" : "scale-100 text-foreground-muted opacity-80",
      ].join(" ")}
      aria-hidden
    />
  );
}
