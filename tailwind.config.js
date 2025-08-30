/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				red: {
					...defaultTheme.colors.black,
					50: '#1C1C1C',
					100: '#1C1C1C', // Why Choose Qatar Boxes
					200: 'white',
					800: '#1C1C1C', // join now
					900: '#1C1C1C', // ready to takeoff
				},
				'primary': '#1c1c1c',
				'secondary': '#747F8A',
				'light-secondary': '#E0E0E0'
			},
			keyframes: {
				dropdown: {
					'0%': { opacity: '0', transform: 'translateY(-0.25rem) scale(0.95)' },
					'100%': { opacity: '1', transform: 'translateY(0)     scale(1)' },
				},
			},
			animation: {
				'dropdown-in': 'dropdown 150ms ease-out forwards',
			}
		},
	},
	plugins: [],
};
