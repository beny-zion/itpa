import HomePage from "@/components/HomePage";
import { supabase } from "@/lib/supabase";

// Re-generate the page (and its pool directory) at most once an hour
export const revalidate = 3600;

async function getPools() {
  try {
    const { data, error } = await supabase
      .from("pools")
      .select("*")
      .order("id", { ascending: true });
    if (error || !data) return [];
    return data.map((pool) => ({
      id: String(pool.id),
      name: pool.name,
      address: pool.address,
      city: pool.city,
      phone: pool.phone,
      email: pool.email,
      website: pool.website || "",
      treatments: pool.treatments || [],
      isAccessible: pool.is_accessible,
      lat: pool.lat ?? null,
      lng: pool.lng ?? null,
    }));
  } catch {
    return [];
  }
}

export const metadata = {
  title: "בריכות טיפוליות בישראל – מאגר ארצי, הידרותרפיה ושיקום במים | איגוד הבריכות הטיפוליות",
  description:
    "מחפשים בריכה טיפולית? מאגר ארצי של בריכות טיפוליות בישראל לפי עיר ואזור, על גבי מפה, לצד מידע על הידרותרפיה, שיקום במים ופיזיותרפיה במים. האתר הרשמי של איגוד הבריכות הטיפוליות בישראל.",
  keywords: [
    "בריכות טיפוליות",
    "הידרותרפיה",
    "שיקום במים",
    "טיפול במים",
    "בריכות טיפוליות בישראל",
    "איגוד בריכות",
    "בריכה חמה טיפולית",
    "פיזיותרפיה במים",
    "טיפול הידרותרפי",
    "בריכת שיקום",
    "תרפיה במים",
    "בריכה טיפולית",
    "שחייה טיפולית",
    "אקווה תרפיה",
  ],
  alternates: {
    canonical: "https://www.itpa.org.il",
  },
};

export default async function Page() {
  const pools = await getPools();

  // Structured data: a national directory of therapeutic pools
  const poolsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "מאגר בריכות טיפוליות בישראל",
    description:
      "רשימת הבריכות הטיפוליות החברות באיגוד הבריכות הטיפוליות בישראל, לפי עיר ואזור.",
    numberOfItems: pools.length,
    itemListElement: pools.map((pool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "MedicalBusiness",
        name: pool.name,
        address: {
          "@type": "PostalAddress",
          streetAddress: pool.address,
          addressLocality: pool.city,
          addressCountry: "IL",
        },
        ...(pool.lat != null && pool.lng != null
          ? {
              geo: {
                "@type": "GeoCoordinates",
                latitude: pool.lat,
                longitude: pool.lng,
              },
            }
          : {}),
        ...(pool.phone ? { telephone: pool.phone } : {}),
        ...(pool.website
          ? {
              url: pool.website.startsWith("http")
                ? pool.website
                : `https://${pool.website}`,
            }
          : {}),
      },
    })),
  };

  return (
    <>
      {pools.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(poolsJsonLd) }}
        />
      )}
      <HomePage initialPools={pools} />
    </>
  );
}
