/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				red: {
					...defaultTheme.colors.red,
					50: '#660033',
					100: '#660033',
					200: 'white',
					800: '#870044',
					900: 'rgba(92, 6, 50, 0.7)',
				},
				'primary': '#870044',
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
