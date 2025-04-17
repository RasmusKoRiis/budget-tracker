// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html','./src/**/*.{ts,tsx,js,jsx}'],
    theme: {
      extend: {
        colors: {
          primary: '#3F51B5', secondary: '#FFC107', accent: '#FF4081',
        },
        fontFamily: { sans: ['Montserrat','sans-serif'] },
        borderRadius: { '2xl':'1rem' }
      }
    },plugins:[],
  };