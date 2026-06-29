"use client";

import { Home, Key, TrendingUp } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { t } from "@/translations";
import SectionHeader from "@/components/ui/SectionHeader";
import { useInView } from "@/hooks/useInView";

const icons = [Home, Key, TrendingUp];

export default function Services() {
  const { lang } = useLang();
  const tr = t[lang].services;
  const isRtl = lang === "ar";
  const [ref, inView] = useInView();

  return (
    <section id="services" className="py-16 lg:py-24 px-4 lg:px-8 bg-white">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {tr.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className={`group relative p-6 rounded-2xl bg-[#F7F4EE] border border-transparent hover:border-[#C9A84C33] hover:bg-white hover:shadow-[0_12px_40px_rgba(13,35,64,0.10)] hover:-translate-y-1 transition-all duration-300 overflow-hidden ${
                  isRtl ? "text-right font-arabic" : "text-left"
                }`}
                style={{ transitionDelay: inView ? `${i * 100}ms` : "0ms" }}
              >
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div
                  className={`w-12 h-12 rounded-xl bg-[#0D2340] flex items-center justify-center mb-5 ${
                    isRtl ? "mr-auto md:mr-0" : ""
                  }`}
                >
                  <Icon size={20} className="text-[#C9A84C]" strokeWidth={1.5} />
                </div>
                <h3
                  className={`text-base font-bold text-[#0D2340] mb-2 font-heading ${
                    isRtl ? "font-arabic" : ""
                  }`}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
