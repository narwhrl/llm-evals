/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#FAF8F5',
          100: '#F4F1EA',
          200: '#E8E3D7',
          300: '#D5CDBE',
          400: '#B8AD99',
          900: '#1A1816',
        },
        ink: {
          950: '#0E0D0C',
          900: '#181715',
          800: '#272522',
          700: '#3D3A35',
          600: '#5A5650',
          500: '#7E7971',
          400: '#A49F96',
          300: '#CDC7BD',
        },
        cinnabar: {
          DEFAULT: '#D9381E',
          dim: '#B32610',
          glow: '#F95738',
        },
        cyanotype: {
          DEFAULT: '#005580',
          light: '#0A84FF',
          dark: '#002B40',
        }
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'Cambria', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'fine': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'float': '0 12px 32px -4px rgba(24, 23, 21, 0.08), 0 4px 12px -2px rgba(24, 23, 21, 0.04)',
        'blueprint': '0 0 20px rgba(10, 132, 255, 0.2)',
      }
    },
  },
  plugins: [],
}
