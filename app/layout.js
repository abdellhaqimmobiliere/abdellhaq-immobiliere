import dynamic from "next/dynamic";
import { Analytics } from "@vercel/analytics/react";
import { LangProvider } from "@/context/LangContext";
import { SettingsProvider } from "@/context/SettingsContext";
import BottomNav from "@/components/BottomNav";
import "./globals.css";

const FloatingButtons = dynamic(
  () => import("@/components/FloatingButtons"),
  { ssr: false }
);

export const metadata = {
  title: "Mouad Immobilière — Agence immobilière de prestige au Maroc",
  description:
    "Vente, location et investissement immobilier au Maroc. Villas, appartements, terrains. Service personnalisé et expertise locale.",
  keywords:
    "immobilier maroc, achat villa maroc, location appartement maroc, agence immobilière, معاذ للعقار",
  openGraph: {
    title: "Mouad Immobilière",
    description: "Votre partenaire immobilier de confiance au Maroc",
    type: "website",
    locale: "fr_MA",
    images: [{ url: "/brand/cover.png", width: 1200, height: 630 }],
  },
  icons: {
    icon: "/brand/logo.png",
    apple: "/brand/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta name="theme-color" content="#0D2340" />
        <meta name="robots" content="index, follow" />
      </head>
      <body className="overflow-x-hidden antialiased">
        <LangProvider>
          <SettingsProvider>
            {children}
            <BottomNav />
            <FloatingButtons />
          </SettingsProvider>
        </LangProvider>
        <Analytics />
      </body>
    </html>
  );
}
