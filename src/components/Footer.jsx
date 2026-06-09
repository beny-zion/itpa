import Link from "next/link";
import Image from "next/image";

const linkClass =
  "text-background/85 hover:text-accent link-underline transition-colors";

function ColumnHeading({ children }) {
  return (
    <h3 className="font-semibold text-lg mb-6 inline-flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
      {children}
    </h3>
  );
}

export default function Footer() {
  return (
    <footer
      className="relative text-background overflow-hidden"
      role="contentinfo"
      style={{
        background:
          "linear-gradient(160deg, #0F2A3A 0%, #0B2330 60%, #07222F 100%)",
      }}
    >
      {/* Wave transition into the footer */}
      <div className="absolute top-0 left-0 right-0 -translate-y-px pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 80" className="w-full h-auto block" preserveAspectRatio="none">
          <path d="M0 40 Q360 0 720 32 T1440 24 V80 H0 Z" fill="#0F2A3A" opacity="0.5" />
          <path d="M0 56 Q360 24 720 50 T1440 44 V80 H0 Z" fill="#0F2A3A" />
        </svg>
      </div>

      {/* Floating aqua orb */}
      <div
        className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full animate-float-slow pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(75,184,201,0.15), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src="/bti_logo.svg"
                alt="לוגו איגוד הבריכות הטיפוליות"
                width={48}
                height={48}
                className="h-12 w-12 brightness-0 invert"
              />
            </Link>
            <p className="text-background/90 leading-relaxed">
              הגוף הארצי המאגד את הבריכות והמוסדות לטיפול במים בישראל, ופועל לחיזוק התשתית המוסדית של התחום.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <ColumnHeading>האיגוד</ColumnHeading>
            <nav aria-label="קישורים לאיגוד">
              <ul className="space-y-3">
                <li>
                  <Link href="/#about" className={linkClass}>
                    אודות
                  </Link>
                </li>
                <li>
                  <Link href="/#goals" className={linkClass}>
                    מטרות
                  </Link>
                </li>
                <li>
                  <Link href="/#activities" className={linkClass}>
                    תחומי פעילות
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Services */}
          <div>
            <ColumnHeading>שירותים</ColumnHeading>
            <nav aria-label="שירותים">
              <ul className="space-y-3">
                <li>
                  <Link href="/#pools" className={linkClass}>
                    מאגר בריכות
                  </Link>
                </li>
                <li>
                  <Link href="/#join" className={linkClass}>
                    הצטרפות לאיגוד
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className={linkClass}>
                    צור קשר
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <ColumnHeading>מידע</ColumnHeading>
            <nav aria-label="מידע משפטי">
              <ul className="space-y-3">
                <li>
                  <Link href="/terms" className={linkClass}>
                    תקנון האיגוד
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className={linkClass}>
                    מדיניות פרטיות
                  </Link>
                </li>
                <li>
                  <Link href="/accessibility" className={linkClass}>
                    הצהרת נגישות
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/85 text-sm order-2 md:order-1">
            © {new Date().getFullYear()} איגוד הבריכות הטיפוליות בישראל. כל הזכויות שמורות.
          </p>

          <a
            href="mailto:office@itpa.org.il"
            className="text-background/85 hover:text-accent link-underline transition-colors text-sm order-1 md:order-2"
          >
            office@itpa.org.il
          </a>

          {/* Ready Systems credit */}
          <a
            href="https://ready-systems.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-background/45 hover:text-white transition-colors order-3"
            aria-label="פיתוח אתרים ומערכות עם חברת Ready Systems (נפתח בחלון חדש)"
          >
            <span className="text-[11px] tracking-wide font-light">פיתוח אתרים ומערכות ·</span>
            <Image
              src="/ready-systems-logo.png"
              alt="Ready Systems"
              width={20}
              height={20}
              className="h-5 w-5 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200"
            />
            <span className="text-[11px] font-medium tracking-wider opacity-80 group-hover:opacity-100">
              ready-systems
            </span>
            <span className="sr-only"> (נפתח בחלון חדש)</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
