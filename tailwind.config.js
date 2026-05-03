/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F5F0E8',
        secondary: '#E8E0D0',
        ink: '#1A1410',
        taupe: '#8B7355',
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
        quote: ['var(--font-quote)', 'Georgia', 'serif'],
      },
      borderColor: {
        DEFAULT: '#1A1410',
      },
    },
  },
  plugins: [],
};
