"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Phone,
  MessageCircle,
} from "lucide-react";
import { useSiteConfig } from "@/context/SettingsContext";
import { t } from "@/translations";
import { useLang } from "@/context/LangContext";

export default function PropertyModal({ property, open, onClose }) {
  const { lang } = useLang();
  const site = useSiteConfig();
  const tr = t[lang].property;
  const isRtl = lang === "ar";

  const images =
    property?.images?.length > 0
      ? property.images
      : property?.image
        ? [property.image]
        : [];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (open) setCurrent(0);
  }, [open, property?.id]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (images.length > 1 && e.key === "ArrowLeft") {
        setCurrent((i) => (i - 1 + images.length) % images.length);
      }
      if (images.length > 1 && e.key === "ArrowRight") {
        setCurrent((i) => (i + 1) % images.length);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, images.length]);

  if (!open || !property) return null;

  const title = isRtl ? property.titleAr : property.titleFr;
  const description = isRtl ? property.descAr : property.descFr;
  const typeLabel =
    property.type === "vente" ? tr.typeVente : tr.typeLocation;
  const categoryLabel = tr.categories[property.category];

  const prev = () =>
    setCurrent((i) => (i - 1 + images.length) % images.length);
  const next = () => setCurrent((i) => (i + 1) % images.length);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`bg-white rounded-2xl overflow-hidden w-full max-w-2xl max-h-[90svh] overflow-y-auto shadow-2xl anim-scale-in ${
          isRtl ? "font-arabic text-right" : "text-left"
        }`}
      >
        <div className="relative" style={{ height: 300 }}>
          {images.length === 0 ? (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Aucune photo</span>
            </div>
          ) : (
            <>
              <Image
                src={images[current]}
                alt={`${title} — photo ${current + 1}`}
                fill
                className="object-cover transition-opacity duration-300"
                sizes="672px"
                priority
              />

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition active:scale-95"
                    aria-label="Photo précédente"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition active:scale-95"
                    aria-label="Photo suivante"
                  >
                    <ChevronRight size={18} />
                  </button>

                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setCurrent(i)}
                        aria-label={`Photo ${i + 1}`}
                        className={`rounded-full transition-all duration-200 ${
                          i === current
                            ? "w-5 h-1.5 bg-white"
                            : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="absolute top-3 left-3 text-xs font-medium bg-black/40 backdrop-blur-sm text-white px-2.5 py-1 rounded-full">
                    {current + 1} / {images.length}
                  </div>
                </>
              )}
            </>
          )}

          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition"
            aria-label="Fermer"
          >
            <X size={16} />
          </button>
        </div>

        {images.length > 1 && (
          <div className="flex gap-1.5 px-3 py-2 overflow-x-auto border-b border-gray-100">
            {images.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={`relative shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  i === current ? "border-[#C9A84C]" : "border-gray-200"
                }`}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="48px" />
              </button>
            ))}
          </div>
        )}

        <div className="p-6">
          <div
            className={`flex flex-wrap gap-2 mb-3 ${
              isRtl ? "flex-row-reverse justify-end" : ""
            }`}
          >
            <span
              className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full text-white ${
                property.type === "vente" ? "bg-[#0D2340]" : "bg-emerald-600"
              }`}
            >
              {typeLabel}
            </span>
            {property.badge && (
              <span className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-[#C9A84C] text-[#0D2340]">
                {property.badge}
              </span>
            )}
            <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-[#F5F0E8] text-[#0D2340]">
              {categoryLabel}
            </span>
          </div>

          <h2 className="font-heading text-2xl font-bold text-[#0D2340] mb-1">
            {title}
          </h2>
          <p className="text-xl font-bold text-[#C9A84C] font-heading mb-4">
            {property.price}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { label: lang === "fr" ? "Ville" : "المدينة", value: property.city },
              {
                label: lang === "fr" ? "Surface" : "المساحة",
                value: property.surface,
              },
              property.rooms > 0 && {
                label: lang === "fr" ? "Chambres" : "غرف",
                value: `${property.rooms} ${tr.rooms}`,
              },
              property.bathrooms > 0 && {
                label: lang === "fr" ? "Salles de bain" : "حمامات",
                value: property.bathrooms,
              },
            ]
              .filter(Boolean)
              .map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-xl px-4 py-3">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-sm font-semibold text-[#0D2340]">
                    {item.value}
                  </p>
                </div>
              ))}
          </div>

          {description && (
            <p
              className="text-sm text-gray-600 leading-relaxed mb-6 border-t border-gray-100 pt-4"
              dir={isRtl ? "rtl" : "ltr"}
            >
              {description}
            </p>
          )}

          <div
            className={`flex gap-3 ${isRtl ? "flex-row-reverse" : ""}`}
          >
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full border border-[#0D2340] text-[#0D2340] text-sm font-semibold hover:bg-[#0D2340] hover:text-white transition-all duration-200"
            >
              <Phone size={15} />
              {tr.call}
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1ebe57] active:scale-[0.98] transition-all duration-200"
            >
              <MessageCircle size={15} />
              {t[lang].nav.cta}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
