/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1f2937",
        coal: "#07080b",
        punch: "#ff3b3f",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        hard: "0 22px 60px rgba(10, 12, 18, 0.18)",
        "hard-dark": "0 22px 70px rgba(0, 0, 0, 0.52)",
      },
    },
  },
  plugins: [],
};
