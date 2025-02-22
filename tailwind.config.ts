import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0369a1', // cyan-700
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0369a1', // основной цвет компании
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        secondary: {
          DEFAULT: '#334155', // slate-700
        },
        accent: {
          DEFAULT: '#0369a1', // тот же cyan-700 для акцентов
          hover: '#075985', // cyan-800 для ховера
        },
        background: {
          DEFAULT: '#ffffff',
          alt: '#f8fafc', // slate-50
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        heading: ['var(--font-montserrat)'],
      },
    },
  },
  plugins: [],
};

export default config;
