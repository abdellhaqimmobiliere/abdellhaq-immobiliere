"use client";

import { useRef, useState, useEffect } from "react";
import { useLang } from "@/context/LangContext";
import { useSettings } from "@/context/SettingsContext";
import { t } from "@/translations";
import { SkeletonStatBar } from "@/components/ui/Skeleton";

function useCountUp(target, started, duration = 1500) {
  const [count, setCount] = useState(target);

  useEffect(() => {
    if (!started) return;

    const suffix = target.includes("+") ? "+" : "";
    const num = parseInt(target.replace(/[^\d]/g, ""), 10) || 0;
    if (num === 0) {
      setCount(target);
      return;
    }

    let start = 0;
    const step = Math.max(1, Math.ceil(num / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= num) {
        setCount(`${num}${suffix}`);
        clearInterval(timer);
      } else {
        setCount(`${start}${suffix}`);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, started, duration]);

  return count;
}

function StatItem({ value, label, index, isRtl }) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const count = useCountUp(value, started);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center gap-1 anim-fade-up ${
        isRtl ? "font-arabic" : ""
      }`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <span className="text-3xl lg:text-4xl font-bold text-[#0D2340] font-heading">
        {count}
      </span>
      <span className="text-[11px] tracking-wider text-gray-400 uppercase text-center">
        {label}
      </span>
    </div>
  );
}

export default function StatsBar() {
  const { lang } = useLang();
  const { site, settings, loading } = useSettings();
  const tr = t[lang].stats;
  const isRtl = lang === "ar";

  if (loading) return <SkeletonStatBar />;

  const values = [
    settings.stats_sold || site.statsSold || tr[0].value,
    settings.stats_clients || site.statsClients || tr[1].value,
    settings.stats_years || site.statsYears || tr[2].value,
  ];

  const stats = tr.map((stat, i) => ({
    value: values[i],
    label: stat.label,
  }));

  return (
    <div className="w-full bg-[#F7F4EE] border-y border-[#C9A84C22] py-8 px-6">
      <div className="max-w-3xl mx-auto flex items-center justify-around gap-4">
        {stats.map((s, i) => (
          <StatItem
            key={i}
            value={s.value}
            label={s.label}
            index={i}
            isRtl={isRtl}
          />
        ))}
      </div>
    </div>
  );
}
