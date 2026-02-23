"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PoolsIndex from "@/components/PoolsIndex";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn, FadeInStagger, FadeInStaggerItem, ScaleIn } from "@/components/FadeIn";

export default function HomePage() {
  const [pools, setPools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPools() {
      try {
        const response = await fetch("/api/pools");
        const data = await response.json();
        setPools(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching pools:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPools();
  }, []);
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
                  <span className="text-muted-foreground">הטיפוליות בישראל</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
                  הגוף הארצי המאגד את הבריכות והמוסדות לטיפול במים בישראל,
                  ופועל לחיזוק התשתית המוסדית של התחום – באמצעות קידום רגולציה
                  אחראית, סטנדרטים תפעוליים מתקדמים, בטיחות, נגישות וניהול איכותי.
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

        {/* Stats Section */}
        <section className="py-20 bg-white border-t border-border">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <FadeIn delay={0.1}>
                <div className="space-y-4">
                  <div className="mx-auto h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">איגוד ארצי</h3>
                  <div className="text-muted-foreground text-lg">
                    למעלה מ־60 בריכות טיפוליות מאוגדות במסגרת האיגוד.
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="space-y-4">
                  <div className="mx-auto h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">קשרי ממשל</h3>
                  <div className="text-muted-foreground text-lg">
                    פעילות מוסדית שוטפת מול משרדי הממשלה וקופות החולים.
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="space-y-4">
                  <div className="mx-auto h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">חברות באיגוד</h3>
                  <div className="text-muted-foreground text-lg">
                    השתייכות למסגרת ארצית הפועלת לחיזוק הבריכות הטיפוליות בישראל.
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
                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                  איגוד הבריכות הטיפוליות בישראל הוא גוף ארצי המאגד בריכות
                  ומוסדות לטיפול במים ברחבי הארץ. האיגוד פועל לחיזוק התשתית
                  המוסדית של תחום הבריכות הטיפוליות ולקידום תנאי פעילות יציבים,
                  בטוחים ומאוזנים.
                </p>
                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                  האיגוד מאגד את הבריכות החברות בו תחת קורת גג ארצית ופועל
                  מטעמן במישור המוסדי, לרבות פעילות שוטפת מול משרדי הממשלה,
                  קופות החולים והרשויות המקומיות.
                </p>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  באמצעות פעולה ענפית מתואמת ושיח מקצועי-מערכתי, פועל האיגוד
                  לחיזוק מעמדן של הבריכות הטיפוליות בישראל ולהבטחת המשך
                  התפתחות התחום.
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
                    title: "חיזוק המעמד הענפי",
                    description: "ביסוס מקומן של הבריכות הטיפוליות כחלק מרכזי במערך הטיפול והשיקום בישראל.",
                  },
                  {
                    title: "ייצוג מוסדי מאוחד",
                    description: "קידום האינטרסים המשותפים של הבריכות החברות מול משרדי הממשלה, קופות החולים והרשויות המקומיות.",
                  },
                  {
                    title: "רגולציה מאוזנת ומותאמת",
                    description: "קידום התאמת נהלים ודרישות למציאות התפעולית והטכנולוגית של הבריכות הטיפוליות.",
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
                    title: "יצירת מסגרת ארצית מאורגנת",
                    description: "גיבוש קורת גג ענפית המחזקת שיתוף פעולה, יציבות ותיאום בין הבריכות החברות.",
                  },
                  {
                    title: "שיפור תנאי הפעילות בענף",
                    description: "קידום תנאים בטוחים, יציבים ומאוזנים להפעלת בריכות טיפוליות בישראל.",
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

            <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "קשרי ממשל ורגולציה",
                  description: "ניהול דיאלוג שוטף עם משרדי הממשלה, קופות החולים והרשויות המקומיות בנושאי מדיניות ותנאי פעילות של בריכות טיפוליות.",
                  icon: (
                    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
                  ),
                },
                {
                  title: "התאמת נהלים למציאות הענפית",
                  description: "קידום בחינה והתאמה של דרישות רגולטוריות למאפייני הבריכות הטיפוליות ולהתפתחות הענף.",
                  icon: (
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                  ),
                },
                {
                  title: "שמירה על מקומן במערך הבריאות והשיקום",
                  description: "פעילות להבטחת המשך שילובן של הבריכות הטיפוליות במערך השירותים הרפואיים והשיקומיים בישראל.",
                  icon: (
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  ),
                },
                {
                  title: "גיבוש עמדות ענפיות",
                  description: "ריכוז עמדות משותפות של הבריכות החברות והצגתן בפני מקבלי ההחלטות במישור הציבורי והמערכתי.",
                  icon: (
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  ),
                },
                {
                  title: "ליווי והכוונה מוסדית",
                  description: "סיוע לבריכות החברות בהתמודדות עם סוגיות רישוי, בטיחות ותפעול.",
                  icon: (
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                  ),
                },
                {
                  title: "שיח וניהול ענפי",
                  description: "יצירת מסגרת לשיתוף ידע ניהולי ותפעולי בין מנהלי הבריכות וחיזוק שיתופי פעולה בענף.",
                  icon: (
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
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

        {/* Join Section - Premium CTA */}
        <section id="join" className="py-24 bg-foreground text-background" aria-labelledby="join-heading">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn>
                <span className="text-primary font-medium mb-4 block">הצטרפו אלינו</span>
                <h2 id="join-heading" className="text-4xl md:text-5xl font-bold mb-6">
                  הצטרפות לאיגוד הבריכות הטיפוליות בישראל
                </h2>
                <p className="text-xl text-background/70 mb-12">
                  הצטרפו למסגרת הארצית המאגדת ומייצגת בריכות טיפוליות בישראל.
                </p>
              </FadeIn>

              <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {[
                  {
                    title: "ייצוג מוסדי",
                    description: "קול מאוחד מול משרדי הממשלה וקופות החולים.",
                  },
                  {
                    title: "מסגרת ארצית",
                    description: "חברות בארגון גג הפועל לחיזוק מעמד הבריכות הטיפוליות.",
                  },
                  {
                    title: "מידע ועדכונים",
                    description: "נגישות לעדכונים שוטפים בנושאי רגולציה ותנאי פעילות.",
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
                <p className="text-xl mb-8 text-background/80">
                  חברות באיגוד משקפת השתייכות למסגרת ענפית הפועלת לחיזוק
                  הבריכות הטיפוליות בישראל.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="text-lg px-10 py-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Link href="/contact">טופס הצטרפות</Link>
                </Button>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Pools Index Section */}
        {isLoading ? (
          <section id="pools" className="py-24 bg-muted/50">
            <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center">
              <p className="text-muted-foreground">טוען בריכות...</p>
            </div>
          </section>
        ) : (
          <PoolsIndex pools={pools} />
        )}
      </main>

      <Footer />
    </div>
  );
}
