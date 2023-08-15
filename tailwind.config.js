/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundColor: {
        'white-cell': '#779952',
        'black-cell': '#EDEED1'
      }
    }
  },
  plugins: []
}
