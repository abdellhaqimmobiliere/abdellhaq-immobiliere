export default function SectionHeader({
  label,
  title,
  subtitle,
  light = false,
  center = true,
  className = "",
}) {
  return (
    <div className={`mb-10 lg:mb-14 ${center ? "text-center" : ""} ${className}`}>
      {label && (
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#C9A84C] mb-3">
          {label}
        </p>
      )}
      {title && (
        <h2
          className={`text-2xl lg:text-4xl font-bold leading-tight mb-3 ${
            light ? "text-white" : "text-[#0D2340]"
          }`}
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p
          className={`text-sm lg:text-base leading-relaxed max-w-xl ${
            center ? "mx-auto" : ""
          } ${light ? "text-white/60" : "text-gray-500"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
