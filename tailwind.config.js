/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "540px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        myColor: {
          50: "#eff4f6",
          100: "#dfe8ed",
          200: "#bfd1da",
          300: "#9fbac8",
          400: "#7fa3b5",
          500: "#5f8ca3",
          600: "#4c7082",
          700: "#395462",
          800: "#263841",
          900: "#131c21"
        }
      }
    }
  },
  plugins: [],
}