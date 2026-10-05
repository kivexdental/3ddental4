/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dental: {
          navy: '#0A192F',
          dark: '#0F172A',
          blue: '#0066FF',
          blueHover: '#0052CC',
          sky: '#38BDF8',
          lightSky: '#F0F7FF',
          bg: '#F8FAFC',
          card: 'rgba(255, 255, 255, 0.75)',
          border: 'rgba(255, 255, 255, 0.85)',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 20px 40px -15px rgba(0, 0, 0, 0.07), 0 0 20px 0 rgba(0, 102, 255, 0.05)',
        'glass-hover': '0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 0 25px 0 rgba(0, 102, 255, 0.1)',
        'card': '0 10px 30px -10px rgba(10, 25, 47, 0.08)',
        'blue-glow': '0 10px 25px -5px rgba(0, 102, 255, 0.4)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
