module.exports = {
    plugins: {
        tailwindcss: {},
        "vue-cli-plugin-tailwind/purgecss": {
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
    }
};
