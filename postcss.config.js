module.exports = {
  plugins: {
      tailwindcss: {},
      "vue-cli-plugin-tailwind/purgecss": {}
  },
  purgeCSS: {
      // your settings here
      whitelistPatterns: [
          /(^|\.)ra/,
          /(^|\.)lg/,
          /(^|\.)fa-/,
          /-fa($|\.)/,
          /(^|\.)fas-/,
          /-fas($|\.)/,
          /(^|\.)slick-/,
          /-bg2($|\.)/
      ]
  }
};
