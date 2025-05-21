/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,jsx,tsx}"],
    theme: {
      extend: {},
    },
    plugins: [],
    corePlugins: {
      preflight: true, // Garante que os estilos básicos sejam aplicados
    },
  };