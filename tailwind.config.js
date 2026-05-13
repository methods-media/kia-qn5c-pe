/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // حطينا كيا الأول وبعده العربي، علشان الإنجليزي ياخد كيا والعربي يقع على GE
        sans: ['KiaSignature', 'GESSTwo', 'sans-serif'],
      }
    },
  },
  plugins: [],
}