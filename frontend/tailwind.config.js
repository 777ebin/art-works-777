/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#FDFBF7',
          100: '#F8F2E6',
          200: '#F2E8D5',
          300: '#E5D6BD',
          400: '#D5C29F',
          500: '#BEA87D',
        },
        ivory: {
          light: '#FFFDF9',
          DEFAULT: '#FAF5EB',
          dark: '#F3EADC',
        },
        terracotta: {
          50: '#FCF3F0',
          100: '#F9E5DF',
          200: '#F3C5BA',
          500: '#C84B31',
          600: '#B03B23',
          700: '#942E19',
          800: '#752414',
          900: '#5A1A0D',
        },
        turmeric: {
          50: '#FEF9ED',
          100: '#FDF2D4',
          200: '#FBE3A8',
          500: '#D48806',
          600: '#B87203',
          700: '#945A00',
        },
        earth: {
          900: '#1F110A',
          800: '#2A1810',
          700: '#3D2419',
          600: '#533425',
          500: '#6C4533',
        },
        brass: {
          light: '#E6C687',
          DEFAULT: '#C99E52',
          dark: '#A67B2E',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        display: ['"Cinzel"', '"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        heritage: '0 10px 30px -5px rgba(42, 24, 16, 0.08), 0 4px 6px -2px rgba(42, 24, 16, 0.04)',
        'heritage-lg': '0 20px 40px -10px rgba(42, 24, 16, 0.15), 0 8px 12px -4px rgba(42, 24, 16, 0.08)',
        glow: '0 0 25px rgba(212, 136, 6, 0.25)',
      },
    },
  },
  plugins: [],
};

