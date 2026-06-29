import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertiesGrid from "@/components/PropertiesGrid";

export const metadata = {
  title: "Propriétés — Mouad Immobilière",
  description:
    "Découvrez notre sélection de villas, appartements, terrains et biens commerciaux au Maroc.",
};

export default function PropertiesPage() {
  return (
    <main className="lg:pb-0 pb-[60px]">
      <Navbar />
      <Suspense
          fallback={
            <div className="mx-auto max-w-6xl px-4 py-20 text-center text-[#9E9E9E] font-body">
              …
            </div>
          }
        >
          <PropertiesGrid />
        </Suspense>
      <Footer />
    </main>
  );
}
