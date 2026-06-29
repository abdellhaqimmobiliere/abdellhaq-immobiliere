"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import AboutPageContent from "@/components/AboutPageContent";
import { t } from "@/translations";
import { useLang } from "@/context/LangContext";

export default function AboutPageClient() {
  const { lang } = useLang();
  const page = t[lang].aboutPage;

  return (
    <main className="lg:pb-0 pb-[60px]">
      <Navbar />
      <PageBanner title={page.heroTitle} subtitle={page.heroSubtitle} />
      <AboutPageContent />
      <Footer />
    </main>
  );
}
