import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  const { name, email, bringing, message } = await req.json();

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email required" }, { status: 400 });
  }

  const { error: dbError } = await supabase.from("tercel_rsvps").insert({
    name,
    email,
    bringing: bringing || null,
    message: message || null,
  });

  if (dbError) {
    console.error("DB error:", dbError);
    return NextResponse.json({ error: "Failed to save RSVP" }, { status: 500 });
  }

  await resend.emails.send({
    from: "Tercel's 41st <noreply@thersvpstudio.com>",
    to: "hello@thersvpstudio.com",
    subject: `🥂 New RSVP from ${name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #3a3a3a;">New RSVP — Tercel's 41st Birthday 🎉</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr><td style="padding: 8px 0; color: #666; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;">${email}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Bringing</td><td style="padding: 8px 0;">${bringing || "—"}</td></tr>
          ${message ? `<tr><td style="padding: 8px 0; color: #666; vertical-align: top;">Message</td><td style="padding: 8px 0; font-style: italic;">"${message}"</td></tr>` : ""}
        </table>
        <p style="margin-top: 24px; color: #b9974a; font-size: 12px;">Sent from tercelat41.com</p>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}
