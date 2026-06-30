"use client";

import Image from "next/image";
import { useState } from "react";
import { useLang } from "@/context/LangContext";
import { t } from "@/translations";
import { MapPin, Bed, Bath, Maximize, Eye } from "lucide-react";

function getBadgeLabel(badge, tr) {
  if (badge === "Nouveau") return tr.badgeNouveau;
  if (badge === "Exclusif") return tr.badgeExclusif;
  return badge;
}

export default function PropertyCard({ property, onSelect }) {
  const { lang } = useLang();
  const tr = t[lang].property;
  const isRtl = lang === "ar";
  const [imgLoaded, setImgLoaded] = useState(false);

  const title = isRtl ? property.titleAr : property.titleFr;
  const coverImage =
    property.images?.[0] || property.image || "/brand/cover.png";
  const imageCount = property.images?.length || (property.image ? 1 : 0);
  const typeLabel =
    property.type === "vente" ? tr.typeVente : tr.typeLocation;
  const typeColor =
    property.type === "vente" ? "bg-[#0D2340]" : "bg-emerald-600";
  const badgeLabel = property.badge ? getBadgeLabel(property.badge, tr) : null;

  const handleActivate = () => onSelect?.(property);

  return (
    <article
      onClick={handleActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleActivate();
        }
      }}
      className={`group bg-white rounded-2xl overflow-hidden border border-[#E4E4E7] shadow-[0_4px_16px_rgba(13,35,64,0.06)] hover:shadow-[0_12px_40px_rgba(13,35,64,0.14)] hover:-translate-y-1 transition-all duration-300 cursor-pointer active:scale-[0.99] ${
        isRtl ? "text-right" : "text-left"
      }`}
      role="button"
      tabIndex={0}
      aria-label={`${title} — ${property.price}`}
    >
      <div className="relative overflow-hidden" style={{ height: 210 }}>
        {!imgLoaded && <div className="absolute inset-0 skeleton" />}
        <Image
          src={coverImage}
          alt={title}
          fill
          className={`object-cover transition-all duration-500 group-hover:scale-105 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImgLoaded(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div
          className={`absolute top-3 flex gap-2 ${
            isRtl ? "right-3 flex-row-reverse" : "left-3"
          }`}
        >
          <span
            className={`${typeColor} text-white text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wide uppercase`}
          >
            {typeLabel}
          </span>
          {badgeLabel && (
            <span className="bg-[#C9A84C] text-[#0D2340] text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wide uppercase">
              {badgeLabel}
            </span>
          )}
        </div>
        {imageCount > 1 && (
          <span
            className={`absolute bottom-3 text-[10px] font-semibold bg-black/50 text-white px-2 py-1 rounded-full backdrop-blur-sm ${
              isRtl ? "left-3" : "right-3"
            }`}
          >
            +{imageCount - 1}
          </span>
        )}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#0D2340]/20 backdrop-blur-[2px]">
          <div className="bg-white text-[#0D2340] text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Eye size={13} />
            {tr.viewDetails}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div
          className={`flex items-center gap-1.5 text-[11px] text-gray-400 mb-2 ${
            isRtl ? "flex-row-reverse justify-end" : ""
          }`}
        >
          <MapPin size={11} className="text-[#C9A84C] shrink-0" />
          {property.city}
        </div>

        <h3
          className={`text-base font-semibold text-[#0D2340] leading-tight mb-3 line-clamp-2 ${
            isRtl ? "font-arabic" : "font-heading"
          }`}
        >
          {title}
        </h3>

        <div
          className={`w-8 h-[1.5px] bg-[#C9A84C] mb-3 rounded-full ${
            isRtl ? "mr-auto md:mr-0 md:ml-auto" : ""
          }`}
        />

        {(property.rooms > 0 || property.surface) && (
          <div
            className={`flex items-center gap-4 text-[11px] text-gray-400 mb-3 ${
              isRtl ? "flex-row-reverse justify-end" : ""
            }`}
          >
            {property.rooms > 0 && (
              <span className="flex items-center gap-1">
                <Bed size={12} className="text-[#C9A84C55]" />
                {property.rooms} {tr.rooms}
              </span>
            )}
            {property.bathrooms > 0 && (
              <span className="flex items-center gap-1">
                <Bath size={12} className="text-[#C9A84C55]" />
                {property.bathrooms}
              </span>
            )}
            {property.surface && (
              <span className="flex items-center gap-1">
                <Maximize size={12} className="text-[#C9A84C55]" />
                {property.surface}
              </span>
            )}
          </div>
        )}

        <div className="text-lg font-bold text-[#C9A84C] font-heading">
          {property.price}
        </div>
      </div>
    </article>
  );
}
