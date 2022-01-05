const init = 0.5

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontWeight: {
      '100': 100,
      '200': 200,
      '300': 300,
      '400': 400,
      '500': 500,
      '600': 600,
      '700': 700,
      '800': 800,
      '900': 900,
    },
    container: {
      center: true,
    },
    borderRadius: {
      'none': '0',
      'sm': `${init / 4}rem`,
      DEFAULT: `${init / 2}rem`,
      'lg': `${init}rem`,
      'full': '99999px',
    },
    extend: {
      fontSize: {
        'h1': `${init * 3.75}rem`,
        'h2': `${init * 3.45}rem`,
        'h3': `${init * 3.05}rem`,
        'h4': `${init * 2.7}rem`,
        'h5': `${init * 2.35}rem`,
        'h6': `${init * 2}rem`,
        'sm': `${init * 1.75}rem`,
        'xs': `${init * 1.5}rem`,
      },
      colors: {
        theme: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      }
    },
  },
  plugins: [],
}
