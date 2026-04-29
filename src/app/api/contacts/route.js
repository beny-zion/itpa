import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendAdminNotification, sendUserConfirmation } from "@/lib/email";

// GET - fetch all contacts (for admin)
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Map to match existing format
    const contacts = data.map((contact) => ({
      id: String(contact.id),
      fullName: contact.name,
      email: contact.email,
      phone: contact.phone,
      message: contact.message,
      organization: contact.organization,
      subject: contact.subject,
      status: contact.status,
      createdAt: contact.created_at,
    }));

    return NextResponse.json(contacts);
  } catch (error) {
    console.error("GET contacts error:", error);
    return NextResponse.json({ error: "Failed to read contacts" }, { status: 500 });
  }
}

// POST - create new contact submission
export async function POST(request) {
  try {
    const newContact = await request.json();

    const { data, error } = await supabase
      .from("contacts")
      .insert({
        name: newContact.fullName,
        email: newContact.email,
        phone: newContact.phone || null,
        message: newContact.message,
        organization: newContact.organization || null,
        subject: newContact.subject || null,
        status: "new",
      })
      .select()
      .single();

    if (error) throw error;

    const contactPayload = { ...newContact, id: data.id };
    Promise.all([
      sendAdminNotification(contactPayload),
      sendUserConfirmation(contactPayload),
    ]).catch((err) => console.error("Email notification failed:", err));

    return NextResponse.json({ success: true, id: String(data.id) }, { status: 201 });
  } catch (error) {
    console.error("POST contact error:", error);
    return NextResponse.json({ error: "Failed to save contact" }, { status: 500 });
  }
}

// PUT - update contact status
export async function PUT(request) {
  try {
    const { id, status } = await request.json();

    const { error } = await supabase
      .from("contacts")
      .update({ status })
      .eq("id", parseInt(id));

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT contact error:", error);
    return NextResponse.json({ error: "Failed to update contact" }, { status: 500 });
  }
}

// DELETE - delete contact
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("contacts")
      .delete()
      .eq("id", parseInt(id));

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE contact error:", error);
    return NextResponse.json({ error: "Failed to delete contact" }, { status: 500 });
  }
}
