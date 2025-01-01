const plugin = require("tailwindcss/plugin");

const dragVariant = plugin(function ({ addVariant }) {
  addVariant("group-drag", ":merge(.group).drag &");
});

module.exports = dragVariant;
