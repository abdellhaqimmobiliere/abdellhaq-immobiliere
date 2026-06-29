"use client";

import Link from "next/link";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  disabled,
  loading,
  className = "",
  type = "button",
  ...props
}) {
  const base = `
    inline-flex items-center justify-center gap-2 font-medium rounded-full
    transition-all duration-200 active:scale-[0.97] select-none
    disabled:opacity-50 disabled:pointer-events-none
    focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2
  `;
  const variants = {
    primary:
      "bg-[#C9A84C] text-[#0D2340] hover:bg-[#E2C06A] shadow-md shadow-[#C9A84C]/20",
    navy: "bg-[#0D2340] text-white hover:bg-[#132d50] shadow-md",
    outline:
      "border border-[#0D2340] text-[#0D2340] hover:bg-[#0D2340] hover:text-white",
    ghost: "text-[#0D2340] hover:bg-[#F7F4EE]",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-md",
    success: "bg-[#25D366] text-white hover:bg-[#1ebe57] shadow-md",
  };
  const sizes = {
    sm: "text-xs px-4 py-2 min-h-[36px]",
    md: "text-sm px-6 py-3 min-h-[44px]",
    lg: "text-base px-8 py-3.5 min-h-[52px]",
  };
  const cls = `${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  const content = loading ? (
    <>
      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      {children}
    </>
  ) : (
    children
  );

  if (href) {
    const isInternal = href.startsWith("/") && !href.startsWith("//");
    if (isInternal) {
      return (
        <Link href={href} className={cls} {...props}>
          {content}
        </Link>
      );
    }
    return (
      <a href={href} className={cls} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cls}
      {...props}
    >
      {content}
    </button>
  );
}
