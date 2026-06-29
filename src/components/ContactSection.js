"use client";

import { useState } from "react";
import { useSettings } from "@/context/SettingsContext";
import { SkeletonSettingRow } from "@/components/ui/Skeleton";
import { t } from "@/translations";
import { useLang } from "@/context/LangContext";
import { ArchWatermark } from "@/components/PageBanner";
import { TitleWithGold } from "@/components/shared/AboutHelpers";

function ContactButton({ icon, label, value, href, external, isRtl }) {
  const inner = (
    <>
      <span className="w-11 h-11 rounded-full bg-[#C9A84C]/20 flex items-center justify-center text-lg shrink-0">
        {icon}
      </span>
      <div className={isRtl ? "text-right" : "text-left"}>
        <p className="font-body text-[13px] text-white font-medium">{label}</p>
        <p className="font-body text-xs text-white/70">{value}</p>
      </div>
    </>
  );

  const className = `border border-white/20 rounded-xl p-4 flex items-center gap-4 hover:border-[#C9A84C] hover:bg-white/5 transition duration-200 w-full ${
    isRtl ? "flex-row-reverse" : ""
  }`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {inner}
      </a>
    );
  }

  return (
    <a href={href} className={className}>
      {inner}
    </a>
  );
}

export default function ContactSection({ className = "" }) {
  const { lang } = useLang();
  const tr = t[lang].contact;
  const { site, loading } = useSettings();
  const isRtl = lang === "ar";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    const formId =
      process.env.NEXT_PUBLIC_FORMSPREE_ID || "YOUR_FORM_ID";

    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, phone, email, message }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setPhone("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] outline-none transition w-full font-body";

  return (
    <section id="contact" className={`bg-[#0D2340] ${className}`}>
      <div
        className={`flex flex-col lg:flex-row ${
          isRtl ? "lg:flex-row-reverse" : ""
        }`}
      >
        <div className="relative w-full lg:w-[45%] px-6 md:px-12 py-16 lg:py-20 overflow-hidden">
          <ArchWatermark
            className={`absolute bottom-0 h-64 w-64 opacity-5 pointer-events-none ${
              isRtl ? "left-0" : "right-0"
            }`}
          />

          <div className={`relative z-10 ${isRtl ? "text-right font-arabic" : "text-left"}`}>
            <span className="font-body text-[11px] uppercase tracking-widest text-[#C9A84C] block mb-4">
              {tr.label}
            </span>

            <TitleWithGold
              title={tr.title}
              titleGold={tr.titleGold}
              variant="light"
              className={`font-heading text-4xl lg:text-5xl font-bold leading-tight mb-6 ${
                isRtl ? "font-arabic" : ""
              }`}
            />

            <p className="font-body text-base text-white/70 leading-relaxed mb-10 max-w-md">
              {tr.subtitle}
            </p>

            <p className="font-body text-sm font-medium text-[#C9A84C] mb-4">
              {tr.direct.title}
            </p>

            <div className="space-y-3">
              {loading ? (
                <>
                  <SkeletonSettingRow />
                  <SkeletonSettingRow />
                  <SkeletonSettingRow />
                </>
              ) : (
                <>
                  <ContactButton
                    icon="📞"
                    label={tr.direct.phone}
                    value={site.phone}
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                    isRtl={isRtl}
                  />
                  <ContactButton
                    icon="💬"
                    label={tr.direct.whatsapp}
                    value={site.phone}
                    href={site.whatsapp}
                    external
                    isRtl={isRtl}
                  />
                  <ContactButton
                    icon="✉️"
                    label={tr.direct.email}
                    value={site.email}
                    href={`mailto:${site.email}`}
                    isRtl={isRtl}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[55%] px-6 md:px-10 py-10 lg:py-16">
          <div
            className={`bg-white rounded-2xl shadow-2xl p-8 md:p-10 ${
              isRtl ? "font-arabic text-right" : "text-left"
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="font-body text-[13px] font-medium text-[#374151] block mb-1.5">
                  {tr.form.name}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={tr.form.name}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="font-body text-[13px] font-medium text-[#374151] block mb-1.5">
                  {tr.form.phone}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={tr.form.phone}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="font-body text-[13px] font-medium text-[#374151] block mb-1.5">
                  {tr.form.email}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={tr.form.email}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="font-body text-[13px] font-medium text-[#374151] block mb-1.5">
                  {tr.form.message}
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={tr.form.message}
                  className={`${inputClass} resize-y min-h-[120px]`}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full font-body text-sm font-medium bg-[#C9A84C] text-[#0D2340] rounded-full py-3.5 hover:bg-[#E8C97A] transition duration-200 disabled:opacity-60"
              >
                {submitting ? "…" : tr.form.submit}
              </button>

              {status && (
                <p
                  className={`font-body text-sm animate-fade-in-up ${
                    status === "success" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {status === "success" ? tr.form.success : tr.form.error}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
