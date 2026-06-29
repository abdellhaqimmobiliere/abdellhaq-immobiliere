/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "Cinzel", "serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
        arabic: ["var(--font-arabic)", "Noto Naskh Arabic", "serif"],
      },
      colors: {
        navy: {
          DEFAULT: "#0D2340",
          deep: "#071628",
          mid: "#132d50",
        },
        gold: {
          DEFAULT: "#C9A84C",
          light: "#E2C06A",
          dim: "#C9A84C33",
        },
        ivory: "#F7F4EE",
      },
      boxShadow: {
        gold: "0 0 24px rgba(201,168,76,0.25)",
      },
    },
  },
  plugins: [],
};
