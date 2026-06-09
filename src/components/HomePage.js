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
import {
  Globe2,
  Landmark,
  BadgeCheck,
  Scale,
  ClipboardCheck,
  HeartPulse,
  Users,
  Compass,
  MessagesSquare,
} from "lucide-react";

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
        {/* Hero Section - Deep-water, minimal */}
        <section
          className="relative min-h-[92vh] flex items-center bg-background overflow-hidden"
          aria-labelledby="hero-heading"
        >
          {/* Decorative water orbs — gentle float */}
          <div
            className="absolute -top-24 -left-32 h-[28rem] w-[28rem] rounded-full animate-float pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(75,184,201,0.20), transparent 68%)" }}
            aria-hidden="true"
          />
          <div
            className="absolute top-1/3 -right-24 h-96 w-96 rounded-full animate-float-slow pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(10,61,98,0.12), transparent 70%)" }}
            aria-hidden="true"
          />

          <div className="container mx-auto px-6 md:px-12 lg:px-20 py-20 pt-32 relative z-10">
            <div className="max-w-4xl">
              <FadeIn delay={0.05}>
                <div className="flex items-center gap-2.5 mb-7">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-accent animate-ripple" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                  </span>
                  <span className="text-sm font-semibold tracking-wide text-primary">
                    הגוף הארצי לבריכות טיפוליות
                  </span>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1
                  id="hero-heading"
                  className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-[1.05]"
                >
                  איגוד הבריכות{" "}
                  <span className="text-accent-strong">הטיפוליות בישראל</span>
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
                <div className="flex flex-col sm:flex-row sm:items-center gap-5 relative z-10">
                  <Button
                    asChild
                    size="lg"
                    className="text-lg px-9 py-6 btn-ink font-medium"
                  >
                    <Link href="#join">הצטרפות לאיגוד</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="text-lg px-9 py-6 btn-line border border-primary/30 bg-transparent text-primary hover:border-primary hover:bg-primary/5 font-medium"
                  >
                    <Link href="#pools">איתור בריכה טיפולית</Link>
                  </Button>
                  <Link
                    href="/contact"
                    className="text-lg font-medium text-foreground link-underline self-start sm:self-auto"
                  >
                    יצירת קשר ←
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Layered wave at the bottom of the hero */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true">
            <svg viewBox="0 0 1440 120" className="w-full h-auto block" preserveAspectRatio="none">
              <path d="M0 60 Q360 10 720 50 T1440 40 V120 H0 Z" fill="#ffffff" opacity="0.6" />
              <path d="M0 80 Q360 40 720 72 T1440 64 V120 H0 Z" fill="#ffffff" />
            </svg>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white border-t border-border">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <FadeIn delay={0.1}>
                <div className="space-y-4">
                  <div className="mx-auto h-16 w-16 rounded-full bg-accent/10 ring-1 ring-accent/30 flex items-center justify-center">
                    <Globe2 className="h-7 w-7 text-primary" strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold">איגוד ארצי</h3>
                  <div className="text-muted-foreground text-lg">
                    למעלה מ־60 בריכות טיפוליות מאוגדות במסגרת האיגוד.
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="space-y-4">
                  <div className="mx-auto h-16 w-16 rounded-full bg-accent/10 ring-1 ring-accent/30 flex items-center justify-center">
                    <Landmark className="h-7 w-7 text-primary" strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold">קשרי ממשל</h3>
                  <div className="text-muted-foreground text-lg">
                    פעילות מוסדית שוטפת מול משרדי הממשלה וקופות החולים.
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="space-y-4">
                  <div className="mx-auto h-16 w-16 rounded-full bg-accent/10 ring-1 ring-accent/30 flex items-center justify-center">
                    <BadgeCheck className="h-7 w-7 text-primary" strokeWidth={1.75} aria-hidden="true" />
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
              <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
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
                    <div className="group flex items-start gap-5 py-7 border-t border-border transition-colors hover:border-accent/60">
                      <span className="text-2xl font-bold tabular-nums text-accent-strong leading-none pt-1 transition-transform duration-300 group-hover:-translate-y-0.5">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-xl font-bold mb-2 tracking-tight">{goal.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{goal.description}</p>
                      </div>
                    </div>
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
                    <CardTitle as="h3" className="text-2xl mb-2">צבי הנדלס</CardTitle>
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
                  Icon: Scale,
                },
                {
                  title: "התאמת נהלים למציאות הענפית",
                  description: "קידום בחינה והתאמה של דרישות רגולטוריות למאפייני הבריכות הטיפוליות ולהתפתחות הענף.",
                  Icon: ClipboardCheck,
                },
                {
                  title: "שמירה על מקומן במערך הבריאות והשיקום",
                  description: "פעילות להבטחת המשך שילובן של הבריכות הטיפוליות במערך השירותים הרפואיים והשיקומיים בישראל.",
                  Icon: HeartPulse,
                },
                {
                  title: "גיבוש עמדות ענפיות",
                  description: "ריכוז עמדות משותפות של הבריכות החברות והצגתן בפני מקבלי ההחלטות במישור הציבורי והמערכתי.",
                  Icon: Users,
                },
                {
                  title: "ליווי והכוונה מוסדית",
                  description: "סיוע לבריכות החברות בהתמודדות עם סוגיות רישוי, בטיחות ותפעול.",
                  Icon: Compass,
                },
                {
                  title: "שיח וניהול ענפי",
                  description: "יצירת מסגרת לשיתוף ידע ניהולי ותפעולי בין מנהלי הבריכות וחיזוק שיתופי פעולה בענף.",
                  Icon: MessagesSquare,
                },
              ].map((activity, index) => (
                <FadeInStaggerItem key={index}>
                  <Card className="group text-center h-full card-hover border border-border shadow-none bg-white">
                    <CardHeader>
                      <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-accent/10 ring-1 ring-accent/25 flex items-center justify-center transition-colors group-hover:bg-accent/20">
                        <activity.Icon
                          className="h-7 w-7 text-primary"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                      </div>
                      <CardTitle as="h3" className="text-xl">{activity.title}</CardTitle>
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

        {/* Join Section - Deep-water CTA */}
        <section
          id="join"
          className="relative overflow-hidden py-24 text-white animate-sheen"
          style={{
            background:
              "linear-gradient(135deg, #07344F 0%, #0A3D62 45%, #135A86 100%)",
          }}
          aria-labelledby="join-heading"
        >
          {/* Floating aqua orb */}
          <div
            className="absolute -bottom-20 -left-16 h-80 w-80 rounded-full animate-float-slow pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(75,184,201,0.30), transparent 70%)" }}
            aria-hidden="true"
          />
          <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn>
                <span className="text-accent font-semibold mb-4 block">הצטרפו אלינו</span>
                <h2 id="join-heading" className="text-4xl md:text-5xl font-bold mb-6">
                  הצטרפות לאיגוד הבריכות הטיפוליות בישראל
                </h2>
                <p className="text-xl text-background/90 mb-12">
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
                      <p className="text-background/90">{benefit.description}</p>
                    </div>
                  </FadeInStaggerItem>
                ))}
              </FadeInStagger>

              <FadeIn delay={0.4}>
                <p className="text-xl mb-8 text-background/95">
                  חברות באיגוד משקפת השתייכות למסגרת ענפית הפועלת לחיזוק
                  הבריכות הטיפוליות בישראל.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="text-lg px-10 py-6 btn-ink bg-white text-primary hover:bg-accent hover:text-white font-medium"
                >
                  <Link href="/contact">טופס הצטרפות</Link>
                </Button>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Pools Index Section */}
        {isLoading ? (
          <section id="pools" className="py-24 bg-muted/50" aria-labelledby="pools-loading-heading">
            <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center" aria-live="polite" aria-busy="true">
              <h2 id="pools-loading-heading" className="sr-only">מאגר בריכות טיפוליות</h2>
              <p className="text-muted-foreground" role="status">טוען בריכות...</p>
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
