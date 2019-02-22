module.exports = function(eleventyConfig) {
  // Copy the `css/fonts/` directory
  // If you use a subdirectory, it’ll copy using the same directory structure.
  eleventyConfig.addPassthroughCopy("styles.css");

  // Copy the `img/` directory 
  eleventyConfig.addPassthroughCopy("imgs");
  
  return {
    passthroughFileCopy: true
  };
};