type IconProps = { className?: string; size?: number };

export function ChevronDown({ className, size = 10 }: IconProps) {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 10 6"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M1 1L5 5L9 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PhoneIcon({ className, size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M3.5 2h2.2l1 2.5-1.3 1c.9 1.8 2.3 3.2 4.1 4.1l1-1.3 2.5 1v2.2c0 .6-.5 1-1 1C6.8 13.5 2.5 9.2 2.5 3.5c0-.6.4-1 1-1.5z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={className ?? "h-8 w-8"}
    >
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="100%" stopColor="#C026D3" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="28" height="28" rx="8" fill="url(#logoGrad)" />
      <path
        d="M10 11h12M10 16h9M10 21h12"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TrendUpIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 16l6-6 4 4 6-10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 4h6v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChartBarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="4" y="12" width="4" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="10" y="8" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="16" y="4" width="4" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function WalletIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M3 8h18v11a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M3 8V7a2 2 0 012-2h13"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M16 13.5h4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="17.5" cy="13.5" r="1.25" fill="currentColor" />
    </svg>
  );
}

export function BuildingIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 21V8l8-4 8 4v13"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 21v-7h6v7M9 12h2M13 12h2M9 16h2M13 16h2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MegaphoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M3 11v2l9 5V6L3 11z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M14 9h2.5a2.5 2.5 0 010 5H15M17 7v10"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path d="M6 8v8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function CarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M5 12l1.2-4h11.6L19 12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 16h16M7 16v2M17 16v2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="7.5" cy="16" r="1.25" fill="currentColor" />
      <circle cx="16.5" cy="16" r="1.25" fill="currentColor" />
      <path d="M7 12h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

export function StoreIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 10h16l-1.2-4H5.2L4 10z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M5 10v10h14V10"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 14h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M12 10v4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

export function CartIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="9" cy="20" r="1.5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="18" cy="20" r="1.5" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M2 4h2l2.2 11.2a1 1 0 001 .8H19l2.2-9.2H7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 8h6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

export function TvIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="2.5" y="5" width="19" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
      <path d="M9 20h6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path
        d="M10.5 10.5l4 2.5-4 2.5v-5z"
        fill="currentColor"
        fillOpacity="0.85"
      />
    </svg>
  );
}

export function UtensilsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M6 3v7a1 1 0 001 1v9M8 3v7a1 1 0 00-1 1v9"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M14 3c2.5 0 4.5 2 4.5 4.5V13c0 2-1.5 3.5-4.5 3.5V21"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PiggyIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <ellipse cx="12" cy="13" rx="7.5" ry="5.5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="15.5" cy="11.5" r="1" fill="currentColor" />
      <path
        d="M5.5 13H3.5M20.5 13h-2M12 7.5v1"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M16.5 9.5c1.5-1 3-0.5 3.5 1"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function GiftIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3.5" y="10" width="17" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
      <path d="M12 10v10M3.5 10h17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path
        d="M12 6.5c-2.2-2.2-4.5-0.8-4.5 1.5H12M12 6.5c2.2-2.2 4.5-0.8 4.5 1.5H12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 6.5v3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function SunIcon({ className, size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function MoonIcon({ className, size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M21 14.5A8.5 8.5 0 1112.5 3a7 7 0 008.5 11.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
