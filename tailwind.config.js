/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#f7f5f0",
        ink: "#171717",
        muted: "#68665f",
        purple: {
          DEFAULT: "#7c5cff",
          dark: "#6545eb",
        },
        pink: {
          DEFAULT: "#ffb6c9",
          hover: "#ffa1b9",
        },
        lime: {
          DEFAULT: "#d8fb73",
          hover: "#c8ee5c",
        },
        line: "#dedbd3",
        card: "#fffefa",
        orange: "#ff5b35",
      },
      boxShadow: {
        brutal: "4px 4px 0px #171717",
        "brutal-sm": "2px 2px 0px #171717",
        "brutal-lg": "6px 6px 0px #171717",
        "brutal-xl": "8px 8px 0px #171717",
      },
      borderRadius: {
        brutal: "14px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
