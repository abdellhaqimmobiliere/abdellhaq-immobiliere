"use client";

import Image from "next/image";
import Link from "next/link";
import { useSiteConfig } from "@/context/SettingsContext";
import { t } from "@/translations";
import { useLang } from "@/context/LangContext";
import { CheckIcon, TitleWithGold } from "@/components/shared/AboutHelpers";

export default function AboutTeaser() {
  const { lang } = useLang();
  const tr = t[lang].about;
  const site = useSiteConfig();
  const isRtl = lang === "ar";

  return (
    <section id="about" className="bg-white py-28 px-6">
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
                {tr.founderBadge}
              </span>
            </div>
          </div>

          <div
            className={`w-full lg:w-[52%] ${
              isRtl ? "lg:pr-16 lg:pl-0 text-right" : "lg:pl-16 text-left"
            }`}
          >
            <span className="font-body text-[11px] uppercase tracking-widest text-[#C9A84C] block mb-4">
              {tr.label}
            </span>

            <TitleWithGold
              title={tr.title}
              titleGold={tr.titleGold}
              className={`font-heading text-4xl lg:text-5xl font-bold leading-tight mb-5 ${
                isRtl ? "font-arabic" : ""
              }`}
            />

            <p
              className={`font-body text-base text-[#6B7280] leading-[1.8] max-w-[440px] mt-5 ${
                isRtl ? "font-arabic mr-0 ml-auto" : ""
              }`}
            >
              {tr.bio}
            </p>

            <ul className="mt-8 space-y-3">
              {tr.trust.map((item, i) => (
                <li
                  key={i}
                  className={`flex items-center gap-3 ${
                    isRtl ? "flex-row-reverse" : ""
                  }`}
                >
                  <CheckIcon />
                  <span
                    className={`font-body text-sm text-[#374151] ${
                      isRtl ? "font-arabic" : ""
                    }`}
                  >
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              className={`inline-block mt-10 font-body text-sm font-medium bg-[#0D2340] text-white rounded-full px-8 py-3 hover:bg-[#C9A84C] hover:text-[#0D2340] transition duration-300 ${
                isRtl ? "font-arabic" : ""
              }`}
            >
              {tr.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
