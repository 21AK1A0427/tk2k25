/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',      // blue-500
        'primary-dark': '#2563EB', // blue-600
        secondary: '#10B981',    // emerald-500
        dark: '#1E293B',         // slate-800
        light: '#F8FAFC',        // slate-50
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Optional: for better form styling
  ],
}