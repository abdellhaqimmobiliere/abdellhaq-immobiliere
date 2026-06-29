"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Menu, Phone, MessageCircle, ChevronRight } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { useSettings } from "@/context/SettingsContext";
import { t } from "@/translations";
import Logo from "@/components/ui/Logo";
import { SkeletonText } from "@/components/ui/Skeleton";

export default function Navbar() {
  const { lang, toggleLang } = useLang();
  const { site, loading } = useSettings();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const tr = t[lang];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (pathname.startsWith("/admin")) return null;

  const navLinks = [
    { href: "/", label: tr.nav.home },
    { href: "/properties", label: tr.nav.properties },
    { href: "/about", label: tr.nav.about },
    { href: "/contact", label: tr.nav.contact },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 lg:h-[72px] transition-all duration-300 ${
          scrolled
            ? "bg-[#0D2340]/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
            : "bg-[#0D2340]"
        }`}
      >
        <div className="h-full max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">
          <Link href="/" aria-label="Mouad Immobilière — Accueil">
            <Logo size="sm" />
          </Link>

          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Navigation principale"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-[#C9A84C] after:transition-all after:duration-300 ${
                  pathname === link.href
                    ? "text-[#C9A84C] after:w-full"
                    : "text-white/80 hover:text-white after:w-0 hover:after:w-full"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={toggleLang}
              className="text-[11px] font-medium tracking-widest px-3 py-1.5 border border-[#C9A84C66] text-[#C9A84C] rounded-full hover:border-[#C9A84C] hover:bg-[#C9A84C15] transition-all duration-200 min-h-[44px]"
            >
              {lang === "fr" ? "AR | عربي" : "FR | Français"}
            </button>
            {loading ? (
              <SkeletonText width="120px" height="40px" className="rounded-full" />
            ) : (
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white text-sm font-medium rounded-full hover:bg-[#1ebe57] active:scale-95 transition-all duration-200 shadow-md min-h-[44px]"
              >
                <MessageCircle size={15} strokeWidth={2} />
                {tr.nav.cta}
              </a>
            )}
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleLang}
              className="text-[10px] font-medium px-2.5 py-1 border border-[#C9A84C66] text-[#C9A84C] rounded-full transition-all duration-200 min-h-[36px] min-w-[44px]"
            >
              {lang === "fr" ? "AR" : "FR"}
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors"
              aria-label="Ouvrir le menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-[60] lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm anim-fade-in" />
        </div>
      )}

      <div
        className={`fixed top-0 right-0 bottom-0 z-[70] w-[82vw] max-w-sm bg-[#0D2340] flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
        role="dialog"
        aria-label="Menu navigation"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <Logo size="sm" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-white/70 hover:text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors"
            aria-label="Fermer le menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center justify-between px-4 py-4 rounded-xl text-base font-medium transition-all duration-150 min-h-[52px] ${
                pathname === link.href
                  ? "bg-[#C9A84C15] text-[#C9A84C] border border-[#C9A84C33]"
                  : "text-white/80 hover:text-white hover:bg-white/5 active:bg-white/10"
              }`}
            >
              {link.label}
              <ChevronRight size={16} className="text-[#C9A84C66]" />
            </Link>
          ))}
        </nav>

        <div className="px-4 py-6 space-y-3 border-t border-white/10">
          {loading ? (
            <>
              <SkeletonText height="48px" className="rounded-xl skeleton-dark" />
              <SkeletonText height="48px" className="rounded-xl skeleton-dark" />
            </>
          ) : (
            <>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-white/20 text-white text-sm font-medium hover:border-white/40 active:bg-white/5 transition-all min-h-[48px]"
              >
                <Phone size={16} />
                {site.phone}
              </a>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#25D366] text-white text-sm font-medium hover:bg-[#1ebe57] active:scale-[0.98] transition-all min-h-[48px]"
              >
                <MessageCircle size={16} />
                {tr.nav.cta}
              </a>
            </>
          )}
        </div>
      </div>

      <div className="h-16 lg:h-[72px]" aria-hidden="true" />
    </>
  );
}
