/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "base-gray-1": "#1B1D1E",
        "base-gray-2": "#333638",
        "base-gray-3": "#5C6265",
        "base-gray-4": "#B9BBBC",
        "base-gray-5": "#DDDEDF",
        "base-gray-6": "#EFF0F0",
        "base-gray-7": "#FAFAFA",
        "red-dark": "#BF3B44",
        "red-mid": "#F3BABD",
        "red-light": "#F4E6E7",
        "green-dark": "#639339",
        "green-mid": "#CBE4B4",
        "green-light": "#E5F0DB"
      }
    },
  },
  plugins: [],
}

