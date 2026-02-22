"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx-js-style";
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
  address: "",
  city: "",
  phone: "",
  email: "",
  website: "",
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
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [importPreview, setImportPreview] = useState([]);
  const [importError, setImportError] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    fetchPools();
    fetchContacts();

    // Auto-refresh contacts every 30 seconds
    const interval = setInterval(() => {
      fetchContacts();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchPools = async () => {
    try {
      const response = await fetch("/api/pools");
      const data = await response.json();
      setPools(Array.isArray(data) ? data : []);
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
      setContacts(Array.isArray(data) ? data : []);
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
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  // Column name mapping (Hebrew → English)
  const columnMap = {
    "שם הבריכה": "name",
    "שם": "name",
    "name": "name",
    "עיר": "city",
    "city": "city",
    "כתובת": "address",
    "address": "address",
    "טלפון": "phone",
    "phone": "phone",
    "מייל": "email",
    "אימייל": "email",
    "דואל": "email",
    "email": "email",
    "אתר": "website",
    "אתר אינטרנט": "website",
    "website": "website",
    "טיפולים": "treatments",
    "סוגי טיפולים": "treatments",
    "treatments": "treatments",
    "נגישות": "isAccessible",
    "נגיש": "isAccessible",
    "is_accessible": "isAccessible",
    "isaccessible": "isAccessible",
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImportError("");
    setImportPreview([]);

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

        if (rows.length === 0) {
          setImportError("הקובץ ריק — לא נמצאו שורות נתונים.");
          return;
        }

        // Map columns
        const mapped = rows.map((row) => {
          const pool = {};
          for (const [key, value] of Object.entries(row)) {
            const normalizedKey = key.trim().toLowerCase();
            // Find matching column
            const mappedField = columnMap[key.trim()] || columnMap[normalizedKey];
            if (mappedField) {
              pool[mappedField] = String(value).trim();
            }
          }

          // Parse treatments: split by comma
          if (pool.treatments) {
            pool.treatments = pool.treatments
              .split(",")
              .map((t) => t.trim())
              .filter((t) => t);
          } else {
            pool.treatments = [];
          }

          // Parse accessibility
          const accVal = (pool.isAccessible || "").toLowerCase();
          pool.isAccessible = ["כן", "yes", "true", "1", "v", "✓"].includes(accVal);

          return pool;
        });

        // Filter out rows that have no name (probably empty rows)
        const validPools = mapped.filter((p) => p.name);

        if (validPools.length === 0) {
          setImportError(
            'לא זוהו עמודות מתאימות. וודאו שהשורה הראשונה מכילה כותרות כמו: "שם הבריכה", "עיר", "כתובת" וכו\'.'
          );
          return;
        }

        setImportPreview(validPools);
      } catch (err) {
        console.error("Parse error:", err);
        setImportError("שגיאה בקריאת הקובץ. וודאו שמדובר בקובץ אקסל (.xlsx) או CSV תקין.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleImportConfirm = async () => {
    if (importPreview.length === 0) return;

    setIsImporting(true);
    try {
      const response = await fetch("/api/pools/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pools: importPreview }),
      });

      const result = await response.json();

      if (response.ok) {
        await fetchPools();
        setIsImportDialogOpen(false);
        setImportPreview([]);
        setImportError("");
        if (fileInputRef.current) fileInputRef.current.value = "";
        alert(`${result.message}`);
      } else {
        setImportError(result.error || "שגיאה בייבוא");
      }
    } catch (error) {
      console.error("Import error:", error);
      setImportError("שגיאה בייבוא הנתונים");
    } finally {
      setIsImporting(false);
    }
  };

  const openImportDialog = () => {
    setImportPreview([]);
    setImportError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsImportDialogOpen(true);
  };

  const handleExport = () => {
    if (pools.length === 0) return;

    const headerStyle = {
      font: { bold: true, color: { rgb: "FFFFFF" }, sz: 12 },
      fill: { fgColor: { rgb: "2563EB" } },
      alignment: { horizontal: "right", vertical: "center" },
      border: {
        bottom: { style: "thin", color: { rgb: "1E40AF" } },
      },
    };

    const headers = [
      "שם הבריכה",
      "עיר",
      "כתובת",
      "טלפון",
      "מייל",
      "אתר",
      "טיפולים",
      "נגישות",
    ];

    const rows = pools.map((pool) => [
      pool.name,
      pool.city,
      pool.address,
      pool.phone,
      pool.email,
      pool.website || "",
      (pool.treatments || []).join(", "),
      pool.isAccessible ? "כן" : "לא",
    ]);

    const wsData = [headers, ...rows];
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Style header row
    headers.forEach((_, colIdx) => {
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: colIdx });
      if (ws[cellRef]) {
        ws[cellRef].s = headerStyle;
      }
    });

    // Style data rows with alternating colors and borders
    const dataStyle = {
      alignment: { horizontal: "right", vertical: "center", wrapText: true },
      border: {
        bottom: { style: "thin", color: { rgb: "E5E7EB" } },
      },
    };
    const altDataStyle = {
      ...dataStyle,
      fill: { fgColor: { rgb: "F0F7FF" } },
    };

    for (let r = 1; r <= rows.length; r++) {
      for (let c = 0; c < headers.length; c++) {
        const cellRef = XLSX.utils.encode_cell({ r, c });
        if (ws[cellRef]) {
          ws[cellRef].s = r % 2 === 0 ? altDataStyle : dataStyle;
        }
      }
    }

    // Set column widths
    ws["!cols"] = [
      { wch: 35 }, // שם הבריכה
      { wch: 15 }, // עיר
      { wch: 25 }, // כתובת
      { wch: 15 }, // טלפון
      { wch: 28 }, // מייל
      { wch: 25 }, // אתר
      { wch: 45 }, // טיפולים
      { wch: 8 },  // נגישות
    ];

    // Set row height for header
    ws["!rows"] = [{ hpx: 30 }];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "בריכות טיפוליות");

    const today = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(wb, `בריכות_טיפוליות_${today}.xlsx`);
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
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExport} disabled={pools.length === 0}>
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l4 4m0 0l4-4m-4 4V4"
                  />
                </svg>
                ייצוא לאקסל
              </Button>
              <Button variant="outline" onClick={openImportDialog}>
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                ייבוא מאקסל
              </Button>
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
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>שם הבריכה</TableHead>
                    <TableHead>עיר</TableHead>
                    <TableHead>טלפון</TableHead>
                    <TableHead>אתר</TableHead>
                    <TableHead>נגישות</TableHead>
                    <TableHead>פעולות</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pools.map((pool) => (
                    <TableRow key={pool.id}>
                      <TableCell className="font-medium">{pool.name}</TableCell>
                      <TableCell>{pool.city}</TableCell>
                      <TableCell dir="ltr" className="text-right">
                        {pool.phone}
                      </TableCell>
                      <TableCell>
                        {pool.website ? (
                          <a href={pool.website.startsWith("http") ? pool.website : `https://${pool.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                            {pool.website}
                          </a>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
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

            <div className="space-y-2">
              <Label htmlFor="website">כתובת אתר</Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="www.example.co.il"
                dir="ltr"
              />
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

      {/* Import from Excel Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent className="max-w-[95vw]! w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>הוספת בריכות מקובץ אקסל</DialogTitle>
            <DialogDescription>
              העלו קובץ אקסל (.xlsx) או CSV עם בריכות חדשות להוספה למערכת
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm space-y-2">
              <p className="font-semibold text-blue-800">הוראות להכנת הקובץ:</p>
              <ol className="list-decimal list-inside space-y-1 text-blue-700">
                <li>פתחו קובץ אקסל חדש (או השתמשו בקובץ CSV)</li>
                <li><strong>השורה הראשונה חייבת להכיל כותרות עמודות</strong> — בדיוק כמו בטבלה:</li>
              </ol>
              <div className="bg-white rounded p-3 mt-2 overflow-x-auto">
                <table className="text-sm w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="p-1.5 text-right font-semibold">שם הבריכה</th>
                      <th className="p-1.5 text-right font-semibold">עיר</th>
                      <th className="p-1.5 text-right font-semibold">כתובת</th>
                      <th className="p-1.5 text-right font-semibold">טלפון</th>
                      <th className="p-1.5 text-right font-semibold">מייל</th>
                      <th className="p-1.5 text-right font-semibold">אתר</th>
                      <th className="p-1.5 text-right font-semibold">טיפולים</th>
                      <th className="p-1.5 text-right font-semibold">נגישות</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-muted-foreground">
                      <td className="p-1.5">בריכה לדוגמה</td>
                      <td className="p-1.5">ירושלים</td>
                      <td className="p-1.5">רחוב הדוגמה 1</td>
                      <td className="p-1.5" dir="ltr">02-1234567</td>
                      <td className="p-1.5" dir="ltr">info@example.com</td>
                      <td className="p-1.5" dir="ltr">www.example.co.il</td>
                      <td className="p-1.5">הידרותרפיה, שחייה</td>
                      <td className="p-1.5">כן</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <ul className="list-disc list-inside space-y-1 text-blue-700 mt-2">
                <li>בעמודת <strong>טיפולים</strong> — הפרידו בפסיקים בין סוגי הטיפולים</li>
                <li>בעמודת <strong>נגישות</strong> — כתבו &quot;כן&quot; או &quot;לא&quot;</li>
                <li className="text-green-700 font-medium">בריכות שכבר קיימות במערכת (לפי שם) ידולגו אוטומטית</li>
              </ul>
            </div>

            {/* File Input */}
            <div className="space-y-2">
              <Label htmlFor="excel-file">בחרו קובץ</Label>
              <Input
                id="excel-file"
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
                ref={fileInputRef}
                className="cursor-pointer"
              />
            </div>

            {/* Error */}
            {importError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                {importError}
              </div>
            )}

            {/* Preview */}
            {importPreview.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-green-700">
                  זוהו {importPreview.length} בריכות בקובץ. תצוגה מקדימה:
                </p>
                <div className="border rounded-lg overflow-x-auto max-h-80 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted sticky top-0">
                      <tr>
                        <th className="p-2 text-right font-medium">#</th>
                        <th className="p-2 text-right font-medium">שם הבריכה</th>
                        <th className="p-2 text-right font-medium">עיר</th>
                        <th className="p-2 text-right font-medium">כתובת</th>
                        <th className="p-2 text-right font-medium">טלפון</th>
                        <th className="p-2 text-right font-medium">מייל</th>
                        <th className="p-2 text-right font-medium">אתר</th>
                        <th className="p-2 text-right font-medium">טיפולים</th>
                        <th className="p-2 text-right font-medium">נגיש</th>
                      </tr>
                    </thead>
                    <tbody>
                      {importPreview.map((pool, i) => (
                        <tr key={i} className="border-t">
                          <td className="p-2 text-muted-foreground">{i + 1}</td>
                          <td className="p-2 font-medium">{pool.name}</td>
                          <td className="p-2">{pool.city}</td>
                          <td className="p-2">{pool.address}</td>
                          <td className="p-2" dir="ltr">{pool.phone}</td>
                          <td className="p-2" dir="ltr">{pool.email}</td>
                          <td className="p-2" dir="ltr">{pool.website}</td>
                          <td className="p-2 text-xs">{pool.treatments?.join(", ")}</td>
                          <td className="p-2">{pool.isAccessible ? "כן" : "לא"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsImportDialogOpen(false)}
            >
              ביטול
            </Button>
            {importPreview.length > 0 && (
              <Button
                onClick={handleImportConfirm}
                disabled={isImporting}
                variant="default"
              >
                {isImporting
                  ? "מייבא..."
                  : `הוספת ${importPreview.length} בריכות`}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
