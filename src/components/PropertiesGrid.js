"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { t } from "@/translations";
import { useLang } from "@/context/LangContext";
import { useProperties } from "@/hooks/useProperties";
import PropertyCard from "@/components/PropertyCard";
import PropertyModal from "@/components/PropertyModal";
import { SkeletonCard } from "@/components/ui/Skeleton";

const CITIES = [
  "Rabat",
  "Casablanca",
  "Marrakech",
  "Fès",
  "Agadir",
  "Tanger",
];

function parsePrice(priceStr) {
  const nums = priceStr.replace(/[^\d]/g, "");
  return parseInt(nums, 10) || 0;
}

function matchesPriceRange(price, range) {
  if (!range || range === "all") return true;
  const value = parsePrice(price);
  switch (range) {
    case "under500k":
      return value < 500000;
    case "500k-1m":
      return value >= 500000 && value < 1000000;
    case "1m-3m":
      return value >= 1000000 && value < 3000000;
    case "3m-plus":
      return value >= 3000000;
    default:
      return true;
  }
}

function FilterSelect({ label, value, options, onChange, isRtl }) {
  return (
    <div className={`flex flex-col gap-1 min-w-[140px] ${isRtl ? "text-right" : "text-left"}`}>
      <label className="font-body text-xs text-[#9E9E9E] uppercase tracking-wide">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`font-body text-sm text-[#0D2340] bg-[#F8F8F8] border border-[#EEEEEE] rounded-lg px-3 py-2 outline-none focus:border-[#C9A84C] transition duration-200 ${
          isRtl ? "text-right" : "text-left"
        }`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function PropertiesGrid() {
  const { lang } = useLang();
  const tr = t[lang].filters;
  const isRtl = lang === "ar";
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selected, setSelected] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filters = useMemo(
    () => ({
      type: searchParams.get("type") || "all",
      category: searchParams.get("category") || "all",
      city: searchParams.get("city") || "all",
      price: searchParams.get("price") || "all",
    }),
    [searchParams]
  );

  const { properties: allProperties, loading } = useProperties({
    type: filters.type,
    category: filters.category,
    city: filters.city,
  });

  const updateFilters = useCallback(
    (updates) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, val]) => {
        if (!val || val === "all") params.delete(key);
        else params.set(key, val);
      });
      const qs = params.toString();
      router.push(qs ? `/properties?${qs}` : "/properties", { scroll: false });
    },
    [router, searchParams]
  );

  const typeOptions = [
    { value: "all", label: tr.all },
    { value: "vente", label: tr.vente },
    { value: "location", label: tr.location },
  ];

  const categoryOptions = [
    { value: "all", label: tr.all },
    { value: "villa", label: tr.villa },
    { value: "appartement", label: tr.appartement },
    { value: "terrain", label: tr.terrain },
    { value: "commercial", label: tr.commercial },
  ];

  const cityOptions = [
    { value: "all", label: tr.all },
    ...CITIES.map((c) => ({ value: c, label: c })),
  ];

  const priceOptions = [
    { value: "all", label: tr.all },
    { value: "under500k", label: tr.priceUnder500k },
    { value: "500k-1m", label: tr.price500k1M },
    { value: "1m-3m", label: tr.price1M3M },
    { value: "3m-plus", label: tr.price3MPlus },
  ];

  const filtered = useMemo(() => {
    return allProperties.filter((p) => {
      if (!matchesPriceRange(p.price, filters.price)) return false;
      return true;
    });
  }, [allProperties, filters.price]);

  useEffect(() => {
    if (drawerOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const filterControls = (
    <>
      <FilterSelect
        label={tr.type}
        value={filters.type}
        options={typeOptions}
        onChange={(v) => updateFilters({ type: v })}
        isRtl={isRtl}
      />
      <FilterSelect
        label={tr.category}
        value={filters.category}
        options={categoryOptions}
        onChange={(v) => updateFilters({ category: v })}
        isRtl={isRtl}
      />
      <FilterSelect
        label={tr.city}
        value={filters.city}
        options={cityOptions}
        onChange={(v) => updateFilters({ city: v })}
        isRtl={isRtl}
      />
      <FilterSelect
        label={tr.price}
        value={filters.price}
        options={priceOptions}
        onChange={(v) => updateFilters({ price: v })}
        isRtl={isRtl}
      />
    </>
  );

  return (
    <>
      <div
        className={`sticky top-16 lg:top-[72px] z-40 bg-white border-b border-[#EEEEEE] px-4 md:px-8 py-4 ${
          isRtl ? "font-arabic" : ""
        }`}
      >
        <div className="mx-auto max-w-6xl">
          <div className="hidden md:flex items-end gap-4 flex-wrap">
            {filterControls}
          </div>

          <div className="md:hidden flex items-center justify-between">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className={`font-body text-sm font-medium border border-[#EEEEEE] rounded-full px-4 py-2 flex items-center gap-2 ${
                isRtl ? "flex-row-reverse" : ""
              }`}
            >
              {tr.filter}
              <span aria-hidden="true">▾</span>
            </button>
            <span className="font-body text-sm text-[#9E9E9E]">
              {filtered.length} {tr.resultsFound}
            </span>
          </div>
        </div>
      </div>

      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <div
            className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto ${
              isRtl ? "text-right font-arabic" : "text-left"
            }`}
          >
            <div
              className={`flex items-center justify-between mb-6 ${
                isRtl ? "flex-row-reverse" : ""
              }`}
            >
              <h3 className="font-heading text-xl font-bold text-[#0D2340]">
                {tr.filter}
              </h3>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="text-[#9E9E9E] text-xl"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="flex flex-col gap-4 mb-6">{filterControls}</div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  updateFilters({
                    type: "all",
                    category: "all",
                    city: "all",
                    price: "all",
                  });
                  setDrawerOpen(false);
                }}
                className="flex-1 font-body text-sm border border-[#EEEEEE] rounded-full py-3"
              >
                {tr.reset}
              </button>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="flex-1 font-body text-sm bg-[#C9A84C] text-[#0D2340] rounded-full py-3 font-medium"
              >
                {tr.apply}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl px-4 md:px-8 py-10">
        <p
          className={`hidden md:block font-body text-sm text-[#9E9E9E] mb-8 ${
            isRtl ? "text-right" : "text-left"
          }`}
        >
          {filtered.length} {tr.resultsFound}
        </p>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={setSelected}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-6" aria-hidden="true">
              🏠
            </div>
            <h3
              className={`font-heading text-2xl font-bold text-[#0D2340] mb-2 ${
                isRtl ? "font-arabic" : ""
              }`}
            >
              {tr.emptyTitle}
            </h3>
            <p
              className={`font-body text-sm text-[#9E9E9E] max-w-md mx-auto ${
                isRtl ? "font-arabic" : ""
              }`}
            >
              {tr.emptyDesc}
            </p>
          </div>
        )}
      </div>

      <PropertyModal
        property={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
