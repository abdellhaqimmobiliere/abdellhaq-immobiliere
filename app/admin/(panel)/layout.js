"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogoIcon } from "@/components/admin/AdminIcons";
import { ToastProvider } from "@/components/admin/Toast";

const NAV = [
  { href: "/admin/dashboard", label: "Tableau de bord", icon: "🏠" },
  { href: "/admin/properties", label: "Propriétés", icon: "🏢" },
  { href: "/admin/settings", label: "Paramètres", icon: "⚙️" },
];

function Sidebar({ open, onClose }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const content = (
    <aside className="w-[260px] bg-[#0D2340] text-white h-full flex flex-col">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <LogoIcon />
          <div>
            <p className="font-heading text-sm font-bold text-[#C9A84C]">
              Admin Panel
            </p>
            <p className="font-body text-[10px] text-white/50">Mouad Immo</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-body text-sm transition duration-200 border-l-2 ${
                active
                  ? "border-[#C9A84C] text-[#C9A84C] bg-white/5"
                  : "border-transparent text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg font-body text-sm text-white/70 hover:text-white hover:bg-white/5 transition"
        >
          <span aria-hidden="true">🚪</span>
          Se déconnecter
        </button>
        <p className="font-body text-[10px] text-gray-500 mt-4 px-4">
          Mouad Immo v1.0
        </p>
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden md:block fixed left-0 top-0 bottom-0 z-40">
        {content}
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <div className="absolute left-0 top-0 bottom-0">{content}</div>
        </div>
      )}
    </>
  );
}

export default function AdminPanelLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#F8F8F8]">
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

        <div className="md:ml-[260px]">
          <header className="md:hidden bg-[#0D2340] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-30">
            <button type="button" onClick={() => setMenuOpen(true)} aria-label="Menu">
              ☰
            </button>
            <span className="font-heading text-sm text-[#C9A84C]">Admin</span>
            <span className="w-6" />
          </header>
          <main className="p-4 md:p-8">{children}</main>
        </div>
      </div>
    </ToastProvider>
  );
}
