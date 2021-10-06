module.exports = {
  mode: "jit",
  purge: {
    content: [
      "./safelist.txt",
      "./src/assets/**/*.njk",
      "./src/assets/scripts/**/*.vue",
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Helvetica Now", "Helvetica", "Arial", "sans-serif"],
    },
  },
};
