import { Resend } from "resend";
import { getSubjectLabel } from "./contact-subjects";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM = process.env.NOTIFICATION_FROM_EMAIL || "notifications@itpa.org.il";
const TO = process.env.NOTIFICATION_TO_EMAIL || "office@itpa.org.il";
const ORG_NAME = "איגוד הבריכות הטיפוליות בישראל";

function escapeHtml(value) {
  if (value == null) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label, value) {
  if (!value) return "";
  return `
    <tr dir="rtl">
      <td dir="rtl" align="right" style="padding:8px 12px;font-weight:600;background:#f3f4f6;width:140px;border:1px solid #e5e7eb;text-align:right;direction:rtl;">${escapeHtml(label)}</td>
      <td dir="rtl" align="right" style="padding:8px 12px;border:1px solid #e5e7eb;text-align:right;direction:rtl;">${escapeHtml(value)}</td>
    </tr>
  `;
}

function adminEmailHtml(contact) {
  const subjectLabel = getSubjectLabel(contact.subject);
  const messageHtml = escapeHtml(contact.message).replace(/\n/g, "<br>");
  return `
    <!DOCTYPE html>
    <html lang="he" dir="rtl">
      <head><meta charset="utf-8"></head>
      <body dir="rtl" style="font-family:Arial,Helvetica,sans-serif;background:#f9fafb;padding:24px;color:#111827;direction:rtl;text-align:right;">
        <div dir="rtl" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;padding:24px;border:1px solid #e5e7eb;direction:rtl;text-align:right;">
          <h2 dir="rtl" style="margin:0 0 16px;color:#0f766e;direction:rtl;text-align:right;">פנייה חדשה מהאתר</h2>
          <p dir="rtl" style="margin:0 0 16px;color:#4b5563;direction:rtl;text-align:right;">התקבלה פנייה חדשה דרך טופס "צור קשר" באתר ${escapeHtml(ORG_NAME)}.</p>
          <table dir="rtl" style="width:100%;border-collapse:collapse;margin-bottom:16px;font-size:14px;direction:rtl;">
            ${row("שם מלא", contact.fullName)}
            ${row("ארגון / בריכה", contact.organization)}
            ${row("דוא״ל", contact.email)}
            ${row("טלפון", contact.phone)}
            ${row("נושא", subjectLabel)}
          </table>
          <div dir="rtl" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:12px;margin-bottom:16px;direction:rtl;text-align:right;">
            <div dir="rtl" style="font-weight:600;margin-bottom:6px;direction:rtl;text-align:right;">תוכן ההודעה:</div>
            <div dir="rtl" style="font-size:14px;line-height:1.6;direction:rtl;text-align:right;">${messageHtml}</div>
          </div>
          <div dir="rtl" style="text-align:center;margin-top:20px;direction:rtl;">
            <a href="mailto:${escapeHtml(contact.email)}" style="display:inline-block;background:#0f766e;color:#ffffff;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;">השב לפונה</a>
          </div>
          <p dir="rtl" style="margin:20px 0 0;color:#9ca3af;font-size:12px;text-align:center;direction:rtl;">
            ניתן לעדכן סטטוס פנייה בפאנל הניהול
          </p>
        </div>
      </body>
    </html>
  `;
}

function userEmailHtml(contact) {
  return `
    <!DOCTYPE html>
    <html lang="he" dir="rtl">
      <head><meta charset="utf-8"></head>
      <body dir="rtl" style="font-family:Arial,Helvetica,sans-serif;background:#f9fafb;padding:24px;color:#111827;direction:rtl;text-align:right;">
        <div dir="rtl" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;padding:24px;border:1px solid #e5e7eb;direction:rtl;text-align:right;">
          <h2 dir="rtl" style="margin:0 0 16px;color:#0f766e;direction:rtl;text-align:right;">פנייתך התקבלה</h2>
          <p dir="rtl" style="margin:0 0 12px;font-size:15px;line-height:1.6;direction:rtl;text-align:right;">שלום ${escapeHtml(contact.fullName)},</p>
          <p dir="rtl" style="margin:0 0 12px;font-size:15px;line-height:1.6;direction:rtl;text-align:right;">
            תודה שפנית ל${escapeHtml(ORG_NAME)}. פנייתך התקבלה אצלנו ונחזור אליך בהקדם האפשרי.
          </p>
          <p dir="rtl" style="margin:0 0 16px;font-size:15px;line-height:1.6;direction:rtl;text-align:right;">
            לפניות דחופות ניתן ליצור איתנו קשר ישירות:
          </p>
          <div dir="rtl" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:12px;font-size:14px;line-height:1.8;direction:rtl;text-align:right;">
            <div dir="rtl" style="direction:rtl;text-align:right;">דוא״ל: <a href="mailto:${escapeHtml(TO)}" style="color:#0f766e;">${escapeHtml(TO)}</a></div>
            <div dir="rtl" style="direction:rtl;text-align:right;">כתובת: אליעזר בן הורקנוס 8, אשדוד</div>
            <div dir="rtl" style="direction:rtl;text-align:right;">שעות פעילות: ראשון–חמישי 09:00–17:00, שישי 09:00–12:00</div>
          </div>
          <p dir="rtl" style="margin:20px 0 0;color:#6b7280;font-size:13px;direction:rtl;text-align:right;">
            בברכה,<br>
            ${escapeHtml(ORG_NAME)}
          </p>
        </div>
      </body>
    </html>
  `;
}

export async function sendAdminNotification(contact) {
  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping admin notification");
    return;
  }
  const subjectLabel = getSubjectLabel(contact.subject);
  return resend.emails.send({
    from: `${ORG_NAME} <${FROM}>`,
    to: TO,
    replyTo: contact.email,
    subject: `פנייה חדשה מהאתר — ${subjectLabel}`,
    html: adminEmailHtml(contact),
  });
}

export async function sendUserConfirmation(contact) {
  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping user confirmation");
    return;
  }
  if (!contact.email) return;
  return resend.emails.send({
    from: `${ORG_NAME} <${FROM}>`,
    to: contact.email,
    replyTo: TO,
    subject: `קיבלנו את פנייתך — ${ORG_NAME}`,
    html: userEmailHtml(contact),
  });
}
