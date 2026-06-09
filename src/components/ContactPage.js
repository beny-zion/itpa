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
import { CONTACT_SUBJECTS } from "@/lib/contact-subjects";
import { Mail, MapPin, Clock } from "lucide-react";

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

      <main id="main-content" className="flex-1 py-24 pt-32 bg-background relative overflow-hidden">
        {/* Decorative water orb */}
        <div
          className="absolute -top-20 -left-28 h-96 w-96 rounded-full animate-float pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(75,184,201,0.16), transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2.5 mb-4">
                <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                <span className="text-sm font-semibold tracking-wide text-primary">
                  נשמח לעזור
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">צור קשר</h1>
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
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    aria-describedby={submitStatus ? "form-status" : undefined}
                  >
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
                          {CONTACT_SUBJECTS.map((subject) => (
                            <SelectItem key={subject.value} value={subject.value}>
                              {subject.label}
                            </SelectItem>
                          ))}
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
                        id="form-status"
                        className="p-4 bg-green-100 text-green-900 rounded-lg flex items-start gap-3"
                        role="alert"
                      >
                        <svg
                          className="h-5 w-5 shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>הודעתך נשלחה בהצלחה! נחזור אליך בהקדם.</span>
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div
                        id="form-status"
                        className="p-4 bg-red-100 text-red-900 rounded-lg flex items-start gap-3"
                        role="alert"
                      >
                        <svg
                          className="h-5 w-5 shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>אירעה שגיאה בשליחת ההודעה. אנא נסו שוב.</span>
                      </div>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full md:w-auto btn-ink px-8"
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
                      <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
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
                      <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                      <div>
                        <p className="font-medium">כתובת</p>
                        <p className="text-muted-foreground">
                          אליעזר בן הורקנוס 8, אשדוד
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg inline-flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" strokeWidth={1.75} aria-hidden="true" />
                      שעות פעילות
                    </CardTitle>
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
