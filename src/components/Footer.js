"use client";

import Link from "next/link";
import { useSiteConfig } from "@/context/SettingsContext";
import { t } from "@/translations";
import { useLang } from "@/context/LangContext";

function LogoIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 28V12C6 12 6 8 16 4C26 8 26 12 26 12V28"
        stroke="#C9A84C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 28H26"
        stroke="#C9A84C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-[#C9A84C] hover:border-[#C9A84C] transition duration-200"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const { lang } = useLang();
  const tr = t[lang];
  const ft = tr.footer;
  const site = useSiteConfig();
  const isRtl = lang === "ar";

  const navLinks = [
    { key: "home", href: "/" },
    { key: "properties", href: "/properties" },
    { key: "about", href: "/about" },
    { key: "contact", href: "/contact" },
  ];

  const serviceLinks = [
    { key: "vente", href: "/properties?type=vente" },
    { key: "location", href: "/properties?type=location" },
    { key: "investissement", href: "/#services" },
  ];

  return (
    <footer className="bg-[#0A1B2E] text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 ${
            isRtl ? "font-arabic text-right" : "text-left"
          }`}
        >
          <div>
            <div
              className={`flex items-center gap-2.5 mb-4 ${
                isRtl ? "flex-row-reverse justify-end" : ""
              }`}
            >
              <LogoIcon />
              <span className="font-heading text-lg font-bold text-[#C9A84C]">
                {lang === "ar" ? site.nameAr : site.name}
              </span>
            </div>
            <p className="font-body text-sm text-gray-400 mb-6">
              {lang === "ar" ? site.taglineAr : site.tagline}
            </p>
            <div
              className={`flex gap-3 ${isRtl ? "flex-row-reverse justify-end" : ""}`}
            >
              <SocialIcon href={site.facebook} label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </SocialIcon>
              <SocialIcon href={site.instagram} label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </SocialIcon>
              <SocialIcon href={site.telegram} label="Telegram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          <div>
            <h3 className="font-body text-sm font-medium text-[#C9A84C] mb-4 uppercase tracking-wide">
              {ft.navigation}
            </h3>
            <ul className="space-y-2">
              {navLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="font-body text-sm text-white/70 hover:text-white transition duration-200"
                  >
                    {tr.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-body text-sm font-medium text-[#C9A84C] mb-4 uppercase tracking-wide">
              {ft.servicesTitle}
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="font-body text-sm text-white/70 hover:text-white transition duration-200"
                  >
                    {ft.serviceLinks[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-body text-sm font-medium text-[#C9A84C] mb-4 uppercase tracking-wide">
              {ft.contactTitle}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className={`font-body text-sm text-white/70 hover:text-white transition duration-200 flex items-center gap-2 ${
                    isRtl ? "flex-row-reverse justify-end" : ""
                  }`}
                >
                  <span aria-hidden="true">📞</span>
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className={`font-body text-sm text-white/70 hover:text-white transition duration-200 flex items-center gap-2 ${
                    isRtl ? "flex-row-reverse justify-end" : ""
                  }`}
                >
                  <span aria-hidden="true">✉️</span>
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-body text-sm text-white/70 hover:text-white transition duration-200 flex items-center gap-2 ${
                    isRtl ? "flex-row-reverse justify-end" : ""
                  }`}
                >
                  <span aria-hidden="true">💬</span>
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between gap-4 ${
            isRtl ? "sm:flex-row-reverse" : ""
          }`}
        >
          <p className="font-body text-xs text-gray-500">{ft.copyright}</p>
          <p className="font-body text-xs text-gray-500">{ft.madeIn}</p>
        </div>
      </div>
    </footer>
  );
}
