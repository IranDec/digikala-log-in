import { fontFamily } from "tailwindcss/defaultTheme";
import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#e83a52",
        secondary: {
          700: "#497573",
        },
        neutral: {
          0: "#fbfbfb",
          100: "#f0f0f1",
          200: "#e0e0e6",
          700: "#5a5c61",
          900: "#232933",
        },
      },
      borderRadius: {
        medium: "8px",
      },
      fontFamily: {
        sans: ["IranYekan", ...fontFamily.sans],
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
