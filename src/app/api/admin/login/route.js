import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json(
        { error: "סיסמת מנהל לא הוגדרה בשרת" },
        { status: 500 }
      );
    }

    if (password === adminPassword) {
      const cookieStore = await cookies();

      cookieStore.set("admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "סיסמה שגויה" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "שגיאה בשרת" }, { status: 500 });
  }
}
