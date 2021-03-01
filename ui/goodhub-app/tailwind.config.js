const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    './src/**/*.tsx',
    './public/index.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        violet: {
          50: '#F8F7FB',
          100: '#E7DAF3',
          200: '#C1A5DD',
          300: '#9F7EC1',
          400: '#8D62BA',
          500: '#774AA4',
          600: '#512E73',
          700: '#433056',
          800: '#493E54',
          900: '#372E40'
        }
      }
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/ui'),
    require('@tailwindcss/forms')
  ]
}
