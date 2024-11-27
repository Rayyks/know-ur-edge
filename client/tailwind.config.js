/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        transform: "transform",
      },
      fontFamily: {
        fira: ['"Fira Code"', "monospace"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "fade-in": "fadeIn 1s ease-in-out",
      },
    },
  },
  variants: {
    extend: {
      translate: ["responsive", "hover", "focus", "active", "group-hover"],
    },
  },
  plugins: [],
};
