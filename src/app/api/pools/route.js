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
        address: newPool.address,
        city: newPool.city,
        phone: newPool.phone,
        email: newPool.email,
        website: newPool.website || "",
        treatments: newPool.treatments || [],
        is_accessible: newPool.isAccessible || false,
        lat: newPool.lat ?? null,
        lng: newPool.lng ?? null,
      })
      .select()
      .single();

    if (error) throw error;

    const createdPool = {
      id: String(data.id),
      name: data.name,
      address: data.address,
      city: data.city,
      phone: data.phone,
      email: data.email,
      website: data.website || "",
      treatments: data.treatments || [],
      isAccessible: data.is_accessible,
      lat: data.lat ?? null,
      lng: data.lng ?? null,
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
        address: updatedPool.address,
        city: updatedPool.city,
        phone: updatedPool.phone,
        email: updatedPool.email,
        website: updatedPool.website || "",
        treatments: updatedPool.treatments || [],
        is_accessible: updatedPool.isAccessible || false,
        lat: updatedPool.lat ?? null,
        lng: updatedPool.lng ?? null,
      })
      .eq("id", parseInt(updatedPool.id))
      .select()
      .single();

    if (error) throw error;

    const pool = {
      id: String(data.id),
      name: data.name,
      address: data.address,
      city: data.city,
      phone: data.phone,
      email: data.email,
      website: data.website || "",
      treatments: data.treatments || [],
      isAccessible: data.is_accessible,
      lat: data.lat ?? null,
      lng: data.lng ?? null,
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
