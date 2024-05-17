/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#181818",
        secondary:"#262626",
        c_blue:"#22c55e",
        c_grey:"#B3B3B3",
      }
    },
  },
  plugins: [],
}