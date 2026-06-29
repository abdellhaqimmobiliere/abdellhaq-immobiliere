"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, ArrowUp } from "lucide-react";
import { useSiteConfig } from "@/context/SettingsContext";
import { t } from "@/translations";
import { useLang } from "@/context/LangContext";

export default function FloatingButtons() {
  const { lang } = useLang();
  const tr = t[lang].floating;
  const site = useSiteConfig();
  const pathname = usePathname();
  const isRtl = lang === "ar";
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <div
      className={`fixed z-[200] flex flex-col gap-3 items-center bottom-[calc(80px+env(safe-area-inset-bottom))] lg:bottom-6 ${
        isRtl ? "left-4" : "right-4"
      }`}
    >
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={tr.scrollTop}
        className={`w-11 h-11 rounded-full bg-[#0D2340] text-white shadow-lg flex items-center justify-center hover:bg-[#132d50] active:scale-95 transition-all duration-300 ${
          showTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ArrowUp size={16} strokeWidth={2.5} />
      </button>

      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={tr.whatsappTooltip}
        className="relative w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center hover:bg-[#1ebe57] active:scale-95 transition-all duration-200"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none" />
        <MessageCircle size={24} strokeWidth={2} />
      </a>
    </div>
  );
}
