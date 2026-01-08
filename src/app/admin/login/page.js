"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push(redirect);
        router.refresh();
      } else {
        setError(data.error || "סיסמה שגויה");
      }
    } catch (err) {
      setError("שגיאה בהתחברות, נסו שוב");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">כניסה לממשק ניהול</CardTitle>
          <CardDescription>
            הזינו את סיסמת המנהל כדי להיכנס למערכת
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">סיסמה</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                dir="ltr"
              />
            </div>

            {error && (
              <div
                className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm"
                role="alert"
              >
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "מתחבר..." : "כניסה"}
            </Button>

            <div className="text-center pt-4 border-t">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                חזרה לאתר הראשי
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
