"use client";

import SegmentVisual from "./SegmentVisual";

function labelSize(label: string, compact: boolean) {
  if (compact) return label.length > 9 ? 13 : 14;
  return label.length > 12 ? 14 : label.length > 9 ? 15 : 16;
}

export default function SegmentContent({
  segmentId,
  label,
  active,
  compact,
}: {
  segmentId: string;
  label: string;
  active: boolean;
  compact: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2">
      <SegmentVisual segmentId={segmentId} active={active} compact={compact} />
      <span
        className={[
          "circle-menu-label circle-menu-label-wrap",
          active ? "circle-menu-label-active" : "",
        ].join(" ")}
        style={{ fontSize: labelSize(label, compact) }}
      >
        {label}
      </span>
    </div>
  );
}
