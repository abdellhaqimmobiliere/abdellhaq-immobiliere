"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import ContactSection from "@/components/ContactSection";
import { t } from "@/translations";
import { useLang } from "@/context/LangContext";

export default function ContactPage() {
  const { lang } = useLang();
  const tr = t[lang].contact;

  return (
    <main className="lg:pb-0 pb-[60px]">
      <Navbar />
      <PageBanner title={tr.label} subtitle={tr.subtitle} />
      <ContactSection />
      <div className="bg-[#F5F0E8] px-6 py-12">
        <div className="mx-auto max-w-6xl">
          {/* Add Google Maps embed here */}
        </div>
      </div>
      <Footer />
    </main>
  );
}
