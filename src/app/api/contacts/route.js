import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const contactsFilePath = path.join(process.cwd(), "src", "data", "contacts.json");

async function readContacts() {
  try {
    const data = await fs.readFile(contactsFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeContacts(contacts) {
  await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2), "utf8");
}

// GET - fetch all contacts (for admin)
export async function GET() {
  try {
    const contacts = await readContacts();
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to read contacts" }, { status: 500 });
  }
}

// POST - create new contact submission
export async function POST(request) {
  try {
    const newContact = await request.json();
    const contacts = await readContacts();

    // Generate new ID and add timestamp
    const maxId = contacts.reduce(
      (max, contact) => Math.max(max, parseInt(contact.id) || 0),
      0
    );

    const contactEntry = {
      id: String(maxId + 1),
      ...newContact,
      createdAt: new Date().toISOString(),
      status: "new", // new, read, handled
    };

    contacts.unshift(contactEntry); // Add to beginning
    await writeContacts(contacts);

    return NextResponse.json({ success: true, id: contactEntry.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save contact" }, { status: 500 });
  }
}

// PUT - update contact status
export async function PUT(request) {
  try {
    const { id, status } = await request.json();
    const contacts = await readContacts();

    const index = contacts.findIndex((c) => c.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }

    contacts[index].status = status;
    await writeContacts(contacts);

    return NextResponse.json({ success: true });
  } catch (error) {
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

    const contacts = await readContacts();
    const filteredContacts = contacts.filter((c) => c.id !== id);

    if (filteredContacts.length === contacts.length) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }

    await writeContacts(filteredContacts);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete contact" }, { status: 500 });
  }
}
