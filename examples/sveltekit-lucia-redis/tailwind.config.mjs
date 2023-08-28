import formsPlugin from '@tailwindcss/forms';

const upstash = {
  '50': '#e7fff7',
  '100': '#c6ffe9',
  '200': '#92ffd9',
  '300': '#4dffc9',
  '400': '#00e9a3',
  '500': '#00e8a0',
  '600': '#00be84',
  '700': '#00986f',
  '800': '#007859',
  '900': '#00624a',
  '950': '#00382c',
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      colors: {
        upstash: {
          DEFAULT: upstash['400'],
          ...upstash
        }
      },
    }
  },
  plugins: [
    formsPlugin,
  ]
};
