import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";
import "./globals.css";

const ptSans = PT_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tercel's 41st Birthday",
  description: "You're invited to celebrate Atty. Tercel Mercado-Gephart's 41st birthday!",
  openGraph: {
    title: "You're Invited — Tercel's 41st Birthday!",
    description: "Join us as we celebrate Tercel turning 41! Monday, July 27 · 6:00 PM · The Pelican Event Hall, Kasambagan, Cebu City. RSVP at tercelat41.com",
    url: "https://tercelat41.com",
    siteName: "Tercel's 41st Birthday",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "You're Invited — Tercel's 41st Birthday!",
    description: "Join us as we celebrate Tercel turning 41! Monday, July 27 · 6:00 PM",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={ptSans.variable}>
      <body className="m-0 p-0">{children}</body>
    </html>
  );
}
