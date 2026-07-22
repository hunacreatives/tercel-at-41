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

  const calendarUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + encodeURIComponent("Tercel's 41st Birthday") +
    "&dates=20260727T100000Z/20260727T150000Z" +
    "&details=" + encodeURIComponent("Join us to celebrate Atty. Tercel Mercado-Gephart's 41st birthday! Dress code: pastel attire.") +
    "&location=" + encodeURIComponent("The Pelican Event Hall, Kasambagan, Cebu City");

  const mapsUrl = "https://maps.google.com/?q=The+Pelican+Event+Hall+Kasambagan+Cebu+City";

  await Promise.all([
    resend.emails.send({
      from: "The RSVP Studio <hello@thersvpstudio.com>",
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
    }),
    resend.emails.send({
      from: "The RSVP Studio <hello@thersvpstudio.com>",
      to: email,
      subject: "🥂 You're on the list — Tercel's 41st Birthday!",
      html: `
        <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px; color: #4a4a4a;">
          <p style="font-size: 40px; text-align: center; margin: 0 0 8px;">🥂</p>
          <h2 style="text-align: center; color: #333333; font-size: 24px; margin: 0 0 4px;">You're on the list, ${name}!</h2>
          <p style="text-align: center; color: #8a8478; font-size: 14px; margin: 0 0 28px;">Thank you for RSVPing — we can't wait to celebrate with you.</p>

          <div style="background: #faf9f6; border: 1px solid #e5ded0; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
            <p style="text-align: center; text-transform: uppercase; letter-spacing: 0.1em; font-size: 12px; font-weight: 700; color: #9a9a9a; margin: 0 0 12px;">Join us to celebrate the birthday of</p>
            <p style="text-align: center; font-size: 20px; font-weight: 700; color: #333333; margin: 0 0 20px;">Atty. Tercel Mercado-Gephart</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr><td style="padding: 6px 0; color: #8a8478; width: 90px;">Date</td><td style="padding: 6px 0; font-weight: 600;">Monday, July 27</td></tr>
              <tr><td style="padding: 6px 0; color: #8a8478;">Time</td><td style="padding: 6px 0; font-weight: 600;">6:00 PM</td></tr>
              <tr><td style="padding: 6px 0; color: #8a8478;">Venue</td><td style="padding: 6px 0; font-weight: 600;">The Pelican Event Hall, Kasambagan, Cebu City</td></tr>
              <tr><td style="padding: 6px 0; color: #8a8478; vertical-align: top;">Dress Code</td><td style="padding: 6px 0; font-weight: 600;">Pastel attire — soft, elegant hues 💐</td></tr>
              ${bringing ? `<tr><td style="padding: 6px 0; color: #8a8478;">Bringing</td><td style="padding: 6px 0; font-weight: 600;">${bringing}</td></tr>` : ""}
            </table>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
            <tr>
              <td style="padding-right: 6px; width: 50%;">
                <a href="${calendarUrl}" target="_blank" style="display: block; text-align: center; background: #333333; color: #ffffff; text-decoration: none; border-radius: 999px; padding: 12px 8px; font-size: 13px; font-weight: 700;">📅 Add to Calendar</a>
              </td>
              <td style="padding-left: 6px; width: 50%;">
                <a href="${mapsUrl}" target="_blank" style="display: block; text-align: center; background: #ffffff; color: #333333; border: 1.5px solid #c9c3b3; text-decoration: none; border-radius: 999px; padding: 11px 8px; font-size: 13px; font-weight: 700;">📍 View Map</a>
              </td>
            </tr>
          </table>

          <p style="text-align: center; font-size: 13px; color: #9a9a9a; margin: 0 0 32px;">See you there!</p>

          <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center;">
            <p style="font-size: 12px; color: #9a9a9a; line-height: 1.7; margin: 0 0 12px;">
              This invite was crafted by <strong style="color: #666;">The RSVP Studio</strong> — we design and build custom digital invitations & RSVP sites for birthdays, weddings, and celebrations, so you can spend less time on logistics and more time celebrating.
            </p>
            <a href="https://www.hunacreatives.com/contact" target="_blank" style="display: inline-block; color: #b9974a; text-decoration: underline; font-size: 12px; font-weight: 700;">Planning your own event? Let's talk →</a>
          </div>
        </div>
      `,
    }),
  ]);

  return NextResponse.json({ success: true });
}
