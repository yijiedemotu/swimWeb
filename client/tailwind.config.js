/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#122E8A',
        'navy-dark': '#0D2266',
        'navy-light': '#1A3CAC',
        'cream': '#F5EFEA',
        'cream-dark': '#E8DFD7',
      },
      fontFamily: {
        'sans': ['"Noto Sans SC"', '"Source Han Sans SC"', '"Microsoft YaHei"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
