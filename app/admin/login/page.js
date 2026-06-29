"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogoIcon, ArchWatermark } from "@/components/admin/AdminIcons";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (locked) return;
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setError("Mot de passe incorrect");
      setPassword("");
      if (newAttempts >= 5) {
        setLocked(true);
        setError("Trop de tentatives. Réessayez dans 30 secondes.");
        setTimeout(() => {
          setLocked(false);
          setAttempts(0);
          setError("");
        }, 30000);
      }
    }
    setLoading(false);
  }

  return (
    <div className="relative min-h-screen bg-[#0D2340] flex items-center justify-center px-4">
      <ArchWatermark />
      <div className="relative bg-white rounded-2xl shadow-2xl p-10 max-w-sm w-full">
        <div className="flex flex-col items-center mb-6">
          <LogoIcon />
          <h1 className="font-heading text-2xl font-bold text-[#0D2340] mt-4">
            Administration
          </h1>
          <p className="font-body text-xs text-[#9E9E9E] mt-1">
            Mouad Immobilière
          </p>
        </div>
        <div className="w-12 h-px bg-[#C9A84C] mx-auto mb-6" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-body text-[13px] font-medium text-[#374151] block mb-1.5">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={locked || loading}
                className="border border-gray-200 rounded-xl px-4 py-3 pr-12 text-sm focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] outline-none transition w-full font-body"
              />
              <button
                type="button"
                onClick={() => setShowPass((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9E9E9E] text-sm"
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {error && (
            <p className="font-body text-sm text-red-600 bg-red-50 rounded-full px-4 py-2 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={locked || loading}
            className="w-full font-body text-sm font-medium bg-[#0D2340] text-[#C9A84C] rounded-full py-3 hover:bg-[#1a3a5c] transition duration-200 disabled:opacity-50"
          >
            {loading ? "Connexion…" : "Accéder au panneau"}
          </button>
        </form>
      </div>
    </div>
  );
}
