const config = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
  ],

  plugins: [require("flowbite/plugin")],

  darkMode: "class",

  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        20: "repeat(20, minmax(0, 1fr))",

        // Complex site-specific column configuration
        footer: "200px minmax(900px, 1fr) 100px",
      },
      colors: {
        // flowbite-svelte
        primary: {
          50: "#fae3e5",
          100: "#fcd2d4",
          200: "#fcb8bc",
          300: "#ff9ca1",
          400: "#ff8c92",
          500: "#ff737a",
          600: "#ff5c64",
          700: "#ff3d47",
          800: "#ff2631",
          900: "#ff0f1b",
        },
      },
    },
  },
};

module.exports = config;
