module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
