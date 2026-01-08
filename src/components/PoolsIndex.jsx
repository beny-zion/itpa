"use client";

import { useState, useMemo } from "react";
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

export default function PoolsIndex({ pools }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [accessibleOnly, setAccessibleOnly] = useState(false);

  const cities = useMemo(() => {
    const uniqueCities = [...new Set(pools.map((pool) => pool.city))];
    return uniqueCities.sort();
  }, [pools]);

  const filteredPools = useMemo(() => {
    return pools.filter((pool) => {
      const matchesSearch =
        pool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pool.operator.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
      className="py-16 bg-muted/30"
      aria-labelledby="pools-heading"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 id="pools-heading" className="text-3xl font-bold mb-4">
            אינדקס בריכות טיפוליות
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            חפשו ומצאו בריכה טיפולית בקרבתכם מבין הבריכות החברות באיגוד
          </p>
        </div>

        {/* Filters */}
        <div
          className="bg-card p-6 rounded-lg shadow-sm mb-8"
          role="search"
          aria-label="סינון בריכות"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search" className="mb-2 block">
                חיפוש חופשי
              </Label>
              <Input
                id="search"
                type="search"
                placeholder="שם בריכה, עמותה או סוג טיפול..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-describedby="search-description"
              />
              <span id="search-description" className="sr-only">
                חפשו לפי שם בריכה, שם העמותה המפעילה או סוג טיפול
              </span>
            </div>

            <div>
              <Label htmlFor="city-filter" className="mb-2 block">
                סינון לפי עיר
              </Label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger id="city-filter">
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

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={accessibleOnly}
                  onChange={(e) => setAccessibleOnly(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm font-medium">
                  הצג רק בריכות נגישות
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-4" aria-live="polite">
          נמצאו {filteredPools.length} בריכות
        </p>

        {/* Pools Grid */}
        {filteredPools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPools.map((pool) => (
              <Card key={pool.id} className="h-full">
                <CardHeader>
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-xl">{pool.name}</CardTitle>
                    {pool.isAccessible && (
                      <Badge
                        variant="secondary"
                        className="shrink-0"
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
                  <CardDescription>{pool.operator}</CardDescription>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="font-medium text-muted-foreground">
                        כתובת:
                      </dt>
                      <dd>
                        {pool.address}, {pool.city}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-muted-foreground">
                        טלפון:
                      </dt>
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
                    <div>
                      <dt className="font-medium text-muted-foreground">
                        דוא״ל:
                      </dt>
                      <dd>
                        <a
                          href={`mailto:${pool.email}`}
                          className="text-primary hover:underline break-all"
                        >
                          {pool.email}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-muted-foreground">
                        שעות פעילות:
                      </dt>
                      <dd>
                        <ul className="mt-1">
                          <li>א׳-ה׳: {pool.openingHours.sunday_thursday}</li>
                          <li>ו׳: {pool.openingHours.friday}</li>
                        </ul>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-muted-foreground mb-2">
                        סוגי טיפולים:
                      </dt>
                      <dd className="flex flex-wrap gap-1">
                        {pool.treatments.map((treatment) => (
                          <Badge key={treatment} variant="outline">
                            {treatment}
                          </Badge>
                        ))}
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-card rounded-lg" role="status">
            <p className="text-muted-foreground">
              לא נמצאו בריכות התואמות את החיפוש
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
