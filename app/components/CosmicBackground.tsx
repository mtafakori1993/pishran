"use client";

import { useTheme } from "./ThemeProvider";

export default function CosmicBackground({ variant = "hero" }: { variant?: "hero" | "subtle" }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const isHero = variant === "hero";

  return (
    <div
      className={
        isHero
          ? "pointer-events-none absolute inset-0 z-0"
          : "pointer-events-none absolute inset-0 z-0 cosmic-bg"
      }
      aria-hidden
    >
      {!isHero && <div className="absolute inset-0 grid-overlay opacity-60" />}
      {isHero && (
        <>
          <div
            className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[100px]"
            style={{ background: "radial-gradient(circle, rgba(192,38,211,0.35) 0%, transparent 70%)" }}
          />
          <div
            className="pointer-events-none absolute right-[10%] top-[20%] h-[300px] w-[400px] rounded-full opacity-15 blur-[80px]"
            style={{ background: "radial-gradient(circle, rgba(0,229,255,0.3) 0%, transparent 70%)" }}
          />
        </>
      )}
      {(!isDark || variant === "subtle") && (
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: isDark
              ? undefined
              : "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(224,231,255,0.8) 0%, transparent 60%)",
          }}
        />
      )}
    </div>
  );
}
