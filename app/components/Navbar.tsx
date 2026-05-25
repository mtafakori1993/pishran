"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, MoonIcon, PhoneIcon, SunIcon } from "./icons";
import Logo from "./Logo";
import {
  NavbarProductsDesktop,
  NavbarProductsMobile,
} from "./NavbarProductsMenu";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { label: "پلن‌ها", hasDropdown: true },
  { label: "محصولات", hasDropdown: true },
  { label: "درباره ما", hasDropdown: false },
  { label: "بلاگ", hasDropdown: false },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path
        d={open ? "M5 5l12 12M17 5L5 17" : "M3 6h16M3 11h16M3 16h16"}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

type NavbarProps = {
  className?: string;
};

export default function Navbar({ className }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className={["nav-glass sticky top-0 z-50", className].filter(Boolean).join(" ")}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-3 sm:h-[4.75rem] sm:gap-4 sm:px-5 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Logo className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" priority />
          <span className="text-gradient truncate text-xl font-bold tracking-tight sm:text-2xl">
            پیشران
          </span>
        </Link>

        <ul className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) =>
            link.label === "محصولات" ? (
              <NavbarProductsDesktop key={link.label} />
            ) : (
              <li key={link.label}>
                <button
                  type="button"
                  className="nav-link flex items-center gap-2"
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown size={12} className="opacity-50" />}
                </button>
              </li>
            ),
          )}
        </ul>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 md:gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-foreground-muted transition-all hover:border-accent hover:text-accent sm:h-10 sm:w-10"
            aria-label={theme === "dark" ? "حالت روشن" : "حالت تاریک"}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          <a
            href="tel:02173608272"
            className="hidden items-center gap-2 rounded-xl border border-border px-3.5 py-2.5 text-base font-medium text-foreground-muted transition-all hover:border-accent-bright hover:text-accent md:flex"
          >
            <PhoneIcon className="icon-glow h-5 w-5" />
            <span dir="ltr" className="font-en text-sm tracking-wide">
              ۰۲۱-۷۳۶۰۸۲۷۲
            </span>
          </a>

          <button
            type="button"
            className="btn-glow-secondary hidden rounded-xl px-4 py-2.5 text-base font-medium text-secondary-foreground md:block"
          >
            درخواست دمو
          </button>
          <button
            type="button"
            className="btn-glow-primary rounded-xl px-3.5 py-2.5 text-sm font-medium text-primary-foreground sm:px-4 sm:py-3 sm:text-base"
          >
            <span className="sm:hidden">شروع</span>
            <span className="hidden sm:inline">رایگان شروع کنید</span>
          </button>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-foreground-muted lg:hidden sm:h-10 sm:w-10"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            aria-label="بستن منو"
            onClick={() => setMenuOpen(false)}
          />
          <div className="nav-mobile-panel fixed inset-x-0 top-16 z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-border px-4 py-4 sm:top-[4.75rem] lg:hidden">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) =>
                link.label === "محصولات" ? (
                  <NavbarProductsMobile
                    key={link.label}
                    onClose={() => setMenuOpen(false)}
                  />
                ) : (
                  <li key={link.label}>
                    <button
                      type="button"
                      className="nav-mobile-link flex w-full items-center justify-between rounded-xl px-3 py-3.5 text-foreground transition-colors hover:bg-surface-muted"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                      {link.hasDropdown && <ChevronDown size={12} />}
                    </button>
                  </li>
                ),
              )}
            </ul>

            <a
              href="tel:02173608272"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-3.5 text-base font-medium text-foreground-muted"
            >
              <PhoneIcon className="icon-glow h-5 w-5" />
              <span dir="ltr" className="font-en">۰۲۱-۷۳۶۰۸۲۷۲</span>
            </a>

            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                className="btn-glow-secondary w-full rounded-xl px-4 py-3.5 text-base font-medium text-secondary-foreground"
              >
                درخواست دمو
              </button>
              <button
                type="button"
                className="btn-glow-primary w-full rounded-xl px-4 py-3.5 text-base font-medium text-primary-foreground"
              >
                رایگان شروع کنید
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
