/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#fbbf24', // Amber 400
                    DEFAULT: '#f59e0b', // Amber 500
                    dark: '#d97706', // Amber 600
                },
                secondary: {
                    light: '#1e293b', // Slate 800
                    DEFAULT: '#0f172a', // Slate 900
                    dark: '#020617', // Slate 950
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
