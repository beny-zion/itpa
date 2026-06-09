"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/FadeIn";
import { ExternalLink, Map as MapIcon, List as ListIcon } from "lucide-react";

// Leaflet עובד רק בצד הלקוח — טעינה דינמית ללא SSR
const PoolMap = dynamic(() => import("@/components/PoolMap"), {
  ssr: false,
  loading: () => (
    <div
      className="rounded-2xl bg-white shadow-sm border border-border flex items-center justify-center"
      style={{ height: "70vh", minHeight: 420 }}
    >
      <p className="text-muted-foreground" role="status">טוען מפה...</p>
    </div>
  ),
});

export default function PoolsIndex({ pools }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [accessibleOnly, setAccessibleOnly] = useState(false);
  const [viewMode, setViewMode] = useState("map");

  const safePools = Array.isArray(pools) ? pools : [];

  const cities = useMemo(() => {
    const uniqueCities = [...new Set(safePools.map((pool) => pool.city))];
    return uniqueCities.sort();
  }, [safePools]);

  const filteredPools = useMemo(() => {
    return safePools.filter((pool) => {
      const matchesSearch =
        pool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pool.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pool.treatments.some((t) =>
          t.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesCity = selectedCity === "all" || pool.city === selectedCity;
      const matchesAccessible = !accessibleOnly || pool.isAccessible;

      return matchesSearch && matchesCity && matchesAccessible;
    });
  }, [pools, searchTerm, selectedCity, accessibleOnly]);

  return (
    <section
      id="pools"
      className="py-24 bg-muted/50"
      aria-labelledby="pools-heading"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-primary font-medium mb-4 block">מאגר הבריכות</span>
            <h2 id="pools-heading" className="text-4xl md:text-5xl font-bold mb-6">
              אינדקס בריכות טיפוליות
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              חפשו ומצאו בריכה טיפולית בקרבתכם מבין הבריכות החברות באיגוד
            </p>
          </div>
        </FadeIn>

        {/* Filters */}
        <FadeIn delay={0.2}>
          <div
            className="bg-white p-8 rounded-2xl shadow-sm mb-10 border-0"
            role="search"
            aria-label="סינון בריכות"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="search" className="mb-3 block text-sm font-medium">
                  חיפוש חופשי
                </Label>
                <Input
                  id="search"
                  type="search"
                  placeholder="שם בריכה, עיר או סוג טיפול..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-describedby="search-description"
                  className="rounded-xl h-12"
                />
                <span id="search-description" className="sr-only">
                  חפשו לפי שם בריכה, עיר או סוג טיפול
                </span>
              </div>

              <div>
                <Label htmlFor="city-filter" className="mb-3 block text-sm font-medium">
                  סינון לפי עיר
                </Label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger id="city-filter" className="rounded-xl h-12">
                    <SelectValue placeholder="בחרו עיר" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">כל הערים</SelectItem>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end pb-1">
                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-muted/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={accessibleOnly}
                    onChange={(e) => setAccessibleOnly(e.target.checked)}
                    className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium">
                    הצג רק בריכות נגישות
                  </span>
                </label>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Results count + view toggle */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            נמצאו <span className="font-semibold text-foreground">{filteredPools.length}</span> בריכות
          </p>

          <div
            className="inline-flex rounded-md bg-white border border-border p-1"
            role="group"
            aria-label="בחירת תצוגה"
          >
            <button
              type="button"
              onClick={() => setViewMode("map")}
              aria-pressed={viewMode === "map"}
              className={`inline-flex items-center gap-2 rounded-sm px-4 py-2 text-sm font-medium transition-colors ${
                viewMode === "map"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <MapIcon className="h-4 w-4" aria-hidden="true" />
              מפה
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              aria-pressed={viewMode === "list"}
              className={`inline-flex items-center gap-2 rounded-sm px-4 py-2 text-sm font-medium transition-colors ${
                viewMode === "list"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ListIcon className="h-4 w-4" aria-hidden="true" />
              רשימה
            </button>
          </div>
        </div>

        {/* Map View */}
        {viewMode === "map" && (
          <FadeIn>
            <PoolMap pools={filteredPools} />
          </FadeIn>
        )}

        {/* Pools Grid */}
        {viewMode === "list" && (filteredPools.length > 0 ? (
          <FadeInStagger
            key={`${searchTerm}-${selectedCity}-${accessibleOnly}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPools.map((pool) => (
              <FadeInStaggerItem key={pool.id}>
                <Card className="h-full card-hover border-0 shadow-sm bg-white">
                  <CardHeader>
                    <div className="flex justify-between items-start gap-2">
                      <CardTitle className="text-xl">{pool.name}</CardTitle>
                      {pool.isAccessible && (
                        <Badge
                          className="shrink-0 bg-primary/10 text-primary hover:bg-primary/20 border-0"
                          aria-label="בריכה נגישה לבעלי מוגבלויות"
                        >
                          <svg
                            className="h-4 w-4 ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
                          </svg>
                          נגיש
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-4 text-sm">
                      <div className="flex items-start gap-3">
                        <svg className="h-5 w-5 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div>
                          <dt className="sr-only">כתובת</dt>
                          <dd className="text-muted-foreground">
                            {pool.address}, {pool.city}
                          </dd>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <svg className="h-5 w-5 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <div>
                          <dt className="sr-only">טלפון</dt>
                          <dd>
                            <a
                              href={`tel:${pool.phone}`}
                              className="text-primary hover:underline"
                              dir="ltr"
                            >
                              {pool.phone}
                            </a>
                          </dd>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <svg className="h-5 w-5 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <dt className="sr-only">דוא״ל</dt>
                          <dd>
                            <a
                              href={`mailto:${pool.email}`}
                              className="text-primary hover:underline break-all"
                            >
                              {pool.email}
                            </a>
                          </dd>
                        </div>
                      </div>

                      {pool.website && (
                        <div className="flex items-start gap-3">
                          <svg className="h-5 w-5 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                          <div>
                            <dt className="sr-only">אתר</dt>
                            <dd>
                              <a
                                href={pool.website.startsWith("http") ? pool.website : `https://${pool.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline break-all inline-flex items-center gap-1"
                                aria-label={`${pool.website} (נפתח בחלון חדש)`}
                              >
                                {pool.website}
                                <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                                <span className="sr-only"> (נפתח בחלון חדש)</span>
                              </a>
                            </dd>
                          </div>
                        </div>
                      )}

                      <div className="pt-2">
                        <dt className="font-medium text-muted-foreground mb-2">
                          סוגי טיפולים:
                        </dt>
                        <dd className="flex flex-wrap gap-2">
                          {pool.treatments.map((treatment) => (
                            <Badge
                              key={treatment}
                              variant="outline"
                              className="rounded-full"
                            >
                              {treatment}
                            </Badge>
                          ))}
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </FadeInStaggerItem>
            ))}
          </FadeInStagger>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl" role="status">
            <svg className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-muted-foreground text-lg">
              לא נמצאו בריכות התואמות את החיפוש
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
