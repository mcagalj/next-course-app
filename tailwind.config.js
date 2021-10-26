module.exports = {
    mode: 'jit',
    purge: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './modules/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                'roboto-condensed': ['"Roboto Condensed"', 'sans-serif'],
            },

            colors: {
                'hci-lila': '#8034AD',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
