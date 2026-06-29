function LogoIcon({ className = "" }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 28V12C6 12 6 8 16 4C26 8 26 12 26 12V28"
        stroke="#C9A84C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 28H26"
        stroke="#C9A84C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArchWatermark() {
  return (
    <svg
      className="absolute inset-0 m-auto w-96 h-96 opacity-5 pointer-events-none"
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 180V70C20 70 20 40 100 15C180 40 180 70 180 70V180"
        stroke="white"
        strokeWidth="3"
      />
      <path d="M20 180H180" stroke="white" strokeWidth="3" />
    </svg>
  );
}

export { LogoIcon, ArchWatermark };
