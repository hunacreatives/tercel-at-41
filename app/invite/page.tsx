"use client";

import Image from "next/image";
import { useState } from "react";

const DRESS_COLORS = [
  { name: "Blush Pink", hex: "#f4c9c9" },
  { name: "Lavender", hex: "#cdc6e8" },
  { name: "Powder Blue", hex: "#b9d0e8" },
  { name: "Sage Green", hex: "#c3e5cf" },
  { name: "Buttercream", hex: "#f2e6a8" },
];

export default function InvitePage() {
  const [form, setForm] = useState({ name: "", email: "", bringing: "Just me", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", bringing: "Just me", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#f2f2f2",
    borderRadius: "8px",
    padding: "12px 16px",
    fontSize: "13px",
    color: "var(--charcoal-dark)",
    outline: "none",
    border: "none",
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f5f5f5 0%, #eaeaea 55%, #f5f5f5 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .rsvp-btn {
          background: linear-gradient(135deg, #5a5a5a 0%, #3a3a3a 100%);
          transition: filter 0.2s, transform 0.15s;
        }
        .rsvp-btn:hover {
          filter: brightness(1.12);
          transform: scale(1.01);
        }
      `}</style>

      <div style={{ width: "min(600px, 92vw)", textAlign: "center", padding: "56px 0 24px" }}>
        {/* Eyebrow */}
        <p
          className="uppercase tracking-[0.2em]"
          style={{ fontSize: "clamp(10px, 2.5vw, 13px)", fontWeight: 700, color: "var(--charcoal)", animation: "fade-up 0.7s ease 0.05s both" }}
        >
          The Bea Alonzo of Cebu is turning
        </p>

        {/* Big glitter 41 */}
        <div style={{ width: "min(70vw, 300px)", margin: "8px auto 0", animation: "fade-up 0.7s ease 0.15s both" }}>
          <Image src="/forty-one.webp" alt="Forty One" width={900} height={900} className="w-full h-auto" priority />
        </div>

        {/* Photos */}
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "16px", animation: "fade-up 0.7s ease 0.25s both" }}>
          <div style={{ width: "44%", maxWidth: "220px" }}>
            <Image src="/photo-left.webp" alt="Tercel" width={700} height={700} className="w-full h-auto" />
          </div>
          <div style={{ width: "44%", maxWidth: "220px" }}>
            <Image src="/photo-right.webp" alt="Tercel" width={700} height={700} className="w-full h-auto" />
          </div>
        </div>

        {/* Celebrant */}
        <p
          className="uppercase tracking-[0.2em]"
          style={{ fontSize: "clamp(10px, 2.5vw, 13px)", fontWeight: 700, color: "var(--charcoal)", marginTop: "28px", animation: "fade-up 0.7s ease 0.35s both" }}
        >
          Join us to celebrate the birthday of
        </p>
        <h1
          className="font-header"
          style={{ fontWeight: 700, color: "var(--charcoal-dark)", fontSize: "clamp(1.7rem, 6vw, 2.4rem)", lineHeight: 1.15, marginTop: "10px", animation: "fade-up 0.7s ease 0.45s both" }}
        >
          Atty. Tercel Mercado-Gephart
        </h1>

        {/* Date row */}
        <div style={{ marginTop: "28px", animation: "fade-up 0.7s ease 0.55s both" }}>
          <p className="uppercase tracking-[0.25em]" style={{ fontSize: "13px", fontWeight: 700, color: "var(--charcoal)" }}>
            July
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "18px", marginTop: "6px" }}>
            <div style={{ textAlign: "center" }}>
              <p className="uppercase tracking-[0.15em]" style={{ fontSize: "clamp(10px,2vw,12px)", fontWeight: 700, color: "var(--charcoal)", borderTop: "1px solid var(--gold)", paddingTop: "4px" }}>
                Monday
              </p>
            </div>
            <p className="font-header" style={{ fontSize: "clamp(2.6rem, 10vw, 3.4rem)", fontWeight: 700, color: "var(--charcoal-dark)", lineHeight: 1 }}>
              27
            </p>
            <div style={{ textAlign: "center" }}>
              <p className="uppercase tracking-[0.15em]" style={{ fontSize: "clamp(10px,2vw,12px)", fontWeight: 700, color: "var(--charcoal)", borderTop: "1px solid var(--gold)", paddingTop: "4px" }}>
                6:00pm
              </p>
            </div>
          </div>
        </div>

        {/* Venue */}
        <p style={{ marginTop: "20px", fontSize: "15px", lineHeight: 1.6, color: "var(--charcoal-dark)", animation: "fade-up 0.7s ease 0.65s both" }}>
          The Pelican Event Hall<br />Kasambagan, Cebu City
        </p>

        {/* Gold heart divider */}
        <div style={{ margin: "22px 0", fontSize: "22px", color: "var(--gold)", animation: "fade-in 0.7s ease 0.7s both" }}>♥</div>

        {/* Dress code */}
        <div style={{ animation: "fade-up 0.7s ease 0.75s both" }}>
          <h3 style={{ fontWeight: 700, fontSize: "1.15rem", color: "var(--charcoal-dark)", marginBottom: "8px" }}>Dress Code</h3>
          <p style={{ fontSize: "13px", color: "var(--charcoal)", lineHeight: 1.7, maxWidth: "380px", margin: "0 auto" }}>
            Kindly wear your favorite pastel attire as we celebrate in soft, elegant hues.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "16px" }}>
            {DRESS_COLORS.map((c) => (
              <div
                key={c.hex}
                title={c.name}
                style={{ width: "26px", height: "26px", borderRadius: "50%", background: c.hex, boxShadow: "0 2px 6px rgba(0,0,0,0.12)" }}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => document.getElementById("rsvp-form")?.scrollIntoView({ behavior: "smooth", block: "center" })}
          style={{ marginTop: "32px", border: "1.5px solid var(--charcoal)", background: "transparent", color: "var(--charcoal-dark)", animation: "fade-up 0.7s ease 0.85s both" }}
          className="rounded-full px-9 py-3.5 text-sm font-bold uppercase tracking-[0.1em] hover:bg-black/5 transition-all cursor-pointer"
        >
          Click here to RSVP
        </button>

        {/* RSVP card */}
        <div
          id="rsvp-form"
          style={{
            marginTop: "40px",
            marginBottom: "56px",
            background: "#fff",
            borderRadius: "20px",
            padding: "36px 28px",
            textAlign: "left",
            boxShadow: "0 20px 50px rgba(0,0,0,0.08), 0 6px 18px rgba(0,0,0,0.05)",
            animation: "fade-up 0.7s ease 0.95s both",
          }}
        >
          {status === "success" ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <p style={{ fontSize: "36px", marginBottom: "10px" }}>🥂</p>
              <p className="font-header" style={{ fontWeight: 700, color: "var(--charcoal-dark)", fontSize: "24px", marginBottom: "8px" }}>
                You&apos;re on the list!
              </p>
              <p style={{ color: "var(--silver)", fontSize: "13px", lineHeight: 1.7 }}>
                Can&apos;t wait to celebrate with you.<br />See you there!
              </p>
            </div>
          ) : (
            <>
              <h3 className="font-header text-center" style={{ fontWeight: 700, color: "var(--charcoal-dark)", fontSize: "24px", marginBottom: "4px" }}>
                Will You Join Us?
              </h3>
              <p className="text-center" style={{ color: "var(--silver)", fontSize: "13px", marginBottom: "22px" }}>
                I would love to Celebrate with you!
              </p>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "var(--charcoal)", display: "block", marginBottom: "6px" }}>Your Name</label>
                  <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "var(--charcoal)", display: "block", marginBottom: "6px" }}>Email Address</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "var(--charcoal)", display: "block", marginBottom: "6px" }}>Will you be bringing anyone?</label>
                  <select value={form.bringing} onChange={(e) => setForm({ ...form, bringing: e.target.value })} style={inputStyle}>
                    <option>Just me</option>
                    <option>Plus 1 guest</option>
                    <option>Plus 2 guests</option>
                    <option>Plus 3 or more</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "var(--charcoal)", display: "block", marginBottom: "6px" }}>A Thoughtful Message</label>
                  <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: "none" }} />
                </div>
                {status === "error" && <p style={{ color: "#ef4444", fontSize: "12px" }}>Something went wrong, please try again.</p>}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="rsvp-btn"
                  style={{ width: "100%", color: "#fff", borderRadius: "999px", padding: "14px", fontSize: "13px", fontWeight: 700, cursor: "pointer", opacity: status === "loading" ? 0.6 : 1, border: "none", marginTop: "4px", letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  {status === "loading" ? "Sending..." : "Confirm Attendance"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ width: "100%", background: "#3a3a3a", padding: "18px 0", textAlign: "center" }}>
        <p style={{ color: "#fff", fontSize: "13px", margin: 0 }}>
          Made with love by{" "}
          <a href="https://www.thersvpstudio.com" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline", fontWeight: 700 }}>
            The RSVP Studio
          </a>
        </p>
      </div>
    </div>
  );
}
