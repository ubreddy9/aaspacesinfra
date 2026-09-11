/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate'

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
    './dev-tools/src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			success: {
  				DEFAULT: 'hsl(var(--success))',
  				foreground: 'hsl(var(--success-foreground))'
  			},
  			warning: {
  				DEFAULT: 'hsl(var(--warning))',
  				foreground: 'hsl(var(--warning-foreground))'
  			},
  			info: {
  				DEFAULT: 'hsl(var(--info))',
  				foreground: 'hsl(var(--info-foreground))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		fontFamily: {
			sans: ['var(--font-sans)'],
			heading: ['var(--font-heading)'],
			serif: ['var(--font-serif)'],
			mono: ['var(--font-mono)']
		},
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			},
  			float: {
  				'0%, 100%': { transform: 'translateY(0px)' },
  				'50%': { transform: 'translateY(-10px)' }
  			},
  			'rotate-clockwise': {
  				'0%': { transform: 'rotate(0deg)' },
  				'100%': { transform: 'rotate(360deg)' }
  			},
  			'rotate-counter': {
  				'0%': { transform: 'rotate(0deg)' },
  				'100%': { transform: 'rotate(-360deg)' }
  			},
  			marquee: {
  				from: { transform: 'translateX(0)' },
  				to: { transform: 'translateX(-50%)' }
  			},
  			shimmer: {
  				'0%': { backgroundPosition: '-400px 0' },
  				'100%': { backgroundPosition: '400px 0' }
  			},
  			'beam-draw': {
  				from: { strokeDashoffset: '1200', opacity: '0.3' },
  				to: { strokeDashoffset: '0', opacity: '1' }
  			},
  			'logo-rise': {
  				from: { opacity: '0', transform: 'translateY(16px)' },
  				to: { opacity: '1', transform: 'translateY(0)' }
  			},
  			'slide-up-fade': {
  				from: { opacity: '0', transform: 'translateY(20px)' },
  				to: { opacity: '1', transform: 'translateY(0)' }
  			},
  			'counter-in': {
  				from: { opacity: '0', transform: 'translateY(12px)' },
  				to: { opacity: '1', transform: 'translateY(0)' }
  			},
  			'pulse-ring': {
  				'0%': { transform: 'scale(1)', opacity: '0.7' },
  				'80%, 100%': { transform: 'scale(1.6)', opacity: '0' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'spin-slow': 'spin 3s linear infinite',
  			'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			'bounce-gentle': 'bounce 2s infinite',
  			float: 'float 3s ease-in-out infinite',
  			'rotate-clockwise': 'rotate-clockwise 4s linear infinite',
  			'rotate-counter': 'rotate-counter 3s linear infinite',
  			marquee: 'marquee 28s linear infinite',
  			shimmer: 'shimmer 1.6s infinite',
  			'logo-rise': 'logo-rise 0.7s ease forwards',
  			'slide-up-fade': 'slide-up-fade 0.4s ease forwards',
  			'counter-in': 'counter-in 0.5s ease forwards',
  			'pulse-ring': 'pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite'
  		}
  	}
  },
  plugins: [tailwindcssAnimate],
}
