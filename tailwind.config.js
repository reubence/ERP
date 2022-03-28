module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        sort: "url('')",
      },
      colors: {
        primary: {
          50: "#065D8C",
          100: "#084F76",
        },
        secondary: {
          50: "#EFFDFA",
          100: "#14B8A6",
        },
        accent: {
          light: "#ED960A",
          DEFAULT: "#ED960A",
          dark: "#ED960A",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwind-scrollbar"),
  ],
};
