/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accentRed: '#F49097',
        foreground: '#DFB2F4',
        accentYellow: '#F5E960',
        background: '#F2F5FF',
        accentTeal: '#55D6C2',
      },
      fontFamily: {
        aclonica: ['Aclonica', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
