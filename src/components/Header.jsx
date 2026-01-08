"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper function to create proper href for sections
  const getSectionHref = (hash) => {
    return isHomePage ? hash : `/${hash}`;
  };

  const navItems = [
    { href: getSectionHref("#about"), label: "אודות" },
    { href: getSectionHref("#goals"), label: "מטרות" },
    { href: getSectionHref("#activities"), label: "פעילות" },
    { href: getSectionHref("#committees"), label: "ועדות" },
    { href: getSectionHref("#pools"), label: "בריכות" },
    { href: "/contact", label: "צור קשר" },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-sm border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 md:px-12 lg:px-20" aria-label="ניווט ראשי">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 text-xl font-bold text-foreground"
            aria-label="עמוד הבית - איגוד הבריכות הטיפוליות"
          >
            <Image
              src="/bti_logo.svg"
              alt="לוגו איגוד הבריכות הטיפוליות"
              width={44}
              height={44}
              className="h-11 w-11"
            />
            <span className="hidden lg:inline text-lg font-semibold">
              איגוד הבריכות הטיפוליות
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground relative after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-primary after:scale-x-0 after:transition-transform hover:after:scale-x-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <Button
              asChild
              variant="ghost"
              className="rounded-full px-6"
            >
              <Link href={getSectionHref("#pools")}>איתור בריכה</Link>
            </Button>
            <Button
              asChild
              className="rounded-full px-6 btn-premium"
            >
              <Link href={getSectionHref("#join")}>הצטרפות</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
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
            className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b shadow-lg"
            role="navigation"
            aria-label="תפריט נייד"
          >
            <ul className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block text-lg font-medium text-foreground transition-colors hover:text-primary py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="flex flex-col gap-3 pt-4 border-t">
                <Button asChild variant="outline" className="w-full rounded-full">
                  <Link href={getSectionHref("#pools")} onClick={() => setIsMenuOpen(false)}>
                    איתור בריכה
                  </Link>
                </Button>
                <Button asChild className="w-full rounded-full">
                  <Link href={getSectionHref("#join")} onClick={() => setIsMenuOpen(false)}>
                    הצטרפות לאיגוד
                  </Link>
                </Button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
