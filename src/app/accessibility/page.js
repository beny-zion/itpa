import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "הצהרת נגישות | איגוד הבריכות הטיפוליות בישראל",
  description: "הצהרת הנגישות של אתר איגוד הבריכות הטיפוליות בישראל",
};

export default function AccessibilityPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main id="main-content" className="flex-1 py-24 pt-32">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">הצהרת נגישות</h1>

            <div className="prose prose-lg max-w-none space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">מחויבות לנגישות</h2>
                <p>
                  איגוד הבריכות הטיפוליות בישראל מחויב להנגשת האתר לאנשים עם מוגבלויות. אנו פועלים להבטיח שהאתר יהיה נגיש לכלל המשתמשים, ללא תלות ביכולותיהם.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">תקן הנגישות</h2>
                <p>
                  אנו פועלים להנגשת האתר בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013, ובהתאם להנחיות WCAG 2.1.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">התאמות הנגישות באתר</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>מבנה סמנטי תקין של כותרות ותוכן (h1-h3, sections)</li>
                  <li>תמיכה בניווט מקלדת</li>
                  <li>טקסט חלופי לתמונות</li>
                  <li>קישור "דלג לתוכן הראשי" לניווט מהיר</li>
                  <li>תוויות נגישות לטפסים (labels, aria-required)</li>
                  <li>תמיכה מלאה ב-RTL (עברית)</li>
                  <li>סימון ARIA לאזורים ולאלמנטים אינטראקטיביים</li>
                  <li>הודעות סטטוס נגישות (aria-live)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">טכנולוגיות נתמכות</h2>
                <p>האתר נבדק ונתמך בדפדפנים הבאים:</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>Google Chrome (גרסה אחרונה)</li>
                  <li>Mozilla Firefox (גרסה אחרונה)</li>
                  <li>Apple Safari (גרסה אחרונה)</li>
                  <li>Microsoft Edge (גרסה אחרונה)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">קוראי מסך</h2>
                <p>
                  האתר נבנה תוך שימוש בתגיות סמנטיות ותכונות ARIA התומכות בקוראי מסך נפוצים כגון NVDA, JAWS, VoiceOver ו-TalkBack.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">דרכי פנייה בנושא נגישות</h2>
                <p>
                  אם נתקלתם בבעיית נגישות באתר, או אם יש לכם הצעות לשיפור הנגישות, נשמח לשמוע מכם:
                </p>
                <ul className="list-none space-y-2 mt-4">
                  <li>
                    <strong>דוא"ל:</strong>{" "}
                    <a href="mailto:office@itpa.org.il" className="text-primary hover:underline">
                      office@itpa.org.il
                    </a>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">רכז נגישות</h2>
                <p>
                  לפניות בנושא נגישות ניתן לפנות לרכז הנגישות של האיגוד בכתובת הדוא"ל או בטלפון שלעיל.
                </p>
              </section>

              <p className="text-sm mt-8">
                הצהרה זו עודכנה לאחרונה: ינואר 2025
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
