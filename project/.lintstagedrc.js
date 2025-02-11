module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{png,jpg,jpeg}": ["imagemin-lint-staged"],
  "*.svg": ["svgo"]
}; 