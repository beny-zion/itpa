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
              הגוף המקצועי המייצג את תחום ההידרותרפיה בישראל, הפועל לקידום סטנדרטים, רגולציה אחראית, איכות טיפול ובטיחות.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">האיגוד</h3>
            <nav aria-label="קישורים לאיגוד">
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#about"
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    אודות
                  </Link>
                </li>
                <li>
                  <Link
                    href="#goals"
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    מטרות
                  </Link>
                </li>
                <li>
                  <Link
                    href="#activities"
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    תחומי פעילות
                  </Link>
                </li>
                <li>
                  <Link
                    href="#committees"
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    ועדות מקצועיות
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
                    href="#pools"
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    מאגר בריכות
                  </Link>
                </li>
                <li>
                  <Link
                    href="#join"
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
        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-sm">
            © {new Date().getFullYear()} איגוד הבריכות הטיפוליות בישראל. כל הזכויות שמורות.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="mailto:office@itpa.org.il"
              className="text-background/50 hover:text-primary transition-colors text-sm"
            >
              office@itpa.org.il
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
