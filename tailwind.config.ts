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
      fontSize : {
        "xxs" : "8px",
        "xs": "0.75rem",
        "sm": "0.875rem",
        "base": "1rem",
        "lg": "16px",
        "xl": "14px",
        "2xl": "12px",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
        "7xl": "5rem",
        "8xl": "6rem",
        "9xl": "7rem",
        "10xl": "8rem",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      textShadow: {
        glow: '0 0 5px #fff, 0 0 10px #ff7b00, 0 0 20px #ff7b00, 0 0 40px #ff7b00',
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
      ,
      fontFamily: {
        normal: ["Nunito-Regular", "sans"],
        base: ["Nunito-Regular", "sans"],
        thin: ["Nunito-Light", "sans"], 
        plain: ["Nunito-Medium", "sans-serif"],
        bold: ["Nunito-Bold", "sans-serif"],
        black: ["Nunito-Black", "sans-serif"],
        semibold: ["Nunito-SemiBold", "sans-serif"],
      },
      
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config