/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#2563eb",

          secondary: "#d926a9",

          accent: "#fcd34d",

          neutral: "#2a323c",

          "base-100": "#1d232a",

          info: "#f59e0b",

          success: "#36d399",

          warning: "#f87171",

          error: "#dc2626",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
