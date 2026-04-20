"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/windows", label: "Windows" },
  { href: "/doors", label: "Doors" },
  { href: "/conservatories", label: "Conservatories" },
  { href: "/quote", label: "Quote Calculator" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-navy-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground font-bold">
            CV
          </div>
          <span className="text-lg font-semibold text-navy-900 hidden sm:inline">
            Clearview Glazing
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6" aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium text-navy-700 hover:text-primary transition-colors",
                pathname === item.href && "text-primary",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="tel:08001234567"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-navy-800 hover:text-primary"
          >
            <Phone className="h-4 w-4" />
            0800 123 4567
          </a>
          <Button asChild variant="accent" size="sm" className="hidden sm:inline-flex">
            <Link href="/quote">Get Quote</Link>
          </Button>
          <button
            type="button"
            className="lg:hidden p-2"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t bg-white">
          <nav className="container flex flex-col py-4 gap-1" aria-label="Mobile">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium text-navy-700 hover:bg-secondary",
                  pathname === item.href && "bg-secondary text-primary",
                )}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="tel:08001234567"
              className="mt-2 flex items-center gap-2 px-3 py-2 text-sm font-medium text-navy-800"
            >
              <Phone className="h-4 w-4" /> 0800 123 4567
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
