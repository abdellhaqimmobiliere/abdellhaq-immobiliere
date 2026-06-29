"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/admin/Toast";

const inputClass =
  "border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] outline-none transition w-full font-body";

function SectionCard({ title, icon, children, onSave, saving, dirty }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="font-heading text-lg font-bold text-[#0D2340]">
          {icon} {title}
        </h2>
      </div>
      <div className="p-6 space-y-4">{children}</div>
      <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
        <button
          type="button"
          onClick={onSave}
          disabled={saving || !dirty}
          className="font-body text-sm font-medium bg-[#C9A84C] text-[#0D2340] rounded-full px-6 py-2.5 disabled:opacity-50"
        >
          {saving ? "Enregistrement…" : "Enregistrer ✓"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, value, original, onChange, dir }) {
  const dirty = value !== original;
  return (
    <div>
      <label className="font-body text-[13px] font-medium text-[#374151] block mb-1.5 flex items-center gap-2">
        {label}
        {dirty && (
          <span className="text-[10px] bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
            Modifié
          </span>
        )}
      </label>
      <input
        dir={dir}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </div>
  );
}

export default function AdminSettingsPage() {
  const { showToast } = useToast();
  const [form, setForm] = useState({});
  const [original, setOriginal] = useState({});
  const [loading, setLoading] = useState(true);
  const [savingSection, setSavingSection] = useState(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((d) => {
        if (d.map) {
          setForm(d.map);
          setOriginal(d.map);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function saveSection(keys, sectionName) {
    setSavingSection(sectionName);
    const updates = keys.map((key) => ({ key, value: form[key] ?? "" }));
    const res = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ updates }),
    });
    if (res.ok) {
      setOriginal((prev) => {
        const next = { ...prev };
        keys.forEach((k) => {
          next[k] = form[k];
        });
        return next;
      });
      showToast("✅ Paramètres enregistrés !", "success");
    } else {
      showToast("Erreur d'enregistrement", "error");
    }
    setSavingSection(null);
  }

  const contactKeys = ["phone", "whatsapp", "email"];
  const socialKeys = ["facebook", "instagram", "telegram", "tiktok"];
  const textKeys = [
    "hero_title_fr",
    "hero_title_ar",
    "stats_sold",
    "stats_clients",
    "stats_years",
  ];

  const isDirty = (keys) => keys.some((k) => form[k] !== original[k]);

  if (loading) {
    return <p className="font-body text-sm text-[#9E9E9E]">Chargement…</p>;
  }

  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="font-heading text-3xl font-bold text-[#0D2340]">Paramètres</h1>

      <SectionCard
        title="Informations de contact"
        icon="📞"
        saving={savingSection === "contact"}
        dirty={isDirty(contactKeys)}
        onSave={() => saveSection(contactKeys, "contact")}
      >
        <Field
          label="Téléphone"
          value={form.phone || ""}
          original={original.phone || ""}
          onChange={(v) => update("phone", v)}
        />
        <Field
          label="WhatsApp URL"
          value={form.whatsapp || ""}
          original={original.whatsapp || ""}
          onChange={(v) => update("whatsapp", v)}
        />
        <Field
          label="Email"
          value={form.email || ""}
          original={original.email || ""}
          onChange={(v) => update("email", v)}
        />
      </SectionCard>

      <SectionCard
        title="Réseaux sociaux"
        icon="📱"
        saving={savingSection === "social"}
        dirty={isDirty(socialKeys)}
        onSave={() => saveSection(socialKeys, "social")}
      >
        <Field
          label="Facebook"
          value={form.facebook || ""}
          original={original.facebook || ""}
          onChange={(v) => update("facebook", v)}
        />
        <Field
          label="Instagram"
          value={form.instagram || ""}
          original={original.instagram || ""}
          onChange={(v) => update("instagram", v)}
        />
        <Field
          label="Telegram"
          value={form.telegram || ""}
          original={original.telegram || ""}
          onChange={(v) => update("telegram", v)}
        />
        <Field
          label="TikTok"
          value={form.tiktok || ""}
          original={original.tiktok || ""}
          onChange={(v) => update("tiktok", v)}
        />
      </SectionCard>

      <SectionCard
        title="Textes du site"
        icon="✏️"
        saving={savingSection === "texts"}
        dirty={isDirty(textKeys)}
        onSave={() => saveSection(textKeys, "texts")}
      >
        <Field
          label="Titre hero (FR)"
          value={form.hero_title_fr || ""}
          original={original.hero_title_fr || ""}
          onChange={(v) => update("hero_title_fr", v)}
        />
        <Field
          label="Titre hero (AR)"
          value={form.hero_title_ar || ""}
          original={original.hero_title_ar || ""}
          onChange={(v) => update("hero_title_ar", v)}
          dir="rtl"
        />
        <Field
          label="Propriétés vendues"
          value={form.stats_sold || ""}
          original={original.stats_sold || ""}
          onChange={(v) => update("stats_sold", v)}
        />
        <Field
          label="Clients satisfaits"
          value={form.stats_clients || ""}
          original={original.stats_clients || ""}
          onChange={(v) => update("stats_clients", v)}
        />
        <Field
          label="Années d'expérience"
          value={form.stats_years || ""}
          original={original.stats_years || ""}
          onChange={(v) => update("stats_years", v)}
        />
      </SectionCard>
    </div>
  );
}
