import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
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
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors:{
        primary: "#2962FF",
        secondary: "#63B3FF",
        background: "#04041E",
        bordercolor:"rgba(100, 109, 128, 1)",
        text: "#FFFFFF",
        textgray:"rgba(100, 109, 128, 1)",
        bluebackground:"rgba(0, 7, 34, 1)",
        darkblue:"rgba(1, 6, 25, 1)",
        lightblue:"rgba(56, 97, 251, 1)",
        teal: "#20B486",
        gray: {
          light: "#F8F9FC",
          DEFAULT: "#F3F4F6",
          dark: "#E5E7EB",
        },
        gradient: {
          primary: "linear-gradient(to right, #2962FF, #63B3FF)",
        },
        gradient2: {
          primary: "linear-gradient(to right, #00C9FF, #00BFFF)",
        },
        gradient3: {
          primary: "linear-gradient(to right, #4875F7, #2962FF)",
        },
      }
      
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config