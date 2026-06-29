export function SkeletonText({ width = "100%", height = "14px", className = "" }) {
  return (
    <div
      className={`skeleton rounded ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard() {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
      aria-label="Chargement en cours..."
    >
      <div className="skeleton w-full" style={{ height: 220 }} />
      <div className="p-5 space-y-3">
        <SkeletonText width="40%" height="12px" />
        <SkeletonText width="80%" height="18px" />
        <SkeletonText width="60%" height="12px" />
        <div className="flex gap-3 pt-1">
          <SkeletonText width="30%" height="12px" />
          <SkeletonText width="30%" height="12px" />
          <SkeletonText width="25%" height="12px" />
        </div>
        <div className="pt-2">
          <SkeletonText width="45%" height="22px" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonStatBar() {
  return (
    <div
      className="w-full bg-[#F7F4EE] border-y border-[#C9A84C22] py-6 px-4 flex justify-center gap-8"
      aria-hidden="true"
    >
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <div className="skeleton w-16 h-8 rounded" />
          <div className="skeleton w-20 h-3 rounded" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonSettingRow() {
  return (
    <div className="flex items-center gap-3 py-4 border-b border-gray-100">
      <div className="skeleton w-8 h-8 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <SkeletonText width="30%" height="12px" />
        <SkeletonText width="60%" height="14px" />
      </div>
    </div>
  );
}
