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
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%',
      },
      height: {
        'fit-content': 'fit-content',
        'modal': 'calc(100vw - 5rem)',
        '7xl': '80rem',
        '6xl': '72rem',
        '5xl': '64rem',
        '4xl': '56rem',
        '3xl': '48rem',
        '2xl': '42rem',
        'xl': '36rem'
      },
      width: {
        'modal': 'calc(100vw - 5rem)'
      },
      maxHeight: {
        'modal': 'calc(100vh - 5rem)',
        '7xl': '80rem',
        '6xl': '72rem',
        '5xl': '64rem',
        '4xl': '56rem',
        '3xl': '48rem',
        '2xl': '42rem',
        'xl': '36rem'
      },
      maxWidth: {
        'modal': 'calc(100vw - 5rem)'
      },
      minHeight: {
        '64': '16rem'
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        'pulse-fast': 'pulse 0.8s linear infinite',
        'fadein': 'fadein 0.5s linear',
      },
      keyframes: {
        fadein: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      colors: {
        'primary': {
          '50': 'var(--color-primary-50)',
          '100': 'var(--color-primary-100)',
          '200': 'var(--color-primary-200)',
          '300': 'var(--color-primary-300)',
          '400': 'var(--color-primary-400)',
          '500': 'var(--color-primary-500)',
          '600': 'var(--color-primary-600)',
          '700': 'var(--color-primary-700)',
          '800': 'var(--color-primary-800)',
          '900': 'var(--color-primary-900)',
          'appropriate': 'var(--color-primary-appropriate)'
        },
        'secondary': 'var(--color-secondary)',
        'secondary-appropriate': 'var(--color-secondary-appropriate)'
      }
    },
  },
  variants: {
    borderWidth: ['last']
  },
  plugins: [
    require('@tailwindcss/ui'),
    require('@tailwindcss/forms'),
    require('tailwindcss-safe-area'),
  ]
}
