import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET - fetch all pools
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("pools")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;

    // Map to match existing format
    const pools = data.map((pool) => ({
      id: String(pool.id),
      name: pool.name,
      operator: pool.operator,
      address: pool.address,
      city: pool.city,
      phone: pool.phone,
      email: pool.email,
      openingHours: {
        sunday_thursday: pool.opening_hours_weekdays,
        friday: pool.opening_hours_friday,
      },
      treatments: pool.treatments || [],
      isAccessible: pool.is_accessible,
    }));

    return NextResponse.json(pools);
  } catch (error) {
    console.error("GET pools error:", error);
    return NextResponse.json({ error: "Failed to read pools" }, { status: 500 });
  }
}

// POST - create new pool
export async function POST(request) {
  try {
    const newPool = await request.json();

    const { data, error } = await supabase
      .from("pools")
      .insert({
        name: newPool.name,
        operator: newPool.operator,
        address: newPool.address,
        city: newPool.city,
        phone: newPool.phone,
        email: newPool.email,
        opening_hours_weekdays: newPool.openingHours.sunday_thursday,
        opening_hours_friday: newPool.openingHours.friday,
        treatments: newPool.treatments || [],
        is_accessible: newPool.isAccessible || false,
      })
      .select()
      .single();

    if (error) throw error;

    // Return in the same format as the input
    const createdPool = {
      id: String(data.id),
      name: data.name,
      operator: data.operator,
      address: data.address,
      city: data.city,
      phone: data.phone,
      email: data.email,
      openingHours: {
        sunday_thursday: data.opening_hours_weekdays,
        friday: data.opening_hours_friday,
      },
      treatments: data.treatments || [],
      isAccessible: data.is_accessible,
    };

    return NextResponse.json(createdPool, { status: 201 });
  } catch (error) {
    console.error("POST pool error:", error);
    return NextResponse.json({ error: "Failed to create pool" }, { status: 500 });
  }
}

// PUT - update pool
export async function PUT(request) {
  try {
    const updatedPool = await request.json();

    const { data, error } = await supabase
      .from("pools")
      .update({
        name: updatedPool.name,
        operator: updatedPool.operator,
        address: updatedPool.address,
        city: updatedPool.city,
        phone: updatedPool.phone,
        email: updatedPool.email,
        opening_hours_weekdays: updatedPool.openingHours.sunday_thursday,
        opening_hours_friday: updatedPool.openingHours.friday,
        treatments: updatedPool.treatments || [],
        is_accessible: updatedPool.isAccessible || false,
      })
      .eq("id", parseInt(updatedPool.id))
      .select()
      .single();

    if (error) throw error;

    // Return in the same format
    const pool = {
      id: String(data.id),
      name: data.name,
      operator: data.operator,
      address: data.address,
      city: data.city,
      phone: data.phone,
      email: data.email,
      openingHours: {
        sunday_thursday: data.opening_hours_weekdays,
        friday: data.opening_hours_friday,
      },
      treatments: data.treatments || [],
      isAccessible: data.is_accessible,
    };

    return NextResponse.json(pool);
  } catch (error) {
    console.error("PUT pool error:", error);
    return NextResponse.json({ error: "Failed to update pool" }, { status: 500 });
  }
}

// DELETE - delete pool
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("pools")
      .delete()
      .eq("id", parseInt(id));

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE pool error:", error);
    return NextResponse.json({ error: "Failed to delete pool" }, { status: 500 });
  }
}
