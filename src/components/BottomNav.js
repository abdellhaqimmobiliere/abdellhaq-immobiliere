"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Building2, User, Phone } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { t } from "@/translations";

export default function BottomNav() {
  const pathname = usePathname();
  const { lang } = useLang();
  const tr = t[lang];

  if (pathname.startsWith("/admin")) return null;

  const links = [
    { href: "/", Icon: Home, label: tr.nav.home },
    { href: "/properties", Icon: Building2, label: tr.nav.properties },
    { href: "/about", Icon: User, label: tr.nav.about },
    { href: "/contact", Icon: Phone, label: tr.nav.contact },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-100 flex items-center pb-[env(safe-area-inset-bottom)]"
      style={{ height: "calc(60px + env(safe-area-inset-bottom))" }}
      aria-label="Navigation principale mobile"
    >
      {links.map(({ href, Icon, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className="relative flex-1 flex flex-col items-center justify-center gap-1 min-h-[60px] py-2 transition-colors duration-150 active:bg-gray-50"
            aria-label={label}
            aria-current={active ? "page" : undefined}
          >
            <Icon
              size={21}
              className={`transition-colors duration-200 ${
                active ? "text-[#C9A84C]" : "text-gray-400"
              }`}
              strokeWidth={active ? 2.5 : 1.8}
            />
            <span
              className={`text-[10px] font-medium transition-colors duration-200 ${
                active ? "text-[#C9A84C]" : "text-gray-400"
              }`}
            >
              {label}
            </span>
            {active && (
              <span className="absolute bottom-[env(safe-area-inset-bottom)] w-1 h-1 rounded-full bg-[#C9A84C]" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
