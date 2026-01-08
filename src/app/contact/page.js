"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    organization: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (value) => {
    setFormData((prev) => ({ ...prev, subject: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          fullName: "",
          organization: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main id="main-content" className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">צור קשר</h1>
              <p className="text-lg text-muted-foreground">
                נשמח לשמוע מכם ולענות על כל שאלה
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>שלחו לנו הודעה</CardTitle>
                  <CardDescription>
                    מלאו את הטופס ונחזור אליכם בהקדם
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">
                          שם מלא <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          aria-required="true"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="organization">ארגון / בריכה</Label>
                        <Input
                          id="organization"
                          name="organization"
                          type="text"
                          value={formData.organization}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          דוא״ל <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          aria-required="true"
                          dir="ltr"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">טלפון</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">
                        נושא הפנייה <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.subject}
                        onValueChange={handleSubjectChange}
                        required
                      >
                        <SelectTrigger id="subject" aria-required="true">
                          <SelectValue placeholder="בחרו נושא" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="join">הצטרפות לאיגוד</SelectItem>
                          <SelectItem value="info">בקשת מידע</SelectItem>
                          <SelectItem value="complaint">
                            תלונה / משוב
                          </SelectItem>
                          <SelectItem value="media">פניית תקשורת</SelectItem>
                          <SelectItem value="other">אחר</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">
                        הודעה <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        aria-required="true"
                      />
                    </div>

                    {submitStatus === "success" && (
                      <div
                        className="p-4 bg-green-100 text-green-800 rounded-lg"
                        role="alert"
                      >
                        הודעתך נשלחה בהצלחה! נחזור אליך בהקדם.
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div
                        className="p-4 bg-red-100 text-red-800 rounded-lg"
                        role="alert"
                      >
                        אירעה שגיאה בשליחת ההודעה. אנא נסו שוב.
                      </div>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full md:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "שולח..." : "שליחת הודעה"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">פרטי התקשרות</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <svg
                        className="h-5 w-5 text-primary mt-0.5 shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                      <div>
                        <p className="font-medium">דוא״ל</p>
                        <a
                          href="mailto:office@itpa.org.il"
                          className="text-primary hover:underline"
                        >
                          office@itpa.org.il
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg
                        className="h-5 w-5 text-primary mt-0.5 shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      <div>
                        <p className="font-medium">כתובת</p>
                        <p className="text-muted-foreground">
                          רחוב הבריכה 1, תל אביב
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">שעות פעילות</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt>ראשון - חמישי</dt>
                        <dd>09:00 - 17:00</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>שישי</dt>
                        <dd>09:00 - 12:00</dd>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <dt>שבת</dt>
                        <dd>סגור</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
