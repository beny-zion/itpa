import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PoolsIndex from "@/components/PoolsIndex";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import poolsData from "@/data/pools.json";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section
          className="relative py-20 md:py-32 bg-gradient-to-b from-primary/10 to-background"
          aria-labelledby="hero-heading"
        >
          <div className="container mx-auto px-4 text-center">
            <h1
              id="hero-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground"
            >
              איגוד הבריכות הטיפוליות בישראל
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              הגוף המקצועי המייצג את תחום ההידרותרפיה בישראל, הפועל לקידום
              סטנדרטים, רגולציה אחראית, איכות טיפול ובטיחות – לטובת המטופלים,
              המטפלים והמערכת כולה
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="#join">הצטרפות לאיגוד</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link href="#pools">איתור בריכה טיפולית</Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="text-lg px-8">
                <Link href="/contact">יצירת קשר</Link>
              </Button>
            </div>
          </div>
          {/* Decorative wave */}
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
            <svg
              className="w-full h-12 text-background"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C34.91,97.67,72.61,89.58,113.23,82.48,183.42,70.27,257.25,68.76,321.39,56.44Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16" aria-labelledby="about-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 id="about-heading" className="text-3xl font-bold mb-6">
                אודות האיגוד
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                איגוד הבריכות הטיפוליות בישראל הוא גוף גג מקצועי המאגד את כלל
                הבריכות הטיפוליות הפועלות בישראל. האיגוד פועל לקידום סטנדרטים של
                איכות ובטיחות בתחום ההידרותרפיה, תוך שמירה על הרמה המקצועית
                הגבוהה ביותר והגנה על זכויות המטופלים.
              </p>
            </div>
          </div>
        </section>

        {/* Goals Section */}
        <section
          id="goals"
          className="py-16 bg-muted/30"
          aria-labelledby="goals-heading"
        >
          <div className="container mx-auto px-4">
            <h2 id="goals-heading" className="text-3xl font-bold text-center mb-12">
              מטרות האיגוד
            </h2>
            <div className="max-w-4xl mx-auto">
              {/* First row - 3 goals */}
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6" role="list">
                {[
                  {
                    title: "קביעת סטנדרטים מקצועיים",
                    description:
                      "הגדרת תקני איכות ובטיחות מחייבים לבריכות טיפוליות",
                  },
                  {
                    title: "ייצוג מול גופים רגולטוריים",
                    description:
                      "ייצוג האיגוד והחברים מול משרדי ממשלה, קופות חולים וגופים רגולטוריים",
                  },
                  {
                    title: "פיתוח ידע והכשרות",
                    description:
                      "קידום הכשרות מתמשכות ומחקר בתחום ההידרותרפיה",
                  },
                ].map((goal, index) => (
                  <li key={index}>
                    <Card className="h-full">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <CardTitle className="text-lg">{goal.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{goal.description}</p>
                      </CardContent>
                    </Card>
                  </li>
                ))}
              </ul>
              {/* Second row - 2 goals centered */}
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto" role="list">
                {[
                  {
                    title: "שיתופי פעולה",
                    description:
                      "חיזוק שיתופי פעולה בין מרכזים, אקדמיה ומטפלים",
                  },
                  {
                    title: "הגנה על זכויות",
                    description:
                      "הגנה על זכויות המטופלים והמטפלים כאחד",
                  },
                ].map((goal, index) => (
                  <li key={index}>
                    <Card className="h-full">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <CardTitle className="text-lg">{goal.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{goal.description}</p>
                      </CardContent>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section
          id="leadership"
          className="py-16"
          aria-labelledby="leadership-heading"
        >
          <div className="container mx-auto px-4">
            <h2
              id="leadership-heading"
              className="text-3xl font-bold text-center mb-12"
            >
              הנהלת האיגוד
            </h2>
            <div className="max-w-md mx-auto">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg
                      className="h-12 w-12 text-primary"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <CardTitle className="text-2xl">צבי הנדלס</CardTitle>
                  <CardDescription className="text-lg">
                    יושב ראש האיגוד
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <section
          id="activities"
          className="py-16 bg-muted/30"
          aria-labelledby="activities-heading"
        >
          <div className="container mx-auto px-4">
            <h2
              id="activities-heading"
              className="text-3xl font-bold text-center mb-12"
            >
              תחומי פעילות
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "רגולציה",
                  description:
                    "עבודה מול גופי רגולציה לקידום חקיקה ותקנות מתאימות לתחום",
                  icon: (
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                  ),
                },
                {
                  title: "תקינה",
                  description:
                    "פיתוח והטמעת תקנים מקצועיים לבריכות טיפוליות ולעובדיהן",
                  icon: (
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  ),
                },
                {
                  title: "פיתוח מקצועי",
                  description:
                    "הכשרות, סדנאות והשתלמויות למטפלים ולמנהלי בריכות",
                  icon: (
                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                  ),
                },
                {
                  title: "ידע ומחקר",
                  description:
                    "קידום מחקר, איסוף מידע והפצת ידע מקצועי בתחום ההידרותרפיה",
                  icon: (
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
                  ),
                },
              ].map((activity, index) => (
                <Card key={index} className="text-center h-full">
                  <CardHeader>
                    <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg
                        className="h-8 w-8 text-primary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        {activity.icon}
                      </svg>
                    </div>
                    <CardTitle>{activity.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{activity.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Professional Committees Section */}
        <section
          id="committees"
          className="py-16"
          aria-labelledby="committees-heading"
        >
          <div className="container mx-auto px-4">
            <h2
              id="committees-heading"
              className="text-3xl font-bold text-center mb-12"
            >
              ועדות מקצועיות
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "ועדת תקינה ובטיחות",
                  description:
                    "פיתוח והטמעת תקנים מחייבים לבריכות טיפוליות בתחומי הבטיחות והתפעול",
                  icon: (
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                  ),
                },
                {
                  title: "ועדת הכשרות והשתלמויות",
                  description:
                    "תכנון וביצוע תוכניות הכשרה, קורסים והשתלמויות למטפלים ואנשי מקצוע",
                  icon: (
                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                  ),
                },
                {
                  title: "ועדת רגולציה וקשרי ממשל",
                  description:
                    "ייצוג האיגוד מול משרדי ממשלה, קופות חולים וגופים רגולטוריים",
                  icon: (
                    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
                  ),
                },
                {
                  title: "ועדת אתיקה ואיכות טיפול",
                  description:
                    "גיבוש כללי אתיקה מקצועית ופיקוח על איכות הטיפול במסגרות החברות",
                  icon: (
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  ),
                },
              ].map((committee, index) => (
                <Card key={index} className="text-center h-full">
                  <CardHeader>
                    <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg
                        className="h-8 w-8 text-primary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        {committee.icon}
                      </svg>
                    </div>
                    <CardTitle className="text-lg">{committee.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{committee.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Join Section */}
        <section id="join" className="py-16 bg-muted/30" aria-labelledby="join-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-primary text-primary-foreground">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl mb-4">
                    הצטרפות לאיגוד
                  </CardTitle>
                  <CardDescription className="text-primary-foreground/80 text-lg">
                    הצטרפו למשפחת הבריכות הטיפוליות המובילות בישראל
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[
                      {
                        title: "ייצוג מקצועי",
                        description:
                          "ייצוג מול גורמים ממשלתיים ורגולטוריים",
                      },
                      {
                        title: "תקינה ואיכות",
                        description:
                          "גישה לתקנים ולכלי הערכה מקצועיים",
                      },
                      {
                        title: "פרסום וחשיפה",
                        description:
                          "הכללה באינדקס הבריכות הטיפוליות הארצי",
                      },
                    ].map((benefit, index) => (
                      <div
                        key={index}
                        className="text-center p-4 rounded-lg bg-primary-foreground/10"
                      >
                        <h4 className="font-bold mb-2">{benefit.title}</h4>
                        <p className="text-sm text-primary-foreground/80">
                          {benefit.description}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <p className="text-lg mb-6 italic">
                      "החברות באיגוד מהווה הצהרה על מחויבות לאיכות, בטיחות
                      וסטנדרט מקצועי גבוה"
                    </p>
                    <Button
                      asChild
                      size="lg"
                      variant="secondary"
                      className="text-lg px-8"
                    >
                      <Link href="/contact">צרו קשר להצטרפות</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pools Index Section */}
        <PoolsIndex pools={poolsData} />
      </main>

      <Footer />
    </div>
  );
}
