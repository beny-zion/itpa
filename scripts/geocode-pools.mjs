/**
 * Geocode pools — ממיר כתובות של בריכות לקואורדינטות (lat/lng) ושומר ב-Supabase.
 *
 * הרצה:   node scripts/geocode-pools.mjs
 * דגלים:  --force   ממיר מחדש גם בריכות שכבר יש להן קואורדינטות
 *
 * משתמש ב-Nominatim (OpenStreetMap) — חינמי, ללא מפתח API.
 * מדיניות שימוש: עד בקשה אחת לשנייה + User-Agent מזהה (מכובד למטה).
 *
 * דורש ב-.env.local:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY   ← חייב מפתח service role אמיתי (כתיבה לטבלה)
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- טעינת .env.local ידנית (סקריפט עצמאי, לא דרך Next) ---
function loadEnv() {
  try {
    const raw = readFileSync(join(__dirname, "..", ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch {
    console.warn("⚠ לא נמצא קובץ .env.local — מסתמך על משתני סביבה קיימים");
  }
}
loadEnv();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("✗ חסרים NEXT_PUBLIC_SUPABASE_URL או SUPABASE_SERVICE_ROLE_KEY ב-.env.local");
  process.exit(1);
}

const force = process.argv.includes("--force");
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** ממיר כתובת בודדת לקואורדינטות דרך Nominatim. מחזיר {lat,lng} או null. */
async function geocode(address, city) {
  // ניסיון 1: שאילתה מובנית (מדויק יותר)
  const structured = new URL("https://nominatim.openstreetmap.org/search");
  structured.searchParams.set("format", "jsonv2");
  structured.searchParams.set("limit", "1");
  structured.searchParams.set("countrycodes", "il");
  structured.searchParams.set("street", address || "");
  structured.searchParams.set("city", city || "");

  // ניסיון 2 (גיבוי): שאילתה חופשית
  const freeform = new URL("https://nominatim.openstreetmap.org/search");
  freeform.searchParams.set("format", "jsonv2");
  freeform.searchParams.set("limit", "1");
  freeform.searchParams.set("countrycodes", "il");
  freeform.searchParams.set("q", [address, city, "ישראל"].filter(Boolean).join(", "));

  // ניסיון 3 (גיבוי אחרון): לפי עיר/יישוב בלבד — סיכה במרכז היישוב
  const cityOnly = new URL("https://nominatim.openstreetmap.org/search");
  cityOnly.searchParams.set("format", "jsonv2");
  cityOnly.searchParams.set("limit", "1");
  cityOnly.searchParams.set("countrycodes", "il");
  cityOnly.searchParams.set("q", [city, "ישראל"].filter(Boolean).join(", "));

  const attempts = city ? [structured, freeform, cityOnly] : [structured, freeform];
  for (const url of attempts) {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "ITPA-Pools-Geocoder/1.0 (https://www.itpa.org.il)",
        "Accept-Language": "he",
      },
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      }
    }
    await sleep(1100); // כיבוד מדיניות Nominatim: ~בקשה לשנייה
  }
  return null;
}

async function main() {
  const { data: pools, error } = await supabase
    .from("pools")
    .select("id, name, address, city, lat, lng")
    .order("id", { ascending: true });

  if (error) {
    console.error("✗ שגיאה בקריאת בריכות:", error.message);
    process.exit(1);
  }

  const todo = pools.filter((p) => force || p.lat == null || p.lng == null);
  console.log(`נמצאו ${pools.length} בריכות, ${todo.length} דורשות המרה${force ? " (force)" : ""}.\n`);

  let ok = 0;
  const failed = [];

  for (const pool of todo) {
    const coords = await geocode(pool.address, pool.city);
    if (!coords) {
      console.log(`✗ ${pool.name} — לא נמצאו קואורדינטות (${pool.address}, ${pool.city})`);
      failed.push(pool);
      continue;
    }

    const { error: upErr } = await supabase
      .from("pools")
      .update({ lat: coords.lat, lng: coords.lng })
      .eq("id", pool.id);

    if (upErr) {
      console.log(`✗ ${pool.name} — שגיאת שמירה: ${upErr.message}`);
      failed.push(pool);
    } else {
      console.log(`✓ ${pool.name} → ${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`);
      ok++;
    }
  }

  console.log(`\nסיכום: ${ok} הומרו בהצלחה, ${failed.length} נכשלו.`);
  if (failed.length > 0) {
    console.log("בריכות שנכשלו (יש להזין קואורדינטות ידנית בפאנל הניהול):");
    failed.forEach((p) => console.log(`  • ${p.name} (${p.address}, ${p.city})`));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
