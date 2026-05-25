import type { CSSProperties } from "react";
import { getSegmentAccent, getSegmentIcon } from "@/lib/segment-icons";

export default function EcosystemIconBadge({
  segmentId,
  size = "md",
}: {
  segmentId: string;
  size?: "md" | "lg";
}) {
  const Icon = getSegmentIcon(segmentId);
  const accent = getSegmentAccent(segmentId);

  return (
    <div
      className={[
        "ecosystem-icon-badge",
        size === "lg" ? "ecosystem-icon-badge-lg" : "",
      ].join(" ")}
      style={
        {
          "--segment-hue": accent.hue,
          "--segment-glow": accent.glow,
          "--segment-gradient": accent.gradient,
        } as CSSProperties
      }
    >
      <span className="ecosystem-icon-badge-ring" aria-hidden />
      <Icon className="ecosystem-icon-badge-icon" />
    </div>
  );
}
