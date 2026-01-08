import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin", "hebrew"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "איגוד הבריכות הטיפוליות בישראל",
  description: "הגוף המקצועי המייצג את תחום ההידרותרפיה בישראל, הפועל לקידום סטנדרטים, רגולציה אחראית, איכות טיפול ובטיחות",
  icons: {
    icon: "/bti_logo.svg",
    apple: "/bti_logo.svg",
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
