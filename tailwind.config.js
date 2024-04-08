/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // './app/**/*.{js,ts,jsx,tsx,mdx}', // for app router
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // for pages router
    // './components/**/*.{js,ts,jsx,tsx,mdx}', // for create components folder inside the root

    // Or if using `src` directory:
    // './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        aeonik: ['var(--font-aeonik)'],
        bold: ['var(--font-aeonik-bold)'],
      },
    },
  },
  plugins: [],
}
