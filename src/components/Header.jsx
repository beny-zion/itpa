"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Helper function to create proper href for sections
  const getSectionHref = (hash) => {
    return isHomePage ? hash : `/${hash}`;
  };

  const navItems = [
    { href: getSectionHref("#about"), label: "אודות" },
    { href: getSectionHref("#goals"), label: "מטרות" },
    { href: getSectionHref("#activities"), label: "תחומי פעילות" },
    { href: getSectionHref("#committees"), label: "ועדות" },
    { href: getSectionHref("#pools"), label: "אינדקס בריכות" },
    { href: "/contact", label: "צור קשר" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4" aria-label="ניווט ראשי">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-primary"
            aria-label="עמוד הבית - איגוד הבריכות הטיפוליות"
          >
            <Image
              src="/bti_logo.svg"
              alt="לוגו איגוד הבריכות הטיפוליות"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span className="hidden sm:inline">איגוד הבריכות הטיפוליות</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-4">
            <Button asChild variant="outline">
              <Link href={getSectionHref("#pools")}>איתור בריכה</Link>
            </Button>
            <Button asChild>
              <Link href={getSectionHref("#join")}>הצטרפות לאיגוד</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "סגור תפריט" : "פתח תפריט"}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t py-4"
            role="navigation"
            aria-label="תפריט נייד"
          >
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="flex flex-col gap-2 pt-4 border-t">
                <Button asChild variant="outline" className="w-full">
                  <Link href={getSectionHref("#pools")}>איתור בריכה</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href={getSectionHref("#join")}>הצטרפות לאיגוד</Link>
                </Button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
