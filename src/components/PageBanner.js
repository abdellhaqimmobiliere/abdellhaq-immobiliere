function ArchWatermark({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 180V70C20 70 20 40 100 15C180 40 180 70 180 70V180"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 180H180"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function PageBanner({ title, subtitle }) {
  return (
    <section className="relative bg-[#0D2340] min-h-[40vh] flex items-center justify-center px-6 pt-[60px] md:pt-[72px] overflow-hidden">
      <ArchWatermark className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 opacity-10" />
      <div className="relative text-center max-w-2xl py-16">
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-[#C9A84C] mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="font-body text-base text-white/70 max-w-lg mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

export { ArchWatermark };
