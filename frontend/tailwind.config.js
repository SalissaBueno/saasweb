// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Varre todos os arquivos JS, JSX, TS, TSX na pasta src
  ],
  theme: {
    extend: {
        colors: {
            graphite: '#1A1A1A', // Cor grafite bem escura
        },
    },
  },
  plugins: [],
}