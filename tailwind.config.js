const colors = require("tailwindcss/colors");

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
        cyan: colors.cyan,
        coffee: {
          light: "#262125",
          DEFAULT: "#262125",
          dark: "#262125",
        },
        cream: {
          light: "#ffffff",
          DEFAULT: "#ffffff",
          dark: "#ffffff",
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
  ],
};
