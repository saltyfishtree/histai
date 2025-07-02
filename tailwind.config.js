/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,tsx}', './index.html', './*.ts'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f6ff',
          100: '#e0edff',
          200: '#c7dbff',
          300: '#a4c1ff',
          400: '#7d9bff',
          500: '#4A6B8A',
          600: '#3A5570',
          700: '#2A4460',
          800: '#1e3347',
          900: '#16252e'
        },
        historical: {
          gold: '#B08D57',
          parchment: '#F9F6F2',
          ink: '#333A45'
        },
        level: {
          1: {
            bg: '#e9f5e9',
            border: '#c8e6c9',
            text: '#2e7d32'
          },
          2: {
            bg: '#fff8e1',
            border: '#ffecb3',
            text: '#ffa000'
          },
          3: {
            bg: '#ffebee',
            border: '#ffcdd2',
            text: '#c62828'
          }
        }
      },
      fontFamily: {
        primary: ['Roboto', 'sans-serif'],
        secondary: ['Inter', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.7s ease-out',
        'pulse-data': 'pulseData 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'spin': 'spin 1s linear infinite',
        'bounce-subtle': 'bounceSubtle 2s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        pulseData: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        bounceSubtle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-4px)' },
          '60%': { transform: 'translateY(-2px)' }
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem'
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'modal': '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      },
      backgroundImage: {
        'hero-texture': "linear-gradient(135deg, rgb(240 246 255 / 0.85) 0%, rgb(249 246 242 / 0.85) 100%), url('/resource/background.avif')"
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio')
  ]
} 