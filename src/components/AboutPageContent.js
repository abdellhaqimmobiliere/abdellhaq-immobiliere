"use client";

import Image from "next/image";
import Link from "next/link";
import { useSiteConfig } from "@/context/SettingsContext";
import { t } from "@/translations";
import { useLang } from "@/context/LangContext";
import { CheckIcon, TitleWithGold } from "@/components/shared/AboutHelpers";

export default function AboutPageContent() {
  const { lang } = useLang();
  const about = t[lang].about;
  const page = t[lang].aboutPage;
  const site = useSiteConfig();
  const isRtl = lang === "ar";

  return (
    <>
      <section className="bg-white py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div
            className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${
              isRtl ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className="w-full lg:w-[48%] relative">
              <div
                className={`absolute bottom-[-16px] w-[80%] h-[80%] border-2 border-[#C9A84C] rounded-2xl z-0 ${
                  isRtl ? "right-[-16px]" : "left-[-16px]"
                }`}
                aria-hidden="true"
              />
              <div className="relative z-10 rounded-2xl overflow-hidden h-[360px] md:h-[480px]">
                <Image
                  src={site.agentImage}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover"
                />
                <span
                  className={`absolute bottom-4 font-body text-xs text-white bg-[#0D2340] rounded-full px-4 py-2 ${
                    isRtl ? "left-4" : "right-4"
                  }`}
                >
                  {about.founderBadge}
                </span>
              </div>
            </div>

            <div
              className={`w-full lg:w-[52%] ${
                isRtl ? "lg:pr-16 text-right font-arabic" : "lg:pl-16 text-left"
              }`}
            >
              <TitleWithGold
                title={about.title}
                titleGold={about.titleGold}
                className="font-heading text-4xl lg:text-5xl font-bold leading-tight mb-6"
              />
              <p className="font-body text-base text-[#6B7280] leading-[1.8] mb-4">
                {about.bio}
              </p>
              <p className="font-body text-base text-[#6B7280] leading-[1.8] mb-4">
                {page.bioLong}
              </p>
              <p className="font-body text-base text-[#6B7280] leading-[1.8]">
                {page.vision}
              </p>

              <ul className="mt-8 space-y-3">
                {about.trust.map((item, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-3 ${
                      isRtl ? "flex-row-reverse" : ""
                    }`}
                  >
                    <CheckIcon />
                    <span className="font-body text-sm text-[#374151]">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <h2
            className={`font-heading text-3xl font-bold text-[#0D2340] text-center mb-12 ${
              isRtl ? "font-arabic" : ""
            }`}
          >
            {page.valuesTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {page.values.map((value, i) => (
              <div
                key={i}
                className={`bg-[#F5F0E8] border border-[#C9A84C33] rounded-2xl p-8 ${
                  isRtl ? "text-right font-arabic" : "text-left"
                }`}
              >
                <span className="text-3xl mb-4 block" aria-hidden="true">
                  {value.icon}
                </span>
                <h3 className="font-heading text-xl font-bold text-[#0D2340] mb-2">
                  {value.title}
                </h3>
                <p className="font-body text-sm text-[#6B7280] leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0D2340] py-20 px-6 text-center">
        <h2
          className={`font-heading text-3xl md:text-4xl font-bold text-[#C9A84C] mb-4 ${
            isRtl ? "font-arabic" : ""
          }`}
        >
          {page.ctaTitle}
        </h2>
        <p
          className={`font-body text-base text-white/70 max-w-lg mx-auto mb-8 ${
            isRtl ? "font-arabic" : ""
          }`}
        >
          {page.ctaSubtitle}
        </p>
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center ${
            isRtl ? "sm:flex-row-reverse" : ""
          }`}
        >
          <Link
            href="/properties"
            className="font-body text-sm font-medium bg-[#C9A84C] text-[#0D2340] rounded-full px-8 py-3 hover:bg-[#E8C97A] transition duration-200"
          >
            {page.ctaProperties}
          </Link>
          <Link
            href="/contact"
            className="font-body text-sm font-medium border border-white/30 text-white rounded-full px-8 py-3 hover:border-[#C9A84C] hover:text-[#C9A84C] transition duration-200"
          >
            {page.ctaContact}
          </Link>
        </div>
      </section>
    </>
  );
}
