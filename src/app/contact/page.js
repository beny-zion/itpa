import ContactPage from "@/components/ContactPage";

export const metadata = {
  title: "צור קשר | איגוד הבריכות הטיפוליות בישראל",
  description:
    "צרו קשר עם איגוד הבריכות הטיפוליות בישראל. הצטרפות לאיגוד, בקשת מידע על הידרותרפיה, שאלות על בריכות טיפוליות ועוד.",
  keywords: [
    "צור קשר איגוד בריכות",
    "הצטרפות לאיגוד בריכות טיפוליות",
    "בריכות טיפוליות ישראל",
    "הידרותרפיה יצירת קשר",
  ],
  alternates: {
    canonical: "https://www.itpa.org.il/contact",
  },
};

export default function Page() {
  return <ContactPage />;
}
