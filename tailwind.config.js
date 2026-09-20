/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "app-bg": "hsl(0, 0%, 99%)",
        "app-text": "hsl(200, 15%, 8%)",
        "app-input": "hsl(0, 0%, 52%)",
        "app-element": "hsl(0, 100%, 100%)",
        "app-dark-bg": "hsl(207, 26%, 17%)",
        "app-dark-element": "hsl(209, 23%, 22%)",
      },
      fontFamily: {
        nunito: ['"Nunito Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
