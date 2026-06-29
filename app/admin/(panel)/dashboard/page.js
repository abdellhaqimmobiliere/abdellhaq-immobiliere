"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/components/admin/Toast";

function StatCard({ label, value, icon, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl" aria-hidden="true">
          {icon}
        </span>
        <span className={`w-2 h-2 rounded-full ${color}`} />
      </div>
      <p className="font-heading text-3xl font-bold text-[#0D2340]">{value}</p>
      <p className="font-body text-sm text-[#9E9E9E] mt-1">{label}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const { showToast } = useToast();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/properties")
      .then((r) => r.json())
      .then((data) => {
        if (data.properties) setProperties(data.properties);
        else showToast("Erreur de chargement", "error");
      })
      .catch(() => showToast("Erreur de chargement", "error"))
      .finally(() => setLoading(false));
  }, [showToast]);

  const stats = {
    total: properties.length,
    vente: properties.filter((p) => p.type === "vente").length,
    location: properties.filter((p) => p.type === "location").length,
    featured: properties.filter((p) => p.featured).length,
  };

  const recent = properties.slice(0, 5);

  async function toggleFeatured(property) {
    const res = await fetch(`/api/admin/properties/${property.id}`, {
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
    } else {
      showToast("Erreur", "error");
    }
  }

  async function deleteProperty(property) {
    if (!confirm(`Supprimer « ${property.titleFr} » ?`)) return;
    const res = await fetch(`/api/admin/properties/${property.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setProperties((prev) => prev.filter((p) => p.id !== property.id));
      showToast("Propriété supprimée", "success");
    } else {
      showToast("Erreur de suppression", "error");
    }
  }

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold text-[#0D2340] mb-8">
        Tableau de bord
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total propriétés" value={stats.total} icon="🏠" color="bg-[#0D2340]" />
        <StatCard label="En vente" value={stats.vente} icon="💰" color="bg-[#C9A84C]" />
        <StatCard label="En location" value={stats.location} icon="🔑" color="bg-green-500" />
        <StatCard label="En vedette" value={stats.featured} icon="⭐" color="bg-purple-500" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <Link
          href="/admin/properties"
          className="flex-1 text-center font-body text-sm font-medium bg-[#C9A84C] text-[#0D2340] rounded-xl py-4 hover:bg-[#E8C97A] transition"
        >
          Ajouter une propriété
        </Link>
        <Link
          href="/admin/settings"
          className="flex-1 text-center font-body text-sm font-medium border-2 border-[#0D2340] text-[#0D2340] rounded-xl py-4 hover:bg-[#0D2340] hover:text-white transition"
        >
          Modifier les paramètres
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-heading text-xl font-bold text-[#0D2340]">
            Propriétés récentes
          </h2>
          <Link
            href="/admin/properties"
            className="font-body text-sm text-[#C9A84C] hover:underline"
          >
            Voir toutes →
          </Link>
        </div>

        {loading ? (
          <p className="p-6 font-body text-sm text-[#9E9E9E]">Chargement…</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body text-sm">
              <thead className="bg-[#F8F8F8] text-[#9E9E9E] text-xs uppercase">
                <tr>
                  <th className="px-6 py-3">Image</th>
                  <th className="px-6 py-3">Titre</th>
                  <th className="px-6 py-3">Ville</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Prix</th>
                  <th className="px-6 py-3">Vedette</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((p) => (
                  <tr key={p.id} className="border-t border-gray-100">
                    <td className="px-6 py-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                        {p.image && (
                          <Image src={p.image} alt="" fill className="object-cover" sizes="40px" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-3 font-medium text-[#0D2340] max-w-[180px] truncate">
                      {p.titleFr}
                    </td>
                    <td className="px-6 py-3">{p.city}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full text-white ${
                          p.type === "vente" ? "bg-[#0D2340]" : "bg-green-600"
                        }`}
                      >
                        {p.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-[#C9A84C] font-medium">{p.price}</td>
                    <td className="px-6 py-3">
                      <button
                        type="button"
                        onClick={() => toggleFeatured(p)}
                        className="text-lg"
                        aria-label="Toggle featured"
                      >
                        {p.featured ? "⭐" : "☆"}
                      </button>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex gap-2">
                        <Link href="/admin/properties" className="text-[#0D2340] hover:text-[#C9A84C]">
                          ✏️
                        </Link>
                        <button
                          type="button"
                          onClick={() => deleteProperty(p)}
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
        )}
      </div>
    </div>
  );
}
