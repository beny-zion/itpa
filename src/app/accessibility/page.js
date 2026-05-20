import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ExternalLink } from "lucide-react";

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
                  איגוד הבריכות הטיפוליות בישראל מחויב להנגשת האתר לאנשים עם מוגבלויות,
                  מתוך אמונה כי לכל אדם הזכות לגישה שוויונית למידע ולשירותים מקוונים.
                  אנו פועלים באופן שוטף להבטיח שהאתר יהיה נגיש לכלל המשתמשים, ללא תלות ביכולותיהם.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">תקן הנגישות</h2>
                <p>
                  אנו פועלים להנגשת האתר בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות
                  (התאמות נגישות לשירות), התשע&quot;ג-2013, ובהתאם לתקן הישראלי ת&quot;י 5568
                  המבוסס על הנחיות WCAG 2.1 ברמת AA.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">רמת הנגישות</h2>
                <p>
                  האתר עומד בתקן WCAG 2.1 ברמה AA, עם פרטים נבחרים העומדים גם ברמת AAA
                  (ניגודיות טקסט מורחבת, חיווי ויזואלי לקישורים חיצוניים).
                  אנו ממשיכים לפעול לשיפור הנגישות ולעדכון האתר בהתאם להנחיות העדכניות ביותר.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">התאמות הנגישות באתר</h2>
                <p className="mb-4">באתר בוצעו ההתאמות הבאות:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>תפריט נגישות (UserWay) המאפשר התאמות אישיות: הגדלת טקסט, ניגודיות גבוהה, הדגשת קישורים, השהיית אנימציות ועוד</li>
                  <li>מבנה סמנטי תקין של כותרות ותוכן (h1-h3, sections, nav, main, footer)</li>
                  <li>תמיכה מלאה בניווט מקלדת, כולל סגירת תפריטים באמצעות מקש Escape</li>
                  <li>טקסט חלופי (alt) לכל התמונות</li>
                  <li>קישור &quot;דלג לתוכן הראשי&quot; לניווט מהיר</li>
                  <li>תוויות נגישות לטפסים (labels, aria-required, aria-describedby להודעות סטטוס)</li>
                  <li>תמיכה מלאה בכיוון RTL (עברית)</li>
                  <li>סימון ARIA לאזורים, אלמנטים אינטראקטיביים וסטטוס דינמי</li>
                  <li>הודעות סטטוס נגישות (aria-live, role=&quot;alert&quot;) לעדכונים דינמיים</li>
                  <li>ניגודיות צבעים העומדת בתקן WCAG AA, חלקים נבחרים ברמת AAA</li>
                  <li>תמיכה בהעדפת הפחתת תנועה (prefers-reduced-motion) - ביטול אנימציות למשתמשים שהגדירו זאת</li>
                  <li>סימון ויזואלי וסמנטי לקישורים חיצוניים הנפתחים בחלון חדש</li>
                  <li>סימון העמוד הנוכחי בתפריט הניווט</li>
                  <li>קישורי ניווט מובחנים בקו תחתון בעת מעבר עכבר/פוקוס מקלדת</li>
                  <li>הודעות שגיאה והצלחה בטפסים מסומנות באייקון ובצבע (לא הסתמכות על צבע בלבד)</li>
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
                  האתר נבנה תוך שימוש בתגיות סמנטיות ותכונות ARIA התומכות בקוראי מסך נפוצים
                  כגון NVDA, JAWS, VoiceOver ו-TalkBack.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">מגבלות נגישות ידועות</h2>
                <p>
                  למרות מאמצינו להנגיש את כל העמודים באתר, ייתכן שחלקים מסוימים טרם הונגשו
                  באופן מלא. אנו ממשיכים לפעול לאיתור ותיקון בעיות נגישות. אם נתקלתם בבעיה,
                  נשמח לשמוע מכם.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">רכז/ת נגישות</h2>
                <p className="mb-4">
                  לפניות בנושא נגישות ניתן לפנות לרכז/ת הנגישות של האיגוד:
                </p>
                <ul className="list-none space-y-3">
                  <li>
                    <strong>שם:</strong> רכז/ת הנגישות של האיגוד
                  </li>
                  <li>
                    <strong>דוא&quot;ל:</strong>{" "}
                    <a href="mailto:office@itpa.org.il" className="text-primary hover:underline">
                      office@itpa.org.il
                    </a>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">דרכי פנייה בנושא נגישות</h2>
                <p>
                  אם נתקלתם בבעיית נגישות באתר, או אם יש לכם הצעות לשיפור הנגישות, נשמח לשמוע מכם.
                  אנו מתחייבים לטפל בכל פנייה בנושא נגישות בתוך 7 ימי עסקים.
                </p>
                <p className="mt-4">
                  במידה ולא טופלה פנייתכם באופן המספק אתכם, באפשרותכם לפנות לנציב שוויון
                  זכויות לאנשים עם מוגבלות, במשרד המשפטים:
                </p>
                <ul className="list-none space-y-2 mt-4">
                  <li>
                    <strong>טלפון:</strong>{" "}
                    <a href="tel:*6763" className="text-primary hover:underline" dir="ltr">
                      *6763
                    </a>
                  </li>
                  <li>
                    <strong>אתר:</strong>{" "}
                    <a
                      href="https://www.gov.il/he/departments/units/commission-for-equal-rights-of-persons-with-disabilities"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      נציבות שוויון זכויות לאנשים עם מוגבלות
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span className="sr-only"> (נפתח בחלון חדש)</span>
                    </a>
                  </li>
                </ul>
              </section>

              <p className="text-sm mt-8">
                הצהרה זו עודכנה לאחרונה: מאי 2026
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
