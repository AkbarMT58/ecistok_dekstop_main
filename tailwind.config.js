module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        orange: {
          50: "#ff10610e",
          100: "#fff8f0",
          200: "#ffddb3",
          300: "#ffc37a",
          400: "#ffa83d",
          500: "#ff8c00",
          600: "#cc7000",
          700: "#995400",
          800: "#663800",
          900: "#331c00",
        },
        marron: {
          50: "#10010e112",
          100: "#fef4f0",
          200: "#fbbfac",
          300: "#f88d6d",
          400: "#f55829",
          500: "#d1380a",
          600: "#aa2e08",
          700: "#7f2206",
          800: "#581804",
          900: "#310d02",
        },
      },
      // backgroundImage: {
      //   BgMedsos:
      //     "url('https://cdn.shopify.com/s/files/1/0268/7480/6307/files/BG2.jpg?v=1612779833')",
      // },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/line-clamp"),
  ],
};
