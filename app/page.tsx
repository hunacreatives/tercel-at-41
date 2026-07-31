"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

const DRESS_COLORS = [
  { name: "Blush Pink", hex: "#f4c9c9" },
  { name: "Lavender", hex: "#cdc6e8" },
  { name: "Powder Blue", hex: "#b9d0e8" },
  { name: "Sage Green", hex: "#c3e5cf" },
  { name: "Buttercream", hex: "#f2e6a8" },
];

const SPARKLES = [
  { left: "6%", top: "10%", size: 10, delay: "0s", dur: "4.2s" },
  { left: "92%", top: "6%", size: 8, delay: "1.1s", dur: "5.0s" },
  { left: "3%", top: "32%", size: 12, delay: "2.3s", dur: "4.6s" },
  { left: "95%", top: "26%", size: 9, delay: "0.5s", dur: "3.8s" },
  { left: "8%", top: "58%", size: 8, delay: "3.1s", dur: "5.2s" },
  { left: "93%", top: "50%", size: 11, delay: "1.7s", dur: "4.4s" },
  { left: "5%", top: "80%", size: 9, delay: "0.9s", dur: "4.8s" },
  { left: "90%", top: "74%", size: 10, delay: "2.8s", dur: "3.9s" },
  { left: "14%", top: "94%", size: 8, delay: "1.4s", dur: "5.1s" },
  { left: "86%", top: "92%", size: 12, delay: "0.2s", dur: "4.3s" },
];

export default function InvitePage() {
  const [settled, setSettled] = useState(false);
  const introGroupRef = useRef<HTMLDivElement>(null);

  // Intro: measure where the eyebrow+numeral group naturally sits, place it
  // dead center in the viewport via an inverted transform, hold briefly,
  // then release the transform so it animates into its real position
  // (classic FLIP technique — no separate intro page/route needed).
  useLayoutEffect(() => {
    const el = introGroupRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const elCenterX = rect.left + rect.width / 2;
    const elCenterY = rect.top + rect.height / 2;
    const dx = window.innerWidth / 2 - elCenterX;
    const dy = window.innerHeight / 2 - elCenterY;

    el.style.transition = "none";
    el.style.transform = `translate(${dx}px, ${dy}px) scale(1.06)`;

    const settleTimer = setTimeout(() => {
      el.style.transition = "transform 1.1s cubic-bezier(.22,1,.36,1)";
      el.style.transform = "translate(0px, 0px) scale(1)";
      setSettled(true);
    }, 1300);

    return () => clearTimeout(settleTimer);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        backgroundColor: "#f2f2f2",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.4); }
          50%      { opacity: 0.8; transform: scale(1); }
        }
        @keyframes bg-drift {
          0%   { transform: scale(1.15) translate(0%, 0%) rotate(0deg); }
          25%  { transform: scale(1.22) translate(-2.5%, 1.5%) rotate(0.6deg); }
          50%  { transform: scale(1.15) translate(1.5%, -1%) rotate(-0.4deg); }
          75%  { transform: scale(1.25) translate(-1%, -2%) rotate(0.3deg); }
          100% { transform: scale(1.15) translate(0%, 0%) rotate(0deg); }
        }
        .bg-layer {
          position: fixed;
          inset: -10%;
          background-image: url('/bg-texture.webp');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          animation: bg-drift 42s ease-in-out infinite;
          z-index: 0;
        }
        .rsvp-btn {
          background: #a3a3a3;
          transition: filter 0.2s, transform 0.15s;
        }
        .rsvp-btn:hover {
          filter: brightness(1.06);
          transform: scale(1.01);
        }
        .cta-btn {
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .cta-btn:hover {
          background: rgba(255,255,255,0.5) !important;
          transform: scale(1.02);
        }
        select {
          cursor: pointer;
        }
        @keyframes blob-float-a {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          50%      { transform: translate(4%, 3%) scale(1.08); }
        }
        @keyframes blob-float-b {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          50%      { transform: translate(-5%, 4%) scale(1.1); }
        }
        @keyframes blob-float-c {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          50%      { transform: translate(3%, -4%) scale(1.06); }
        }
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
        }
        @keyframes numeral-breathe {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.035); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50%      { opacity: 0.6; transform: scale(1.12); }
        }
        .numeral-glow {
          position: absolute;
          inset: -12%;
          z-index: 0;
          background: radial-gradient(circle, rgba(185,151,74,0.55) 0%, rgba(185,151,74,0.18) 45%, transparent 72%);
          filter: blur(24px);
          animation: glow-pulse 4s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes shine-sweep {
          0%   { background-position: -40% 0%; }
          50%  { background-position: 140% 0%; }
          100% { background-position: 140% 0%; }
        }
        .numeral-shine {
          position: absolute;
          inset: 0;
          z-index: 2;
          background-image: linear-gradient(100deg, transparent 35%, rgba(255,255,255,0.85) 50%, transparent 65%);
          background-size: 300% 100%;
          background-repeat: no-repeat;
          mix-blend-mode: color-dodge;
          -webkit-mask-image: url('/forty-one.webp');
          -webkit-mask-size: 100% 100%;
          -webkit-mask-repeat: no-repeat;
          -webkit-mask-position: center;
          mask-image: url('/forty-one.webp');
          mask-size: 100% 100%;
          mask-repeat: no-repeat;
          mask-position: center;
          animation: shine-sweep 4.5s ease-in-out infinite;
          animation-delay: 1s;
          pointer-events: none;
        }
        @keyframes sparkle-pop {
          0%, 100% { opacity: 0; transform: scale(0.3) rotate(0deg); }
          40%      { opacity: 1; transform: scale(1.15) rotate(20deg); }
          60%      { opacity: 0.6; transform: scale(0.85) rotate(35deg); }
        }
        .numeral-sparkle {
          position: absolute;
          z-index: 2;
          color: #b9974a;
          animation-name: sparkle-pop;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          pointer-events: none;
        }
        .photo-interactive {
          transition: transform 0.3s cubic-bezier(.22,1,.36,1), filter 0.3s ease;
          cursor: pointer;
          will-change: transform;
        }
        .photo-tilt-left:hover {
          transform: scale(1.06) rotate(-2deg) translateY(-4px);
          filter: brightness(1.05);
        }
        .photo-tilt-right:hover {
          transform: scale(1.06) rotate(2deg) translateY(-4px);
          filter: brightness(1.05);
        }
        .photo-interactive:active {
          transform: scale(0.95) rotate(0deg) translateY(0px);
          filter: brightness(0.98);
          transition: transform 0.12s ease, filter 0.12s ease;
        }
        @media (max-width: 640px) {
          .forty-one-wrap {
            width: min(56vw, 260px) !important;
          }
          .photos-row {
            gap: 0 !important;
          }
          .photos-row .photo-right {
            margin-left: -22px !important;
          }
          .join-us-eyebrow {
            font-size: 12px !important;
          }
        }
      `}</style>

      {/* slow-drifting background texture */}
      <div className="bg-layer" />

      {/* soft dress-code-colored blobs */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
        <div className="blob" style={{ top: "0%", left: "-15%", width: "min(70vw, 560px)", height: "min(70vw, 560px)", background: "#f4c9c9", opacity: 0.45, animation: "blob-float-a 26s ease-in-out infinite" }} />
        <div className="blob" style={{ top: "16%", right: "-18%", width: "min(65vw, 520px)", height: "min(65vw, 520px)", background: "#cdc6e8", opacity: 0.42, animation: "blob-float-b 32s ease-in-out infinite" }} />
        <div className="blob" style={{ top: "42%", left: "-16%", width: "min(68vw, 540px)", height: "min(68vw, 540px)", background: "#b9d0e8", opacity: 0.4, animation: "blob-float-c 29s ease-in-out infinite" }} />
        <div className="blob" style={{ top: "64%", right: "-15%", width: "min(62vw, 500px)", height: "min(62vw, 500px)", background: "#c3e5cf", opacity: 0.42, animation: "blob-float-a 34s ease-in-out infinite" }} />
        <div className="blob" style={{ top: "86%", left: "20%", width: "min(60vw, 480px)", height: "min(60vw, 480px)", background: "#f2e6a8", opacity: 0.38, animation: "blob-float-b 30s ease-in-out infinite" }} />
      </div>

      {/* ambient sparkles */}
      {SPARKLES.map((s, i) => (
        <div
          key={i}
          style={{
            position: "fixed",
            left: s.left,
            top: s.top,
            fontSize: s.size,
            color: "var(--gold)",
            zIndex: 0,
            pointerEvents: "none",
            animation: `twinkle ${s.dur} ease-in-out ${s.delay} infinite`,
          }}
        >
          ✦
        </div>
      ))}

      <div style={{ width: "min(680px, 92vw)", textAlign: "center", padding: "72px 0 32px", position: "relative", zIndex: 1 }}>
        {/* Intro group: centered on mount, then settles into place via FLIP (see useLayoutEffect) */}
        <div ref={introGroupRef} style={{ position: "relative", zIndex: 2, animation: "fade-in 0.5s ease both", willChange: "transform" }}>
          {/* Eyebrow */}
          <p
            className="uppercase tracking-[0.22em]"
            style={{ fontSize: "clamp(13px, 3vw, 16px)", fontWeight: 700, color: "var(--charcoal)" }}
          >
            The Bea Alonzo of Cebu is turning
          </p>

          {/* Big glitter 41 */}
          <div
            className="forty-one-wrap"
            style={{ width: "min(68vw, 340px)", margin: "16px auto 0", position: "relative", animation: "numeral-breathe 5s ease-in-out 1.3s infinite" }}
          >
            <div className="numeral-glow" />
            <Image src="/forty-one.webp" alt="Forty One" width={900} height={900} className="w-full h-auto relative" style={{ zIndex: 1 }} priority />
            <div className="numeral-shine" />
            {[
              { top: "6%", left: "12%", size: 14, delay: "0s", dur: "3.2s" },
              { top: "18%", left: "78%", size: 11, delay: "0.7s", dur: "2.8s" },
              { top: "48%", left: "4%", size: 12, delay: "1.4s", dur: "3.6s" },
              { top: "60%", left: "88%", size: 10, delay: "2.1s", dur: "3s" },
              { top: "82%", left: "20%", size: 13, delay: "0.4s", dur: "3.4s" },
              { top: "90%", left: "70%", size: 11, delay: "1.8s", dur: "2.9s" },
            ].map((s, i) => (
              <span
                key={i}
                className="numeral-sparkle"
                style={{ top: s.top, left: s.left, fontSize: s.size, animationDelay: s.delay, animationDuration: s.dur }}
              >
                ✦
              </span>
            ))}
          </div>
        </div>

        {/* Rest of the content — fades/slides in once the intro group settles */}
        <div style={{ opacity: settled ? 1 : 0, transform: settled ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>

        {/* Photos */}
        <div className="photos-row" style={{ display: "flex", justifyContent: "center", gap: "2px", marginTop: "32px", animation: "fade-up 0.7s ease 0.25s both" }}>
          <div className="photo-interactive photo-tilt-left" style={{ width: "50%", maxWidth: "320px" }}>
            <Image src="/photo-left.webp" alt="Tercel" width={700} height={700} className="w-full h-auto" />
          </div>
          <div className="photo-interactive photo-tilt-right photo-right" style={{ width: "50%", maxWidth: "320px" }}>
            <Image src="/photo-right.webp" alt="Tercel" width={700} height={700} className="w-full h-auto" />
          </div>
        </div>

        {/* Celebrant */}
        <p
          className="join-us-eyebrow uppercase tracking-[0.22em]"
          style={{ fontSize: "clamp(13px, 3vw, 16px)", fontWeight: 700, color: "var(--charcoal)", marginTop: "56px", animation: "fade-up 0.7s ease 0.35s both" }}
        >
          Join us to celebrate the birthday of
        </p>
        <h1
          className="font-header uppercase celebrant-name"
          style={{ fontWeight: 700, color: "var(--charcoal-dark)", fontSize: "clamp(1.7rem, 7.5vw, 3.2rem)", lineHeight: 1.15, marginTop: "18px", animation: "fade-up 0.7s ease 0.45s both", whiteSpace: "nowrap" }}
        >
          Atty. Tercel
          <br />
          Mercado-Gephart
        </h1>

        {/* Date row */}
        <div style={{ marginTop: "56px", animation: "fade-up 0.7s ease 0.55s both" }}>
          <p className="font-header uppercase" style={{ fontSize: "clamp(1.3rem, 4vw, 1.6rem)", fontWeight: 400, letterSpacing: "0.08em", color: "var(--charcoal)" }}>
            July
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", justifyItems: "center", columnGap: "24px", marginTop: "4px" }}>
            <p
              className="uppercase"
              style={{ justifySelf: "end", fontSize: "clamp(13px,2.5vw,15px)", fontWeight: 400, letterSpacing: "0.08em", color: "var(--charcoal)", borderTop: "0.5px solid var(--gold)", borderBottom: "0.5px solid var(--gold)", padding: "6px 2px" }}
            >
              Monday
            </p>
            <p className="font-header" style={{ fontSize: "clamp(3.2rem, 13vw, 4.4rem)", fontWeight: 700, color: "var(--charcoal-dark)", lineHeight: 1 }}>
              27
            </p>
            <p
              className="uppercase"
              style={{ justifySelf: "start", fontSize: "clamp(13px,2.5vw,15px)", fontWeight: 400, letterSpacing: "0.08em", color: "var(--charcoal)", borderTop: "0.5px solid var(--gold)", borderBottom: "0.5px solid var(--gold)", padding: "6px 2px" }}
            >
              6:00pm
            </p>
          </div>
        </div>

        {/* Venue */}
        <p style={{ marginTop: "36px", fontSize: "19px", lineHeight: 1.6, color: "var(--charcoal-dark)", animation: "fade-up 0.7s ease 0.65s both" }}>
          The Pelican Event Hall<br />Kasambagan, Cebu City
        </p>

        {/* Gold heart divider */}
        <div style={{ margin: "40px 0", fontSize: "30px", color: "var(--gold)", animation: "fade-in 0.7s ease 0.7s both" }}>♥</div>

        {/* Dress code */}
        <div style={{ animation: "fade-up 0.7s ease 0.75s both" }}>
          <h3 style={{ fontWeight: 700, fontSize: "1.5rem", color: "var(--charcoal-dark)", marginBottom: "14px" }}>Dress Code</h3>
          <p style={{ fontSize: "16px", color: "var(--charcoal)", lineHeight: 1.7, maxWidth: "440px", margin: "0 auto" }}>
            Kindly wear your favorite pastel attire as we
            <br />
            celebrate in soft, elegant hues.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "24px" }}>
            {DRESS_COLORS.map((c) => (
              <div
                key={c.hex}
                title={c.name}
                style={{ width: "36px", height: "36px", borderRadius: "50%", background: c.hex, boxShadow: "0 3px 10px rgba(0,0,0,0.14)" }}
              />
            ))}
          </div>
        </div>

        {/* Event closed / next-event promo */}
        <div
          style={{
            marginTop: "56px",
            marginBottom: "72px",
            background: "#faf9f6",
            borderRadius: "36px",
            border: "1.5px solid #c9c3b3",
            padding: "48px 36px",
            textAlign: "center",
            boxShadow: "0 24px 60px rgba(0,0,0,0.10), 0 8px 24px rgba(0,0,0,0.06)",
            animation: "fade-up 0.7s ease 0.85s both",
          }}
        >
          <p style={{ fontSize: "44px", marginBottom: "14px" }}>🥂</p>
          <p className="font-header" style={{ fontWeight: 700, color: "var(--charcoal-dark)", fontSize: "30px", marginBottom: "10px" }}>
            What a Celebration!
          </p>
          <p style={{ color: "var(--silver)", fontSize: "16px", lineHeight: 1.7, marginBottom: "28px" }}>
            Tercel&apos;s 41st is officially in the books.<br />Thank you for celebrating with her.
          </p>

          <div style={{ borderTop: "1px solid #eee", paddingTop: "24px" }}>
            <p className="uppercase" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", color: "var(--charcoal)", marginBottom: "10px" }}>
              Planning Your Own Event?
            </p>
            <p style={{ fontSize: "14px", color: "var(--silver)", marginBottom: "24px", lineHeight: 1.6 }}>
              Sites like this one are built by The RSVP Studio.<br />Let&apos;s bring your next celebration to life.
            </p>
            <a
              href="https://www.hunacreatives.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="rsvp-btn"
              style={{ display: "inline-block", color: "#fff", borderRadius: "999px", padding: "16px 40px", fontSize: "15px", fontWeight: 500, textDecoration: "none" }}
            >
              The RSVP Studio ›
            </a>
          </div>
        </div>

        </div>
      </div>

      {/* Footer */}
      <div style={{ width: "100%", background: "#b4b4b4", padding: "24px 0", textAlign: "center", position: "relative", zIndex: 1 }}>
        <p style={{ color: "#fff", fontSize: "15px", margin: 0 }}>
          Made with love by{" "}
          <a href="https://www.hunacreatives.com/contact" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline", fontWeight: 700 }}>
            The RSVP Studio
          </a>
        </p>
      </div>
    </div>
  );
}
