/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "white": "#808080",
      },
      colors: {
        velze: '#daeaf6',
        navA: '#5b76a4',
        lb1: '#5d4fb0',
        lb2: '#7d708f',
        lb3: '#5936c9',
        lb4: '#5b76a4',
        compA: '#c4d99c',
      }
    },
    animation: {
      blob: "blob 7s infinite"
    },
    keyframes: {
      blob: {
        "0%": {
          transform: "translate(0px, 0px) scale(1)",
        },
        "33%": {
          transform: "translate(30px, -50px) scale(1.1)",
        },
        "66%": {
          transform: "translate(-20px, 20px) scale(0.9)",
        },
        "100%": {
          transform: "tranlate(0px, 0px) scale(1)",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
