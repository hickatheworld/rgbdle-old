module.exports = {
	mode: 'jit',
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		fontFamily: {
			'slab': ['Roboto Slab', 'sans-serif'],
			'Roboto': ['Roboto', 'sans-serif'],
			'work': ['Work Sans', 'sans-serif'],
			extend: {}
		},
		plugins: []
	}
};
