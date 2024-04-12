/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx}", "./screens/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        g: {
          100: "#ecfdf5",
          200: "#d1fae5",
          300: "#a7f3d0",
          400: "#6ee7b7",
          500: "#34d399",
          600: "#10b981",
          700: "#059669",
          800: "#047857",
          900: "#065f46",
          1000: "#064e3b",
          1100: "#022c22",
        },
        w: {
          100: "#ffffff",
          200: "#f2f2f7",
          300: "#e5e5ea",
          400: "#d1d1d6",
          500: "#c7c7cc",
          600: "#aeaeb2",
          700: "#8e8e93",
        },
      },
    },
  },
  plugins: [],
};
