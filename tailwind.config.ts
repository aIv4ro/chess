import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: 'rgb(44 51 51)',
        secondary: 'rgb(40 40 40)',
        'white-cell': '#779952',
        'black-cell': '#EDEED1'
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      }
    }
  },
  plugins: []
}

export default config
