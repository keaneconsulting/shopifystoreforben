// Plugin Imports
const pluginDirectoryOutput = require("@11ty/eleventy-plugin-directory-output");
const pluginEleventyNavigation = require("@11ty/eleventy-navigation");
const pluginSitemap = require("@quasibit/eleventy-plugin-sitemap");

module.exports = function (eleventyConfig) {
    /**
     *  PLUGINS
     *      Adds additional Eleventy functionality through official or community-created add-ons.
     *      https://www.11ty.dev/docs/plugins/
     */

    // Add Sitemap Plugin
    eleventyConfig.addPlugin(pluginSitemap, {
        sitemap: {
            hostname: "https://yourdomain.com", // Replace with your actual domain
        },
    });

    // Add Directory Output Plugin
    // Provides benchmarks in the terminal when a website is built. Useful for diagnostics.
    // https://www.11ty.dev/docs/plugins/directory-output/
    eleventyConfig.addPlugin(pluginDirectoryOutput);

    // Add Navigation Plugin
    // Allows navigation items to be defined in a scalable way via the front matter.
    // https://www.11ty.dev/docs/plugins/navigation/
    eleventyConfig.addPlugin(pluginEleventyNavigation);

    /**
     *  FILTERS
     *      Define custom filters for use in templates.
     */

    // Add absoluteUrl filter
    eleventyConfig.addFilter("absoluteUrl", (url, base) => {
        if (!base) {
            base = "https://yourdomain.com"; // Replace with your actual domain
        }
        return new URL(url, base).toString();
    });

    // Add date filter
    eleventyConfig.addFilter("date", (date, format) => {
        const { DateTime } = require("luxon");
        return DateTime.fromJSDate(date).toFormat(format || "yyyy-MM-dd");
    });

    /**
     *  PASSTHROUGH'S
     *      Copy/paste non-template files straight to /public, without any interference from the Eleventy engine.
     *      https://www.11ty.dev/docs/copy/
     */
    eleventyConfig.addPassthroughCopy("./src/assets/css");
    eleventyConfig.addPassthroughCopy("./src/assets/favicons");
    eleventyConfig.addPassthroughCopy("./src/assets/fonts");
    eleventyConfig.addPassthroughCopy("./src/assets/images");
    eleventyConfig.addPassthroughCopy("./src/assets/js");
    eleventyConfig.addPassthroughCopy("./src/assets/svgs");

    /**
     *  RETURN CONFIGURATION
     *      Set input/output directories and template engines.
     */
    return {
        dir: {
            input: "src",
            output: "public",
            includes: "_includes",
            data: "_data",
        },
        htmlTemplateEngine: "njk", // Use Nunjucks for rendering HTML
    };
};
