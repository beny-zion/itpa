"use client";

import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ExternalLink } from "lucide-react";

// סיכה מותאמת בצבע המותג (טורקיז) — נמנע גם מבעיית נתיב האייקון של leaflet בבאנדלרים
const poolIcon = L.divIcon({
  className: "pool-marker",
  html: `
    <svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M16 0C7.16 0 0 7.16 0 16c0 11 16 26 16 26s16-15 16-26C32 7.16 24.84 0 16 0z" fill="#0A3D62"/>
      <circle cx="16" cy="16" r="6" fill="#4BB8C9"/>
    </svg>`,
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -38],
});

// מרכז ברירת מחדל: מרכז ישראל
const ISRAEL_CENTER = [31.5, 34.9];

function FitBounds({ points }) {
  const map = useMap();
  useMemo(() => {
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView(points[0], 13);
    } else {
      map.fitBounds(points, { padding: [50, 50] });
    }
  }, [map, points]);
  return null;
}

export default function PoolMap({ pools }) {
  const mapped = useMemo(
    () =>
      (pools || []).filter(
        (p) => typeof p.lat === "number" && typeof p.lng === "number"
      ),
    [pools]
  );

  const points = useMemo(() => mapped.map((p) => [p.lat, p.lng]), [mapped]);
  const missingCount = (pools?.length || 0) - mapped.length;

  return (
    <div>
      <div
        className="rounded-2xl overflow-hidden shadow-sm border border-border"
        style={{ height: "70vh", minHeight: 420 }}
      >
        <MapContainer
          center={ISRAEL_CENTER}
          zoom={8}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitBounds points={points} />
          {mapped.map((pool) => (
            <Marker key={pool.id} position={[pool.lat, pool.lng]} icon={poolIcon}>
              <Popup>
                <div dir="rtl" className="text-right min-w-[180px]">
                  <h3 className="font-bold text-base mb-1 text-foreground">
                    {pool.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {pool.address}, {pool.city}
                  </p>
                  {pool.isAccessible && (
                    <span className="inline-block text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5 mb-2">
                      ♿ נגיש
                    </span>
                  )}
                  <div className="flex flex-col gap-1 text-sm">
                    <a
                      href={`tel:${pool.phone}`}
                      className="text-primary hover:underline"
                      dir="ltr"
                    >
                      {pool.phone}
                    </a>
                    {pool.website && (
                      <a
                        href={
                          pool.website.startsWith("http")
                            ? pool.website
                            : `https://${pool.website}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline inline-flex items-center gap-1"
                      >
                        אתר הבריכה
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    )}
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${pool.lat},${pool.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      ניווט במפות גוגל ←
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {missingCount > 0 && (
        <p className="text-sm text-muted-foreground mt-3 text-center" role="status">
          {missingCount} בריכות ללא מיקום על המפה — ניתן לראותן בתצוגת הרשימה.
        </p>
      )}
    </div>
  );
}
