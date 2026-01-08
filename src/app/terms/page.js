import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "תקנון האיגוד | איגוד הבריכות הטיפוליות בישראל",
  description: "תקנון איגוד הבריכות הטיפוליות בישראל",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main id="main-content" className="flex-1 py-24 pt-32">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">תקנון האיגוד</h1>

            <div className="prose prose-lg max-w-none space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. כללי</h2>
                <p>
                  איגוד הבריכות הטיפוליות בישראל (להלן: "האיגוד") הינו גוף מקצועי המאגד את הבריכות הטיפוליות הפועלות בישראל. תקנון זה מסדיר את פעילות האיגוד, זכויות וחובות החברים בו.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. מטרות האיגוד</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>קידום סטנדרטים מקצועיים בתחום ההידרותרפיה</li>
                  <li>ייצוג חברי האיגוד מול גופים רגולטוריים וממשלתיים</li>
                  <li>פיתוח הכשרות והשתלמויות מקצועיות</li>
                  <li>שמירה על איכות הטיפול ובטיחות המטופלים</li>
                  <li>חיזוק שיתופי פעולה בין מרכזים טיפוליים</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. חברות באיגוד</h2>
                <p>
                  חברות באיגוד פתוחה לכל בריכה טיפולית הפועלת בישראל ועומדת בתנאי הקבלה שנקבעו על ידי ועדת הקבלה של האיגוד. תנאי הקבלה כוללים עמידה בתקני בטיחות, תברואה ואיכות טיפול.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. זכויות וחובות החברים</h2>
                <h3 className="text-xl font-medium text-foreground mb-2">זכויות:</h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>ייצוג באסיפות האיגוד</li>
                  <li>השתתפות בהכשרות והשתלמויות</li>
                  <li>הכללה במאגר הבריכות הטיפוליות</li>
                  <li>קבלת עדכונים מקצועיים ורגולטוריים</li>
                </ul>
                <h3 className="text-xl font-medium text-foreground mb-2">חובות:</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>תשלום דמי חבר שנתיים</li>
                  <li>עמידה בתקנים המקצועיים של האיגוד</li>
                  <li>שיתוף פעולה עם ועדות האיגוד</li>
                  <li>דיווח על שינויים מהותיים בפעילות</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">5. מוסדות האיגוד</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>האסיפה הכללית - המוסד העליון של האיגוד</li>
                  <li>ועד מנהל - אחראי על ניהול שוטף</li>
                  <li>ועדות מקצועיות - תקינה, הכשרות, רגולציה ואתיקה</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">6. שינויים בתקנון</h2>
                <p>
                  שינויים בתקנון זה יאושרו באסיפה הכללית ברוב של שני שלישים מהחברים הנוכחים והמצביעים.
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
