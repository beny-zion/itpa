"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const emptyPool = {
  name: "",
  operator: "",
  address: "",
  city: "",
  phone: "",
  email: "",
  openingHours: {
    sunday_thursday: "",
    friday: "",
  },
  treatments: [],
  isAccessible: false,
};

const subjectLabels = {
  join: "הצטרפות לאיגוד",
  info: "בקשת מידע",
  complaint: "תלונה / משוב",
  media: "פניית תקשורת",
  other: "אחר",
};

const statusLabels = {
  new: { label: "חדש", variant: "default" },
  read: { label: "נקרא", variant: "secondary" },
  handled: { label: "טופל", variant: "outline" },
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("pools");
  const [pools, setPools] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [editingPool, setEditingPool] = useState(null);
  const [formData, setFormData] = useState(emptyPool);
  const [treatmentsInput, setTreatmentsInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchPools();
    fetchContacts();
  }, []);

  const fetchPools = async () => {
    try {
      const response = await fetch("/api/pools");
      const data = await response.json();
      setPools(data);
    } catch (error) {
      console.error("Error fetching pools:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/contacts");
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const openContactDialog = async (contact) => {
    setSelectedContact(contact);
    setIsContactDialogOpen(true);

    // Mark as read if new
    if (contact.status === "new") {
      await updateContactStatus(contact.id, "read");
    }
  };

  const updateContactStatus = async (id, status) => {
    try {
      await fetch("/api/contacts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      await fetchContacts();
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const deleteContact = async (id) => {
    if (!confirm("האם אתה בטוח שברצונך למחוק פנייה זו?")) return;

    try {
      await fetch(`/api/contacts?id=${id}`, { method: "DELETE" });
      await fetchContacts();
      setIsContactDialogOpen(false);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("he-IL", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const newContactsCount = contacts.filter((c) => c.status === "new").length;

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const openAddDialog = () => {
    setEditingPool(null);
    setFormData(emptyPool);
    setTreatmentsInput("");
    setIsDialogOpen(true);
  };

  const openEditDialog = (pool) => {
    setEditingPool(pool);
    setFormData(pool);
    setTreatmentsInput(pool.treatments.join(", "));
    setIsDialogOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("openingHours.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        openingHours: {
          ...prev.openingHours,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAccessibleChange = (checked) => {
    setFormData((prev) => ({ ...prev, isAccessible: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const poolData = {
      ...formData,
      treatments: treatmentsInput
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
    };

    try {
      const method = editingPool ? "PUT" : "POST";
      const response = await fetch("/api/pools", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPool ? { ...poolData, id: editingPool.id } : poolData),
      });

      if (response.ok) {
        await fetchPools();
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Error saving pool:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("האם אתה בטוח שברצונך למחוק בריכה זו?")) return;

    try {
      const response = await fetch(`/api/pools?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchPools();
      }
    } catch (error) {
      console.error("Error deleting pool:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>טוען...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <h1 className="text-xl font-bold">ממשק ניהול - איגוד הבריכות הטיפוליות</h1>
          <Button variant="outline" onClick={handleLogout}>
            התנתקות
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === "pools" ? "default" : "outline"}
            onClick={() => setActiveTab("pools")}
          >
            בריכות ({pools.length})
          </Button>
          <Button
            variant={activeTab === "contacts" ? "default" : "outline"}
            onClick={() => setActiveTab("contacts")}
            className="relative"
          >
            פניות ({contacts.length})
            {newContactsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {newContactsCount}
              </span>
            )}
          </Button>
        </div>

        {/* Pools Tab */}
        {activeTab === "pools" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>ניהול בריכות</CardTitle>
              <CardDescription>
                צפייה, הוספה ועריכה של בריכות טיפוליות
              </CardDescription>
            </div>
            <Button onClick={openAddDialog}>
              <svg
                className="h-4 w-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              הוספת בריכה
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>שם הבריכה</TableHead>
                    <TableHead>עמותה מפעילה</TableHead>
                    <TableHead>עיר</TableHead>
                    <TableHead>טלפון</TableHead>
                    <TableHead>נגישות</TableHead>
                    <TableHead>פעולות</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pools.map((pool) => (
                    <TableRow key={pool.id}>
                      <TableCell className="font-medium">{pool.name}</TableCell>
                      <TableCell>{pool.operator}</TableCell>
                      <TableCell>{pool.city}</TableCell>
                      <TableCell dir="ltr" className="text-right">
                        {pool.phone}
                      </TableCell>
                      <TableCell>
                        {pool.isAccessible ? (
                          <span className="text-green-600">כן</span>
                        ) : (
                          <span className="text-muted-foreground">לא</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(pool)}
                          >
                            עריכה
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(pool.id)}
                          >
                            מחיקה
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {pools.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                אין בריכות במערכת. לחצו על "הוספת בריכה" כדי להתחיל.
              </div>
            )}
          </CardContent>
        </Card>
        )}

        {/* Contacts Tab */}
        {activeTab === "contacts" && (
          <Card>
            <CardHeader>
              <CardTitle>פניות מהאתר</CardTitle>
              <CardDescription>
                צפייה בפניות שהתקבלו מטופס צור קשר
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>תאריך</TableHead>
                      <TableHead>שם</TableHead>
                      <TableHead>נושא</TableHead>
                      <TableHead>דוא״ל</TableHead>
                      <TableHead>סטטוס</TableHead>
                      <TableHead>פעולות</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow
                        key={contact.id}
                        className={contact.status === "new" ? "bg-blue-50" : ""}
                      >
                        <TableCell className="text-sm">
                          {formatDate(contact.createdAt)}
                        </TableCell>
                        <TableCell className="font-medium">
                          {contact.fullName}
                        </TableCell>
                        <TableCell>
                          {subjectLabels[contact.subject] || contact.subject}
                        </TableCell>
                        <TableCell dir="ltr" className="text-right">
                          {contact.email}
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusLabels[contact.status]?.variant || "default"}>
                            {statusLabels[contact.status]?.label || contact.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openContactDialog(contact)}
                          >
                            צפייה
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {contacts.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  אין פניות במערכת.
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </main>

      {/* Contact View Dialog */}
      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>פרטי פנייה</DialogTitle>
          </DialogHeader>

          {selectedContact && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">שם מלא</Label>
                  <p className="font-medium">{selectedContact.fullName}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">ארגון / בריכה</Label>
                  <p className="font-medium">{selectedContact.organization || "-"}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">דוא״ל</Label>
                  <p className="font-medium">
                    <a href={`mailto:${selectedContact.email}`} className="text-primary hover:underline">
                      {selectedContact.email}
                    </a>
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">טלפון</Label>
                  <p className="font-medium">
                    {selectedContact.phone ? (
                      <a href={`tel:${selectedContact.phone}`} className="text-primary hover:underline">
                        {selectedContact.phone}
                      </a>
                    ) : "-"}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">נושא</Label>
                  <p className="font-medium">{subjectLabels[selectedContact.subject] || selectedContact.subject}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">תאריך</Label>
                  <p className="font-medium">{formatDate(selectedContact.createdAt)}</p>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground">הודעה</Label>
                <p className="mt-1 p-3 bg-muted rounded-lg whitespace-pre-wrap">{selectedContact.message}</p>
              </div>

              <DialogFooter className="flex-col sm:flex-row gap-2">
                <div className="flex gap-2">
                  <Button
                    variant={selectedContact.status === "handled" ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateContactStatus(selectedContact.id, "handled")}
                  >
                    סמן כטופל
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteContact(selectedContact.id)}
                  >
                    מחק
                  </Button>
                </div>
                <Button variant="outline" onClick={() => setIsContactDialogOpen(false)}>
                  סגור
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPool ? "עריכת בריכה" : "הוספת בריכה חדשה"}
            </DialogTitle>
            <DialogDescription>
              מלאו את הפרטים ולחצו על שמור
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">שם הבריכה *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="operator">עמותה מפעילה *</Label>
                <Input
                  id="operator"
                  name="operator"
                  value={formData.operator}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">כתובת *</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">עיר *</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">טלפון *</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  dir="ltr"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">דוא״ל *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  dir="ltr"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="openingHours.sunday_thursday">
                  שעות פעילות א׳-ה׳ *
                </Label>
                <Input
                  id="openingHours.sunday_thursday"
                  name="openingHours.sunday_thursday"
                  value={formData.openingHours.sunday_thursday}
                  onChange={handleInputChange}
                  placeholder="08:00-20:00"
                  required
                  dir="ltr"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="openingHours.friday">שעות פעילות ו׳ *</Label>
                <Input
                  id="openingHours.friday"
                  name="openingHours.friday"
                  value={formData.openingHours.friday}
                  onChange={handleInputChange}
                  placeholder="08:00-13:00"
                  required
                  dir="ltr"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="treatments">
                סוגי טיפולים (מופרדים בפסיקים) *
              </Label>
              <Input
                id="treatments"
                value={treatmentsInput}
                onChange={(e) => setTreatmentsInput(e.target.value)}
                placeholder="הידרותרפיה לילדים, שיקום נוירולוגי, וואטסו"
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="isAccessible"
                checked={formData.isAccessible}
                onCheckedChange={handleAccessibleChange}
              />
              <Label htmlFor="isAccessible" className="cursor-pointer">
                הבריכה נגישה לבעלי מוגבלויות
              </Label>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                ביטול
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "שומר..." : "שמירה"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
