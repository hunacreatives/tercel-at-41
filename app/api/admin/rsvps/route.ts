import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Service-role client — bypasses RLS. Never exposed to the browser; this
// code only runs on the server.
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Server-only password. Falls back to the existing public var so nothing
// breaks today, but set ADMIN_PASSWORD (no NEXT_PUBLIC_) in your env for a
// gate that isn't shipped in the browser bundle.
const ADMIN_PASSWORD =
  process.env.ADMIN_PASSWORD ?? process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

function authorized(req: Request): boolean {
  const provided = req.headers.get("x-admin-password");
  return Boolean(ADMIN_PASSWORD) && provided === ADMIN_PASSWORD;
}

// List all RSVPs (newest first).
export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("tercel_rsvps")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Failed to load RSVPs" }, { status: 500 });
  }

  return NextResponse.json({ rsvps: data ?? [] });
}

// Delete one RSVP by id.
export async function DELETE(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const { error } = await supabase.from("tercel_rsvps").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
