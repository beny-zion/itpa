import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request) {
  try {
    // Verify admin session
    const adminSession = request.cookies.get("admin_session");
    if (!adminSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { pools, mode = "add_only" } = await request.json();

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
      .select("id, name");

    if (fetchError) throw fetchError;

    const existingByName = new Map(
      (existingPools || []).map((p) => [p.name.trim(), p.id])
    );

    const newPools = [];
    const toUpdate = [];
    const skipped = [];

    for (const pool of pools) {
      const trimmedName = pool.name.trim();
      const existingId = existingByName.get(trimmedName);

      if (existingId !== undefined) {
        if (mode === "update_existing") {
          toUpdate.push({ ...pool, id: existingId });
        } else {
          skipped.push(pool.name);
        }
      } else {
        newPools.push(pool);
      }
    }

    let addedCount = 0;
    let updatedCount = 0;

    // Insert new pools
    if (newPools.length > 0) {
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
      addedCount = data.length;
    }

    // Update existing pools
    if (toUpdate.length > 0) {
      for (const pool of toUpdate) {
        const { error: updateError } = await supabase
          .from("pools")
          .update({
            name: pool.name,
            city: pool.city,
            address: pool.address || "",
            phone: pool.phone || "",
            email: pool.email || "",
            website: pool.website || "",
            treatments: pool.treatments || [],
            is_accessible: pool.isAccessible || false,
          })
          .eq("id", pool.id);

        if (updateError) throw updateError;
        updatedCount++;
      }
    }

    // Build response message
    const parts = [];
    if (addedCount > 0) parts.push(`נוספו ${addedCount} בריכות חדשות`);
    if (updatedCount > 0) parts.push(`עודכנו ${updatedCount} בריכות קיימות`);
    if (skipped.length > 0) parts.push(`${skipped.length} בריכות דולגו (כבר קיימות)`);
    const message = parts.join(", ") || "לא בוצעו שינויים";

    return NextResponse.json({
      success: true,
      message,
      added: addedCount,
      updated: updatedCount,
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
