import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/50" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">איגוד הבריכות הטיפוליות בישראל</h3>
            <p className="text-sm text-muted-foreground">
              הגוף המקצועי המייצג את תחום ההידרותרפיה בישראל, הפועל לקידום סטנדרטים, רגולציה אחראית, איכות טיפול ובטיחות.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">קישורים מהירים</h3>
            <nav aria-label="קישורים מהירים">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#about"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    אודות האיגוד
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pools"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    אינדקס בריכות
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    צור קשר
                  </Link>
                </li>
                <li>
                  <Link
                    href="#join"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    הצטרפות לאיגוד
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">מידע משפטי</h3>
            <nav aria-label="מידע משפטי">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    תקנון האיגוד
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    מדיניות פרטיות
                  </Link>
                </li>
                <li>
                  <Link
                    href="/accessibility"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    הצהרת נגישות
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} איגוד הבריכות הטיפוליות בישראל. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
}
