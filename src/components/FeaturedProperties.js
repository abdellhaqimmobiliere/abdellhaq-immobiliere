"use client";

import { useState } from "react";
import Link from "next/link";
import { t } from "@/translations";
import { useLang } from "@/context/LangContext";
import { useProperties } from "@/hooks/useProperties";
import { useInView } from "@/hooks/useInView";
import PropertyCard from "@/components/PropertyCard";
import PropertyModal from "@/components/PropertyModal";
import SectionHeader from "@/components/ui/SectionHeader";
import { SkeletonCard } from "@/components/ui/Skeleton";
import Button from "@/components/ui/Button";

export default function FeaturedProperties() {
  const { lang } = useLang();
  const tr = t[lang].featured;
  const isRtl = lang === "ar";
  const [selected, setSelected] = useState(null);
  const { properties: featured, loading } = useProperties({ featured: true });
  const [ref, inView] = useInView();

  return (
    <section id="properties" className="bg-[#F7F4EE] py-16 lg:py-24 px-4 lg:px-8">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <SectionHeader
          label={tr.label}
          title={tr.title}
          subtitle={tr.subtitle}
        />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featured.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={setSelected}
              />
            ))}
          </div>
        )}

        <div className="text-center">
          <Button
            href="/properties"
            variant="outline"
            size="lg"
            className={isRtl ? "font-arabic" : ""}
          >
            {tr.viewAll}
            <span aria-hidden="true">{isRtl ? "←" : "→"}</span>
          </Button>
        </div>
      </div>

      <PropertyModal
        property={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
