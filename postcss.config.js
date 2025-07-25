if (typeof process.versions === "undefined") {
  process.versions = { node: "20.0.0" }
}

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
