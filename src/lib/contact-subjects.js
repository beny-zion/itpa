export const CONTACT_SUBJECTS = [
  { value: "join", label: "הצטרפות לאיגוד" },
  { value: "info", label: "בקשת מידע" },
  { value: "complaint", label: "תלונה / משוב" },
  { value: "media", label: "פניית תקשורת" },
  { value: "other", label: "אחר" },
];

export function getSubjectLabel(value) {
  return CONTACT_SUBJECTS.find((s) => s.value === value)?.label || value || "לא צוין";
}
