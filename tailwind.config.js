/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'imperial-purple': '#4B0082',
        'trust-blue': '#0077B6',
        'porcelain': '#FAFAFA',
        'charcoal': '#1A1A1A',
        'mist-gray': '#D9D9D9',
        primary: '#4B0082',
        'primary-hover': '#3d0066',
        secondary: '#6b7280',
        'secondary-hover': '#4b5563',
      },
      spacing: {
        'section': '2rem',
        'container': '1rem',
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'container': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      fontFamily: {
        sans: [
          'Inter Variable',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
        ],
      },
      fontSize: {
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}