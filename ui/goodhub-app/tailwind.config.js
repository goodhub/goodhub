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
      maxHeight: {
        'modal': 'calc(100vh - 7.5rem)'
      },
      minHeight: {
        '64': '16rem'
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        'pulse-fast': 'pulse 0.4s linear',
        'fadein': 'fadein 0.5s linear',
      },
      keyframes: {
        fadein: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      colors: {
        'primary': 'var(--color-primary)',
        'primary-appropriate': 'var(--color-primary-appropriate)',
        'primary-dark': 'var(--color-primary-dark)',
        'primary-light': 'var(--color-primary-light)',
        'secondary': 'var(--color-secondary)',
        'secondary-appropriate': 'var(--color-secondary-appropriate)',
        'mint': {
          50: '#F7FBF9',
          100: '#CFFDF4',
          200: '#B1EEE3',
          300: '#91ECDA',
          400: '#50C7B0',
          500: '#47B19D',
          600: '#3F9E8C',
          700: '#2F7B6D',
          800: '#215A4F',
          900: '#12332D'
        }
      }
    },
  },
  variants: {
    borderWidth: ['last']
  },
  plugins: [
    require('@tailwindcss/ui'),
    require('@tailwindcss/forms')
  ]
}
