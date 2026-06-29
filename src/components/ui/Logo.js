import LogoIcon from "./LogoIcon";

export default function Logo({ size = "md", className = "" }) {
  const sizes = {
    sm: { icon: 36, name: "text-sm", sub: "text-[9px]" },
    md: { icon: 48, name: "text-base", sub: "text-[10px]" },
    lg: { icon: 64, name: "text-xl", sub: "text-[12px]" },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <LogoIcon size={s.icon} />
      <div className="flex flex-col leading-none">
        <span
          className={`${s.name} font-bold tracking-[0.15em] uppercase text-[#C9A84C]`}
          style={{ fontFamily: "var(--font-heading)" }}
        >
          MOUAD
        </span>
        <span
          className={`${s.sub} tracking-[0.25em] uppercase text-[#C9A84C99]`}
          style={{ fontFamily: "var(--font-heading)" }}
        >
          IMMOBILIÈRE
        </span>
      </div>
    </div>
  );
}
