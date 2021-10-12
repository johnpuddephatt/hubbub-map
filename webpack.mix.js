let mix = require("laravel-mix");
require("laravel-mix-polyfill");

mix.disableSuccessNotifications();
mix.setPublicPath(".");
//mix.setPublicPath('_site');
//mix.setResourceRoot('_site');
require("laravel-mix-polyfill");

const outputDir = "src/_compiled";

mix
  .js("src/assets/scripts/main.js", outputDir + "/scripts/")
  .sourceMaps()
  .vue({
    extractStyles: true,
  })
  .sass("src/assets/styles/main.scss", outputDir + "/styles/")
  .options({
    processCssUrls: false,
    postCss: [require("tailwindcss")],
  })
  .polyfill({
    enabled: true,
    targets: "Android 4.4",
  });

if (process.env.NODE_ENV == "production") {
  mix.version().extract();
}
