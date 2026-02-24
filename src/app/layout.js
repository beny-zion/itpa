import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin", "hebrew"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL("https://www.itpa.org.il"),
  verification: {
    google: "5Uald6uIVcpJx40qc2TZG0IvpbRqTVh597Np52iTXrM",
  },
  title: {
    default: "איגוד הבריכות הטיפוליות בישראל",
    template: "%s | איגוד הבריכות הטיפוליות",
  },
  description: "הגוף המקצועי המייצג את תחום ההידרותרפיה בישראל. בריכות טיפוליות, שיקום במים, פיזיותרפיה במים וקידום סטנדרטים, רגולציה ובטיחות.",
  keywords: [
    "בריכות טיפוליות",
    "הידרותרפיה",
    "שיקום במים",
    "טיפול במים",
    "בריכות טיפוליות בישראל",
    "פיזיותרפיה במים",
    "בריכה חמה טיפולית",
    "אקווה תרפיה",
    "שחייה טיפולית",
    "טיפול הידרותרפי",
    "בריכת שיקום",
    "איגוד בריכות",
  ],
  icons: {
    icon: "/bti_logo.svg",
    apple: "/bti_logo.svg",
  },
  openGraph: {
    title: "איגוד הבריכות הטיפוליות בישראל",
    description: "הגוף הארצי המאגד בריכות טיפוליות בישראל. הידרותרפיה, שיקום במים וקידום סטנדרטים מקצועיים.",
    url: "https://www.itpa.org.il",
    siteName: "איגוד הבריכות הטיפוליות בישראל",
    images: [
      {
        url: "/og-image2.jpg",
        width: 1200,
        height: 630,
        alt: "איגוד הבריכות הטיפוליות בישראל - הידרותרפיה ושיקום במים",
      },
    ],
    locale: "he_IL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "איגוד הבריכות הטיפוליות בישראל",
    description: "הגוף המקצועי המייצג את תחום ההידרותרפיה והבריכות הטיפוליות בישראל.",
    images: ["/og-image2.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "איגוד הבריכות הטיפוליות בישראל",
  alternateName: "ITPA - Israel Therapeutic Pools Association",
  url: "https://www.itpa.org.il",
  logo: "https://www.itpa.org.il/bti_logo.svg",
  email: "office@itpa.org.il",
  address: {
    "@type": "PostalAddress",
    streetAddress: "אליעזר בן הורקנוס 8",
    addressLocality: "אשדוד",
    addressCountry: "IL",
  },
  description:
    "הגוף הארצי המאגד בריכות טיפוליות בישראל. פועל לקידום הידרותרפיה, שיקום במים, סטנדרטים מקצועיים ורגולציה בתחום הבריכות הטיפוליות.",
  sameAs: [],
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${rubik.variable} font-sans antialiased`}>
        <a href="#main-content" className="skip-link">
          דלג לתוכן הראשי
        </a>
        {children}
      </body>
    </html>
  );
}
