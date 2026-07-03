/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        tph: {
          dark: '#0a0a0f',
          card: '#12121a',
          cyan: '#00d2ff',
          pink: '#ff007f',
          orange: '#ff9900',
          purple: '#8a2be2',
        },
      },
      backgroundImage: {
        'tph-gradient':
          'linear-gradient(120deg, #00d2ff 0%, #ff007f 34%, #ff9900 67%, #8a2be2 100%)',
        'hero-glow':
          'radial-gradient(circle at 50% 35%, rgba(138, 43, 226, 0.32), rgba(0, 210, 255, 0.16) 34%, rgba(10, 10, 15, 0) 68%)',
      },
      boxShadow: {
        'cyan-glow': '0 0 34px rgba(0, 210, 255, 0.34)',
        'pink-glow': '0 0 34px rgba(255, 0, 127, 0.34)',
        'orange-glow': '0 0 34px rgba(255, 153, 0, 0.32)',
        'purple-glow': '0 0 34px rgba(138, 43, 226, 0.36)',
      },
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
