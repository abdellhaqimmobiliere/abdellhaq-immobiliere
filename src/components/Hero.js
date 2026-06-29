"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown, MessageCircle, Building2 } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { useSettings } from "@/context/SettingsContext";
import { t } from "@/translations";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&q=80&auto=format&fit=crop";

export default function Hero() {
  const { lang } = useLang();
  const { site, settings, loading } = useSettings();
  const tr = t[lang];
  const announcement = tr.announcement;
  const [imgLoaded, setImgLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const isRtl = lang === "ar";

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const titleLines = tr.hero.title.split("\n");
  const statsSold = settings.stats_sold || site.statsSold || "120+";
  const statsClients = settings.stats_clients || site.statsClients || "300+";
  const statsYears = settings.stats_years || site.statsYears || "5+";

  return (
    <section
      className="relative w-full min-h-[100svh] flex flex-col lg:flex-row"
      aria-label="Section principale"
    >
      <div className="relative lg:hidden w-full" style={{ height: "55svh" }}>
        {!imgLoaded && <div className="absolute inset-0 skeleton" />}
        <Image
          src={HERO_IMAGE}
          alt="Villa de luxe — Mouad Immobilière"
          fill
          priority
          className={`object-cover transition-opacity duration-700 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImgLoaded(true)}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D2340]/30 via-transparent to-[#0D2340]" />
        <div
          className={`absolute top-4 flex items-center gap-2 px-3 py-1.5 bg-[#0D2340]/80 backdrop-blur-sm border border-[#C9A84C33] rounded-full ${
            isRtl ? "right-4" : "left-4"
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A84C] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9A84C]" />
          </span>
          <span className="text-[11px] font-medium text-[#C9A84C] tracking-wide">
            {announcement.badge}
          </span>
        </div>
      </div>

      <div
        className={`relative z-10 flex-1 bg-[#0D2340] flex flex-col justify-center px-5 py-8 lg:px-16 lg:py-0 lg:max-w-[52%] min-h-0 lg:min-h-[100svh] ${
          isRtl ? "text-right font-arabic" : "text-left"
        }`}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
          <svg
            viewBox="0 0 400 400"
            className={`absolute -bottom-20 w-80 h-80 text-[#C9A84C] ${
              isRtl ? "-left-20" : "-right-20"
            }`}
          >
            <path d="M200 20 L380 380 H20 Z" fill="currentColor" />
          </svg>
        </div>

        <div
          className={`relative transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div
            className={`inline-flex items-center gap-2 mb-5 border border-[#C9A84C44] rounded-full px-3 py-1.5 ${
              isRtl ? "flex-row-reverse" : ""
            }`}
          >
            <Building2 size={12} className="text-[#C9A84C]" />
            <span className="text-[11px] tracking-[0.2em] uppercase font-medium text-[#C9A84C]">
              {tr.hero.badge}
            </span>
          </div>

          <h1
            className={`text-[2.4rem] lg:text-[3.2rem] font-bold leading-[1.1] mb-4 ${
              isRtl ? "font-arabic" : ""
            }`}
            style={{ fontFamily: isRtl ? "var(--font-arabic)" : "var(--font-heading)" }}
          >
            <span className={`block ${isRtl ? "text-[#C9A84C]" : "text-white"}`}>
              {titleLines[0]}
            </span>
            <span className={`block ${isRtl ? "text-white" : "text-[#C9A84C]"}`}>
              {titleLines[1]}
            </span>
          </h1>

          <p className="text-white/60 text-sm lg:text-base leading-relaxed mb-7 max-w-md">
            {tr.hero.subtitle}
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-3 mb-8 ${
              isRtl ? "sm:flex-row-reverse" : ""
            }`}
          >
            <Link
              href="/properties"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#C9A84C] text-[#0D2340] text-sm font-semibold hover:bg-[#E2C06A] active:scale-[0.97] transition-all duration-200 shadow-lg shadow-[#C9A84C]/25 min-h-[48px]"
            >
              {tr.hero.cta1}
            </Link>
            <a
              href={loading ? "#" : site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-white text-sm font-medium hover:border-white/50 hover:bg-white/5 active:scale-[0.97] transition-all duration-200 min-h-[48px]"
            >
              <MessageCircle size={15} />
              {tr.nav.cta}
            </a>
          </div>

          <div
            className={`flex items-center gap-6 pt-5 border-t border-white/10 ${
              isRtl ? "flex-row-reverse justify-end" : ""
            }`}
          >
            {[
              {
                value: statsSold,
                label: lang === "fr" ? "Vendues" : "مباعة",
              },
              {
                value: statsClients,
                label: lang === "fr" ? "Clients" : "عميل",
              },
              {
                value: statsYears,
                label: lang === "fr" ? "Ans" : "سنوات",
              },
            ].map((s, i) => (
              <div key={i} className="flex flex-col">
                <span
                  className="text-xl font-bold text-[#C9A84C]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {s.value}
                </span>
                <span className="text-[11px] text-white/50 tracking-wide">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`hidden lg:flex absolute bottom-8 items-center gap-2 text-white/30 text-xs tracking-widest ${
            isRtl ? "right-16" : "left-16"
          }`}
        >
          <ChevronDown size={14} className="animate-bounce" />
          {tr.hero.scroll}
        </div>
      </div>

      <div className="hidden lg:block relative flex-1">
        {!imgLoaded && (
          <div className="absolute inset-0 skeleton-dark bg-[#132d50]" />
        )}
        <Image
          src={HERO_IMAGE}
          alt="Villa de luxe au Maroc"
          fill
          priority
          className={`object-cover transition-opacity duration-700 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImgLoaded(true)}
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D2340] via-[#0D2340]/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D2340]/50 via-transparent to-transparent" />

        <div
          className={`absolute bottom-8 bg-white rounded-2xl shadow-2xl p-4 w-64 anim-fade-up delay-600 ${
            isRtl ? "right-8" : "left-8"
          }`}
        >
          <div
            className={`flex items-center gap-2 mb-2 ${
              isRtl ? "flex-row-reverse" : ""
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A84C] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9A84C]" />
            </span>
            <span className="text-[11px] font-semibold text-[#C9A84C] tracking-wide uppercase">
              {announcement.badge}
            </span>
          </div>
          <p className="text-sm font-semibold text-[#0D2340] mb-0.5">
            {announcement.property}
          </p>
          <p className="text-xs text-gray-500">{announcement.price}</p>
        </div>
      </div>
    </section>
  );
}
