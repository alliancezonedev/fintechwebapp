const eslint = require("@eslint/js");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const tseslint = require("typescript-eslint");
const tsParser = require("@typescript-eslint/parser");

module.exports = [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
];
