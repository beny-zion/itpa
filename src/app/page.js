"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PoolsIndex from "@/components/PoolsIndex";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn, FadeInStagger, FadeInStaggerItem, ScaleIn } from "@/components/FadeIn";
import poolsData from "@/data/pools.json";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main id="main-content" className="flex-1">
        {/* Hero Section - Premium Design */}
        <section
          className="relative min-h-[90vh] flex items-center bg-white"
          aria-labelledby="hero-heading"
        >
          <div className="container mx-auto px-6 md:px-12 lg:px-20 py-20 pt-32">
            <div className="max-w-4xl">
              <FadeIn delay={0.1}>
                <h1
                  id="hero-heading"
                  className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-[1.1]"
                >
                  איגוד הבריכות{" "}
                  <span className="text-muted-foreground">הטיפוליות</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
                  הגוף המקצועי המייצג את תחום ההידרותרפיה בישראל, הפועל לקידום
                  סטנדרטים, רגולציה אחראית, איכות טיפול ובטיחות – לטובת המטופלים,
                  המטפלים והמערכת כולה
                </p>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                  <a
                    href="#join"
                    className="inline-flex items-center justify-center text-lg px-8 py-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all btn-premium font-medium cursor-pointer"
                  >
                    הצטרפות לאיגוד
                  </a>
                  <a
                    href="#pools"
                    className="inline-flex items-center justify-center text-lg px-8 py-4 rounded-full border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-all font-medium cursor-pointer"
                  >
                    איתור בריכה טיפולית
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center text-lg px-8 py-4 rounded-full text-foreground hover:bg-muted transition-all font-medium cursor-pointer"
                  >
                    יצירת קשר
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Decorative gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </section>

        {/* Stats Section - Like Xurya video */}
        <section className="py-20 bg-white border-t border-border">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <FadeIn delay={0.1}>
                <div className="space-y-2">
                  <div className="text-5xl md:text-6xl font-bold gradient-text">
                    50+
                  </div>
                  <div className="text-muted-foreground text-lg">
                    בריכות חברות באיגוד
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="space-y-2">
                  <div className="text-5xl md:text-6xl font-bold gradient-text">
                    100%
                  </div>
                  <div className="text-muted-foreground text-lg">
                    עמידה בתקני בטיחות ותברואה
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="space-y-2">
                  <div className="text-5xl md:text-6xl font-bold gradient-text">
                    24/7
                  </div>
                  <div className="text-muted-foreground text-lg">
                    ייצוג מול גופים רגולטוריים
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-background" aria-labelledby="about-heading">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="max-w-3xl mx-auto text-center">
              <FadeIn>
                <span className="text-primary font-medium mb-4 block">אודות</span>
                <h2 id="about-heading" className="text-4xl md:text-5xl font-bold mb-8">
                  אודות האיגוד
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  איגוד הבריכות הטיפוליות בישראל הוא גוף גג מקצועי המאגד את כלל
                  הבריכות הטיפוליות הפועלות בישראל. האיגוד פועל לקידום סטנדרטים של
                  איכות ובטיחות בתחום ההידרותרפיה, תוך שמירה על הרמה המקצועית
                  הגבוהה ביותר והגנה על זכויות המטופלים.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Goals Section */}
        <section
          id="goals"
          className="py-24 bg-muted/50"
          aria-labelledby="goals-heading"
        >
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <FadeIn>
              <div className="text-center mb-16">
                <span className="text-primary font-medium mb-4 block">המטרות שלנו</span>
                <h2 id="goals-heading" className="text-4xl md:text-5xl font-bold">
                  מטרות האיגוד
                </h2>
              </div>
            </FadeIn>

            <div className="max-w-5xl mx-auto">
              {/* First row - 3 goals */}
              <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {[
                  {
                    title: "קביעת סטנדרטים מקצועיים",
                    description: "הגדרת תקני איכות ובטיחות מחייבים לבריכות טיפוליות",
                  },
                  {
                    title: "ייצוג מול גופים רגולטוריים",
                    description: "ייצוג האיגוד והחברים מול משרדי ממשלה, קופות חולים וגופים רגולטוריים",
                  },
                  {
                    title: "פיתוח ידע והכשרות",
                    description: "קידום הכשרות מתמשכות ומחקר בתחום ההידרותרפיה",
                  },
                ].map((goal, index) => (
                  <FadeInStaggerItem key={index}>
                    <Card className="h-full card-hover border-0 shadow-sm">
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <svg
                              className="h-6 w-6"
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
                  </FadeInStaggerItem>
                ))}
              </FadeInStagger>

              {/* Second row - 2 goals centered */}
              <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {[
                  {
                    title: "שיתופי פעולה",
                    description: "חיזוק שיתופי פעולה בין מרכזים, אקדמיה ומטפלים",
                  },
                  {
                    title: "הגנה על זכויות",
                    description: "הגנה על זכויות המטופלים והמטפלים כאחד",
                  },
                ].map((goal, index) => (
                  <FadeInStaggerItem key={index}>
                    <Card className="h-full card-hover border-0 shadow-sm">
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <svg
                              className="h-6 w-6"
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
                  </FadeInStaggerItem>
                ))}
              </FadeInStagger>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section
          id="leadership"
          className="py-24 bg-white"
          aria-labelledby="leadership-heading"
        >
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <FadeIn>
              <div className="text-center mb-16">
                <span className="text-primary font-medium mb-4 block">ההנהלה</span>
                <h2 id="leadership-heading" className="text-4xl md:text-5xl font-bold">
                  הנהלת האיגוד
                </h2>
              </div>
            </FadeIn>

            <ScaleIn delay={0.2}>
              <div className="max-w-md mx-auto">
                <Card className="text-center border-0 shadow-lg">
                  <CardHeader className="pt-10">
                    <div className="mx-auto mb-6 h-32 w-32 rounded-full overflow-hidden shadow-lg">
                      <Image
                        src="/Gemini_Generated_Image_vk02srvk02srvk02.png"
                        alt="צבי הנדלס - יושב ראש האיגוד"
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardTitle className="text-2xl mb-2">צבי הנדלס</CardTitle>
                    <p className="text-muted-foreground text-lg">יושב ראש האיגוד</p>
                  </CardHeader>
                </Card>
              </div>
            </ScaleIn>
          </div>
        </section>

        {/* Activities Section */}
        <section
          id="activities"
          className="py-24 bg-muted/50"
          aria-labelledby="activities-heading"
        >
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <FadeIn>
              <div className="text-center mb-16">
                <span className="text-primary font-medium mb-4 block">מה אנחנו עושים</span>
                <h2 id="activities-heading" className="text-4xl md:text-5xl font-bold">
                  תחומי פעילות
                </h2>
              </div>
            </FadeIn>

            <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "רגולציה",
                  description: "עבודה מול גופי רגולציה לקידום חקיקה ותקנות מתאימות לתחום",
                  icon: (
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                  ),
                },
                {
                  title: "תקינה",
                  description: "פיתוח והטמעת תקנים מקצועיים לבריכות טיפוליות ולעובדיהן",
                  icon: (
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  ),
                },
                {
                  title: "פיתוח מקצועי",
                  description: "הכשרות, סדנאות והשתלמויות למטפלים ולמנהלי בריכות",
                  icon: (
                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                  ),
                },
                {
                  title: "ידע ומחקר",
                  description: "קידום מחקר, איסוף מידע והפצת ידע מקצועי בתחום ההידרותרפיה",
                  icon: (
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
                  ),
                },
              ].map((activity, index) => (
                <FadeInStaggerItem key={index}>
                  <Card className="text-center h-full card-hover border-0 shadow-sm">
                    <CardHeader>
                      <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        <svg
                          className="h-8 w-8 text-primary"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          {activity.icon}
                        </svg>
                      </div>
                      <CardTitle className="text-xl">{activity.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{activity.description}</p>
                    </CardContent>
                  </Card>
                </FadeInStaggerItem>
              ))}
            </FadeInStagger>
          </div>
        </section>

        {/* Professional Committees Section */}
        <section
          id="committees"
          className="py-24 bg-white"
          aria-labelledby="committees-heading"
        >
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <FadeIn>
              <div className="text-center mb-16">
                <span className="text-primary font-medium mb-4 block">הוועדות</span>
                <h2 id="committees-heading" className="text-4xl md:text-5xl font-bold">
                  ועדות מקצועיות
                </h2>
              </div>
            </FadeIn>

            <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "ועדת תקינה ובטיחות",
                  description: "פיתוח והטמעת תקנים מחייבים לבריכות טיפוליות בתחומי הבטיחות והתפעול",
                  icon: (
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                  ),
                },
                {
                  title: "ועדת הכשרות והשתלמויות",
                  description: "תכנון וביצוע תוכניות הכשרה, קורסים והשתלמויות למטפלים ואנשי מקצוע",
                  icon: (
                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                  ),
                },
                {
                  title: "ועדת רגולציה וקשרי ממשל",
                  description: "ייצוג האיגוד מול משרדי ממשלה, קופות חולים וגופים רגולטוריים",
                  icon: (
                    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
                  ),
                },
                {
                  title: "ועדת אתיקה ואיכות טיפול",
                  description: "גיבוש כללי אתיקה מקצועית ופיקוח על איכות הטיפול במסגרות החברות",
                  icon: (
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  ),
                },
              ].map((committee, index) => (
                <FadeInStaggerItem key={index}>
                  <Card className="text-center h-full card-hover border-0 shadow-sm">
                    <CardHeader>
                      <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
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
                      <p className="text-muted-foreground text-sm">{committee.description}</p>
                    </CardContent>
                  </Card>
                </FadeInStaggerItem>
              ))}
            </FadeInStagger>
          </div>
        </section>

        {/* Join Section - Premium CTA */}
        <section id="join" className="py-24 bg-foreground text-background" aria-labelledby="join-heading">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn>
                <span className="text-primary font-medium mb-4 block">הצטרפו אלינו</span>
                <h2 id="join-heading" className="text-4xl md:text-5xl font-bold mb-6">
                  הצטרפות לאיגוד
                </h2>
                <p className="text-xl text-background/70 mb-12">
                  הצטרפו למשפחת הבריכות הטיפוליות המובילות בישראל
                </p>
              </FadeIn>

              <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {[
                  {
                    title: "ייצוג מקצועי",
                    description: "ייצוג מול גורמים ממשלתיים ורגולטוריים",
                  },
                  {
                    title: "תקינה ואיכות",
                    description: "גישה לתקנים ולכלי הערכה מקצועיים",
                  },
                  {
                    title: "פרסום וחשיפה",
                    description: "הכללה באינדקס הבריכות הטיפוליות הארצי",
                  },
                ].map((benefit, index) => (
                  <FadeInStaggerItem key={index}>
                    <div className="p-6 rounded-2xl bg-background/5 backdrop-blur">
                      <h4 className="font-bold text-lg mb-2">{benefit.title}</h4>
                      <p className="text-background/70">{benefit.description}</p>
                    </div>
                  </FadeInStaggerItem>
                ))}
              </FadeInStagger>

              <FadeIn delay={0.4}>
                <p className="text-xl mb-8 italic text-background/80">
                  &ldquo;החברות באיגוד מהווה הצהרה על מחויבות לאיכות, בטיחות
                  וסטנדרט מקצועי גבוה&rdquo;
                </p>
                <Button
                  asChild
                  size="lg"
                  className="text-lg px-10 py-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Link href="/contact">צרו קשר להצטרפות</Link>
                </Button>
              </FadeIn>
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
