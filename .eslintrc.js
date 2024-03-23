/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["next"],
  rules: {
    "@next/next/no-img-element": "off",
  },
};
