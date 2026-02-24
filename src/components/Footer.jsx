import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background" role="contentinfo">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16">
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
            <p className="text-background/70 leading-relaxed">
              הגוף הארצי המאגד את הבריכות והמוסדות לטיפול במים בישראל, ופועל לחיזוק התשתית המוסדית של התחום.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">האיגוד</h3>
            <nav aria-label="קישורים לאיגוד">
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/#about"
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    אודות
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#goals"
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    מטרות
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#activities"
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    תחומי פעילות
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-6">שירותים</h3>
            <nav aria-label="שירותים">
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/#pools"
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    מאגר בריכות
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#join"
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    הצטרפות לאיגוד
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    צור קשר
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-6">מידע</h3>
            <nav aria-label="מידע משפטי">
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/terms"
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    תקנון האיגוד
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    מדיניות פרטיות
                  </Link>
                </li>
                <li>
                  <Link
                    href="/accessibility"
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    הצהרת נגישות
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-background/50 text-sm">
            © {new Date().getFullYear()} איגוד הבריכות הטיפוליות בישראל. כל הזכויות שמורות.
          </p>
          <a
            href="mailto:office@itpa.org.il"
            className="text-background/50 hover:text-primary transition-colors text-sm"
          >
            office@itpa.org.il
          </a>
          <a
            href="mailto:b4123190@gmail.com"
            className="opacity-80 hover:opacity-100 transition-opacity"
            aria-label="BB Dev - פיתוח האתר"
          >
            <Image
              src="/bb.logo3.svg"
              alt="BB Dev - פיתוח האתר"
              width={100}
              height={40}
              className="h-8 w-auto"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
