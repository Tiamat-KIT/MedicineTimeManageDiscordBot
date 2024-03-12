import { Config } from "tailwindcss"
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const tailwindConfig: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  plugins: [addVariableForColors],
}

function addVariableForColors({addBase,theme}:any){
  let allColors = flattenColorPalette(theme('colors'))
  let newVars = Object.fromEntries(Object.entries(allColors).map(([key,val]) => [`--${key}`,val]))
  addBase({
    ':root': newVars
  })
}
export default tailwindConfig