/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": {
            transform: "scale(0) translate(-50%, -50%) rotate(0deg)",
          },
          "100%": {
            transform: "scale(1) translate(-50%, -50%) rotate(360deg)",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn .5s ease-in-out",
      },
    },
  },
  plugins: [],
};
