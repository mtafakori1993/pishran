"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState, type CSSProperties } from "react";
import bgImage from "../assets/images/bg.jpg";
import {
  HUB,
  SEGMENTS,
  childFlyoutLabel,
  childHref,
  segmentHref,
  segmentWheelLabel,
  type EcosystemChild,
} from "@/lib/ecosystem";
import { useWheelDimensions } from "../hooks/useWheelDimensions";
import SegmentContent from "./SegmentContent";
import { useTheme } from "./ThemeProvider";

const SEG_COUNT = SEGMENTS.length;
const SLICE = 360 / SEG_COUNT;
const GAP = 1.8;

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(
  cx: number,
  cy: number,
  r0: number,
  r1: number,
  start: number,
  end: number,
) {
  const large = end - start > 180 ? 1 : 0;
  const p1 = polar(cx, cy, r1, start);
  const p2 = polar(cx, cy, r1, end);
  const p3 = polar(cx, cy, r0, end);
  const p4 = polar(cx, cy, r0, start);
  return [
    `M ${p1.x} ${p1.y}`,
    `A ${r1} ${r1} 0 ${large} 1 ${p2.x} ${p2.y}`,
    `L ${p3.x} ${p3.y}`,
    `A ${r0} ${r0} 0 ${large} 0 ${p4.x} ${p4.y}`,
    "Z",
  ].join(" ");
}

function segmentAngles(index: number) {
  const start = index * SLICE - 90 - SLICE / 2 + GAP / 2;
  const end = start + SLICE - GAP;
  const mid = (start + end) / 2;
  return { start, end, mid };
}

function posPx(x: number, y: number) {
  return { left: x, top: y };
}

function segmentContentRadius(innerR: number, outerR: number, compact: boolean) {
  const band = outerR - innerR;
  const ratio = compact ? 0.54 : 0.58;
  return innerR + band * ratio;
}

function flyoutPadFor(outerR: number, size: number) {
  return Math.round(Math.max(72, outerR * 0.48 + 24 * (size / 520)));
}

function flyoutRadius(outerR: number, size: number, extra: number) {
  return outerR + extra * (size / 520);
}

function flyoutPanelPosition(
  cx: number,
  cy: number,
  outerR: number,
  size: number,
  mid: number,
) {
  return polar(cx, cy, flyoutRadius(outerR, size, 108), mid);
}

/** Anchor flyout on the edge toward the wheel so the connector node sits on that border. */
function flyoutAnchorTransform(cx: number, cy: number, px: number, py: number) {
  const dx = cx - px;
  const dy = cy - py;
  if (Math.abs(dx) < Math.abs(dy) * 0.55) {
    return dy > 0 ? "translate(-50%, 0%)" : "translate(-50%, -100%)";
  }
  return dx > 0 ? "translate(0%, -50%)" : "translate(-100%, -50%)";
}

function SubItemsFlyout({
  segmentId,
  items,
  x,
  y,
  cx,
  cy,
}: {
  segmentId: string;
  items: EcosystemChild[];
  x: number;
  y: number;
  cx: number;
  cy: number;
}) {
  const useTwoColumns = items.length > 4;

  return (
    <div
      className="circle-menu-flyout-panel absolute"
      style={{
        ...posPx(x, y),
        transform: flyoutAnchorTransform(cx, cy, x, y),
      }}
    >
      <ul
        className={[
          "m-0 list-none p-0",
          useTwoColumns ? "grid grid-cols-2 gap-1.5" : "flex flex-col gap-1.5",
        ].join(" ")}
      >
        {items.map((child) => (
          <li key={child.id} className={useTwoColumns ? "min-w-0" : undefined}>
            <Link
              href={childHref(segmentId, child.id)}
              className="circle-menu-sub-item"
            >
              {childFlyoutLabel(child)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileSubmenu({
  segmentId,
  title,
  items,
}: {
  segmentId: string;
  title: string;
  items: EcosystemChild[];
}) {
  return (
    <div className="circle-menu-mobile-panel mt-4 w-full sm:mt-5">
      <div className="mb-2 flex items-center justify-between gap-2">
        <Link
          href={segmentHref(segmentId)}
          className="text-[18px] font-bold text-foreground transition-colors hover:text-accent"
        >
          {title}
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {items.map((child) => (
          <Link
            key={child.id}
            href={childHref(segmentId, child.id)}
            className="circle-menu-sub-item"
          >
              {childFlyoutLabel(child)}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function CircleMenu() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [wheelPaused, setWheelPaused] = useState(false);
  const { theme } = useTheme();
  const { size, cx, cy, innerR, outerR, isCompact, isMobile } = useWheelDimensions();

  const segmentMeta = useMemo(
    () =>
      SEGMENTS.map((segment, index) => ({
        segment,
        ...segmentAngles(index),
      })),
    [],
  );

  const activeSegment = segmentMeta.find(({ segment }) => segment.id === hoveredId);

  const hoverSegment = useCallback((id: string) => {
    setHoveredId(id);
    setWheelPaused(true);
  }, []);

  const clearSegment = useCallback(() => {
    setHoveredId(null);
    setWheelPaused(false);
  }, []);

  const hasChildren = Boolean(activeSegment?.segment.children?.length);
  const showFloatingChildren = hasChildren;
  const showMobilePanel =
    isMobile && hasChildren && activeSegment && size < 300;

  const contentR = segmentContentRadius(innerR, outerR, isCompact);
  const clipInnerR = innerR + 2;
  const flyoutPad = flyoutPadFor(outerR, size);
  const stageSize = size + flyoutPad * 2;
  const coreOffset = flyoutPad;

  return (
    <div
      className="relative flex w-full max-w-full flex-col items-center"
      onMouseLeave={!isMobile ? clearSegment : undefined}
    >
      <div
        className={["circle-menu-stage", isMobile ? "" : "animate-float"].join(" ")}
        style={
          {
            width: stageSize,
            height: stageSize,
            maxWidth: "100%",
            "--wheel-inner-r": `${innerR}px`,
            "--wheel-outer-r": `${outerR}px`,
          } as CSSProperties
        }
        onMouseEnter={() => setWheelPaused(true)}
      >
        <div
          className="circle-menu-core"
          style={{
            left: coreOffset,
            top: coreOffset,
            width: size,
            height: size,
          }}
        >
          <div className="circle-menu-ring-glow" aria-hidden />

          <div className="circle-menu-disc">
            <div
              className={[
                "absolute inset-0",
                wheelPaused ? "wheel-spin wheel-spin-paused" : "wheel-spin",
              ].join(" ")}
              style={{ transformOrigin: "center center" }}
            >
              <Image
                src={bgImage}
                alt=""
                fill
                priority
                className={[
                  "object-cover object-center transition-opacity duration-500",
                  theme === "dark" ? "opacity-50" : "opacity-30",
                ].join(" ")}
                sizes="(max-width: 768px) 320px, (max-width: 1024px) 440px, 520px"
              />
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    theme === "dark"
                      ? "radial-gradient(circle at 50% 50%, rgba(0,229,255,0.08) 0%, rgba(10,10,31,0.75) 70%)"
                      : "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.5) 0%, rgba(238,242,255,0.85) 70%)",
                }}
              />
            </div>
          </div>

          <div
            className="circle-menu-glass-ring"
            style={{ width: outerR * 2, height: outerR * 2 }}
            aria-hidden
          />

          <div className="absolute inset-0 z-10 touch-manipulation">
            {segmentMeta.map(({ segment, start, end, mid }) => {
              const active = hoveredId === segment.id;
              const anchor = polar(cx, cy, contentR, mid);

              return (
                <div key={segment.id}>
                  <Link
                    href={segmentHref(segment.id)}
                    aria-label={segment.label}
                    className={[
                      "circle-menu-glass absolute inset-0",
                      active ? "circle-menu-glass-active" : "",
                    ].join(" ")}
                    style={{
                      clipPath: `path('${arcPath(cx, cy, clipInnerR, outerR, start, end)}')`,
                    }}
                    onMouseEnter={() => !isMobile && hoverSegment(segment.id)}
                  />
                  <div
                    className="circle-menu-segment-content"
                    style={posPx(anchor.x, anchor.y)}
                  >
                    <SegmentContent
                      segmentId={segment.id}
                      label={segmentWheelLabel(segment)}
                      active={active}
                      compact={isCompact}
                    />
                  </div>
                </div>
              );
            })}

            <Link
              href={HUB.href}
              className="circle-menu-hub rounded-full"
              style={{
                width: innerR * 2,
                height: innerR * 2,
              }}
            >
              <span
                className={[
                  "text-gradient font-bold",
                  isCompact ? "text-[16px]" : "text-[18px]",
                ].join(" ")}
              >
                پیشران
              </span>
              <span
                className={
                  isCompact
                    ? "text-[12px] font-medium opacity-80"
                    : "text-[14px] font-medium opacity-80"
                }
              >
                {HUB.subtitle}
              </span>
            </Link>
          </div>

          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="pointer-events-none absolute inset-0 z-[8] block h-full w-full"
            aria-hidden
            style={{ overflow: "visible" }}
          >
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00E5FF" />
                <stop offset="50%" stopColor="#C026D3" />
                <stop offset="100%" stopColor="#FBBF24" />
              </linearGradient>
            </defs>
            <circle
              cx={cx}
              cy={cy}
              r={outerR}
              fill="none"
              stroke="url(#ringGrad)"
              strokeWidth={isCompact ? 1.5 : 2}
              opacity="0.65"
            />
            <circle
              cx={cx}
              cy={cy}
              r={innerR}
              fill="none"
              stroke="rgba(0, 229, 255, 0.25)"
              strokeWidth="1"
            />

            {segmentMeta.map(({ start, end }) => (
              <path
                key={`edge-${start}`}
                d={arcPath(cx, cy, clipInnerR, outerR, start, end)}
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
              />
            ))}

            {showFloatingChildren && activeSegment && (() => {
              const panel = flyoutPanelPosition(cx, cy, outerR, size, activeSegment.mid);
              const edge = polar(cx, cy, outerR, activeSegment.mid);
              return (
                <g>
                  <line
                    x1={edge.x}
                    y1={edge.y}
                    x2={panel.x}
                    y2={panel.y}
                    stroke="rgba(0,229,255,0.5)"
                    strokeWidth="1.5"
                  />
                  <circle cx={panel.x} cy={panel.y} r="4" fill="var(--luxury-cyan)" />
                </g>
              );
            })()}
          </svg>
        </div>

        {showFloatingChildren && activeSegment?.segment.children && (
          <div
            className="circle-menu-flyouts"
            style={{
              left: coreOffset,
              top: coreOffset,
              width: size,
              height: size,
            }}
            onMouseEnter={() => hoverSegment(activeSegment.segment.id)}
          >
            {(() => {
              const panel = flyoutPanelPosition(
                cx,
                cy,
                outerR,
                size,
                activeSegment.mid,
              );
              return (
                <SubItemsFlyout
                  segmentId={activeSegment.segment.id}
                  items={activeSegment.segment.children!}
                  x={panel.x}
                  y={panel.y}
                  cx={cx}
                  cy={cy}
                />
              );
            })()}
          </div>
        )}
      </div>

      {showMobilePanel && activeSegment?.segment.children && (
        <MobileSubmenu
          segmentId={activeSegment.segment.id}
          title={activeSegment.segment.label}
          items={activeSegment.segment.children}
        />
      )}

      {isMobile && !hoveredId && (
        <p className="mt-3 max-w-xs text-center text-[16px] text-foreground-subtle">
          هر بخش صفحه اختصاصی خود را دارد — روی آیتم‌ها بزنید
        </p>
      )}
    </div>
  );
}
