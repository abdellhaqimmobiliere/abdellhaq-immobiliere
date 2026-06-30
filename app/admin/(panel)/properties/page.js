"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useToast } from "@/components/admin/Toast";
import { adminFetch } from "@/lib/adminFetch";
import ImageUploader from "@/components/admin/ImageUploader";

const CITIES = ["Rabat", "Casablanca", "Marrakech", "Fès", "Agadir", "Tanger"];
const EMPTY_FORM = {
  titleFr: "",
  titleAr: "",
  type: "vente",
  category: "villa",
  price: "",
  city: "Rabat",
  surface: "",
  rooms: 0,
  bathrooms: 0,
  badge: "",
  featured: false,
  images: [],
  image: "",
  descFr: "",
  descAr: "",
};

function Counter({ value, onChange, label }) {
  return (
    <div>
      <label className="font-body text-[13px] font-medium text-[#374151] block mb-1.5">
        {label}
      </label>
      <div className="flex items-center gap-3 border border-gray-200 rounded-xl p-2 w-fit">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          className="w-8 h-8 rounded-lg hover:bg-gray-100"
        >
          −
        </button>
        <span className="w-8 text-center font-medium">{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="w-8 h-8 rounded-lg hover:bg-gray-100"
        >
          +
        </button>
      </div>
    </div>
  );
}

function PropertyModal({ open, mode, initial, onClose, onSaved }) {
  const { showToast } = useToast();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (open) {
      const base = initial ? { ...EMPTY_FORM, ...initial } : { ...EMPTY_FORM };
      const imgs =
        initial?.images?.length > 0
          ? initial.images
          : initial?.image
            ? [initial.image]
            : [];
      setForm({ ...base, images: imgs, image: imgs[0] || "" });
      setErrors({});
      setImgError(false);
    }
  }, [open, initial]);

  if (!open) return null;

  const inputClass =
    "border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] outline-none transition w-full font-body";

  function validate() {
    const e = {};
    if (!form.titleFr.trim()) e.titleFr = "Requis";
    if (!form.price.trim()) e.price = "Requis";
    if (!form.city.trim()) e.city = "Requis";
    if (!form.images?.length) e.images = "Ajoutez au moins une photo";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSave() {
    if (!validate()) return;
    setSaving(true);

    const url =
      mode === "edit"
        ? `/api/admin/properties/${initial.id}`
        : "/api/admin/properties";
    const method = mode === "edit" ? "PATCH" : "POST";

    const payload = {
      ...form,
      images: form.images || [],
      image: form.images?.[0] || "",
    };

    const res = await adminFetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      onSaved(data.property);
      showToast(
        mode === "edit" ? "Propriété mise à jour" : "Propriété ajoutée",
        "success"
      );
      onClose();
    } else {
      showToast("Erreur d'enregistrement", "error");
    }
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
          <h2 className="font-heading text-xl font-bold text-[#0D2340]">
            {mode === "edit" ? "Modifier la propriété" : "Ajouter une propriété"}
          </h2>
          <button type="button" onClick={onClose} className="text-2xl text-[#9E9E9E]">
            ×
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="col-span-2">
            <label className="font-body text-[13px] font-medium text-[#374151] block mb-2">
              Photos de la propriété
            </label>
            <ImageUploader
              images={form.images || []}
              onChange={(imgs) =>
                setForm({ ...form, images: imgs, image: imgs[0] || "" })
              }
              propertyId={mode === "edit" ? initial?.id : undefined}
            />
            {errors.images && (
              <p className="text-red-500 text-xs mt-1">{errors.images}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-body text-[13px] font-medium text-[#374151] block mb-1.5">
                Titre FR
              </label>
              <input
                value={form.titleFr}
                onChange={(e) => setForm({ ...form, titleFr: e.target.value })}
                className={inputClass}
              />
              {errors.titleFr && (
                <p className="text-red-500 text-xs mt-1">{errors.titleFr}</p>
              )}
            </div>
            <div>
              <label className="font-body text-[13px] font-medium text-[#374151] block mb-1.5">
                Titre AR
              </label>
              <input
                dir="rtl"
                value={form.titleAr}
                onChange={(e) => setForm({ ...form, titleAr: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="font-body text-[13px] font-medium text-[#374151] block mb-1.5">
                Type
              </label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className={inputClass}
              >
                <option value="vente">Vente</option>
                <option value="location">Location</option>
              </select>
            </div>
            <div>
              <label className="font-body text-[13px] font-medium text-[#374151] block mb-1.5">
                Catégorie
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={inputClass}
              >
                <option value="villa">Villa</option>
                <option value="appartement">Appartement</option>
                <option value="terrain">Terrain</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
            <div>
              <label className="font-body text-[13px] font-medium text-[#374151] block mb-1.5">
                Ville
              </label>
              <select
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className={inputClass}
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-body text-[13px] font-medium text-[#374151] block mb-1.5">
                Prix
              </label>
              <input
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className={inputClass}
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">{errors.price}</p>
              )}
            </div>
            <div>
              <label className="font-body text-[13px] font-medium text-[#374151] block mb-1.5">
                Surface
              </label>
              <input
                value={form.surface}
                onChange={(e) => setForm({ ...form, surface: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Counter
              label="Chambres"
              value={form.rooms}
              onChange={(v) => setForm({ ...form, rooms: v })}
            />
            <Counter
              label="Salles de bain"
              value={form.bathrooms}
              onChange={(v) => setForm({ ...form, bathrooms: v })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div>
              <label className="font-body text-[13px] font-medium text-[#374151] block mb-1.5">
                Badge
              </label>
              <input
                value={form.badge}
                onChange={(e) => setForm({ ...form, badge: e.target.value })}
                placeholder="Nouveau, Exclusif…"
                className={inputClass}
              />
            </div>
            <label className="flex items-center gap-2 font-body text-sm cursor-pointer pb-3">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="rounded border-gray-300"
              />
              Mettre en vedette
            </label>
          </div>

          <div>
            <label className="font-body text-[13px] font-medium text-[#374151] block mb-1.5">
              Description FR
            </label>
            <textarea
              rows={3}
              value={form.descFr}
              onChange={(e) => setForm({ ...form, descFr: e.target.value })}
              className={`${inputClass} resize-y`}
            />
          </div>
          <div>
            <label className="font-body text-[13px] font-medium text-[#374151] block mb-1.5">
              Description AR
            </label>
            <textarea
              dir="rtl"
              rows={3}
              value={form.descAr}
              onChange={(e) => setForm({ ...form, descAr: e.target.value })}
              className={`${inputClass} resize-y`}
            />
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="font-body text-sm px-6 py-2.5 rounded-full border border-gray-200"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="font-body text-sm font-medium px-6 py-2.5 rounded-full bg-[#C9A84C] text-[#0D2340] disabled:opacity-50"
          >
            {saving ? "Enregistrement…" : "Enregistrer ✓"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteDialog({ property, onClose, onConfirm }) {
  if (!property) return null;
  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <p className="text-3xl mb-4" aria-hidden="true">
          ⚠️
        </p>
        <h3 className="font-heading text-xl font-bold text-[#0D2340] mb-2">
          Supprimer cette propriété ?
        </h3>
        <p className="font-body text-sm text-[#6B7280] mb-1">
          &quot;{property.titleFr}&quot;
        </p>
        <p className="font-body text-xs text-[#9E9E9E] mb-6">
          Cette action est irréversible.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            type="button"
            onClick={onClose}
            className="font-body text-sm px-6 py-2.5 rounded-full border border-gray-200"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="font-body text-sm font-medium px-6 py-2.5 rounded-full bg-red-600 text-white"
          >
            Supprimer ✗
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminPropertiesPage() {
  const { showToast } = useToast();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProperty, setEditProperty] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  function load() {
    setLoading(true);
    adminFetch("/api/admin/properties")
      .then((r) => r.json())
      .then((d) => setProperties(d.properties || []))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleFeatured(property) {
    const res = await adminFetch(`/api/admin/properties/${property.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...property, featured: !property.featured }),
    });
    if (res.ok) {
      const { property: updated } = await res.json();
      setProperties((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
      showToast("Vedette mise à jour", "success");
    }
  }

  async function confirmDelete() {
    const res = await adminFetch(`/api/admin/properties/${deleteTarget.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setProperties((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      showToast("Propriété supprimée", "success");
    } else {
      showToast("Erreur", "error");
    }
    setDeleteTarget(null);
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <h1 className="font-heading text-3xl font-bold text-[#0D2340]">
            Mes propriétés
          </h1>
          <span className="font-body text-xs bg-[#C9A84C]/20 text-[#0D2340] px-3 py-1 rounded-full">
            {properties.length}
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditProperty(null);
            setModalOpen(true);
          }}
          className="font-body text-sm font-medium bg-[#C9A84C] text-[#0D2340] rounded-full px-6 py-3 hover:bg-[#E8C97A] transition"
        >
          Ajouter une propriété
        </button>
      </div>

      {loading ? (
        <p className="font-body text-sm text-[#9E9E9E]">Chargement…</p>
      ) : (
        <>
          <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full font-body text-sm">
              <thead className="bg-[#F8F8F8] text-[#9E9E9E] text-xs uppercase">
                <tr>
                  <th className="px-6 py-3 text-left">Img</th>
                  <th className="px-6 py-3 text-left">Titre</th>
                  <th className="px-6 py-3 text-left">Ville</th>
                  <th className="px-6 py-3 text-left">Type</th>
                  <th className="px-6 py-3 text-left">Prix</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((p) => (
                  <tr key={p.id} className="border-t border-gray-100">
                    <td className="px-6 py-4">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                        {p.image && (
                          <Image src={p.image} alt="" fill className="object-cover" sizes="48px" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium max-w-[200px] truncate">
                      {p.titleFr}
                    </td>
                    <td className="px-6 py-4">{p.city}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full text-white ${
                          p.type === "vente" ? "bg-[#0D2340]" : "bg-green-600"
                        }`}
                      >
                        {p.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#C9A84C] font-medium">{p.price}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button type="button" onClick={() => toggleFeatured(p)}>
                          {p.featured ? "⭐" : "☆"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditProperty(p);
                            setModalOpen(true);
                          }}
                        >
                          ✏️
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(p)}
                          className="text-red-500"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-4">
            {properties.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4"
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                  {p.image && (
                    <Image src={p.image} alt="" fill className="object-cover" sizes="64px" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{p.titleFr}</p>
                  <p className="text-xs text-[#9E9E9E]">
                    {p.city} · {p.price}
                  </p>
                  <div className="flex gap-3 mt-2">
                    <button type="button" onClick={() => toggleFeatured(p)}>
                      {p.featured ? "⭐" : "☆"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditProperty(p);
                        setModalOpen(true);
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(p)}
                      className="text-red-500"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <PropertyModal
        open={modalOpen}
        mode={editProperty ? "edit" : "add"}
        initial={editProperty}
        onClose={() => {
          setModalOpen(false);
          setEditProperty(null);
        }}
        onSaved={(property) => {
          if (editProperty) {
            setProperties((prev) =>
              prev.map((p) => (p.id === property.id ? property : p))
            );
          } else {
            setProperties((prev) => [property, ...prev]);
          }
        }}
      />

      <DeleteDialog
        property={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
