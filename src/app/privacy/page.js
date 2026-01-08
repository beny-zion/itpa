import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "מדיניות פרטיות | איגוד הבריכות הטיפוליות בישראל",
  description: "מדיניות הפרטיות של איגוד הבריכות הטיפוליות בישראל",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main id="main-content" className="flex-1 py-24 pt-32">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">מדיניות פרטיות</h1>

            <div className="prose prose-lg max-w-none space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. כללי</h2>
                <p>
                  איגוד הבריכות הטיפוליות בישראל (להלן: "האיגוד") מכבד את פרטיות המשתמשים באתר. מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים ומגנים על המידע האישי שלכם.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. איסוף מידע</h2>
                <p>אנו אוספים מידע בשני אופנים:</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>מידע שאתם מוסרים לנו באופן ישיר (למשל, בטופס יצירת קשר)</li>
                  <li>מידע שנאסף באופן אוטומטי בעת גלישה באתר</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. סוגי המידע הנאסף</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>שם מלא</li>
                  <li>כתובת דוא"ל</li>
                  <li>מספר טלפון</li>
                  <li>שם הארגון או הבריכה</li>
                  <li>תוכן הפניות שנשלחות אלינו</li>
                  <li>נתוני גלישה (כתובת IP, סוג דפדפן, עמודים שנצפו)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. שימוש במידע</h2>
                <p>המידע שנאסף משמש אותנו למטרות הבאות:</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>מענה לפניות ובקשות</li>
                  <li>עדכונים על פעילות האיגוד</li>
                  <li>שיפור השירותים והאתר</li>
                  <li>ניהול מאגר הבריכות הטיפוליות</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">5. שיתוף מידע</h2>
                <p>
                  אנו לא מוכרים, משכירים או משתפים את המידע האישי שלכם עם צדדים שלישיים, למעט במקרים הבאים:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>בהסכמתכם המפורשת</li>
                  <li>כאשר הדבר נדרש על פי חוק</li>
                  <li>לצורך הגנה על זכויות האיגוד</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">6. אבטחת מידע</h2>
                <p>
                  אנו נוקטים באמצעי אבטחה סבירים להגנה על המידע האישי שלכם מפני גישה, שימוש או חשיפה בלתי מורשים.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">7. זכויות המשתמש</h2>
                <p>על פי חוק הגנת הפרטיות, יש לכם זכות:</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>לעיין במידע שנאסף אודותיכם</li>
                  <li>לבקש תיקון מידע שגוי</li>
                  <li>לבקש מחיקת המידע</li>
                  <li>להתנגד לשימוש במידע לצורכי שיווק</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">8. עוגיות (Cookies)</h2>
                <p>
                  האתר משתמש בעוגיות לצורך שיפור חוויית המשתמש. ניתן לשלוט בהגדרות העוגיות דרך הדפדפן שלכם.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">9. יצירת קשר</h2>
                <p>
                  לשאלות או בקשות בנוגע למדיניות הפרטיות, ניתן לפנות אלינו בכתובת: office@itpa.org.il
                </p>
              </section>

              <p className="text-sm mt-8">
                עודכן לאחרונה: ינואר 2025
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
