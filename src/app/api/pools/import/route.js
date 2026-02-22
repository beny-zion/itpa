import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request) {
  try {
    // Verify admin session
    const adminSession = request.cookies.get("admin_session");
    if (!adminSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { pools } = await request.json();

    if (!Array.isArray(pools) || pools.length === 0) {
      return NextResponse.json(
        { error: "No pools data provided" },
        { status: 400 }
      );
    }

    // Validate each pool has required fields
    for (let i = 0; i < pools.length; i++) {
      const pool = pools[i];
      if (!pool.name || !pool.city) {
        return NextResponse.json(
          { error: `שורה ${i + 1}: חסר שם בריכה או עיר` },
          { status: 400 }
        );
      }
    }

    // Get existing pools to check for duplicates
    const { data: existingPools, error: fetchError } = await supabase
      .from("pools")
      .select("name");

    if (fetchError) throw fetchError;

    const existingNames = new Set(
      (existingPools || []).map((p) => p.name.trim())
    );

    // Filter out duplicates
    const newPools = [];
    const skipped = [];

    for (const pool of pools) {
      if (existingNames.has(pool.name.trim())) {
        skipped.push(pool.name);
      } else {
        newPools.push(pool);
      }
    }

    if (newPools.length === 0) {
      return NextResponse.json({
        success: true,
        message: "כל הבריכות כבר קיימות במערכת — לא נוספו בריכות חדשות",
        added: 0,
        skipped: skipped.length,
        skippedNames: skipped,
      });
    }

    // Insert only new pools
    const poolsToInsert = newPools.map((pool) => ({
      name: pool.name,
      city: pool.city,
      address: pool.address || "",
      phone: pool.phone || "",
      email: pool.email || "",
      website: pool.website || "",
      treatments: pool.treatments || [],
      is_accessible: pool.isAccessible || false,
    }));

    const { data, error: insertError } = await supabase
      .from("pools")
      .insert(poolsToInsert)
      .select();

    if (insertError) throw insertError;

    let message = `נוספו ${data.length} בריכות חדשות`;
    if (skipped.length > 0) {
      message += ` (${skipped.length} בריכות כבר היו קיימות ודולגו)`;
    }

    return NextResponse.json({
      success: true,
      message,
      added: data.length,
      skipped: skipped.length,
      skippedNames: skipped,
    });
  } catch (error) {
    console.error("Import error:", error);
    return NextResponse.json(
      { error: "שגיאה בייבוא: " + error.message },
      { status: 500 }
    );
  }
}
