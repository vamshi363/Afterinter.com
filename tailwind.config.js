/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#020617',
        },
        primary: {
          teal: '#00BFA6',
        },
        secondary: {
          purple: '#9C27B0',
        }
      },
    },
  },
  plugins: [],
}