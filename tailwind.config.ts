import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'gris-foncé': '#424242',
      'gris-clair': '#F2F5F7',
      'gris-contour': '#C3CFD9',
      'texte-clair': '#5E6D7A',
      'vert': '#56C1A8',
      'vert-1/2': '#1AAE9F',
      'orange': '#F47559',
      'bleu-clair': '#9EC3F9',
      'bleu-foncé': '#4970B6',
      'peche': '#F48F82',
      'jaune': '#F7CD82',
      'beige': '#F9E0B2',
      'marron': '#B75743',
      'white': '#FFFFFF',
      'black': '#000000',
      'red': '#D71313'
    },
    fontWeight: {
      'medium': '500',
      'bold': '700',

    },
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
    
    extend: {},
  },
  plugins: [],
}
export default config
