"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useSiteConfig } from "@/context/SettingsContext";
import { t } from "@/translations";
import { useLang } from "@/context/LangContext";

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="6" y1="18" x2="18" y2="6" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function PropertyModal({ property, open, onClose }) {
  const { lang } = useLang();
  const site = useSiteConfig();
  const tr = t[lang].property;
  const isRtl = lang === "ar";

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open || !property) return null;

  const title = isRtl ? property.titleAr : property.titleFr;
  const description = isRtl ? property.descAr : property.descFr;
  const typeLabel =
    property.type === "vente" ? tr.typeVente : tr.typeLocation;
  const categoryLabel = tr.categories[property.category];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`modal-enter relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto ${
          isRtl ? "font-arabic text-right" : "text-left"
        }`}
      >
        <div className="relative h-[300px] w-full">
          <Image
            src={property.image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 672px"
            className="object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            className={`absolute top-4 w-10 h-10 rounded-full bg-[#0D2340] text-white flex items-center justify-center hover:bg-[#1a3a5c] transition duration-200 ${
              isRtl ? "left-4" : "right-4"
            }`}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="p-8">
          <div
            className={`flex flex-wrap gap-2 mb-4 ${
              isRtl ? "flex-row-reverse justify-end" : ""
            }`}
          >
            <span
              className={`text-xs font-body font-medium px-3 py-1 rounded-full text-white ${
                property.type === "vente" ? "bg-[#0D2340]" : "bg-[#25D366]"
              }`}
            >
              {typeLabel}
            </span>
            <span className="text-xs font-body font-medium px-3 py-1 rounded-full bg-[#F5F0E8] text-[#0D2340]">
              {categoryLabel}
            </span>
          </div>

          <h2 className="font-heading text-3xl font-bold text-[#0D2340] mb-2">
            {title}
          </h2>
          <p className="font-heading text-2xl font-bold text-[#C9A84C] mb-6">
            {property.price}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { icon: "📍", value: property.city },
              { icon: "📐", value: property.surface },
              ...(property.rooms > 0
                ? [{ icon: "🛏", value: `${property.rooms} ${tr.rooms}` }]
                : []),
              ...(property.bathrooms > 0
                ? [
                    {
                      icon: "🚿",
                      value: `${property.bathrooms} ${tr.bathrooms}`,
                    },
                  ]
                : []),
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 font-body text-sm text-[#6B7280] ${
                  isRtl ? "flex-row-reverse" : ""
                }`}
              >
                <span aria-hidden="true">{item.icon}</span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>

          <div className="w-10 h-px bg-[#C9A84C] mb-6" />

          <p className="font-body text-sm text-[#6B7280] leading-[1.7] mb-8">
            {description}
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-3 ${
              isRtl ? "sm:flex-row-reverse" : ""
            }`}
          >
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="flex-1 font-body text-sm font-medium bg-[#0D2340] text-white text-center rounded-full py-3 hover:bg-[#1a3a5c] transition duration-200"
            >
              {tr.call}
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 font-body text-sm font-medium bg-[#25D366] text-white rounded-full py-3 flex items-center justify-center gap-2 hover:bg-[#1ebe57] transition duration-200"
            >
              <WhatsAppIcon />
              {t[lang].nav.cta}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
