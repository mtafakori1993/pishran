"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "./icons";
import {
  HUB,
  SEGMENTS,
  childFlyoutLabel,
  childHref,
  segmentHref,
  segmentWheelLabel,
} from "@/lib/ecosystem";

function ProductsTree({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <ul className="nav-tree">
      <li className="nav-tree-item">
        <Link
          href={HUB.href}
          onClick={onNavigate}
          className="nav-tree-link nav-tree-link-hub"
        >
          {HUB.title}
        </Link>
      </li>
      {SEGMENTS.map((segment) => (
        <li key={segment.id} className="nav-tree-item">
          <Link
            href={segmentHref(segment.id)}
            onClick={onNavigate}
            className="nav-tree-link nav-tree-link-parent"
          >
            {segmentWheelLabel(segment)}
          </Link>
          {segment.children && segment.children.length > 0 && (
            <ul className="nav-tree-children">
              {segment.children.map((child) => (
                <li key={child.id}>
                  <Link
                    href={childHref(segment.id, child.id)}
                    onClick={onNavigate}
                    className="nav-tree-link nav-tree-link-child"
                  >
                    {childFlyoutLabel(child)}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

export function NavbarProductsDesktop() {
  const [open, setOpen] = useState(false);

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="nav-link flex items-center gap-2"
        aria-expanded={open}
        aria-haspopup="true"
      >
        محصولات
        <ChevronDown
          size={12}
          className={["opacity-50 transition-transform", open ? "rotate-180" : ""].join(
            " ",
          )}
        />
      </button>
      {open && (
        <div className="absolute start-0 top-full z-[60] pt-2">
          <div className="nav-dropdown-glass">
            <ProductsTree />
          </div>
        </div>
      )}
    </li>
  );
}

export function NavbarProductsMobile({ onClose }: { onClose: () => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <li>
      <button
        type="button"
        className="nav-mobile-link flex w-full items-center justify-between rounded-xl px-3 py-3.5 text-foreground transition-colors hover:bg-surface-muted"
        aria-expanded={expanded}
        onClick={() => setExpanded((e) => !e)}
      >
        محصولات
        <ChevronDown
          size={12}
          className={["opacity-60 transition-transform", expanded ? "rotate-180" : ""].join(
            " ",
          )}
        />
      </button>
      {expanded && (
        <div className="nav-dropdown-glass nav-dropdown-glass-inset mt-1 mb-2">
          <ProductsTree onNavigate={onClose} />
        </div>
      )}
    </li>
  );
}
