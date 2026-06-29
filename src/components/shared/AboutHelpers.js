function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="10" cy="10" r="10" fill="#C9A84C" fillOpacity="0.15" />
      <path
        d="M6 10l2.5 2.5L14 7"
        stroke="#C9A84C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TitleWithGold({ title, titleGold, className = "", variant = "dark" }) {
  const baseColor = variant === "light" ? "text-white" : "text-[#0D2340]";
  const lines = title.split("\n");
  return (
    <h2 className={className}>
      {lines.map((line, li) => {
        if (!line.includes(titleGold)) {
          return (
            <span key={li} className={`block ${baseColor}`}>
              {line}
            </span>
          );
        }
        const parts = line.split(titleGold);
        return (
          <span key={li} className={`block ${baseColor}`}>
            {parts.map((part, pi) => (
              <span key={pi}>
                {part}
                {pi < parts.length - 1 && (
                  <span className="text-[#C9A84C]">{titleGold}</span>
                )}
              </span>
            ))}
          </span>
        );
      })}
    </h2>
  );
}

export { CheckIcon, TitleWithGold };
