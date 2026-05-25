import type { ComponentType } from "react";
import {
  BuildingIcon,
  CarIcon,
  CartIcon,
  GiftIcon,
  MegaphoneIcon,
  PiggyIcon,
  StoreIcon,
  TvIcon,
  UtensilsIcon,
  WalletIcon,
} from "@/app/components/icons";

export type SegmentIconProps = { className?: string };

export const SEGMENT_ICON_MAP: Record<
  string,
  ComponentType<SegmentIconProps>
> = {
  supermarket: CartIcon,
  trade: StoreIcon,
  tv: TvIcon,
  ads: MegaphoneIcon,
  taxi: CarIcon,
  restaurant: UtensilsIcon,
  funds: PiggyIcon,
  offers: GiftIcon,
  construction: BuildingIcon,
  business: WalletIcon,
};

/** Accent colors per segment for icon badges and hover glow */
export const SEGMENT_ACCENTS: Record<
  string,
  { hue: string; glow: string; gradient: string }
> = {
  supermarket: {
    hue: "#00e5ff",
    glow: "rgba(0, 229, 255, 0.35)",
    gradient: "linear-gradient(135deg, rgba(0,229,255,0.25) 0%, rgba(0,229,255,0.05) 100%)",
  },
  trade: {
    hue: "#818cf8",
    glow: "rgba(129, 140, 248, 0.35)",
    gradient: "linear-gradient(135deg, rgba(129,140,248,0.28) 0%, rgba(99,102,241,0.06) 100%)",
  },
  tv: {
    hue: "#e879f9",
    glow: "rgba(232, 121, 249, 0.35)",
    gradient: "linear-gradient(135deg, rgba(232,121,249,0.28) 0%, rgba(192,38,211,0.06) 100%)",
  },
  ads: {
    hue: "#fbbf24",
    glow: "rgba(251, 191, 36, 0.35)",
    gradient: "linear-gradient(135deg, rgba(251,191,36,0.28) 0%, rgba(217,119,6,0.06) 100%)",
  },
  taxi: {
    hue: "#38bdf8",
    glow: "rgba(56, 189, 248, 0.35)",
    gradient: "linear-gradient(135deg, rgba(56,189,248,0.28) 0%, rgba(37,99,235,0.06) 100%)",
  },
  restaurant: {
    hue: "#fb7185",
    glow: "rgba(251, 113, 133, 0.35)",
    gradient: "linear-gradient(135deg, rgba(251,113,133,0.28) 0%, rgba(190,24,93,0.06) 100%)",
  },
  funds: {
    hue: "#34d399",
    glow: "rgba(52, 211, 153, 0.35)",
    gradient: "linear-gradient(135deg, rgba(52,211,153,0.28) 0%, rgba(5,150,105,0.06) 100%)",
  },
  offers: {
    hue: "#c026d3",
    glow: "rgba(192, 38, 211, 0.35)",
    gradient: "linear-gradient(135deg, rgba(192,38,211,0.28) 0%, rgba(162,28,175,0.06) 100%)",
  },
  construction: {
    hue: "#a78bfa",
    glow: "rgba(167, 139, 250, 0.35)",
    gradient: "linear-gradient(135deg, rgba(167,139,250,0.28) 0%, rgba(109,40,217,0.06) 100%)",
  },
  business: {
    hue: "#00e5ff",
    glow: "rgba(0, 229, 255, 0.3)",
    gradient: "linear-gradient(135deg, rgba(0,229,255,0.22) 0%, rgba(192,38,211,0.12) 100%)",
  },
};

export function getSegmentIcon(segmentId: string) {
  return SEGMENT_ICON_MAP[segmentId] ?? CartIcon;
}

export function getSegmentAccent(segmentId: string) {
  return (
    SEGMENT_ACCENTS[segmentId] ?? {
      hue: "var(--luxury-cyan)",
      glow: "rgba(0, 229, 255, 0.3)",
      gradient:
        "linear-gradient(135deg, rgba(0,229,255,0.2) 0%, rgba(192,38,211,0.08) 100%)",
    }
  );
}
