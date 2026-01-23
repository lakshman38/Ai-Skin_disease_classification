module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neon: {
          blue: '#48b5ff',
          purple: '#8a6bff'
        }
      },
      boxShadow: {
        'neon-sm': '0 8px 30px rgba(72,181,255,0.12), 0 0 40px rgba(138,107,255,0.06)'
      }
    }
  },
  plugins: [],
}
