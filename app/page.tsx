"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function IntroPage() {
  const router = useRouter();

  return (
    <>
      <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pop-in {
          0%   { opacity: 0; transform: scale(0.7); }
          70%  { transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.9; }
          50%      { opacity: 1; filter: brightness(1.08); }
        }
        @keyframes btn-glow {
          0%, 100% { box-shadow: 0 4px 18px rgba(0,0,0,0.10), 0 0 0 0 rgba(185,151,74,0.35); }
          50%       { box-shadow: 0 4px 24px rgba(0,0,0,0.14), 0 0 0 8px rgba(185,151,74,0); }
        }
      `}</style>

      <main
        className="fixed inset-0 overflow-hidden flex flex-col items-center justify-center px-6"
        style={{ background: "linear-gradient(180deg, #f5f5f5 0%, #e6e6e6 100%)" }}
      >
        <p
          className="uppercase tracking-[0.2em] text-center"
          style={{
            color: "var(--charcoal)",
            fontSize: "clamp(11px, 2.5vw, 13px)",
            fontWeight: 700,
            animation: "fade-up 0.7s cubic-bezier(.22,1,.36,1) 0.1s both",
          }}
        >
          The Bea Alonzo of Cebu is turning
        </p>

        <div
          style={{
            width: "min(58vw, 320px)",
            marginTop: "8px",
            animation: "pop-in 0.7s cubic-bezier(.34,1.3,.64,1) 0.35s both, shimmer 3.4s ease-in-out 1.2s infinite",
          }}
        >
          <Image
            src="/forty-one.webp"
            alt="Forty One"
            width={900}
            height={900}
            className="w-full h-auto"
            priority
          />
        </div>

        <button
          onClick={() => router.push("/invite")}
          style={{
            animation: "fade-up 0.7s cubic-bezier(.22,1,.36,1) 0.9s both, btn-glow 2.6s ease-in-out 1.6s infinite",
            border: `1.5px solid var(--charcoal)`,
            background: "transparent",
            color: "var(--charcoal-dark)",
          }}
          className="mt-10 rounded-full px-10 py-4 text-sm md:text-base font-bold uppercase tracking-[0.12em] hover:bg-black/5 transition-all cursor-pointer"
        >
          Click here to RSVP
        </button>
      </main>
    </>
  );
}
