/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  printWidth: 120,
  singleQuote: true,
  trailingComma: "es5",
  arrowParens: "always",
  parser: "typescript"
};
