import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin", "hebrew"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "איגוד הבריכות הטיפוליות בישראל",
  description: "הגוף המקצועי המייצג את תחום ההידרותרפיה בישראל. פועלים לקידום סטנדרטים, רגולציה ובטיחות.",
  icons: {
    icon: "/bti_logo.svg",
    apple: "/bti_logo.svg",
  },
  openGraph: {
    title: "איגוד הבריכות הטיפוליות בישראל",
    description: "מובילים את תחום הטיפול במים בישראל עם סטנדרטים מקצועיים גבוהים.",
    url: "https://itpa.vercel.app/",
    siteName: "איגוד הבריכות הטיפוליות",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "איגוד הבריכות הטיפוליות בישראל",
      },
    ],
    locale: "he_IL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "איגוד הבריכות הטיפוליות בישראל",
    description: "הגוף המקצועי המייצג את תחום ההידרותרפיה בישראל.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${rubik.variable} font-sans antialiased`}>
        <a href="#main-content" className="skip-link">
          דלג לתוכן הראשי
        </a>
        {children}
      </body>
    </html>
  );
}
